<template>
  <div>
    <input type="date" v-model="selectedDate" />
    <textarea v-model="expenses" @change="saveExpenses"></textarea>
    <div>
      <p>Selected Date: {{ selectedDate }}</p>
      <p>Expenses: {{ savedExpenses[selectedDate] }}</p>
    </div>
  </div>
</template>

<script setup>
const selectedDate = ref('2024-06-11'); // 선택한 날짜
const expenses = ref('12000'); // 선택한 날짜의 지출 내역
const savedExpenses = reactive({ '2024-06-11': '12000' }); // 저장된 지출 내역

const saveExpenses = () => {
  // 선택한 날짜에 해당하는 지출 내역을 저장
  savedExpenses[selectedDate.value] = expenses.value;
};
</script>

<style scoped>
/* 필요한 스타일링을 여기에 추가할 수 있습니다. */
</style>
