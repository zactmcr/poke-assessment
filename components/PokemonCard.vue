<template>
  <NuxtLink :to="`/pokemon/${name}`" class="pokemon-card">
    <img :src="thumbnail" :alt="name" class="card-image" />
    <h3 class="card-name">{{ name }}</h3>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.pokemon-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(74, 222, 128, 0.5);
}
</style>