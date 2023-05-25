<template>
  <div class="grid">
    <v-text-field
      v-model="filters.search"
      v-single-letter
      color="primary"
      label="Search by first letter"
      :density="xs ? 'compact' : 'comfortable'"
      hide-details="auto"
      variant="outlined"
      clearable
    />
    <autocomplete-recipe-categories v-model="filters.category" />
    <autocomplete-recipe-ingredients v-model="filters.ingredient" />
  </div>
</template>

<script setup>
import AutocompleteRecipeCategories from '@/components/recipe/autocomplete/AutocompleteRecipeCategories.vue';
import AutocompleteRecipeIngredients from '@/components/recipe/autocomplete/AutocompleteRecipeIngredients.vue';
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

const { xs } = useDisplay();

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  }
});

const filters = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
});
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-gap: 0 16px;
  grid-template-columns: repeat(3, 1fr);

  @include sm-and-down {
    grid-gap: 8px 0;
    grid-template-columns: 1fr;
  }
}
</style>