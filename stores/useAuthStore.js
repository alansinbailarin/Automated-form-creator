export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);

  async function logout() {
    await useApiFetch("/api/auth/logout", {
      method: "POST",
    });

    user.value = null;

    navigateTo("/");
  }

  async function fetchUser() {
    const { data, error } = await useApiFetch("/api/user");
    user.value = data.value;
  }

  async function login(credentials) {
    await useApiFetch("/sanctum/csrf-cookie");

    const login = await useApiFetch("/api/auth/login", {
      method: "POST",
      body: credentials,
    });

    await fetchUser();

    return login;
  }

  async function register(info) {
    await useApiFetch("/sanctum/csrf-cookie");

    const register = await useApiFetch("/api/auth/register", {
      method: "POST",
      body: info,
    });

    await login({
      email: info.email,
      password: info.password,
    });

    return register;
  }

  return { user, login, isLoggedIn, fetchUser, logout, register };
});
