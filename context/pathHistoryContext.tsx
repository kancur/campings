import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// @ts-ignore
const previousPathContext = createContext();

export function PreviousPathProvider({ children }) {
  const router = useRouter();
  const [pathHistory, setPathHistory] = useState([]);

  useEffect(() => {
    setPathHistory((prev) => [...prev, router.asPath]);
  }, [router.asPath]);

  return (
    <previousPathContext.Provider value={pathHistory[pathHistory.length - 2]}>
      {children}
    </previousPathContext.Provider>
  );
}

export function usePreviousPath() {
  return useContext(previousPathContext);
}
