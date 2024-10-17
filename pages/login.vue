<script setup>
definePageMeta({ layout: "custom" })

const supabase = useSupabaseClient()

const user = useSupabaseUser()

const signInWithOAuth = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000",
    },
  })
  if (error) console.log(error)
}
</script>

<template>
  <div class="mt-10">
    <h1 class="text-5xl font-bold mb-7">Log in</h1>
    <button @click="signInWithOAuth" class="bg-red-400 p-3 rounded font-bold">
      Login with Google
    </button>
  </div>
</template>
