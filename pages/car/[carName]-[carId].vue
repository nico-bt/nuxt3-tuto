<template>
  <div
    class="mx-auto mt-4 max-w-7xl space-y-4 px-4 xs:px-8 sm:px-10 lg:px-16 pb-16 w-3/5"
    v-if="car"
  >
    <CarDetailsHero :car="car" />
    <CarDetailsAttributes :car="car" />
    <CarDetailsDescription :car="car" />
    <CarDetailsContact />
  </div>
</template>

<script setup>
const route = useRoute()
const { carName, carId } = route.params

const { cars } = useCars()

const car = cars.find((car) => car.id == carId)
if (!car) {
  throw createError({ statusCode: 404, statusMessage: "Car not found with id " + carId })
}
</script>

<style lang="css" scoped></style>
