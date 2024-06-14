<template>
  <div class="container">
    <Header />
    <!-- <router-view /> -->
    <Loading v-if="todoStore.isLoading" />
  </div>
</template>
<script setup>
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';
import { useTodoStore } from '@/stores/todoStore';
const BASEURI = '/api/todos';
const todoStore = useTodoStore();
todoStore.fetchTodoList();
</script>
