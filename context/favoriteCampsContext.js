import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FRONTEND_API_ROUTE } from '../OPTIONS';
import { useAuth } from './authContext';

const favoriteCampsContext = createContext();

export function FavoriteCampsProvider({ children }) {
  const [favoriteCamps, setFavoriteCamps] = useState([]);
  const auth = useAuth();

  const addToFavorites = (id) => {
    axios
      .post(`${FRONTEND_API_ROUTE}/user/camp-favorites/${id}`)
      .then((data) => {
        setFavoriteCamps(data.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteFromFavorites = (id) => {
    axios
      .delete(`${FRONTEND_API_ROUTE}/user/camp-favorites/${id}`)
      .then((data) => {
        console.log('deleted, new data:',data.data)
        setFavoriteCamps(data.data);
      })
      .catch((err) => console.log(err));
  };

  // load users favorites on startup and on user change
  useEffect(() => {
    console.log('getting favorites from API');
    if (auth.user) {
      axios
        .get(`${FRONTEND_API_ROUTE}/user/camp-favorites/`)
        .then(({data}) => {
          setFavoriteCamps(data);
          console.log(data);
        })
        .catch((err) => console.log(err));
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
