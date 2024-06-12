<template>
  <div class="row">
    <div class="fixed-bottom-right">
      <h2>할일 추가</h2>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="form-group">
        <label htmlfor="transaction">자산:</label><br />
        <label>
          <input type="radio" v-model="todoItem.transaction" value="수입" />
          수입
        </label>
        <label>
          <input type="radio" v-model="todoItem.transaction" value="지출" />
          지출
        </label>
        <label>
          <input type="radio" v-model="todoItem.transaction" value="이체" />
          이체
        </label>
      </div>
      <div class="form-group">
        <label htmlfor="date">날짜:</label>
        <input
          type="date"
          class="form-control"
          id="date"
          v-model="todoItem.date"
        />
      </div>
      <div class="form-group">
        <label htmlFor="amount">금액 :</label>
        <input
          type="text"
          class="form-control"
          id="amount"
          v-model="todoItem.amount"
        />
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
        <input
          type="text"
          class="form-control"
          id="memo"
          v-model="todoItem.memo"
        />
      </div>
      <div class="form-group">
        <button
          type="button"
          class="btn btn-primary m-1"
          @click="addTodoHandler"
        >
          저 장
        </button>
        <button
          type="button"
          class="btn btn-primary m-1"
          @click="router.push('/todos')"
        >
          취 소
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { addTodo } = inject('actions');
const todoItem = reactive({
  date: '',
  memo: '',
  asset: '',
  transaction: '',
  amount: '',
  type: '',
});
const types = ['월세', '교통', '식비', '기타'];
const assets = ['카드', '현금', '이체'];

const addTodoHandler = () => {
  let { date } = todoItem;
  if (!date || date.trim() === '') {
    alert('값을 반드시 입력해야 합니다');
    return;
  }
  addTodo({ ...todoItem }, () => {
    router.push('/todos');
  });
};
const selectAsset = (asset) => {
  todoItem.asset = asset;
};
</script>
