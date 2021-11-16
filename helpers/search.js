import { BACKEND_HOST, FRONTEND_API_ROUTE } from '../OPTIONS.js';

// server side search
export async function searchSuggestions(query) {
  try {
    const fetched = await fetch(`${FRONTEND_API_ROUTE}/api/search?q=${query}`);
    const json = await fetched.json();
    return json;
  } catch (error) {
    return { error: error };
  }
}

export async function campSearch(query) {
  try {
    const fetched = await fetch(`${FRONTEND_API_ROUTE}/api/search/camps?q=${query}`);
    const json = await fetched.json();
    return json;
  } catch (error) {
    return { error: error };
  }
}
