<template>
  <div class="shadow border w-64 mr-10 z-30 h-[190px]">
    <!-- LOCATION ------------------------------------------------------>
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Location</h3>
      <h3 @click="updateModal('location')" class="text-blue-400 capitalize">
        {{ route.params.city }}
      </h3>

      <div v-if="showModal.location" class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white">
        <input type="text" class="border p-1 rounded" v-model="city" />
        <button @click="onChangeLocation" class="bg-blue-400 w-full mt-2 rounded text-white p-1">
          Apply
        </button>
      </div>
    </div>

    <!-- MAKE ------------------------------------------------------>
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Make</h3>
      <h3 @click="updateModal('make')" class="text-blue-400 capitalize">
        {{ route.params.make || "All" }}
      </h3>
      <div
        v-if="showModal.make"
        class="absolute border shadow left-56 p-5 top-1 -m1 w-[600px] flex justify-between flex-wrap bg-white"
      >
        <h4
          class="w-1/3"
          :class="make === route.params.make ? 'font-bold underline' : ''"
          v-for="make in makes"
          :key="make"
          @click="onChangeMake(make)"
        >
          {{ make }}
        </h4>
      </div>
    </div>

    <!-- PRICE ------------------------------------------------------>
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Price</h3>
      <h3 @click="updateModal('price')" class="text-blue-400 capitalize">{{ priceRangeText }}</h3>

      <div class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white" v-if="showModal.price">
        <input
          type="number"
          placeholder="Min"
          v-model="priceRange.min"
          class="border p-1 rounded mb-1"
        />
        <input
          type="number"
          placeholder="Max"
          v-model="priceRange.max"
          class="border p-1 rounded"
        />
        <button class="bg-blue-400 w-full mt-2 rounded text-white p-1" @click="onChangePrice()">
          Apply
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const showModal = ref({
  location: false,
  price: false,
  make: false,
})

const { makes } = useCars()

const route = useRoute()
const router = useRouter()
const city = ref("")
const make = ref("")
const priceRange = ref({ min: "", max: "" })

const priceRangeText = computed(() => {
  const minPrice = route.query.minPrice
  const maxPrice = route.query.maxPrice

  if (!minPrice && !maxPrice) return "Any"

  if (!minPrice && maxPrice) {
    return `<$${maxPrice}`
  }
  if (minPrice && !maxPrice) {
    return `>$${minPrice}`
  }
  if (minPrice && maxPrice) {
    return `$${minPrice}-$${maxPrice}`
  }
})

function updateModal(key) {
  showModal.value[key] = !showModal.value[key]
}

function onChangeLocation() {
  if (!city.value) {
    return
  }
  updateModal("location")
  navigateTo(`/city/${city.value}/car/${route.params.make}`)
  city.value = ""
}

function onChangeMake(make) {
  updateModal("make")
  navigateTo(`/city/${route.params.city}/car/${make}`)
}

function onChangePrice() {
  const minPrice = priceRange.value.min
  const maxPrice = priceRange.value.max
  let query = {}

  if (!minPrice && !maxPrice) {
    query = {}
  }
  if (minPrice && !maxPrice) {
    query.minPrice = minPrice
  }
  if (!minPrice && maxPrice) {
    query.maxPrice = maxPrice
  }
  if (minPrice && maxPrice && maxPrice > minPrice) {
    query.minPrice = minPrice
    query.maxPrice = maxPrice
  }

  updateModal("price")
  // navigateTo(`/city/${route.params.city}/car/${route.params.make}?minPrice=${query.minPrice}`)
  // better and easy to read:
  router.push({ query })
}
</script>
