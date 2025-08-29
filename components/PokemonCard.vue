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