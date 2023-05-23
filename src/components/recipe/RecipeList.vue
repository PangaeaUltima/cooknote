<template>
  <div :class="[tableView ? 'd-flex flex-column' : 'grid']">
    <recipe-item
      v-for="(item, index) in props.recipes"
      :key="item.idMeal"
      :class="{ 'mb-md-6 mb-3' : tableView && index !== props.recipes.length - 1 }"
      :recipe="item"
      :table-view="tableView"
    />
  </div>
</template>

<script setup>
import RecipeItem from './RecipeItem.vue';

const props = defineProps({
  recipes: {
    type: Array,
    default: () => []
  },
  tableView: {
    type: Boolean,
    default: false,
  }
});
</script>

<style lang="scss">
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