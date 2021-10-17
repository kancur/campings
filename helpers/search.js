import obceSK from '../data/obceSK.js';
import geomorphological from '../data/geomorphological'
const NR_OF_RESULTS = 5

// server side search
export async function searchEverything(query) {
  const fetched = await fetch(`http://localhost:3000/api/search/?q=${query}`)
  const json = await fetched.json()
  return json
}

// client side search
// deprecated

/* export function searchAllTypes(query) {
  const normalizedQuery = normalizeDiacritics(query.toLowerCase());
  const villages = searchVillages(normalizedQuery)
  const geomorphounits = searchGeomorphological(normalizedQuery);

  if (geomorphounits.length > 0){
    return [...geomorphounits, ...villages]
  }
  return villages
}

function searchVillages(query) {
  const results = [];
  let count = 0;
  for (let village of obceSK) {
    const normalizedName = normalizeDiacritics((village.name).toLowerCase())
    if (count < NR_OF_RESULTS) {
      if (normalizedName.startsWith(query)) {
        count += 1;
        results.push({...village, type: 'village'});
      }
    } else {
    }
  }
  return results;
}

function searchGeomorphological(query) {
  const results = [];
  let count = 0;
  for (let unit of geomorphological) {
    const normalizedName = normalizeDiacritics((unit.name).toLowerCase())
    if (count < NR_OF_RESULTS) {
      if (normalizedName.startsWith(query)) {
        count += 1;
        results.push(unit);
      }
    } else {
    }
  }
  return results;
}


function normalizeDiacritics(query) {
  return (
    query.normalize("NFD").replace(/[\u0300-\u036f]/g, '')
  )
}
 */