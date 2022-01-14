import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { FRONTEND_API_ROUTE } from '../OPTIONS';
import { useAuth } from './authContext';

// @ts-ignore
const favoriteCampsContext = createContext();

export function FavoriteCampsProvider({ children }: { children: React.ReactNode }) {
  const [favoriteCamps, setFavoriteCamps] = useState([]);
  const auth = useAuth();

  const addToFavorites = (id) => {
    axios
      .post(`${FRONTEND_API_ROUTE}/user/camp-favorites/${id}`)
      .then((data) => {
        setFavoriteCamps(data.data);
      })
      .catch((err) => console.error(err));
  };

  const deleteFromFavorites = (id) => {
    axios
      .delete(`${FRONTEND_API_ROUTE}/user/camp-favorites/${id}`)
      .then((data) => {
        setFavoriteCamps(data.data);
      })
      .catch((err) => console.error(err));
  };

  // load users favorites on startup and on user change
  useEffect(() => {
    if (auth.user) {
      axios
        .get(`${FRONTEND_API_ROUTE}/user/camp-favorites/`)
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