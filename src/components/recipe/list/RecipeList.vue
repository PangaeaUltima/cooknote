<template>
  <div :class="[tableView ? 'd-flex flex-column' : 'grid']">
    <recipe-list-item
      v-for="(item, index) in recipes"
      :key="item.idMeal"
      :class="{ 'mb-md-6 mb-3' : tableView && index !== recipes.length - 1 }"
      :recipe="item"
      :table-view="tableView"
      @show-modal-recipe="showModalRecipe"
    />
    <teleport to="body">
      <modal-recipe
        :recipe="modalRecipeItem"
        :show-modal="isModalRecipeVisible"
        @modal-hide="hideRecipeModal"
      />
    </teleport>
  </div>
</template>

<script setup>
import ModalRecipe from '@/components/modal/ModalRecipe.vue';
import RecipeListItem from '@/components/recipe/list/RecipeListItem.vue';
import { ref } from 'vue';

defineProps({
  recipes: {
    type: Array,
    default: () => []
  },
  tableView: {
    type: Boolean,
    default: false,
  }
});

let modalRecipeItem = ref(null);
let isModalRecipeVisible = ref(false);

const hideRecipeModal = () => {
  modalRecipeItem.value = null
  isModalRecipeVisible.value = false
};

const showModalRecipe = (e) => {
  modalRecipeItem.value = e
  isModalRecipeVisible.value = true
};

</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;

  @include sm-and-down {
    grid-template-columns: repeat(2, 1fr);
  }

  @include xs-only {
    grid-template-columns: 1fr;
  }
}
</style>