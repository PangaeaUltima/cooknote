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
            @click="$emit('update:tableView', !props.tableView)"
          >
            <v-icon>
              mdi-grid-large
            </v-icon>
          </v-btn>
        </template>
      </v-tooltip>
      <v-btn
        class="text-md-btn-d text-btn"
        color="primary"
        flat
        :size="mobile ? 'small' : 'default'"
      >
        <v-icon class="mr-2">
          mdi-pen-plus
        </v-icon>
        <span>
          Add new recipe
        </span>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const { mobile, xs } = useDisplay();

const props = defineProps({
  tableView: {
    type: Boolean,
    default:false,
  }
});

defineEmits(['update:tableView'])

</script>