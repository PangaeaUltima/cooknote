<template>
  <v-app>
    <div class="fill-height wrapper relative d-flex flex-column">
      <slot />
    </div>
    <notifications
      classes="vue-notification text-md-caption-d text-caption"
      position="bottom right"
    />
  </v-app>
</template>

<script setup>
</script>