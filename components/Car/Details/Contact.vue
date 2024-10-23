<template>
  <div class="mt-10">
    <div class="flex w-[600px] justify-between">
      <input v-model="inputs.name" type="text" class="border p-1" placeholder="Name" />
      <input v-model="inputs.email" type="text" class="border p-1" placeholder="Email" />
      <input v-model="inputs.phone" type="text" class="border p-1" placeholder="Phone" />
    </div>
    <div class="flex mt-4 w-[600px]">
      <textarea v-model="inputs.message" class="border p-1 w-full" placeholder="Message"></textarea>
    </div>

    <div v-if="errorMessage" class="text-red-600 bg-gray-200 p-2 mt-2 w-full">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="text-green-600 bg-gray-200 p-2 mt-2 w-full">
      {{ successMessage }}
    </div>

    <button @click="handleSubmit" class="bg-blue-400 text-white px-10 py-3 rounded mt-4">
      Submit
    </button>
  </div>
</template>

<script setup>
const id = useRoute().params.carId

const inputs = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
})

const errorMessage = ref("")
const successMessage = ref("")

const handleSubmit = async () => {
  if (!inputs.email || !inputs.name || !inputs.phone || !inputs.message) {
    return
  }

  try {
    await $fetch(`/api/car/listings/${id}/message`, {
      method: "POST",
      body: inputs,
    })

    inputs.email = ""
    inputs.name = ""
    inputs.phone = ""
    inputs.message = ""
    errorMessage.value = ""
    successMessage.value = "Message sent!"
  } catch (err) {
    console.log(err)
    errorMessage.value = err.statusMessage
    successMessage.value = ""
  }
}
</script>
