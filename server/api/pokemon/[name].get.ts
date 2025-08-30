export default defineEventHandler(async (event) => {
  try {
    const pokemonName = getRouterParam(event, 'name');
    const detailUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    const pokemonDetails = await $fetch<{
      name: string;
      height: number;
      weight: number;
      sprites: { other: { 'official-artwork': { front_default: string | null } } };
      abilities: { ability: { name: string } }[];
    }>(detailUrl);

    const formattedAbilities = pokemonDetails.abilities
      .map(abilityInfo => {
        const name = abilityInfo.ability.name;
        return name.charAt(0).toUpperCase() + name.slice(1);
      })
      .join(', ');

    return {
      name: pokemonDetails.name,
      height: pokemonDetails.height,
      weight: pokemonDetails.weight,
      picture: pokemonDetails.sprites.other['official-artwork'].front_default,
      abilities: formattedAbilities,
    };

  } catch (error) {
    console.error(`Error fetching details for Pokemon:`, error);
    throw createError({
      statusCode: 404,
      statusMessage: 'Pokemon not found.',
    });
  }
});