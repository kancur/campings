import { authLoggedIn } from '../../middleware/authLoggedIn';

export async function middleware(req) {
  return authLoggedIn(req)
}
