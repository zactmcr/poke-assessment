<template>
  <div class="search-container">
    <input
      type="text"
      placeholder="Search Pokémon..."
      class="search-input"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>

<style scoped>
.search-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 460px;
}

.search-input {
  width: 100%;
  padding: .8rem 1.2rem;
  border-radius: 999px;
  border: 2px solid var(--card-border);
  background-color: var(--card-bg);
  color: var(--primary-text);
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 2px 5px var(--shadow-color-light);
  transition: border-color .2s ease, box-shadow .2s ease;
}
.search-input::placeholder {
  color: var(--muted-text);
  font-weight: 400;
}
.search-input:focus {
  outline: none;
  border-color: var(--poke-red-accent);
  box-shadow: 0 0 0 4px rgba(227, 21, 13, 0.15);
}

/* Responsive adjustment for small screens */
@media (max-width: 768px) {
  .search-container {
    /* On small screens, calculate width to leave space for buttons */
    width: calc(100% - 110px);
    /* Adjust position to be left-aligned */
    left: 0;
    transform: translateY(-50%);
  }
}
</style>