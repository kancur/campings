import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next'


// checking if user is logged in
export async function authLoggedIn(req: NextApiRequest) {
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

    if (!user) return NextResponse.redirect('/prihlasenie');
    return NextResponse.next();

  } catch (error) {
    /* return new Response(`Auth error: ${error.message}`, {
      status: 401,
    }); */
    console.log(`Auth error: ${error.message}`)
  }
}
