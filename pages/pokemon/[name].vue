<template>
  <div class="profile-container">
    <div v-if="pending">
      <p>Loading Pokémon...</p>
    </div>

    <div v-else-if="error">
      <p>Could not load data for this Pokémon.</p>
    </div>

    <div v-else-if="pokemon" class="pokemon-profile">
      <h1 class="pokemon-name">{{ pokemon.name }}</h1>
      <img :src="pokemon.picture" :alt="`Image of ${pokemon.name}`" class="pokemon-image" />
      <div class="pokemon-details">
        <p><strong>Height:</strong> {{ pokemon.height }}</p>
        <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
        <p><strong>Abilities:</strong> {{ pokemon.abilities }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const pokemonName = route.params.name;

type PokemonData = {
  name: string;
  height: number;
  weight: number;
  picture: string;
  abilities: string;
};

const { data: pokemon, pending, error } = await useFetch<PokemonData>(`/api/pokemon/${pokemonName}`);
</script>