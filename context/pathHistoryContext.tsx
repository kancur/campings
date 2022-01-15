import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type PathHistoryContextType = string;
const previousPathContext = createContext<PathHistoryContextType>('');


export function PreviousPathProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [pathHistory, setPathHistory] = useState<string[]>([]);

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
