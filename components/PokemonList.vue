<template>
  <div class="pokemon-grid">
    <PokemonCard
      v-for="p in pokemon"
      :key="p.name"
      :name="p.name"
      :thumbnail="p.thumbnail"
    />
  </div>
</template>

<script setup lang="ts">
import PokemonCard from './PokemonCard.vue';

type Pokemon = {
  name: string;
  thumbnail: string;
};

defineProps({
  pokemon: {
    type: Array as () => Pokemon[],
    required: true,
  },
});
</script>