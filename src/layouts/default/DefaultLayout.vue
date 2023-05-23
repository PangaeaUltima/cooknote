<template>
  <app-layout-wrapper>
    <app-header />
    <v-main>
      <v-container class="">
        <router-view />
      </v-container>
    </v-main>
  </app-layout-wrapper>
</template>

<script setup>
import AppHeader from '@/components/app/AppHeader.vue';
import AppLayoutWrapper from '@/components/app/AppLayoutWrapper.vue';
</script>