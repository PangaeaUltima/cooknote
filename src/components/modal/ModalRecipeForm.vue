<template>
  <app-modal-wrapper
    max-width="500"
    :show-modal="showModal"
    @modal-hide="$emit('modal-hide')"
  >
    <app-modal-header
      class="mb-md-3 mb-2"
      title="Recipe creation form"
      @modal-hide="$emit('modal-hide')"
    />
    <recipe-form
      class="overflow-y-auto pr-3 mr-n3"
      :style="{ maxHeight: `${modalContentMaxHeight}px` }"
      @modal-hide="$emit('modal-hide')"
    />
  </app-modal-wrapper>
</template>

<script setup>
import AppModalWrapper from '@/components/app/modal/AppModalWrapper.vue';
import AppModalHeader from '@/components/app/modal/AppModalHeader.vue';
import RecipeForm from '@/components/recipe/form/RecipeForm.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineEmits(['modal-hide']);
defineProps({
  showModal: {
    type: Boolean,
    default: false,
  }
});

let modalContentMaxHeight = ref(700);

onBeforeUnmount(() => {
  window.removeEventListener('resize', calcFormHeight);
});

onMounted(() => {
  calcFormHeight();
  window.addEventListener('resize', calcFormHeight);
});

const calcFormHeight = () => {
  modalContentMaxHeight.value = window.innerHeight * 0.75;
};
</script>

<style lang="scss" scoped></style>