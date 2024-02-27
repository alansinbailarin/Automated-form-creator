export const useSurveyStore = defineStore("survey", () => {
  const surveys = ref(null);
  const loading = ref(true);

  async function getSurveys(perPage, page) {
    try {
      loading.value = true;

      const { data, error } = await useApiFetch(
        `/api/my-surveys?per_page=${perPage}&page=${page}`
      );

      if (error.value) {
        // Accede al valor de error
        console.error("Error fetching surveys:", error.value);
        return;
      }

      surveys.value = data.value;
      console.log(surveys);
    } catch (error) {
      console.error("Error fetching surveys:", error);
    } finally {
      loading.value = false;
    }
  }

  return { surveys, loading, getSurveys };
});
