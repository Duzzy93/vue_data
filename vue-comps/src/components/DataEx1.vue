<script setup>
import { ref } from 'vue';

const count = ref(0);
const state = ref({
  count: 0,
});
setTimeout(() => {
  count.value++;
}, 1000);
setTimeout(() => {
  state.count++;
}, 1000);
</script>
<template>
  <h1>count : {{ count }}</h1>
  <h2>state : {{ state.count }}</h2>
</template>