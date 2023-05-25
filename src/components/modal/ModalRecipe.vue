<template>
  <app-modal-wrapper
    :show-modal="!!(showModal && recipeInfo)"
    @modal-hide="$emit('modal-hide')"
  >
    <app-modal-header
      class="mb-md-3 mb-2"
      :title="recipeInfo?.strMeal"
      @modal-hide="$emit('modal-hide')"
    />
    <div
      class="overflow-y-auto pr-md-4 pr-3 mr-md-n4 mr-n3"
      :style="{ maxHeight: `${modalContentMaxHeight}px` }"
    >
      <recipe-view-item
        v-if="recipeInfo"
        :recipe="recipeInfo"
      />
    </div>
  </app-modal-wrapper>
</template>

<script setup>
import AppModalWrapper from '@/components/app/modal/AppModalWrapper.vue';
import AppModalHeader from '@/components/app/modal/AppModalHeader.vue';
import RecipeViewItem from '@/components/recipe/view/RecipeViewItem.vue';
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { handleError } from "@/plugins/errorHandler";

const api = inject('api');

defineEmits(['modal-hide'])
const props = defineProps({
  recipe: {
    type: Object,
    default: () => {},
  },
  showModal: {
    type: Boolean,
    default: false,
  }
});

let meal = ref(null)
let modalContentMaxHeight = ref(600);

onBeforeUnmount(() => {
  loadMealInfo()
  calcModalContentMaxHeight();
  window.removeEventListener('resize', calcModalContentMaxHeight);
});

onMounted(() => {
  window.addEventListener('resize', calcModalContentMaxHeight);
});

const calcModalContentMaxHeight = () => {
  modalContentMaxHeight.value = window.innerHeight * 0.7;
};

const recipeInfo = computed(() => {
  return props.recipe && props.recipe.strInstructions ? props.recipe : meal.value
})

watch(() => props.showModal, (newVal) => {
  newVal ? loadMealInfo() : meal.value = null
})

const loadMealInfo = async () => {
  if (props.recipe && !props.recipe.strInstructions) {
      try {
      const { data } = await api.viewMeal(props.recipe.idMeal)
      
      if (Array.isArray(data.meals) && data.meals.length) {
        meal.value = data.meals[0]
      }
    } catch (e) {
      handleError(e)
    }
  }
};

</script>