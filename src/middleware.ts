import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

// Function to validate the token using axios
async function validateToken(token: string | undefined): Promise<boolean> {
    if (!token) return false;

    console.log("TOKEN", token)
    try {
        // Make a request to the API to validate the token
        const response = await axios.get(`${process.env.API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.status === 200;
    } catch (error) {
        console.error('Error validating token:', error);
        return false;
    }
}

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value;

    // Define public paths that do not require authentication
    const publicPaths = ['/login', '/register'];

    // Allow requests to public paths without authentication
    if (publicPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.next();
    }

    // Validate the token for protected routes
    const isValidToken = await validateToken(token);

    if (!isValidToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|_next|static|favicon.ico).*)', // Exclude API routes, static files, and Next.js assets
};
