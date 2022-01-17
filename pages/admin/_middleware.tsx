import { NextApiRequest } from 'next';
import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextResponse } from 'next/server';

// checking if user is admin
export async function middleware(req: NextApiRequest): Promise<NextMiddlewareResult> {
  const cookies = req.cookies;
  if (!cookies.jwt) return NextResponse.redirect('/prihlasenie');

  try {
    const response = await fetch(
      `${process.env.BACKEND_HOST}/api/auth/current-user`,
      {
        headers: {
          Cookie: `jwt=${cookies.jwt}`,
        },
      }
    );

    const user = await response.json();
    if (user.is_admin === true) {
      return NextResponse.next();
    }

    return NextResponse.redirect('/prihlasenie');
  } catch (error) {
    return new Response(`Auth error: ${error.message}`, {
      status: 401,
    });
  }
}
