/* eslint-disable import/no-anonymous-default-export */
import httpProxy from 'http-proxy'
import Cookies from 'cookies'
import url from 'url'
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = process.env.API_URL

const proxy = httpProxy.createProxyServer()

export const config = {
  api: {
    bodyParser: false,
  },
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>((resolve, reject) => {
    const pathname = url.parse(req.url).pathname
    const isLoginPath = pathname === '/api/login'
    const isLogoutPath = pathname === '/api/logout'

    const cookies = new Cookies(req, res)
    const accessToken = cookies.get('auth-token')

    req.url = req.url?.replace(/^\/api/, '')

    req.headers.cookie = ''

    if (accessToken) {
      req.headers['Authorization'] = `Bearer ${accessToken}`
    }

    function interceptLogoutResponse(proxyRes: any, req: NextApiRequest, res: NextApiResponse) {
      const cookies = new Cookies(req, res)
      cookies.set('auth-token', '', {
        httpOnly: true,
        sameSite: 'lax',
        expires: new Date(0),
      })

      res.writeHead(proxyRes.statusCode, proxyRes.headers)
      proxyRes.pipe(res)
      resolve()
    }

    function interceptLoginResponse(proxyRes: any, req: NextApiRequest, res: NextApiResponse) {
      let apiResponseBody = ''
      proxyRes.on('data', (chunk: string) => {
        apiResponseBody += chunk
      })

      proxyRes.on('end', () => {
        try {
          const response = JSON.parse(apiResponseBody)
          const cookies = new Cookies(req, res)
          cookies.set('auth-token', response.accessToken, {
            httpOnly: true,
            sameSite: 'lax',
          })

          res.status(200).json({ accessToken: undefined, ...response })
          resolve()
        } catch (err) {
          console.error('Error parsing JSON:', err)
          res.status(500).json({ message: 'Error parsing login response', error: err.message })
          reject(err)
        }
      })
    }
    if (isLoginPath) {
      proxy.once('proxyRes', interceptLoginResponse)
    }

    if (isLogoutPath) {
      proxy.once('proxyRes', interceptLogoutResponse)
    }

    proxy.once('error', (err) => {
      console.error('Proxy error:', err)
      res.status(500).json({ message: 'Proxy error', error: err.message })
      reject(err)
    })

    proxy.web(req, res, {
      target: API_URL,
      autoRewrite: false,
      selfHandleResponse: isLoginPath,
    })

  })
}
