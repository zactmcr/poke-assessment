<template>
  <div class="container">
    <h1 class="title">Pokémon Finder</h1>

    <div v-if="pending">
      <p>Loading Pokémon...</p>
    </div>

    <div v-else-if="error">
      <p>Could not load the list of Pokémon. Please try refreshing the page.</p>
    </div>

    <PokemonList v-else-if="pokemonList" :pokemon="pokemonList" />
  </div>
</template>

<script setup lang="ts">
import PokemonList from '~/components/PokemonList.vue';

type Pokemon = {
  name: string;
  thumbnail: string;
};

const { data: pokemonList, pending, error } = await useFetch<Pokemon[]>('/api/pokemon');
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