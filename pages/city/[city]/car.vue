<template>
  <div class="mx-auto mt-4 max-w-7xl space-y-4 px-4 xs:px-8 sm:px-10 lg:px-16 pb-16">
    <div class="mt-32 flex">
      <CarSidebar />
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const city = route.params.city
const make = route.params.make

useHead({
  title: make ? `${make} cars in ${city}` : `Cars in ${route.params.city}`,
})
</script>

<style lang="scss" scoped></style>
