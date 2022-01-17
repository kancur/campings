import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { User } from '../interfaces/baseInterfaces'

export default function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const router = useRouter();

  const getCurrentUser = async () : Promise<User> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_API_ROUTE}/auth/current-user`, {
        credentials: 'include',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      throw(error);
    }
  };

  const logout = () => {
    removeCookie('jwt');
    setUser(null);
    setIsLoading(false);
    router.push('/dovidenia');
  };

  useEffect(() => {
    (async () => {
      if (cookies?.jwt) {
        setIsLoading(true);
        const user: User = await getCurrentUser();
        if (user) {
          setUser(user);
        }
      }
      setIsLoading(false);
    })();
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
