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

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-family: sans-serif;
}

.pokemon-profile {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.pokemon-name {
  text-transform: capitalize;
  margin-top: 0;
  font-size: 2.5rem;
}

.pokemon-image {
  width: 250px;
  height: 250px;
  margin-bottom: 1.5rem;
}

.pokemon-details p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0.5rem 0;
}
</style>