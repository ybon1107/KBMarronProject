<template>
  <tr>
    <td><input type="checkbox" :checked="selected" @change="$emit('select')" /></td>
    <td>{{ todoItem.date }}</td>
    <td>{{ todoItem.asset }}</td>
    <td
      :class="{
        'text-blue': todoItem.transaction === '수입' || (todoItem.transaction === '이체' && todoItem.type === '입금'),
        'text-red': todoItem.transaction === '지출' || (todoItem.transaction === '이체' && todoItem.type === '출금'),
      }"
    >
      {{ todoItem.transaction }}
    </td>
    <td>{{ todoItem.type }}</td>
    <td
      :class="{
        'text-blue': todoItem.transaction === '수입' || (todoItem.transaction === '이체' && todoItem.type === '입금'),
        'text-red': todoItem.transaction === '지출' || (todoItem.transaction === '이체' && todoItem.type === '출금'),
      }"
    >
      <!-- 수입이면 +를, 지출이나 이체이면 -를 앞에 붙입니다 -->
      {{ (todoItem.transaction === '수입' || (todoItem.transaction === '이체' && todoItem.type === '입금') ? '+' : '-') + formatAmount(todoItem.amount) }}
      <!-- 변경된 부분: formatAmount 함수를 사용하여 금액을 1000 단위로 구분합니다 -->
    </td>
    <td>{{ todoItem.memo }}</td>
  </tr>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { inject } from 'vue';
import { defineProps, defineEmits } from 'vue';

defineProps({
  todoItem: { Type: Object, required: true },
  selected: Boolean,
});
const emit = defineEmits(['select']);
const router = useRouter();

// 금액을 1000 단위로 구분하는 함수
const formatAmount = (amount) => {
  return new Intl.NumberFormat().format(Math.abs(amount));
};
// 변경된 부분: formatAmount 함수를 추가하여 금액을 포맷합니다
</script>

<style scoped>
/* 수입인 경우 파란색으로 설정합니다 */
.text-blue {
  color: blue;
}
/* 지출 또는 이체인 경우 빨간색 */
.text-red {
  color: red;
}
</style>
