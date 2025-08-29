export default defineEventHandler(async (event) => {
  try {
    const listUrl = 'https://pokeapi.co/api/v2/pokemon?limit=60';
    const listResponse = await $fetch<{ results: { name: string; url: string }[] }>(listUrl);

    const detailPromises = listResponse.results.map(pokemon => {
      return $fetch<{
        id: number;
        sprites: { other: { 'official-artwork': { front_default: string | null } } };
      }>(pokemon.url);
    });

    const detailResponses = await Promise.all(detailPromises);

    const pokemonData = listResponse.results.map((pokemon, index) => ({
      name: pokemon.name,
      thumbnail: detailResponses[index].sprites.other['official-artwork'].front_default,
      id: detailResponses[index].id,
    }));

    return pokemonData;

  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch data from the Pokémon API.',
    });
  }
});