<template>
  <form @submit.prevent="handleRegister()">
    <label for="name"
      >Name
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Your name here"
        v-model="form.name"
      />
    </label>
    <label for="surname"
      >Surname
      <input
        type="text"
        name="surname"
        id="surname"
        placeholder="Your surname here"
        v-model="form.surname"
      />
    </label>
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
    <label for="password_confirmation">
      Confirm Password
      <input
        type="password"
        name="password_confirmation"
        id="password_confirmation"
        placeholder="********"
        v-model="form.password_confirmation"
      />
    </label>

    <button>Register</button>
  </form>
</template>

<script setup>
const form = ref({
  name: "",
  surname: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const auth = useAuthStore();

async function handleRegister() {
  const { error } = await auth.register(form.value);

  if (!error.value) {
    navigateTo("/");
  }
}
</script>

<script>
definePageMeta({
  middleware: ["guest"],
});
</script>
