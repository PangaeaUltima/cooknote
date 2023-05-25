<template>
  <div>
    <v-btn
      class="text-md-btn-d text-btn"
      color="primary"
      flat
      :size="mobile ? 'small' : 'default'"
      @click="isModalRecipeFormVisible = true"
    >
      <v-icon class="mr-2">
        mdi-pen-plus
      </v-icon>
      <span>
        Add new recipe
      </span>
    </v-btn>
    <modal-recipe-form
      :show-modal="isModalRecipeFormVisible"
      @modal-hide="isModalRecipeFormVisible = false"
    />
  </div>
</template>

<script setup>
import ModalRecipeForm from '@/components/modal/ModalRecipeForm.vue';
import { useDisplay } from 'vuetify';
import { ref } from 'vue';

const { mobile } = useDisplay();

const isModalRecipeFormVisible = ref(false);
</script>