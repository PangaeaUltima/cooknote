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
    <recipe-list
      :recipes="recipes"
      :table-view="xs ? false : tableView"
    />
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify';
import AppLoading from '@/components/app/AppLoading.vue';
import RecipeListTitleWrapper from '@/components/recipe/list/RecipeListTitleWrapper.vue';
import RecipeList from '@/components/recipe/list/RecipeList.vue';

const api = inject('api');
const loading = ref(true);
let recipes = ref([]);
let tableView = ref(false);
const { xs } = useDisplay();

onMounted(() => {
  loadRecipes();
});

const loadRecipes = async () => {
  try {
    const { data } = await api.searchMeal()
    recipes.value = [ ...data.meals ]
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
};
</script>
