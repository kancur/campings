import { NextResponse } from 'next/server';

// checking if user is logged in
export async function authLoggedIn(req) {
  const cookies = req.cookies;
  if (!cookies.jwt) return NextResponse.redirect('/prihlasenie');

  try {
    const response = await fetch(`${process.env.BACKEND_HOST}/api/auth/current-user`, {
      headers: {
        Cookie: `jwt=${cookies.jwt}`,
      },
    });

    const user = await response.json();

    if (user) {
      return NextResponse.next();
    }

    return NextResponse.redirect('/prihlasenie');

  } catch (error) {
    return new Response(`Auth error: ${error.message}`, {
      status: 401,
    });
  }
}
