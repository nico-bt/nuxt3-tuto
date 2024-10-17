<template>
  <header
    class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md"
  >
    <NuxtLink to="/" class="text-3xl">Cartrader</NuxtLink>
    <div v-if="user" class="flex">
      <NuxtLink to="/profile/listings" class="mr-5">Profile</NuxtLink>
      <p class="cursor-pointer" @click="signOut">Logout</p>
    </div>
    <NuxtLink v-if="!user" to="/login">Login</NuxtLink>
  </header>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.log(error)
  navigateTo("/")
}
</script>

<style lang="css" scoped></style>
