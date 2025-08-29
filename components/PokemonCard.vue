<template>
  <NuxtLink :to="`/pokemon/${name}`" class="pokemon-card" :class="`is-${view}-view`">
    <img :src="thumbnail" :alt="name" class="card-image" />
    <h3 class="card-name">{{ name }}</h3>
    <span class="card-id">#{{ String(id).padStart(3, '0') }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  id: { type: Number, required: true },
  view: { type: String, default: 'grid' },
});
</script>

<style scoped>
.pokemon-card:hover {
  transform: translateY(-6px);
  border-color: var(--poke-red-accent);
  box-shadow:
    0 4px 8px var(--shadow-color-light),
    0 15px 25px var(--shadow-color-medium);
}
</style>