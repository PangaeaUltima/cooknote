<template>
  <app-loading v-if="loading" />
  <div
    v-else
    class="wrapper flex-grow-1"
  >
    <recipe-list-title-wrapper
      v-model:table-view="tableView"
      class="mb-md-8 mb-4"
    />
    <recipe-list-filters
      v-model="filters"
      class="mb-md-6 mb-3"
    />
    <recipe-list
      :recipes="recipes"
      :table-view="xs ? false : tableView"
    />
  </div>
</template>

<script setup>
import AppLoading from '@/components/app/AppLoading.vue';
import RecipeListFilters from '@/components/recipe/list/RecipeListFilters.vue';
import RecipeListTitleWrapper from '@/components/recipe/list/RecipeListTitleWrapper.vue';
import RecipeList from '@/components/recipe/list/RecipeList.vue';
import { inject, onMounted, reactive, ref, watch } from 'vue';
import { useDisplay } from 'vuetify';
import debounce from 'lodash.debounce'
import { handleError } from "@/plugins/errorHandler";

const { xs } = useDisplay();
const api = inject('api');

const filters = reactive({
  category: null,
  ingredient: null,
  search: null,
});
const loading = ref(true);
let recipes = ref([]);
let tableView = ref(false);

onMounted(() => {
  loadRecipes('b');
});

watch(() => filters.search, (value) => {
  loadRecipes(value);
});

watch(() => filters.category, (value) => {
  loadRecipes(null, value)
});

watch(() => filters.ingredient, (value) => {
  loadRecipes(null, null, value)
});

const loadRecipes = debounce(async (title, category, ingredient) => {
  try {
    let temp
    if (title) {
      temp = await api.searchMeal({ f: title })
    } else if (category) {
      temp = await api.filterByCategory(category)
    } else if (ingredient) {
      temp = await api.filterByMainIngredient(ingredient)
    }

    if (temp && temp.data.meals) { recipes.value = [ ...temp.data.meals ] }
  } catch (e) {
    handleError(e)
  } finally {
    loading.value = false
  }
}, 500);
</script>
