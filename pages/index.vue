<template>
  <div class="container">
    <h1 class="title">Pokemon Finder</h1>

    <div class="search-controls-wrapper">
      <SearchBar v-model="searchTerm" />
      <ViewToggle v-model="view" />
    </div>

    <div class="content-area">
      <div v-if="(initialPending || searchIsLoading) && pokemonToDisplay.length === 0">
        <Loader :text="searchIsLoading ? 'Searching...' : 'Loading Pokedex...'" />
      </div>
      
      <div v-else-if="error">
        <p>Could not load the list of Pokemon. Trying to reconnect...</p>
      </div>
      
      <PokemonList
        v-if="pokemonToDisplay.length > 0"
        :pokemon="pokemonToDisplay"
        :view="view"
      />

      <div ref="loadMoreTrigger" v-if="hasMore && !initialPending"></div>

      <div v-if="isLoadingMore && pokemonToDisplay.length > 0" class="loading-more-indicator">
        <Loader text="Loading more..." />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import PokemonList from '~/components/PokemonList.vue';
import SearchBar from '~/components/SearchBar.vue';
import ViewToggle from '~/components/ViewToggle.vue';
import Loader from '~/components/Loader.vue';
import { debounce } from '~/utils/debounce';

type Pokemon = { name: string; thumbnail: string; id: number };
type SearchResponse = { results: Pokemon[]; total: number };

const initialList = ref<Pokemon[]>([]);
const searchResults = ref<Pokemon[]>([]);
const searchTerm = ref('');
const view = ref<'grid' | 'list'>('grid');

const initialPending = ref(true);
const searchIsLoading = ref(false);
const isLoadingMore = ref(false);
const error = ref<Error | null>(null);

const offset = ref(0);
const hasMore = ref(true);

const pokemonToDisplay = computed(() => {
  return searchTerm.value ? searchResults.value : initialList.value;
});

const loadMorePokemon = async () => {
  if (isLoadingMore.value || !hasMore.value) return;
  isLoadingMore.value = true;
  error.value = null;

  try {
    if (searchTerm.value) {
      const response = await $fetch<SearchResponse>(`/api/pokemon/search?q=${searchTerm.value}&offset=${offset.value}`);
      searchResults.value.push(...response.results);
      hasMore.value = searchResults.value.length < response.total;
    } else {
      const newPokemon = await $fetch<Pokemon[]>(`/api/pokemon?offset=${offset.value}`);
      if (newPokemon.length > 0) {
        initialList.value.push(...newPokemon);
      } else {
        hasMore.value = false;
      }
    }
    offset.value += 60;
  } catch (e) {
    error.value = e as Error;
  } finally {
    isLoadingMore.value = false;
    initialPending.value = false;
  }
};

const startNewSearch = async () => {
  offset.value = 0;
  searchResults.value = [];
  hasMore.value = true;
  searchIsLoading.value = true;
  await loadMorePokemon();
  searchIsLoading.value = false;
};

const loadMoreTrigger = ref<HTMLElement | null>(null);
let observer: IntersectionObserver;

onMounted(() => {
  loadMorePokemon();
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMorePokemon();
      }
    },
    { rootMargin: '200px' }
  );
  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

watch(searchTerm, debounce((newTerm) => {
  if (newTerm) {
    startNewSearch();
  } else {
    offset.value = initialList.value.length;
    hasMore.value = true;
  }
}, 300));

watch(loadMoreTrigger, (newEl, oldEl) => {
  if (oldEl) observer?.unobserve(oldEl);
  if (newEl) observer?.observe(newEl);
});
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
.loading-more-indicator {
  padding: 2rem;
}
</style>