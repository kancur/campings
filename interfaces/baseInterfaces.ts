export interface Coords {
  lat: number;
  lon: number;
}

export interface User {
  _id: string;
  email: string;
  favorite_camps: {}[];
  is_admin?: boolean;
}

export interface FavoriteCamp {
  _id: string;
  createdAt: string;
  camp: {
    _id: string;
    name: string;
    slug: string;
    id: string;
  };
}

