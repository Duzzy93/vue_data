<script>
export default {
  data() {
    return {
      inputMsg: '',
    };
  },
  emits: ["addTodo"],
  methods: {
    addTodo() {
      if (!this.inputMsg.trim()) return;

      this.$emit('addTodo', this.inputMsg);

      this.inputMsg = ""; // 입력창 초기화
    },
  },
}
</script>
<template>
  <div class="todo__input">
    <!-- 정의한 데이터를 양방향 바인딩 -->
    <input 
      v-model="inputMsg"
      type="text"
      class="todo__input-text"
      placeholder="할 일을 입력하세요." 
      @keydown.enter="addTodo" />
    <button class="todo__input-btn" @click="addTodo">등록</button>
  </div>
</template>