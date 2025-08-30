export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const offset = parseInt(query.offset as string) || 0;
    const limit = 60;

    const listUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const listResponse = await $fetch<{ results: { name: string; url: string }[] }>(listUrl);

    if (listResponse.results.length === 0) {
      return [];
    }

    const detailPromises = listResponse.results.map(pokemon => {
      return $fetch<{
        id: number;
        sprites: { other: { 'official-artwork': { front_default: string | null } } };
      }>(pokemon.url);
    });

    const detailResponses = await Promise.all(detailPromises);

    return detailResponses.map((details, index) => ({
      name: listResponse.results[index].name,
      id: details.id,
      thumbnail: details.sprites.other['official-artwork'].front_default,
    }));

  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch data from the Pokemon API.',
    });
  }
});