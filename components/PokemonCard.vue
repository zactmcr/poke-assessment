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
.pokemon-card {
  border: 1px solid #374151;
  border-radius: 8px;
  text-align: center;
  padding: 1rem;
  background-color: #1f2937;
  text-decoration: none;
  color: #e5e7eb;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pokemon-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(74, 222, 128, 0.5);
}

.card-image {
  width: 96px;
  height: 96px;
  margin-bottom: 0.5rem;
}

.card-name {
  margin: 0;
  font-size: 1.1rem;
  text-transform: capitalize;
}
</style>