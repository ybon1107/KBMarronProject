<template>
    <div class="row">
        <div class="col p-3">
            <router-link class="btn btn-primary" to="/todos/add">
                할일 추가
            </router-link>
        </div>
    </div>
    <div>
        <table>
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
</template>
<script setup>
import { inject } from 'vue';
import TodoItem from '@/components/TodoItem.vue';
const todoList = inject('todoList');
</script>
