<template>
  <div>Auth only</div>
</template>

<script setup></script>
<script>
definePageMeta({
  middleware: ["auth"],
});
</script>
