<template>
  <app-layout-wrapper v-scroll.v-application="onScroll">
    <app-header
      class="app-header"
      :class="{ 'app-header-bg': scrollTop > 20 }"
    />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </app-layout-wrapper>
</template>

<script setup>
import { ref } from 'vue';
import AppHeader from '@/components/app/AppHeader.vue';
import AppLayoutWrapper from '@/components/app/AppLayoutWrapper.vue';

let scrollTop = ref(0)

const onScroll = (e) => {
  scrollTop.value = e.target.scrollingElement.scrollTop
};
</script>

<style lang="scss" scoped>
.app-header {
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: background-color 0.3s;

  &.app-header-bg {
    background-color: rgba(255, 255, 255, 0.9);
  }
}

.v-main {
  padding-top: 70px;

  @include sm-and-down {
    padding-top: 50px;
  }
}
</style>