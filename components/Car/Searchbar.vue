<template>
  <div
    class="font-serif max-w-[1000px] text-2xl rounded-full bg-white flex justify-between overflow-hidden drop-shadow-2xl mx-auto"
  >
    <input
      type="text"
      class="py-3 px-5 w-full text-2xl rounded-full focus:outline-none"
      placeholder="Search by city..."
      v-model="city"
    />
    <button class="bg-sky-500 px-10 text-white" @click="handleClick">Search</button>
  </div>
</template>

<script setup>
const city = ref("")

const handleClick = () => {
  if (!city.value) {
    return
  }
  navigateTo(`/city/${city.value}/car`)
}
</script>

<style lang="scss" scoped></style>
