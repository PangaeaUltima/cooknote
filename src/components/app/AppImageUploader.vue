<template>
  <div>
    <div class="grid">
      <v-hover
        v-for="item in modelCopy"
        :key="item.id"
      >
        <template #default="{ isHovering, props }">
          <div
            v-bind="props"
            class="wrapper-image d-flex align-center justify-center relative"
          >
            <transition name="fade">
              <div
                v-if="isHovering"
                class="button-delete-overlay d-flex align-center justify-center"
              >
                <v-btn
                  class="button-delete-image"
                  color="white"
                  icon
                  :size="mobile ? 'small' : 'default'"
                  variant="plain"
                  @click="deleteImage(item.id)"
                >
                  <v-icon>
                    mdi-close
                  </v-icon>
                </v-btn>
              </div>
            </transition>
            <img :src="item.image">
          </div>
        </template>
      </v-hover>
      
      <div class="app-image-uploader relative d-flex align-center">
        <div class="wrapper-zone">
          <div
            class="wrapper-info d-flex align-center justify-center"
            @drop="onChange"
          >
            <v-icon
              color="primary"
            >
              mdi-upload
            </v-icon>
            <input
              ref="inputFile"
              type="file"
              @change="onChange"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: [Array, String],
    default: null
  },
});

const modelCopy = ref([]);
const inputFile = ref(null);

const deleteImage = (id) => {
  const delIndex = modelCopy.value.findIndex((item) => item.id === id)
  const arr = [...props.modelValue]
  arr.splice(delIndex, 1)
  modelCopy.value.splice(delIndex, 1)
  emit('update:modelValue', arr)
};

const onChange = (e) => {
  const files = e.target.files || e.dataTransfer.files
  const file = files[0];

  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      const imageUrl = reader.result;
      modelCopy.value = [ ...modelCopy.value, { id: modelCopy.value.length, image: imageUrl } ]
      emit('update:modelValue', [...props.modelValue, imageUrl ] )
    }

    reader.readAsDataURL(file);

    inputFile.value.value = null
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(3, 1fr);

  @include xs-only {
    grid-gap: 8px;
    grid-template-columns: repeat(2, 1fr);
  }
}

.wrapper-image, .app-image-uploader {
  width: 100%;
  padding-bottom: 56.25%;
}

.wrapper-image {
  img, .button-delete-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  img {
    object-fit: cover;
  }

  .button-delete-overlay {
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .button-delete-image {
    z-index: 9;
    position: absolute;
  }
}

.app-image-uploader {
  border-radius: $border-radius-base;
  overflow: hidden;

  .wrapper-zone {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px dashed $primary;

    .wrapper-info {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 8;

      img {
        z-index: 9;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .v-icon {
        position: absolute;
      }

      input {
        z-index: 10;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>