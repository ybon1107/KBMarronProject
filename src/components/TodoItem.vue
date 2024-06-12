<template>
  <tr>
    <td>{{ todoItem.date }}</td>
    <td>{{ todoItem.asset }}</td>
    <td
      :class="{
        'text-blue': todoItem.transaction === '수입',
        'text-red': todoItem.transaction === '지출' || todoItem.transaction === '이체',
      }"
    >
      {{ todoItem.transaction }}
    </td>
    <td>{{ todoItem.type }}</td>
    <td
      :class="{
        'text-blue': todoItem.transaction === '수입',
        'text-red': todoItem.transaction === '지출' || todoItem.transaction === '이체',
      }"
    >
      <!-- 수입이면 +를, 지출이나 이체이면 -를 앞에 붙입니다 -->
      {{ (todoItem.transaction === '수입' ? '+' : '-') + Math.abs(todoItem.amount) }}
    </td>
    <td>{{ todoItem.memo }}</td>
    <td>
      <span class="float-end badge bg-secondary pointer m-1" @click="deleteTodo(todoItem.id)">삭제</span>
    </td>
  </tr>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { inject } from 'vue';
import { defineProps } from 'vue';

defineProps({
  todoItem: { Type: Object, required: true },
});
const router = useRouter();
const { deleteTodo, toggleDone } = inject('actions');
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
