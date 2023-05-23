<template>
  <div class="d-flex align-center">
    <v-btn
      class="mr-3"
      color="transparent"
      flat
      icon
      size="x-small"
      @click="router.push({ path: '/' })"
    >
      <v-icon color="primary">
        mdi-arrow-left
      </v-icon>
    </v-btn>
    <h1 class="text-md-h1-d text-h1">
      {{ title }}
    </h1>
  </div>
</template>

<script setup>
import router from '@/router';

defineProps({
  title: {
    type: String,
    default: 'Title'
  }
})
</script>