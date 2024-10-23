import { serverSupabaseClient } from "#supabase/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const listingId = event.context.params.listingId

  const deletedCar = await prisma.car.delete({ where: { id: +listingId } })

  await supabase.storage
    .from("images")
    .remove(deletedCar.image.split("/storage/v1/object/public/images/")[1])

  return
})
