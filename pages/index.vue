<template>
  <div>
    <h1>Pokémon Finder</h1>
    <!-- Pass the search term to the SearchBar and listen for updates -->
    <SearchBar v-model="searchTerm" />

    <!-- Pass the filtered list of Pokémon to the PokemonList component -->
    <PokemonList :pokemon="filteredPokemon" />
  </div>
</template>

<script setup lang="ts">
  // Import necessary Vue and Nuxt functions (ref, computed)
  // Import the components (SearchBar, PokemonList)

  // Define a reactive variable for the search term.
  const searchTerm = ref('');

  // Fetch the list of 60 Pokémon from our internal API endpoint.
  // Use Nuxt's `useFetch` composable to handle data fetching.
  const { data: pokemonList, pending, error } = await useFetch('/api/pokemon');

  // Create a computed property to filter the Pokémon list based on the search term.
  const filteredPokemon = computed(() => {
    // If there's no pokemonList yet, return an empty array.
    if (!pokemonList.value) return [];

    // If the search term is empty, return the full list.
    if (!searchTerm.value) return pokemonList.value;

    // Otherwise, filter the list.
    // Return only the Pokémon whose name includes the search term (case-insensitive).
    return pokemonList.value.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });
</script>