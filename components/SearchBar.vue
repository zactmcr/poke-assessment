<template>
  <input
    type="text"
    placeholder="Search for a Pokémon..."
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup lang="ts">
  // Define the props and emits for v-model compatibility.
  defineProps(['modelValue']);
  defineEmits(['update:modelValue']);
</script>