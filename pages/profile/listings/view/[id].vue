<script setup>
definePageMeta({
  layout: "custom",
})

const id = useRoute().params.id
const { data: messages } = useFetch(`/api/car/listings/${id}/message`)
</script>

<template>
  <div class="rounded shadow mt-20">
    <CarMessageCard v-for="item in messages" :message="item" :key="item.id" />
  </div>
</template>
