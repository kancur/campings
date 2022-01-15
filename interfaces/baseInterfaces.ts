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

export interface Camp {
  _id: string;
  name: string;
  slug: string;
  id?: string;
}

export interface CampListingInterface extends Camp {
  featured_image?: string;
  villages?: { parents?: { county_name: string | null }; name: string }[];
  distance?: number;
  shortDescription?: string;
}

export interface CampData extends Camp {
  coords?: Coords | null;
  description?: string;
  shortDescription?: string;
  url?: string;
  featuredImage?: string;
  featured_image?: string;
  website?: string;
  villages?: Village[]
  distance?: number;
}

export type CampDataEdit = Partial<CampData>;

export interface Village {
  distance: number;
  lat: number;
  lon: number;
  name: string;
  _id: string;
  parents?: {
    county_id?: number;
    county_name?: string;
    region_id?: number;
    region_name?: string;
  };
}

export interface CampWithVillages extends Camp {
  villages: Village[];
}

export interface FavoriteCamp {
  _id: string;
  createdAt: string;
  camp: Camp;
}

export interface AuthContext {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
}

export type SearchTypes =
  | 'village'
  | 'mountain_range'
  | 'basin'
  | 'valley'
  | 'flat'
  | 'plain'
  | 'plateau'
  | 'waterbody'
  | 'camp';

export interface SearchData {
  query?: string;
  type: 'suggestion' | 'query';
  data?: SearchSuggestion;
}

export interface SearchSuggestion {
  county_name: string;
  name: string;
  slug: string;
  type: SearchTypes;
}

export interface FileWithPreview extends File {
  preview: string;
}