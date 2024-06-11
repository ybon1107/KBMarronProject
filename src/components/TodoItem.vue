<template>
  <tr>
    <td>{{ todoItem.date }}</td>
    <td>{{ todoItem.asset }}</td>
    <td>{{ todoItem.type }}</td>
    <td>{{ todoItem.amount }}</td>
    <td>{{ todoItem.memo }}</td>
    <td>
      <button @click="deleteTodoItem(todoItem.id)">삭제</button>
    </td>
  </tr>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { inject } from 'vue';
defineProps({
  todoItem: { Type: Object, required: true },
});
const router = useRouter();
const { deleteTodo, toggleDone } = inject('actions');
</script>
