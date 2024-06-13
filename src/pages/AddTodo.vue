<template>
  <div class="row">
    <div class="col p-3">
      <h2>가계부</h2>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="tab-buttons">
        <button :class="{ active: selectedTab === '수입' }" @click="selectTab('수입')">수입</button>
        <button :class="{ active: selectedTab === '지출' }" @click="selectTab('지출')">지출</button>
        <button :class="{ active: selectedTab === '이체' }" @click="selectTab('이체')">이체</button>
      </div>
      <div v-if="selectedTab === '수입'">
        <div class="form-group">
          <label htmlfor="date">날짜:</label>
          <input type="date" class="form-control" id="date" v-model="todoItem.date" />
        </div>
        <div class="form-group position-relative">
          <label htmlFor="amount">금액 :</label>
          <div class="input-group">
            <input type="text" class="form-control" id="amount" v-model="formattedAmount" @input="updateAmount" />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" disabled>원</button>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="type">분류:</label>
          <select class="form-control" id="type" v-model="todoItem.type">
            <option disabled value="">분류 선택</option>
            <option v-for="type in income_types" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label htmlFor="memo">내용 :</label>
          <input type="text" class="form-control" id="memo" v-model="todoItem.memo" />
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-primary m-1" @click="addTodoHandler">저 장</button>
          <button type="button" class="btn btn-primary m-1" @click="router.push('/todos')">취 소</button>
        </div>
      </div>
      <div v-if="selectedTab === '지출'">
        <div class="form-group">
          <label htmlfor="date">날짜:</label>
          <input type="date" class="form-control" id="date" v-model="todoItem.date" />
        </div>
        <div class="form-group position-relative">
          <label htmlFor="amount">금액 :</label>
          <div class="input-group">
            <input type="text" class="form-control" id="amount" v-model="formattedAmount" @input="updateAmount" />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" disabled>원</button>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="type">분류:</label>
          <select class="form-control" id="type" v-model="todoItem.type">
            <option disabled value="">분류 선택</option>
            <option v-for="type in expenses_types" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="asset">자산:</label>
          <select class="form-control" id="asset" v-model="todoItem.asset">
            <option disabled value="">자산 선택</option>
            <option v-for="asset in assets" :key="asset" :value="asset">
              {{ asset }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label htmlFor="memo">내용 :</label>
          <input type="text" class="form-control" id="memo" v-model="todoItem.memo" />
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-primary m-1" @click="addTodoHandler">저 장</button>
          <button type="button" class="btn btn-primary m-1" @click="router.push('/todos')">취 소</button>
        </div>
      </div>
      <div v-if="selectedTab === '이체'">
        <div class="form-group">
          <label htmlfor="date">날짜:</label>
          <input type="date" class="form-control" id="date" v-model="todoItem.date" />
        </div>
        <div class="form-group">
          <label for="type">분류:</label>
          <select class="form-control" id="type" v-model="todoItem.type">
            <option disabled value="">분류 선택</option>
            <option v-for="type in types" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="form-group position-relative">
          <label htmlFor="amount">금액 :</label>
          <div class="input-group">
            <input type="text" class="form-control" id="amount" v-model="formattedAmount" @input="updateAmount" />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" disabled>원</button>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label htmlFor="memo">내용 :</label>
          <input type="text" class="form-control" id="memo" v-model="todoItem.memo" />
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-primary m-1" @click="addTodoHandler">저 장</button>
          <button type="button" class="btn btn-primary m-1" @click="router.push('/todos')">취 소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const todoItem = ref({
  date: '',
  memo: '',
  asset: '',
  transaction: '지출',
  amount: 0,
  type: '',
});
const selectedTab = ref(todoItem.value.transaction);

const selectTab = (tab) => {
  selectedTab.value = tab;
  todoItem.value.transaction = tab;
  resetTodoItem(tab);
};

const resetTodoItem = (tab) => {
  todoItem.value.date = '';
  todoItem.value.memo = '';
  todoItem.value.asset = tab === '지출' ? '' : '-';
  todoItem.value.amount = 0;
  todoItem.value.type = '';
  formattedAmount.value = formatAmount(todoItem.value.amount);
};
const router = useRouter();
const { addTodo } = inject('actions');
const formattedAmount = ref(todoItem.value.amount);
const income_types = ['용돈', '월급', '기타'];
const expenses_types = ['월세', '교통', '식비', '기타'];
const types = ['입금', '출금'];
const assets = ['카드', '현금'];
const addTodoHandler = () => {
  const { date, memo, asset, transaction, amount, type } = todoItem.value;
  todoItem.value.amount = todoItem.value.amount;

  if (transaction === '수입') {
    if (!date || !transaction || !amount || !type) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    todoItem.value.asset = '-';
  } else if (transaction === '지출') {
    if (!date || !asset || !transaction || !amount || !type) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
  } else {
    if (!date || !transaction || !amount || !type) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    todoItem.value.asset = '이체';
  }

  addTodo({ ...todoItem.value }, () => {
    router.push('/todos');
  });
};

onMounted(() => {
  const dateParam = router.currentRoute.value.query.date;
  if (dateParam) {
    todoItem.value.date = dateParam;
  }
});

const updateAmount = (event) => {
  const value = event.target.value.replace(/[^0-9]/g, '');
  todoItem.value.amount = parseInt(value) || 0;
  formattedAmount.value = formatAmount(todoItem.value.amount);
};

// 금액을 1000 단위로 구분하는 함수
const formatAmount = (amount) => {
  return new Intl.NumberFormat().format(amount);
};
</script>

<style scoped>
.tab-buttons {
  display: flex;
  margin-bottom: 1rem;
}

button {
  flex: 1;
  padding: 0.5rem;
  cursor: pointer;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 5px 5px 0 0;
  outline: none;
}

button.active {
  background-color: #007bff;
  color: white;
  border-bottom: none;
}

button:not(.active):hover {
  background-color: #ddd;
}
/* 금액 색상을 파란색으로 설정합니다. */
.text-blue {
  color: blue;
}

/* 금액 색상을 빨간색으로 설정합니다. */
.text-red {
  color: red;
}
</style>
