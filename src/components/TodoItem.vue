<template>
    <tr>
        <td>{{ todoItem.date }}</td>
        <td>{{ todoItem.transaction }}</td>
        <td>{{ todoItem.asset }}</td>
        <td>{{ todoItem.type }}</td>
        <td>{{ todoItem.amount }}</td>
        <td>{{ todoItem.memo }}</td>
        <td>
            <!-- <span
        class="float-end badge bg-secondary pointer m-1"
        @click="router.push(`/todos/edit/${todoItem.id}`)"
      >
        편집</span
      > -->
            <span
                class="float-end badge bg-secondary pointer m-1"
                @click="deleteTodo(todoItem.id)"
                >삭제</span
            >
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
