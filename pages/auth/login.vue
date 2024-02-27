<template>
  <form @submit.prevent="handleLogin()">
    <label for="email"
      >Email

      <input
        type="email"
        name="email"
        id="email"
        placeholder="Your email here"
        v-model="form.email"
      />
    </label>
    <label for="password">
      Password
      <input
        type="password"
        name="password"
        id="password"
        placeholder="********"
        v-model="form.password"
      />
    </label>

    <button>Login</button>
  </form>
</template>

<script setup>
const form = ref({
  email: "",
  password: "",
});

const auth = useAuthStore();

async function handleLogin() {
  if (auth.isLoggedIn) {
    return navigateTo("/");
  }

  const { error } = await auth.login(form.value);

  if (!error.value) {
    navigateTo("/");
  }

  console.log(error);
}
</script>
<script>
definePageMeta({
  middleware: ["guest"],
});
</script>
