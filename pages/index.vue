<template>
  <div class="container">
    <h1 class="title">Pokémon Finder</h1>

    <div class="search-controls-wrapper">
      <SearchBar v-model="searchTerm" />
      <ViewToggle v-model="view" />
    </div>

    <div v-if="pending">
      <p>Loading...</p>
    </div>
    <div v-else-if="error">
      <p>Could not load the list of Pokémon.</p>
    </div>
    <PokemonList v-else-if="filteredPokemon" :pokemon="filteredPokemon" :view="view" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import PokemonList from '~/components/PokemonList.vue';
import SearchBar from '~/components/SearchBar.vue';
import ViewToggle from '~/components/ViewToggle.vue';

type Pokemon = {
  name: string;
  thumbnail: string;
  id: number;
};

const { data: pokemonList, pending, error } = await useFetch<Pokemon[]>('/api/pokemon');
const searchTerm = ref('');
const view = ref<'grid' | 'list'>('grid');

onMounted(() => {
  if (window.innerWidth < 768) {
    view.value = 'list';
  }
});

const filteredPokemon = computed(() => {
  if (!pokemonList.value) return [];
  if (!searchTerm.value) return pokemonList.value;
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
  font-size: 3.5rem;
  color: var(--primary-text);
  margin-bottom: 1.5rem;
}

.search-controls-wrapper {
  position: relative;
  max-width: 1200px;
  margin: 0 auto 2rem auto;
  height: 50px;
}
</style>