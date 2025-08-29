<template>
  <div class="loader-container">
    <svg class="pokeball-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="44" height="44" aria-label="Loading">
      <g class="spin">
        <circle cx="128" cy="128" r="112" fill="#ffffff" stroke="#222" stroke-width="16"/>
        <path d="M16 128h224" stroke="#222" stroke-width="20"/>
        <path d="M128 16a112 112 0 0 1 112 112H16A112 112 0 0 1 128 16z" fill="#e3350d"/>
        <circle cx="128" cy="128" r="36" fill="#ffffff" stroke="#222" stroke-width="16"/>
        <circle cx="128" cy="128" r="18" fill="#222"/>
      </g>
    </svg>
    <p class="loader-text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: 'Loading...'
  }
});
</script>

<style scoped>
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
}
.loader-text {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--muted-text);
}

.spin {
  animation: spin 1s linear infinite;
  transform-origin: 128px 128px;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>