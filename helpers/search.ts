import { FRONTEND_API_ROUTE } from '../OPTIONS.js';

// server side search
export async function searchSuggestions(query: string) {
  try {
    const fetched = await fetch(`${FRONTEND_API_ROUTE}/search?q=${query}`);
    const json = await fetched.json();
    return json;
  } catch (error) {
    return { error: error };
  }
}

export async function campSearch(query: string) {
  try {
    const fetched = await fetch(`${FRONTEND_API_ROUTE}/search/camps?q=${query}`);
    const json = await fetched.json();
    return json;
  } catch (error) {
    return { error: error };
  }
}
