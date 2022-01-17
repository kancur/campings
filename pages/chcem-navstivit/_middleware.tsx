import { NextApiRequest } from 'next';
import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { authLoggedIn } from '../../middleware/authLoggedIn';

export async function middleware(req: NextApiRequest): Promise<NextMiddlewareResult> {
  return authLoggedIn(req)
}
