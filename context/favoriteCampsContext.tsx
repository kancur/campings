import { createContext, useContext, useState, useEffect, ContextType } from 'react';
import axios from 'axios';
import { useAuth } from './authContext';
import { FavoriteCamp } from '../interfaces/baseInterfaces';


interface FavContext {
  camps: FavoriteCamp[];
  add: (id: string) => void;
  delete: (id: string) => void;
}

const favoriteCampsContext = createContext<FavContext>({ camps: [], add: () => null, delete: () => null});

export function FavoriteCampsProvider({ children }: { children: React.ReactNode }) {
  const [favoriteCamps, setFavoriteCamps] = useState([]);
  const auth = useAuth();

  const addToFavorites = (id: string) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_FRONTEND_API_ROUTE}/user/camp-favorites/${id}`)
      .then((data) => {
        setFavoriteCamps(data.data);
      })
      .catch((err) => console.error(err));
  };

  const deleteFromFavorites = (id: string) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_FRONTEND_API_ROUTE}/user/camp-favorites/${id}`)
      .then((data) => {
        setFavoriteCamps(data.data);
      })
      .catch((err) => console.error(err));
  };

  // load users favorites on startup and on user change
  useEffect(() => {
    if (auth.user) {
      axios
        .get(`${process.env.NEXT_PUBLIC_FRONTEND_API_ROUTE}/user/camp-favorites/`)
        .then(({ data }) => {
          setFavoriteCamps(data);
        })
        .catch((err) => console.error(err));
    } else {
      setFavoriteCamps([]);
    }
  }, [auth.user]);

  const favorite = {
    camps: favoriteCamps,
    add: addToFavorites,
    delete: deleteFromFavorites,
  };

  return (
    <favoriteCampsContext.Provider value={favorite}>
      {children}
    </favoriteCampsContext.Provider>
  );
}

export function useFavoriteCamps() {
  return useContext(favoriteCampsContext);
}
