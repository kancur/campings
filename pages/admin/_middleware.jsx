import { NextResponse } from 'next/server';
import { BACKEND_HOST } from '../../OPTIONS';

// checking if user is admin
export async function middleware(req) {
  console.log('middleware running')
  const cookies = req.cookies;
  if (!cookies.jwt) return NextResponse.redirect('/prihlasenie');

  try {
    const response = await fetch(`${BACKEND_HOST}/api/auth/current-user`, {
      headers: {
        Cookie: `jwt=${cookies.jwt}`,
      },
    });
    const user = await response.json();
    console.log('is admin?', user)
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
