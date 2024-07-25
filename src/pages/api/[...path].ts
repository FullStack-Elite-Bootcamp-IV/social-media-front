import httpProxy from 'http-proxy'
import Cookies from 'cookies'
import url from 'url'
import { NextApiRequest, NextApiResponse } from "next";
import { ProxyResponse } from "next/dist/experimental/testmode/proxy";

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
    const isLogin = pathname === '/api/login';
    const isLogout = pathname === '/api/logout';

    const cookies = new Cookies(req, res)
    const accessToken = cookies.get('auth-token')

    req.url = req.url?.replace(/^\/api/, '')

    req.headers.cookie = ''

    if (accessToken) {
      req.headers['Authorization'] = `Bearer ${accessToken}`
    }

    if (isLogin) {
      proxy.once('proxyRes', interceptLoginResponse)
    }

    if (isLogout) {
      proxy.once('proxyRes', interceptLogoutResponse)
    }

    proxy.once('error', reject)

    proxy.web(req, res, {
      target: API_URL,
      autoRewrite: false,
      selfHandleResponse: isLogin,
    })

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
          reject(err)
        }
      })
    }
  })
}
