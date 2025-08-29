let allPokemonCache: { name: string; url: string }[] | null = null;

async function fetchAllPokemon() {
  if (!allPokemonCache) {
    console.log('Fetching and caching all Pokémon names...');
    const response = await $fetch<{ results: { name: string; url: string }[] }>(
      'https://pokeapi.co/api/v2/pokemon?limit=1302'
    );
    allPokemonCache = response.results;
  }
  return allPokemonCache;
}

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const searchTerm = (query.q as string)?.toLowerCase();

    if (!searchTerm) {
      return [];
    }

    const allPokemon = await fetchAllPokemon();
    const allMatchingPokemon = allPokemon.filter(p => p.name.includes(searchTerm));

    const paginatedMatches = allMatchingPokemon.slice(0, 60);

    if (paginatedMatches.length === 0) {
      return [];
    }

    const detailPromises = paginatedMatches.map(pokemon => {
      return $fetch<{
        id: number;
        sprites: { other: { 'official-artwork': { front_default: string | null } } };
      }>(pokemon.url);
    });

    const detailResponses = await Promise.all(detailPromises);

    const searchResults = paginatedMatches.map((pokemon, index) => ({
      name: pokemon.name,
      id: detailResponses[index].id,
      thumbnail: detailResponses[index].sprites.other['official-artwork'].front_default,
    }));

    return searchResults;

  } catch (error) {
    console.error('Error in Pokémon search API:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to execute search.',
    });
  }
});