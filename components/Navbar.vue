<template>
  <header class="">
    <div class="flex items-center justify-between">
      <div>logo</div>
      <div>
        <ul class="flex items-center gap-4">
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/auth/register">Register</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/auth/login">Login</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/auth-only">Auth Only</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/guest-only">Guest Only</NuxtLink>
          </li>
        </ul>
      </div>
      <div v-if="user">
        <div>{{ user.name + " " + user.surname }}</div>
        <div><button @click="handleLogout">Logout</button></div>
      </div>
      <div v-else>login</div>
    </div>
  </header>
</template>
<script setup>
const props = defineProps({
  auth: {
    type: Object,
    required: true,
  },
});

async function handleLogout() {
  console.log("cerrando sesion");
  await props.auth.logout();
}

const user = computed(() => props.auth.user);
</script>
