<template>
  <app-autocomplete
    v-model="ingredient"
    :items="ingredients"
    label="Search by ingredient"
    item-title="strIngredient"
    item-value="strIngredient"
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

let ingredients = ref([]);

onMounted(() => {
  loadIngredients();
});

const ingredient = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const loadIngredients = async () => {
  try {
    const { data } = await api.listIngredients()
    
    if (data.meals) {
      ingredients.value = data.meals
    }
  } catch (e) {
    handleError(e)
  }
};
</script>