import cars from "@/data/cars.json"

export default defineEventHandler((event) => {
  const id = event.context.params.id
  const car = cars.find((item) => item.id == id)

  if (!car) {
    throw createError({ statusCode: 404, statusMessage: "Car not found with id " + id })
  }

  return car
})
