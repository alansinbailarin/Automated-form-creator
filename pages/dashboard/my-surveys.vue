<template>
  <h1>My Surveys</h1>
  <div v-if="loading">loading</div>
  <div v-else>
    <div v-for="survey in surveys" :key="survey.id">
      <NuxtLink :to="`/dashboard/surveys/${survey.slug}`"
        >Survey {{ survey.id }}</NuxtLink
      >
      {{ survey.id }}
    </div>
  </div>
</template>

<script setup>
const surveys = ref(null);
const loading = ref(true);

async function mySurveys(perPage, page) {
  try {
    loading.value = true;
    const { data, error } = await useApiFetch(
      `/api/my-surveys?perPage=${perPage}&page=${page}`
    );

    if (error) {
      console.error(error);
    }

    surveys.value = data.value.data;

    console.log(surveys.value);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

mySurveys(10, 3);
</script>
<script>
definePageMeta({
  middleware: ["auth"],
});
</script>
