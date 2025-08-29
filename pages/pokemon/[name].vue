<template>
  <div class="profile-container">
    <div v-if="pending">
      <p>Loading...</p>
    </div>

    <div v-else-if="error">
      <p>Could not load data for this Pokémon. Please try again.</p>
    </div>

    <div v-else-if="pokemon">
      <NuxtLink to="/" class="back-link">
        Back to Pokédex
      </NuxtLink>

      <div class="pokemon-profile">
        <h1 class="pokemon-name">{{ pokemon.name }}</h1>
        <img :src="pokemon.picture" :alt="`Image of ${pokemon.name}`" class="pokemon-image" />
        <div class="pokemon-details">
          <p><strong>Height:</strong> {{ pokemon.height }}</p>
          <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
          <p><strong>Abilities:</strong> {{ pokemon.abilities }}</p>
        </div>
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 80vh;
}

.back-link {
  display: inline-block;
  margin-bottom: 2rem;
  padding: 0.8rem 2.5rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  color: #ffffff;
  background-color: #3498db;
  border: none;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.back-link:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.pokemon-profile {
  background-color: var(--card-bg);
  border: 2px solid var(--card-border);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 20px 40px var(--shadow-color-medium);
}

.pokemon-name {
  margin: 0 0 .8rem;
  font-size: 2.5rem;
  text-transform: capitalize;
  color: var(--primary-text);
  font-weight: 700;
}

.pokemon-image {
  width: 260px;
  height: 260px;
  object-fit: contain;
  margin: 0 auto 1rem;
  filter: drop-shadow(0 10px 20px var(--shadow-color-medium));
}

.pokemon-details p {
  margin: .5rem 0;
  font-size: 1.1rem;
  line-height: 1.6;
}
</style>