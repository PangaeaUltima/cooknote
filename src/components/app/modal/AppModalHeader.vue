<template>
  <div class="d-flex align-center">
    <h1 class="text-md-h1-d text-h1">
      {{ title }}
    </h1>
    <v-btn
      color="transparent"
      class="ml-auto"
      flat
      icon
      :size="mobile ? 'x-small' : 'small'"
      @click="$emit('modal-hide')"
    >
      <v-icon>
        mdi-close
      </v-icon>
    </v-btn>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify';

defineEmits(['modal-hide']);
defineProps({
  title: {
    type: String,
    default: 'Modal title'
  }
});

const { mobile } = useDisplay();
</script>