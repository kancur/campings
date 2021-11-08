import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BACKEND_HOST } from '../OPTIONS';

export default function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie] = useCookies(['jwt']);

  const getCurrentUser = async () => {
    try {
      const response = await fetch(`${BACKEND_HOST}/api/auth/current-user`, {
        credentials: 'include',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(async () => {
    if (cookies?.jwt) {
      const user = await getCurrentUser();
      if (user) {
        setUser(user);
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);
  return {
    user,
    isLoading,
  };
}
