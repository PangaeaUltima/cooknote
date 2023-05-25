<template>
  <app-autocomplete
    v-model="category"
    :items="categories"
    label="Search by category"
    item-title="strCategory"
    item-value="strCategory"
  />
</template>

<script setup>
import AppAutocomplete from '@/components/app/autocomplete/AppAutocomplete.vue';
import { computed, inject, onMounted, ref } from 'vue';
import { handleError } from "@/plugins/errorHandler";

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  }
})

const api = inject('api');

let categories = ref([]);

onMounted(() => {
  loadCategories();
});

const category = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const loadCategories = async () => {
  try {
    const { data } = await api.listCategories()
    
    if (data.meals) {
      categories.value = data.meals
    }
  } catch (e) {
    handleError(e)
  }
};
</script>