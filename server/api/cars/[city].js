import cars from "@/data/cars.json"

export default defineEventHandler((event) => {
  const city = event.context.params.city
  let filteredCars = cars.filter((item) => item.city.toLowerCase().includes(city.toLowerCase()))

  const { minPrice, maxPrice, make } = getQuery(event)
  //   filter in future from db

  if (minPrice) {
    filteredCars = filteredCars.filter((item) => +item.price > +minPrice)
  }

  return filteredCars
})
