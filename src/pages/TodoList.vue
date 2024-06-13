<template>
  <div class="row">
    <div class="col">
      <!-- 날짜 이동 버튼 및 추가/삭제 버튼을 포함한 컨테이너 -->
      <div class="header-container">
        <!-- 날짜 이동 버튼 -->
        <div class="date-navigation">
          <button @click="prevMonth">‹</button>
          <input
            type="month"
            class="form-control"
            id="month"
            v-model="selectedMonth"
          />
          <button @click="nextMonth">›</button>
        </div>
        <!-- 플러스 버튼 및 삭제 버튼 -->
        <div class="button-container">
          <router-link class="custom-btn" to="/todos/add">
            <i class="fas fa-plus"></i>
          </router-link>
          <div class="margin"></div>
          <button @click="deleteSelectedTodos" class="custom-btn delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <!-- 테이블 및 기타 컨텐츠 -->
      <table class="table">
        <thead>
          <tr>
            <th colspan="6" style="padding: 10px">
              <div style="display: flex; justify-content: space-between">
                <span>수입: {{ formatAmount(filteredTotalIncome) }} 원</span>
                <span>지출: {{ formatAmount(filteredTotalExpense) }} 원</span>
                <span>전체: {{ formatAmount(filteredTotalExpenseIncomeDiff) }} 원</span>
              </div>
            </th>
          </tr>
          <tr>
            <th>
              <input
                type="checkbox"
                v-model="selectAll"
                @change="toggleSelectAll"
              />
            </th>
            <th>날짜</th>
            <th>자산</th>
            <th>거래 유형</th>
            <th>분류</th>
            <th>금액</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          <TodoItem
            v-for="todoItem in filteredTodoList"
            :key="todoItem.id"
            :todoItem="todoItem"
            :selected="selectedIds.includes(todoItem.id)"
            @select="toggleSelectItem(todoItem.id)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject, computed } from 'vue';
import TodoItem from '@/components/TodoItem.vue';
import axios from 'axios';
import router from '@/router';

const BASEURI = '/api/todos';
const selectedIds = ref([]);
const selectAll = ref(false);
const todoList = inject('todoList');
const currentDate = ref(new Date());
const selectedMonth = ref(currentDate.value.toISOString().slice(0, 7));
const states = reactive({
  todoList,
});
const formatAmount = (amount) => {
  return new Intl.NumberFormat().format(Math.abs(amount));
};
const filteredTotalExpense = computed(() => {
  return filteredTodoList.value.reduce((total, todo) => {
    if (
      todo.transaction === '지출' ||
      (todo.transaction === '이체' && todo.type === '출금')
    ) {
      total += parseInt(todo.amount);
    }
    return total;
  }, 0);
});

const filteredTotalIncome = computed(() => {
  return filteredTodoList.value.reduce((total, todo) => {
    if (
      todo.transaction === '수입' ||
      (todo.transaction === '이체' && todo.type === '입금')
    ) {
      total += parseInt(todo.amount);
    }
    return total;
  }, 0);
});

const filteredTotalExpenseIncomeDiff = computed(() => {
  return filteredTotalIncome.value - filteredTotalExpense.value;
});

const filteredTodoList = computed(() => {
  // 선택된 월에 해당하는 항목만 필터링
  const filteredItems = todoList.value.filter((todoItem) => {
    const itemDate = new Date(todoItem.date);
    return (
      itemDate.getFullYear() === new Date(selectedMonth.value).getFullYear() &&
      itemDate.getMonth() === new Date(selectedMonth.value).getMonth()
    );
  });

  // 필터링된 항목을 날짜를 기준으로 오름차순으로 정렬하여 반환
  return filteredItems.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });
});

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedIds.value = filteredTodoList.value.map((todo) => todo.id);
  } else {
    selectedIds.value = [];
  }
};

const toggleSelectItem = (id) => {
  const index = selectedIds.value.indexOf(id);
  if (index > -1) {
    selectedIds.value.splice(index, 1);
  } else {
    selectedIds.value.push(id);
  }
};
const deleteSelectedTodos = async () => {
  try {
    const deletePromises = selectedIds.value.map((id) =>
      axios.delete(BASEURI + `/${id}`)
    );
    const responses = await Promise.all(deletePromises);
    responses.forEach((response, index) => {
      if (response.status === 200) {
        const id = selectedIds.value[index];
        const todoIndex = states.todoList.findIndex((todo) => todo.id === id);
        states.todoList.splice(todoIndex, 1);
      } else {
        alert('Todo 삭제 실패');
      }
    });
    selectedIds.value = [];
    selectAll.value = false;
    router.push('/todos');
  } catch (error) {
    alert('에러발생 :' + error);
  }
};

const prevMonth = () => {
  const currentMonth = new Date(selectedMonth.value);
  const newMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() - 1
  );
  const year = newMonth.getFullYear();
  const month = String(newMonth.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 해줘야 합니다.
  selectedMonth.value = `${year}-${month}`;
};

const nextMonth = () => {
  const currentMonth = new Date(selectedMonth.value);
  const newMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1
  );
  const year = newMonth.getFullYear();
  const month = String(newMonth.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 해줘야 합니다.
  selectedMonth.value = `${year}-${month}`;
};
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between; /* 날짜 이동 버튼과 추가/삭제 버튼 사이를 떨어뜨립니다 */
  align-items: center;
  margin-bottom: 20px;
}

.date-navigation {
  display: flex;
  align-items: center;
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

.button-container {
  display: flex;
  align-items: center;
}

.margin {
  width: 10px; /* 버튼 사이의 여백을 조정합니다 */
}

.custom-btn {
  background-color: #28a745;
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
  background-color: #218838;
}

.delete-btn {
  background-color: #dc3545;
  border: none; /* border 제거 */
}

.delete-btn:hover {
  background-color: #c82333;
}

.custom-btn i {
  font-size: 24px;
}

.delete-btn i {
  font-size: 24px;
  color: white;
}
</style>
