<template>
  <div class="recipe-view-item">
    <v-row class="mb-md-4 mb-2">
      <v-col
        cols="12"
        sm="6"
      >
        <div
          class="wrapper-img"
          :class="{ 'mb-md-3 mb-2': props.recipe.strYoutube }"
        >
          <recipe-features-list
            class="recipe-features"
            :features="recipeFeatures"
          />
          <v-carousel
            cycle
            height="100%"
            hide-delimiters
            interval="3000"
            show-arrows="hover"
          >
            <v-carousel-item
              :src="props.recipe.strMealThumb"
              cover
              eager
            />
            <v-carousel-item
              v-for="i in 5"
              :key="i"
              :src="`https://picsum.photos/1024/102${i}`"
              cover
              eager
            />
          </v-carousel>
        </div>
        <v-tooltip v-if="props.recipe.strYoutube">
          <template #activator="{ props: propsActivator }">
            <v-btn
              v-bind="propsActivator"
              color="primary"
              block
              flat
              @click="openVideo(props.recipe.strYoutube, '_blank')"
            >
              Watch video
            </v-btn>
          </template>
          <span>The video will open in a new tab</span>
        </v-tooltip>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <p class="text-md-primary-medium-d text-primary-medium mb-md-3 mb-2">
          Ingredients
        </p>
        <v-row>
          <v-col
            v-for="(group, index) in recipeIngredients"
            :key="index"
            :cols="12 / recipeIngredients.length"
          >
            <ul class="pl-4">
              <li
                v-for="item in group"
                :key="item"
                :class="{ 'mb-md-2 mb-1': index !== group.length - 1 }"
              >
                {{ `${item.value} ${item.name}` }}
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="wrapper-recipe">
      <p class="text-md-primary-medium-d text-primary-medium mb-md-3 mb-2">
        Recipe
      </p>
      <p>
        {{ props.recipe.strInstructions }}
      </p>
    </div>
  </div>
</template>

<script setup>
import RecipeFeaturesList from '@/components/recipe/RecipeFeaturesList.vue';
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

const { xs } = useDisplay();
const props = defineProps({
  recipe: {
    type: Object,
    required: true
  }
});

const recipeFeatures = computed(() => {
  const arr = []

  if (props.recipe.strCategory) arr.push(props.recipe.strCategory)
  if (props.recipe.strArea) arr.push(props.recipe.strArea)

  return arr
});

const recipeIngredients = computed(() => {
  const arr =  Object.keys(props.recipe)
    .filter((key) => key.includes('strIngredient') && props.recipe[key])
    .map((key) => { 
      const value = props.recipe[`strMeasure${key.match(/\d+/g)[0]}`]
      return { name: props.recipe[key], value }
    });
  return xs.value ? [arr] : [arr.splice(0, Math.floor(arr.length / 2)), [...arr]]
});

const openVideo = (link) => {
  window.open(link, '_blank')
};
</script>

<style lang="scss" scoped>
.recipe-view-item {
  .wrapper-img {
    overflow: hidden;
    border-radius: $border-radius-base;
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    height: auto;
    
    .v-carousel {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    img {
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .features-list {
        z-index: 9;
        position: absolute;
        top: 8px;
        right: 8px;
      }
  }
}
</style>