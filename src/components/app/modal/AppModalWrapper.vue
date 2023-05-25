<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <div
      v-if="showModal"
      class="modal-overlay d-flex align-center justify-center"
    >
      <div
        v-click-outside="hideModal"
        class="modal-content pa-md-6 pa-3 bg-white"
        :style="{ maxWidth: `${maxWidth}px` }"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup>
const emit = defineEmits(['modal-hide'])
const props = defineProps({
  maxWidth: {
    type: String,
    default: '800'
  },
  showModal: {
    type: Boolean,
    default: false,
  }
});

const hideModal = () => {
  if (props.showModal) emit('modal-hide');
};
</script>

<style scoped>
.modal-overlay {
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.modal-content {
  width: calc(100% - 32px);
}
</style>