<template>
  <div class="pokemon-grid" :class="{ 'is-list-view': view === 'list' }">
    <PokemonCard
      v-for="p in pokemon"
      :key="p.id"
      :name="p.name"
      :thumbnail="p.thumbnail"
      :id="p.id"
      :view="view"
    />
  </div>
</template>

<script setup lang="ts">
import PokemonCard from './PokemonCard.vue';

type Pokemon = {
  name: string;
  thumbnail: string;
  id: number;
};

defineProps({
  pokemon: { type: Array as () => Pokemon[], required: true },
  view: { type: String, default: 'grid' },
});
</script>