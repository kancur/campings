import { createContext, useContext } from 'react';
import useProvideAuth from '../hooks/useProvideAuth';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );  
}

export function useAuth() {
  return useContext(authContext);
}