<template>
  <header class="d-flex align-center px-4">
    <div class="d-flex align-center justify-space-between">
      <router-link
        class="logo-link text--primary d-flex"
        to="/"
      >
        <app-logo-image />
      </router-link>
    </div>
  </header>
</template>

<script setup>
import AppLogoImage from '@/components/app/logo/AppLogoImage.vue'
</script>

<style lang="scss" scoped>
.logo-link {
  height: 70px;

  svg {
    width: 100%;
    height: 100%;
  }

  @include sm-and-down {
    height: 50px;
  }
}
</style>