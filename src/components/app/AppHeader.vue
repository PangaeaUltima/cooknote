<template>
  <header class="d-flex align-center">
    <v-container>
      <div class="d-flex align-center justify-space-between">
        <router-link
          class="logo-link text--primary"
          :to="{ path: '/' }"
        >
          <app-logo-image />
        </router-link>
      </div>
    </v-container>
  </header>
</template>

<script setup>
import AppLogoImage from '@/components/app/logo/AppLogoImage.vue'

</script>

<style lang="scss">
.logo-link {
  width: 180px;
  height: auto;

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>