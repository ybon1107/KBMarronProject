<template>
  <div class="row">
    <div class="col">
      <!-- 테이블 및 기타 컨텐츠 -->
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
  </div>
  <!-- "할일 추가" 버튼을 오른쪽 하단에 고정 -->
  <div class="custom-btn-container">
    <router-link class="custom-btn" to="/todos/add">
      <i class="fas fa-plus"></i>
    </router-link>
  </div>
</template>

<script setup>
import Calendar from './Calendar.vue';

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
.custom-btn-container {
  position: fixed;
  bottom: 140px;
  right: 100px;
}

.custom-btn {
  background-color: #ff6347; /* 원하는 버튼 색상 */
  color: white; /* 텍스트 색상 */
  width: 60px; /* 버튼의 너비 */
  height: 60px; /* 버튼의 높이 */
  border-radius: 50%; /* 버튼을 원형으로 만듦 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px; /* 텍스트 크기 */
  text-decoration: none;
}

.custom-btn:hover {
  background-color: #ff4500; /* 호버 시 버튼 색상 */
}
</style>
