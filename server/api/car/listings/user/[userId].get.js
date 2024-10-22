import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const userId = event.context.params.userId

  const listings = await prisma.car.findMany({
    where: { listerId: userId },
    select: {
      image: true,
      price: true,
      id: true,
      name: true,
    },
  })

  return listings
})
