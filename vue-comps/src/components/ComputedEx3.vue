<script setup>
import { computed, reactive, ref } from 'vue';

const refCount = ref(0);
const reactiveCount = reactive({ count: 0 });
const refDoubleCount = computed(() => refCount.value * 2);
const reactiveDoubleCount = computed(() => reactiveCount.count * 2);
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