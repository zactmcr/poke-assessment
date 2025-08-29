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
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #4b5563;
  background-color: #374151;
  color: #e5e7eb;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #a5b4fc;
  box-shadow: 0 0 0 3px rgba(165, 180, 252, 0.5);
}
</style>