import { Coords, SearchTypes } from '../interfaces/baseInterfaces.js';

type SearchSuggestions =
  | {
      name: string;
      slug: string;
      county_name: string;
      type: SearchTypes;
    }[]
  | { error: Error };

// server side search
export async function searchSuggestions(query: string): Promise<SearchSuggestions> {
  try {
    const fetched = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_API_ROUTE}/search?q=${query}`);
    const json = await fetched.json();
    return json;
  } catch (error) {
    return { error: error };
  }
}

type campSearchResult = {
  _id: string;
  name: string;
  score: number;
  slug: string;
  coords: Coords;
  villages: {
    _id: string;
    name: string;
    distance: number;
    lat: number;
    lon: number;
    parents?: {
      county_id?: number;
      county_name?: string;
      region_id?: number;
      region_name?: string;
    }
  }
}

export async function campSearch(query: string): Promise<campSearchResult[] | {error: Error}> {
  try {
    const fetched = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_API_ROUTE}/search/camps?q=${query}`);
    const json = await fetched.json();

    return json;
  } catch (error) {
    return { error: error };
  }
}
