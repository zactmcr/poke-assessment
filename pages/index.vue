<template>
  <div class="container">
    <h1 class="title">Pokémon Finder</h1>

    <SearchBar v-model="searchTerm" />

    <div v-if="pending">
      <p>Loading Pokémon...</p>
    </div>

    <div v-else-if="error">
      <p>Could not load the list of Pokémon. Please try refreshing the page.</p>
    </div>

    <PokemonList v-else-if="filteredPokemon" :pokemon="filteredPokemon" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PokemonList from '~/components/PokemonList.vue';
import SearchBar from '~/components/SearchBar.vue';

type Pokemon = {
  name: string;
  thumbnail: string;
};

const { data: pokemonList, pending, error } = await useFetch<Pokemon[]>('/api/pokemon');

const searchTerm = ref('');

const filteredPokemon = computed(() => {
  if (!pokemonList.value) {
    return [];
  }

  if (!searchTerm.value) {
    return pokemonList.value;
  }

  return pokemonList.value.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});
</script>

<style scoped>
.container {
  text-align: center;
  padding: 1rem;
}

.title {
  font-size: 3rem;
  color: #a5b4fc;
  margin-bottom: 2rem;
}
</style>