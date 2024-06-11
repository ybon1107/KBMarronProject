<template>
  <div class="row">
    <div class="col p-3">
      <router-link class="btn btn-primary" to="/todos/add">
        할일 추가
      </router-link>
    </div>
  </div>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>날짜</th>
          <th>거래 유형</th>
          <th>자산</th>
          <th>분류</th>
          <th>금액</th>
          <th>내용</th>
        </tr>
      </thead>
      <tbody>
        <TodoItem
          v-for="todoItem in todoList"
          :key="todoItem.id"
          :todoItem="todoItem"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import TodoItem from '@/components/TodoItem.vue';
const todoList = inject('todoList');

const deleteTodoItem = (id) => {
  // 해당 ID를 가진 항목을 todoList에서 제거합니다.
  const index = todoList.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    todoList.value.splice(index, 1);
    console.log(`할일 항목 ${id}를 삭제했습니다.`);
  }
};
</script>

<style scoped>
/* 필요한 경우 스타일링을 추가하세요 */
</style>
