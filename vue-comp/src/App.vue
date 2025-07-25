<script>
import BasicMix from './components/BasicMix.vue';

export default {
  components: {
    BasicMix,
  },
}
</script>
<template>
  <BasicMix>
    <template #header="headerProps">
      <h1>{{ headerProps.message }}</h1>
    </template>
    <template #main="{ count }">
      <h1>{{ count }}</h1>
    </template>
  </BasicMix>
</template>
<style scoped>
</style>