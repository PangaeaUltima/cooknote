<template>
  <div class="features-list d-flex align-center">
    <div
      v-for="item in props.features"
      :key="item"
      class="feature text-md-caption-d text-caption pa-1"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  features: {
    type: Array,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.features-list {
  gap: 8px;

  .feature {
    border-radius: $border-radius-base;
    background: rgba(255, 255, 255, 0.9);
  }
}
</style>