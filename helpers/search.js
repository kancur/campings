import { BACKEND_HOST } from '../OPTIONS.js';

// server side search
export async function searchEverything(query) {
  try {
    const fetched = await fetch(`${BACKEND_HOST}/api/search/?q=${query}`);
    const json = await fetched.json();
    return json;
  } catch (error) {
    return ({error: error})
  }
}
