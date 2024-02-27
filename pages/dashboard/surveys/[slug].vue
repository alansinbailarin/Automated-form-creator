<template>
  <section class="mt-8">
    <div>
      <h1 class="text-3xl font-bold">{{ survey?.title }}</h1>
      <p class="text-gray-500 text-lg">{{ survey?.description }}</p>
    </div>
    <div class="mt-4 flex justify-center items-center">
      <div class="grid grid-cols-1 gap-4 w-full">
        <div
          v-for="page in survey?.pages"
          :key="page.order"
          class="bg-gray-50 border border-gray-200 py-3 px-6 rounded-lg w-full hover:cursor-move"
          :draggable="true"
          @dragstart="handleDragStart(page.order)"
          @dragover="handleDragOver"
          @drop="handleDrop(page.order)"
          @dragend="handleDragEnd()"
          :class="{
            'border-dashed border-2 bg-gray-200 border-gray-300 transition-all ease-in-out duration-300':
              page.order === draggedPage,
          }"
        >
          <span class="text-gray-500 flex justify-center"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              color="#000000"
              fill="none"
            >
              <path
                d="M18.001 8V8.00635M12.001 8V8.00635M6.00098 8L6.00098 8.00635M18.001 15.9937V16M12.001 15.9937V16M6.00098 15.9937L6.00098 16"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <h1 class="text-lg font-bold text-gray-800">{{ page?.title }}</h1>
          <p class="text-gray-500 text-sm mt-1">{{ page?.description }}</p>

          <hr class="my-2" />
          <div class="" v-for="element in page.elements" :key="element.order">
            <div>
              <h1 class="font-medium text-gray-800">{{ element.title }}</h1>
            </div>
            <div
              class="mt-2"
              v-for="choice in element?.choices"
              :key="choice.order"
            >
              <p>{{ choice.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const survey = ref(null);
const route = useRoute();
const slug = ref(route.params.slug);

const loading = ref(true);
const draggedPage = ref(null);

async function getSurvey(slug) {
  try {
    loading.value = true;
    const { data, error } = await useApiFetch(`/api/get-survey/${slug}`);

    if (error) {
      console.error(error);
    }

    survey.value = data.value.data;

    const storedPages = localStorage.getItem("surveyPages");

    if (storedPages) {
      survey.value.pages = JSON.parse(storedPages);
    }

    console.log(survey.value);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

const handleDragStart = (order) => {
  draggedPage.value = order;
  console.log(draggedPage.value);
};

const handleDragOver = () => {
  console.log("dragging");
  event.preventDefault();
};

const handleDrop = (order) => {
  const draggedPageIndex = survey.value.pages.findIndex(
    (page) => page.order === draggedPage.value
  );
  const targetPageIndex = survey.value.pages.findIndex(
    (page) => page.order === order
  );

  // Intercambiar las posiciones de las páginas
  [survey.value.pages[draggedPageIndex], survey.value.pages[targetPageIndex]] =
    [survey.value.pages[targetPageIndex], survey.value.pages[draggedPageIndex]];

  // Actualizar el atributo order para cada página
  survey.value.pages.forEach((page, index) => {
    page.order = index + 1;
  });

  draggedPage.value = null;

  localStorage.setItem("surveyPages", JSON.stringify(survey.value.pages));

  console.log(survey.value.pages);
};

const handleDragEnd = () => {
  console.log("drag end");
  draggedPage.value = null;
};

getSurvey(slug.value);
</script>
<script>
definePageMeta({
  middleware: ["auth"],
});
</script>
