<template>
  <div>
    <h1>Something went wrong!</h1>
    <p>{{ errorMessage }}</p>
    <button @click="$emit('reset')">Try Again</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  error: Object
})

const emit = defineEmits(['reset'])

const errorMessage = computed(() => {
  return props.error?.message || "An unexpected error occurred."
})
</script>