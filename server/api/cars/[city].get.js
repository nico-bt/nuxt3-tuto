import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler((event) => {
  const city = event.context.params.city
  const { minPrice, maxPrice, make } = getQuery(event)

  const filter = {
    city: city.toLowerCase(),
  }

  if (make) {
    filter.make = make
  }

  if (minPrice || maxPrice) {
    filter.price = {}

    if (minPrice) {
      filter.price.gte = +minPrice
    }
    if (maxPrice) {
      filter.price.lte = +maxPrice
    }
  }

  return prisma.car.findMany({ where: filter })
})
