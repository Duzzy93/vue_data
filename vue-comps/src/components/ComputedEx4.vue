<script setup>
import { computed, reactive, ref } from 'vue';

const refCount = ref(0);
const reactiveCount = reactive({ count: 0 });
const refDoubleCount = computed({
  get() {
    return refCount.value * 2;
  },
  set() {
    refCount.value = newValue;
  },
});
const reactiveDoubleCount = computed({
  get() {
    return reactiveCount.count * 2;
  },
  set() {
    reactiveCount.count = newValue;
  },
});
setTimeout(() => {
  refCount.value = 10;
  reactiveCount.count = 20;
}, 1000);
console.log(refDoubleCount.value);
console.log(reactiveDoubleCount.value);
</script>
<template>
  <h1>{{ refDoubleCount }}</h1>
  <h1>{{ reactiveDoubleCount }}</h1>
</template>