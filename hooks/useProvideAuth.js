import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { FRONTEND_API_ROUTE } from '../OPTIONS';
import { useRouter } from 'next/router';

export default function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const router = useRouter();

  const getCurrentUser = async () => {
    try {
      const response = await fetch(`${FRONTEND_API_ROUTE}/api/auth/current-user`, {
        credentials: 'include',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeCookie('jwt');
    setUser(null);
    setIsLoading(false);
    router.push('/dovidenia');
  };

  useEffect(async () => {
    if (cookies?.jwt) {
      console.log('cookies changed, current jwt:', cookies?.jwt);
      setIsLoading(true);
      const user = await getCurrentUser();
      if (user) {
        setUser(user);
      }
    }
    setIsLoading(false);
  }, [cookies.jwt]);

  /*   useEffect(async () => {
    if (cookies?.jwt) {
      const user = await getCurrentUser();
      if (user) {
        setUser(user);
      }
    }
    setIsLoading(false);
  }, []); */

  return {
    user,
    isLoading,
    logout,
  };
}
