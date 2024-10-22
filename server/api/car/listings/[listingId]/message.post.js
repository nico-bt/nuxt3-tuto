import { PrismaClient } from "@prisma/client"
import Joi from "joi"

const prisma = new PrismaClient()

const schema = Joi.object({
  email: Joi.string().email().required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  name: Joi.string().required(),
  message: Joi.string().required(),
})

export default defineEventHandler(async (event) => {
  const listingId = event.context.params.listingId

  const car = await prisma.car.findUnique({
    where: { id: +listingId },
  })

  if (!car) {
    throw createError({
      statusCode: 404,
      statusMessage: "Car listing not found",
    })
  }

  const body = await readBody(event)

  const { value, error } = await schema.validate(body)

  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    })
  }

  const { message, email, phone, name } = body

  return prisma.message.create({
    data: {
      message,
      email,
      phone,
      name,
      listing: {
        connect: { id: car.id }, // Para relacionar el ID de la entidad Car
      },
    },
  })
})
