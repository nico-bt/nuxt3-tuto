<template>
  <div class="mt-5">
    <p class="mb-10">
      {{ car.description }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({ car: Object })
</script>
