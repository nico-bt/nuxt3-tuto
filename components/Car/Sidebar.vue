<template>
  <div class="shadow border w-64 mr-10 z-30 h-[190px]">
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

    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Make</h3>
      <h3 class="text-blue-400 capitalize">Toyota</h3>
    </div>

    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Price</h3>
      <h3 class="text-blue-400 capitalize"></h3>
    </div>
  </div>
</template>

<script setup>
const showModal = ref({
  location: false,
  price: false,
  make: false,
})

const route = useRoute()
const city = ref("")
const make = ref(route.params.make)

function updateModal(key) {
  showModal.value[key] = !showModal.value[key]
}

function onChangeLocation() {
  if (!city.value) {
    return
  }
  updateModal("location")
  navigateTo(`/city/${city.value}/car/${make.value}`)
  city.value = ""
}
</script>
