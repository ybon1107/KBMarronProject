<template>
  <div>
    <h3>내역</h3>
  </div>

  <div>
    <!-- 상단에 총 지출, 총 수입, 총 사용금액 표시 -->
    <div class="row mt-3">
      <div class="col">
        <h3>총 지출: {{ totalExpense }} 원</h3>
      </div>
      <div class="col">
        <h3>총 수입: {{ totalIncome }} 원</h3>
      </div>
      <div class="col">
        <h3>총 사용금액: {{ totalExpenseIncomeDiff }} 원</h3>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <!-- 날짜 이동 버튼 -->
      <div class="date-navigation">
        <button @click="prevMonth">‹</button>
        <input type="month" class="form-control" id="month" v-model="selectedMonth" />
        <button @click="nextMonth">›</button>
      </div>

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
          <TodoItem v-for="todoItem in filteredTodoList" :key="todoItem.id" :todoItem="todoItem" />
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
import { ref, inject, computed } from 'vue';
import TodoItem from '@/components/TodoItem.vue';
import { useRouter } from 'vue-router';
const todoList = inject('todoList');
const currentDate = ref(new Date());
const selectedMonth = ref(currentDate.value.toISOString().slice(0, 7));
// 총 지출을 계산하는 함수
const totalExpense = computed(() => {
  let total = 0;
  todoList.value.forEach((todo) => {
    if (todo.transaction === '지출' || todo.transaction === '이체') {
      total += parseInt(todo.amount);
    }
  });
  return total;
});

// 총 수입을 계산하는 함수
const totalIncome = computed(() => {
  let total = 0;
  todoList.value.forEach((todo) => {
    if (todo.transaction === '수입') {
      total += parseInt(todo.amount);
    }
  });
  return total;
});

// 총 사용금액을 계산하는 함수
const totalExpenseIncomeDiff = computed(() => {
  return totalIncome.value - totalExpense.value;
});
const filteredTodoList = computed(() => {
  // 선택된 월에 해당하는 항목만 필터링
  const filteredItems = todoList.value.filter((todoItem) => {
    const itemDate = new Date(todoItem.date);
    return itemDate.getFullYear() === new Date(selectedMonth.value).getFullYear() && itemDate.getMonth() === new Date(selectedMonth.value).getMonth();
  });

  // 필터링된 항목을 날짜를 기준으로 오름차순으로 정렬하여 반환
  return filteredItems.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });
});

const prevMonth = () => {
  const currentMonth = new Date(selectedMonth.value);
  const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
  const year = newMonth.getFullYear();
  const month = String(newMonth.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 해줘야 합니다.
  selectedMonth.value = `${year}-${month}`;
};

const nextMonth = () => {
  const currentMonth = new Date(selectedMonth.value);
  const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
  const year = newMonth.getFullYear();
  const month = String(newMonth.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 해줘야 합니다.
  selectedMonth.value = `${year}-${month}`;
};

const deleteTodoItem = (id) => {
  const index = todoList.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    todoList.value.splice(index, 1);
    console.log(`할일 항목 ${id}를 삭제했습니다.`);
  }
};
</script>

<style scoped>
.date-navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.date-navigation button {
  padding: 10px 20px;
  margin: 0 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.date-navigation button:hover {
  background-color: #0056b3;
}

.form-control {
  width: auto;
  margin: 0 10px;
}

.custom-btn-container {
  position: fixed;
  bottom: 140px;
  right: 100px;
}

.custom-btn {
  background-color: #ff6347;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  text-decoration: none;
}

.custom-btn:hover {
  background-color: #ff4500;
}
</style>
