import { PrismaClient } from "@prisma/client"
import Joi from "joi"

const prisma = new PrismaClient()

const schema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number()
    .min(1886)
    .max(new Date().getFullYear() + 1),
  miles: Joi.number().required().min(0),
  city: Joi.string().required(),
  numberOfSeats: Joi.number().required().min(0).max(100),
  features: Joi.array().items(Joi.string()).required(),
  image: Joi.string().required(),
  price: Joi.number().min(0).required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  listerId: Joi.string().required(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { value, error } = await schema.validate(body)

  if (error) {
    throw createError({ statusCode: 412, statusMessage: error.message })
  }

  const {
    image,
    name,
    numberOfSeats,
    features,
    description,
    miles,
    price,
    listerId,
    city,
    make,
    model,
  } = body

  const car = await prisma.car.create({
    data: {
      image,
      name,
      numberOfSeats,
      features,
      description,
      miles,
      price,
      listerId,
      city: city.toLowerCase(),
      make,
      model,
    },
  })

  return car
})
