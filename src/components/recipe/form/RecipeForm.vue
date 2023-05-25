<template>
  <div>
    <v-form ref="recipeForm">
      <app-image-uploader
        v-model="form.images"
        class="mb-md-4 mb-2"
      />
      <v-text-field
        v-model="form.title"
        class="mb-md-4 mb-2"
        :rules="[rules.required]"
        color="primary"
        label="Title *"
        :density="xs ? 'compact' : 'comfortable'"
        hide-details="auto"
        variant="outlined"
        clearable
      />
      <v-textarea
        v-model="form.short_description"
        class="mb-md-4 mb-2"
        :rules="[rules.required]"
        color="primary"
        label="Short description *"
        :density="xs ? 'compact' : 'comfortable'"
        hide-details="auto"
        variant="outlined"
        rows="1"
        auto-grow
        clearable
      />
      <div
        v-for="(item, index) in form.ingredients"
        :key="item.id"
        class="grid-ingredients mb-md-4 mb-2"
      >
        <v-text-field
          v-model="item.name"
          :rules="[rules.required]"
          color="primary"
          :label="`${index + 1} In. title *`"
          :density="xs ? 'compact' : 'comfortable'"
          hide-details="auto"
          variant="outlined"
          clearable
        />
        <v-text-field
          v-model="item.value"
          :rules="[rules.required]"
          color="primary"
          label="qty *"
          :density="xs ? 'compact' : 'comfortable'"
          hide-details="auto"
          variant="outlined"
          clearable
        >
          <template
            v-if="form.ingredients.length > 1"
            #append
          >
            <v-icon
              color="error"
              @click="removeIngredient(item)"
            >
              mdi-close
            </v-icon>
          </template>
        </v-text-field>
      </div>
      <v-btn
        class="text-md-btn-d text-btn mb-md-4 mb-2"
        color="primary"
        block
        flat
        :size="mobile ? 'small' : 'default'"
        @click="addIngredient"
      >
        <v-icon class="mr-2">
          mdi-plus-box
        </v-icon>
        Add ingredient
      </v-btn>
      <v-textarea
        v-model="form.full_description"
        class="mb-md-4 mb-2"
        :rules="[rules.required]"
        color="primary"
        label="Full description *"
        :density="xs ? 'compact' : 'comfortable'"
        hide-details="auto"
        variant="outlined"
        rows="3"
        auto-grow
        clearable
      />
      <div class="grid-buttons">
        <v-btn
          class="text-md-btn-d text-btn"
          color="error"
          block
          flat
          :size="mobile ? 'small' : 'default'"
          @click="$emit('modal-hide')"
        >
          Cancel
        </v-btn>
        <v-btn
          class="text-md-btn-d text-btn"
          color="primary"
          block
          flat
          :size="mobile ? 'small' : 'default'"
          @click="createRecipe"
        >
          Submit
        </v-btn>
      </div> 
    </v-form>
  </div>
</template>

<script setup>
import AppImageUploader from '@/components/app/AppImageUploader.vue';
import { onMounted, reactive, ref } from 'vue';
import { required } from '@/helpers/validators'
import { useDisplay } from 'vuetify';
import { useNotification } from "@kyvg/vue3-notification";

const { mobile, xs } = useDisplay();

defineEmits(['modal-hide'])

let form = reactive({
  images: [],
  title: null,
  short_description: null,
  full_description: null,
  ingredients: [],
});
const { notify }  = useNotification();
const recipeForm = ref(null);
const rules = reactive({
  required,
});

onMounted(() => {
  addIngredient();
});

const addIngredient = () => {
  form.ingredients.push({ id: form.ingredients.length, name: '', value: '' })
};
const createRecipe = async () => {
  const { valid } = await recipeForm.value.validate()

  if (valid) {
    if (form.images.length) {
      notify({
        text: 'Recipe successfully created!',
        type: 'success bg-success text-white',
      })
    } else {
      notify({
        text: 'You need to add at least one image',
        type: 'error bg-error',
      })
    }
  }
};
const removeIngredient = (ingredient) => {
  const delIndex = form.ingredients.findIndex((item) => item.id === ingredient.id)

  form.ingredients.splice(delIndex, 1)
};
</script>

<style scoped lang="scss">
.grid-ingredients, .grid-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0 16px;

  @include xs-only {
    grid-gap: 0 8px;
  }
}
</style>