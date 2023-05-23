<template>
  <app-loading v-if="loading" />
  <div
    v-else
    class="wrapper flex-grow-1"
  >
    <recipe-view-title
      class="mb-md-8 mb-4"
      :title="meal.strMeal"
    />
    <recipe-view-item :recipe="meal" />
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppLoading from '@/components/app/AppLoading.vue';
import RecipeViewTitle from '@/components/recipe/view/RecipeViewTitle.vue';
import RecipeViewItem from '@/components/recipe/view/RecipeViewItem.vue';

const api = inject('api');
const { params: routeParams } = useRoute();

let meal = ref({})
let loading = ref(true)

onMounted(() => {
  loadMealInfo();
});

const loadMealInfo = async () => {
  try {
    const { data } = await api.viewMeal(routeParams.id)
    
    if (Array.isArray(data.meals) && data.meals.length) {
      meal.value = data.meals[0]
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
};
</script>