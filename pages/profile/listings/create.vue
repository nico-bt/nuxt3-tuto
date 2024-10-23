<script setup>
definePageMeta({
  layout: "custom",
})
const config = useRuntimeConfig()
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const { makes } = useCars()

const info = useState("adInfo", () => {
  return {
    make: "",
    model: "",
    year: "",
    miles: "",
    price: "",
    city: "",
    seats: "",
    features: "",
    description: "",
    image: null,
  }
})

const errorMessage = ref("")
const loading = ref(false)

const onChangeInput = (data, name) => {
  info.value[name] = data
}

const inputs = [
  {
    id: 1,
    title: "Model *",
    name: "model",
    placeholder: "Civic",
  },
  {
    id: 2,
    title: "Year *",
    name: "year",
    placeholder: "2019",
  },
  {
    id: 3,
    title: "Price *",
    name: "price",
    placeholder: "20040",
  },
  {
    id: 4,
    title: "Miles *",
    name: "miles",
    placeholder: "10000",
  },
  {
    id: 5,
    title: "City *",
    name: "city",
    placeholder: "Austin",
  },
  {
    id: 6,
    title: "Number of Seats *",
    name: "seats",
    placeholder: "5",
  },
  {
    id: 7,
    title: "Features *",
    name: "features",
    placeholder: "Leather Interior, No Accidents",
  },
]

const isButtonDisabled = computed(() => {
  for (let key in info.value) {
    if (!info.value[key]) {
      return true
    }
  }
  if (loading.value) {
    return true
  }
  return false
})

const handleSubmit = async () => {
  loading.value = true

  const fileImageName = crypto.randomUUID()

  const { data, error } = await supabase.storage
    .from("images")
    .upload("public/" + fileImageName, info.value.image)

  if (error) {
    loading.value = false
    return (errorMessage.value = "Cannot upload image")
  }

  const body = {
    ...info.value,
    features: info.value.features.split(", "),
    city: info.value.city.toLowerCase(),
    numberOfSeats: +info.value.seats,
    miles: +info.value.miles,
    price: +info.value.price,
    year: +info.value.year,
    name: info.value.make + "-" + info.value.model,
    listerId: user.value.id,
    image: config.public.supabase.url + "/storage/v1/object/public/images/" + data.path,
  }

  delete body.seats

  try {
    const response = await $fetch("/api/car/listings", {
      method: "POST",
      body,
    })
    navigateTo("/profile/listings")
  } catch (error) {
    errorMessage.value = error.statusMessage
    await supabase.storage.from("images").remove(data.path)
  } finally {
    loading.value = false
    info.value.image = null
  }
}
</script>

<template>
  <div>
    <div class="mt-24">
      <h1 class="text-6xl">Create a New Listing</h1>
    </div>
    <div class="shadow rounded p-3 mt-5 flex flex-wrap justify-between">
      <CarAdSelect title="Make *" :options="makes" name="make" @change-input="onChangeInput" />
      <CarAdInput
        v-for="input in inputs"
        :key="input.id"
        :title="input.title"
        :name="input.name"
        :placeholder="input.placeholder"
        @change-input="onChangeInput"
      />
      <CarAdTextarea
        title="Description *"
        name="description"
        placeholder=""
        @change-input="onChangeInput"
      />
      <CarAdImage @change-input="onChangeInput" />

      <div>
        <button
          :disabled="isButtonDisabled"
          :class="isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : ''"
          class="bg-blue-400 text-white rounded py-2 px-7 mt-4"
          @click="handleSubmit"
        >
          {{ loading ? "Loading..." : "Submit" }}
        </button>
        <p v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>
