import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = +event.context.params.id

  const car = await prisma.car.findUnique({ where: { id } })

  if (!car) {
    throw createError({ statusCode: 404, statusMessage: "Car not found with id " + id })
  }

  return car
})
