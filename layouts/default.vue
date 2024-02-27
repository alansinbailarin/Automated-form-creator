<template>
  <div class="p-4 md:p-10" style="font-family: 'Poppins'">
    <!-- <button v-if="auth.isLoggedIn" @click="handleLogout()">Logout</button>
    <pre>{{ auth.user }}</pre> -->
    <Navbar :auth="auth" />
    <slot />
  </div>
</template>

<script setup>
import { initFlowbite } from "flowbite";
const auth = useAuthStore();

console.log(auth);

onMounted(() => {
  initFlowbite();
});
</script>
