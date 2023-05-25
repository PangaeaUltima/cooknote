<template>
  <v-autocomplete
    v-model="value"
    :items="items"
    :density="xs ? 'compact' : 'comfortable'"
    :label="label"
    color="primary"
    hide-details="auto"
    variant="outlined"
    :item-title="itemTitle"
    :item-value="itemValue"
    clearable
  />
</template>

<script setup>
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

const { xs } = useDisplay();

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  items: {
    type: Array,
    default: () => [],
  },
  itemTitle: {
    type: String,
    default: null,
  },
  itemValue: {
    type: String,
    default: null,
  },
  modelValue: {
    type: [String, Array],
    default: null,
  }
});

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
});
</script>