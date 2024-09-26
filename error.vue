<template>
  <div class="flex h-screen justify-center items-center flex-col">
    <h1 class="text-9xl">{{ error.statusCode }}</h1>
    <p class="mt-7 text-4xl">{{ error.message }}</p>
    <button @click="handleClick" class="mt-7 rounded bg-blue-600 px-7 py-3 text-xl text-white">
      Go back
    </button>
  </div>
</template>

<script setup>
const error = useError()

function handleClick() {
  navigateTo("/")
}
</script>

<style lang="scss" scoped></style>
