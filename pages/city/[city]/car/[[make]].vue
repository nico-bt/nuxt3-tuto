<template>
  <CarCardsList :cars="data" />
</template>

<script setup>
const router = useRouter()
const route = useRoute()
const city = useRoute().params.city
let query = useRoute().query

const { data, error, refresh, clear } = await useFetch(`/api/cars/${city}`, {
  query: {
    ...query,
    make: useRoute().params.make,
  },
})

if (error.value) {
  throw createError({
    statusMessage: "Unable to fetch cars",
    ...error.value,
  })
}

// Por el momento no encuentro otra solucion para que
// al cambiar query params en sidebar haga refetch
// si lo hace con params.city pero no con query.minPrice
//
watch(
  () => route.query,
  () => window.location.reload()
)
</script>

<style lang="scss" scoped></style>
