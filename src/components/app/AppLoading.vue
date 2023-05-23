<template>
  <div class="ma-auto fill-height d-flex align-center justify-center app-loading">
    <v-progress-circular
      class="d-block mx-auto"
      color="primary"
      indeterminate
    />
  </div>
</template>

<style lang="scss" scoped>
.app-loading {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>