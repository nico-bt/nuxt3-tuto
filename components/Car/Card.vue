<template>
  <div class="relative shadow border w-full overflow-hidden mb-5 cursor-pointer h-[200px]">
    <img
      class="absolute w-7 right-5 top-2 z-20"
      :src="liked ? heartFilled : heartOutlined"
      alt="heart to like"
      @click.prevent="handleLike"
    />
    <div class="flex h-full w-full" @click="navigateTo(`/car/${car.id}`)">
      <NuxtImg :src="car.image" alt="" class="w-[300px] h-full object-cover" />
      <div class="p-4 flex flex-col">
        <div>
          <h1 class="text-2xl text-blue-700">{{ car.name }}</h1>
          <p class="text-gray-700">{{ car.description }}</p>
        </div>
        <h1 class="mt-auto text-xl">$ {{ car.price }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import heartFilled from "@/assets/heartFilled.png"
import heartOutlined from "@/assets/heartOutline.png"

const props = defineProps({ car: Object })

// const liked = ref(false)
const liked = useState("favored" + props.car.id, () => false)

const handleLike = () => {
  liked.value = !liked.value
}
</script>
