<template>
  <div
    class="recipe-item relative d-flex"
    :class="[{ 'd-flex align-center table-view' : tableView }, { 'flex-column' : !tableView }]"
  >
    <div
      class="img-container"
      :class="{ 'pa-3' : tableView }"
    >
      <div class="wrapper-img">
        <recipe-features-list
          v-if="recipeFeatures.length"
          class="features-list"
          :features="recipeFeatures"
        />
        <img
          :src="recipe.strMealThumb"
          :alt="`${recipe.strMeal} Image`"
        >
      </div>
    </div>
    <div class="d-flex flex-column flex-grow-1 pa-md-4 pa-2">
      <p class="text-md-primary-medium-d text-primary-medium mb-md-3 mb-2">
        {{ recipe.strMeal }}
      </p>
      <div
        v-if="mealIngredientsListProcessed.length"
        class="wrapper-chips d-flex flex-wrap align-center mb-md-3 mb-2"
      >
        <v-chip
          v-for="item in mealIngredientsListProcessed"
          :key="item"
          color="dark-blue"
          class="px-2 py-1 text-md-caption-d text-caption"
          label
          :size="mobile ? 'x-small' : 'small'"
        >
          {{ item }}
        </v-chip>
        <v-btn
          v-if="mealIngredientsList.length > 5"
          class="text-md-caption-d text-caption text-none"
          :height="mobile ? 18 : 26"
          min-width="98"
          variant="text"
          @click.stop="showAllIngredients = !showAllIngredients"
        >
          {{ showAllIngredients ? 'Hide' : 'Show more...' }}
        </v-btn>
      </div>
      <p class="recipe-description text-md-primary-medium-d text-primary-medium mb-md-3 mb-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem similique corporis molestiae blanditiis atque consequuntur dolores mollitia, optio perspiciatis ea amet cumque debitis sunt asperiores commodi laborum magnam reprehenderit qui!
      </p>
      <v-row class="mt-auto flex-grow-0">
        <v-col cols="6">
          <v-btn
            color="extra"
            class="text-md-btn-d text-btn"
            block
            :size="mobile ? 'small' : 'default'"
            @click="$emit('show-modal-recipe', recipe)"
          >
            Quick view
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            color="primary"
            class="text-md-btn-d text-btn"
            block
            :to="`/recipe/${recipe.idMeal}`"
            :size="mobile ? 'small' : 'default'"
          >
            Recipe page
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import RecipeFeaturesList from '@/components/recipe/RecipeFeaturesList.vue';
import { computed, ref } from 'vue';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay()
defineEmits(['show-modal-recipe'])
const props = defineProps({
  recipe: {
    type: Object,
    required: true,
  },
  tableView: {
    type: Boolean,
    default: false,
  }
});

let showAllIngredients = ref(false);

const mealIngredientsList = computed(() => {
  return Object.keys(props.recipe)
    .filter((key) => key.includes('strIngredient') && props.recipe[key])
    .map((key) => props.recipe[key]);
});


const mealIngredientsListProcessed = computed(() => {
  const arr = [ ...mealIngredientsList.value ]
  return showAllIngredients.value ? arr : arr.splice(0, 5);
});

const recipeFeatures = computed(() => {
  const arr = []

  if (props.recipe.strCategory) arr.push(props.recipe.strCategory)
  if (props.recipe.strArea) arr.push(props.recipe.strArea)

  return arr
});
</script>

<style lang="scss" scoped>
.recipe-item {
  transition: box-shadow 0.6s;
  transition: all 0.3s;
  border-radius: $border-radius-base;

  &.table-view {
    .img-container {
      min-width: 400px;
      max-width: 400px;
      width: 100%;
    }

    .recipe-description {
      -webkit-line-clamp: 2;
    }
  }
  
  .img-container {
    .wrapper-img {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 56.25%;
      border-radius: $border-radius-base;
      overflow: hidden;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .features-list {
        z-index: 9;
        position: absolute;
        top: 8px;
        right: 8px;
      }
    }
  }

  .wrapper-chips {
    gap: 8px;

    .button-show-more {
      z-index: 9;
      position: absolute;
      right: 0;
      transform: translateX(70%);
    }
  }

  .recipe-description {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    box-shadow: 1px 3px 20px 5px rgba(0,0,0,0.1);
  }

  @include sm-and-down {
    &.table-view {
      .img-container {
        min-width: 300px;
        max-width: 300px;
      }

      .recipe-description {
        -webkit-line-clamp: 2;
      }
    }
  }
}
</style>