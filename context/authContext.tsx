import { createContext, useContext } from 'react';
import useProvideAuth from '../hooks/useProvideAuth';
import { AuthContext } from '../interfaces/baseInterfaces';

const authContext = createContext<AuthContext>({
  user: null,
  isLoading: true,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
