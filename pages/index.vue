<template>
  <div class="container">
    <h1 class="title">Pokémon Finder</h1>

    <div class="search-controls-wrapper">
      <SearchBar v-model="searchTerm" />
      <ViewToggle v-model="view" />
    </div>

    <div class="content-area">
      <div v-if="initialPending">
        <Loader text="Loading Pokédex..." />
      </div>
      <div v-else-if="searchIsLoading">
        <Loader text="Searching..." />
      </div>
      <div v-else-if="error">
        <p>Could not load the list of Pokémon.</p>
      </div>
      <PokemonList
        v-else-if="searchTerm ? searchResults : initialList"
        :pokemon="(searchTerm ? searchResults : initialList) || []"
        :view="view"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import PokemonList from '~/components/PokemonList.vue';
import SearchBar from '~/components/SearchBar.vue';
import ViewToggle from '~/components/ViewToggle.vue';
import { debounce } from '~/utils/debounce';

type Pokemon = {
  name: string;
  thumbnail: string;
  id: number;
};

const { data: initialList, pending: initialPending, error } = await useFetch<Pokemon[]>('/api/pokemon');
const searchResults = ref<Pokemon[]>([]);
const searchTerm = ref('');
const searchIsLoading = ref(false);
const view = ref<'grid' | 'list'>('grid');

onMounted(() => {
  if (window.innerWidth < 768) {
    view.value = 'list';
  }
});

const performSearch = async () => {
  if (!searchTerm.value) {
    searchResults.value = [];
    return;
  }
  searchIsLoading.value = true;
  try {
    const results = await $fetch<Pokemon[]>(`/api/pokemon/search?q=${searchTerm.value}`);
    searchResults.value = results;
  } catch (e) {
    console.error("Search failed:", e);
    searchResults.value = [];
  } finally {
    searchIsLoading.value = false;
  }
};

watch(searchTerm, debounce(() => {
  performSearch();
}, 300));
</script>

<style scoped>
.container {
  padding: 1rem;
}
.title {
  text-align: center;
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
.content-area {
  min-height: 50vh;
}
</style>