<template>
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
import { inject, computed } from 'vue';
import TodoItem from '@/components/TodoItem.vue';
import { useRouter } from 'vue-router';
const todoList = inject('todoList');
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

// 삭제 함수
const deleteTodoItem = (id) => {
    deleteTodo(id);
};

// 완료 토글 함수
const toggleTodoDone = (id) => {
    toggleDone(id);
};

// 라우터
const router = useRouter();
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
