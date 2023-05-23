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
        <div class="category text-md-caption-d text-caption pa-1">
          {{ props.recipe.strCategory }}
        </div>
        <img
          :src="props.recipe.strMealThumb"
          :alt="`${props.recipe.strMeal} Image`"
        >
      </div>
    </div>
    <div class="d-flex flex-column flex-grow-1 pa-md-4 pa-2">
      <p class="text-md-primary-medium-d text-primary-medium mb-md-3 mb-2">
        {{ props.recipe.strMeal }}
      </p>
      <div class="wrapper-chips d-flex flex-wrap align-center mb-md-3 mb-2">
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
          >
            Quick view
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            color="primary"
            class="text-md-btn-d text-btn"
            block
            :size="mobile ? 'small' : 'default'"
            @click="openRecipePage(props.recipe.idMeal)"
          >
            Recipe page
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useDisplay } from 'vuetify';
import router from '@/router';
let showAllIngredients = ref(false);

const { mobile } = useDisplay()
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

const mealIngredientsList = computed(() => {
  return Object.keys(props.recipe)
    .filter((key) => key.includes('strIngredient') && props.recipe[key])
    .map((key) => props.recipe[key])
})

const mealIngredientsListProcessed = computed(() => {
  const arr = [ ...mealIngredientsList.value ]
  return showAllIngredients.value ? arr : arr.splice(0, 5)
});

const openRecipePage = (id) => {
  router.push({ path: `/recipe/${id}`})
};
</script>

<style lang="scss">
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

      .category {
        border-radius: $border-radius-base;
        z-index: 9;
        background: rgba(255, 255, 255, 0.9);
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