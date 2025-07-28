<script>
import { reactive, ref } from 'vue';
export default {
  setup() {
    const count = ref(0);
    const state = reactive({
      count: 0,
      message: 'Hello',
    });
    return {
      count,
      state,
    };
  },
}
</script>
<template>
  <h1>Count: {{ count }}</h1>
  <h1>Double Count: {{ doubleCount }}</h1>
  <button @click="increment">증가</button>
</template>