<template>
  <div class="d-flex align-center justify-space-between">
    <h1 class="text-md-h1-d text-h1">
      Recipes List
    </h1>
    <div class="d-flex">
      <v-tooltip
        v-if="!xs"
        location="start"
        text="Switch display mode"
      >
        <template #activator="{ props: propsActivator }">
          <v-btn
            v-bind="propsActivator"
            color="primary"
            class="mr-md-4 mr-2 "
            flat
            min-width="0"
            :size="mobile ? 'small' : 'default'"
            @click="$emit('update:tableView', !tableView)"
          >
            <v-icon>
              mdi-grid-large
            </v-icon>
          </v-btn>
        </template>
      </v-tooltip>
      <button-create-recipe />
    </div>
  </div>
</template>

<script setup>
import ButtonCreateRecipe from '@/components/recipe/action/ButtonCreateRecipe.vue';
import { useDisplay } from 'vuetify';

const { mobile, xs } = useDisplay();

defineProps({
  tableView: {
    type: Boolean,
    default:false,
  }
});

defineEmits(['update:tableView'])

</script>