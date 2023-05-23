<template>
  <div>
    Recipe {{ routeParams.id }} Page!
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const { params: routeParams } = useRoute();
</script>