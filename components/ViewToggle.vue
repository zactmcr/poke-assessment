<template>
  <div class="view-toggle">
    <button
      class="toggle-button"
      :class="{ 'is-active': modelValue === 'grid' }"
      @click="$emit('update:modelValue', 'grid')"
      aria-label="Grid View"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
    </button>
    <button
      class="toggle-button"
      :class="{ 'is-active': modelValue === 'list' }"
      @click="$emit('update:modelValue', 'list')"
      aria-label="List View"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>

<style scoped>
.view-toggle {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 0.5rem;
}
.toggle-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: 2px solid var(--card-border);
  border-radius: 8px;
  background-color: var(--card-bg);
  color: var(--muted-text);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.toggle-button:hover {
  background-color: #f1f3f5;
}
.toggle-button.is-active {
  background-color: var(--poke-red-accent);
  border-color: var(--poke-red-accent);
  color: white;
}
</style>