<script setup>
const props = defineProps(["cars"])
</script>

<template>
  <div class="w-full">
    <CarCard v-if="cars.length" v-for="car in cars" :key="car.id" :car="car" />
    <h1 v-else class="text-2xl text-red-700 ml-12">No cars in that city</h1>
  </div>
</template>
