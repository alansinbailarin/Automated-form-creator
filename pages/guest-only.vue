<template>
  <div>Guest Only</div>
</template>

<script setup></script>

<script>
definePageMeta({
  middleware: ["guest"],
});
</script>
