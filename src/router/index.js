import { createRouter, createWebHistory } from 'vue-router';
import TodoList from '@/pages/TodoList.vue';
// import Home from '@/pages/Home.vue';
import AddTodo from '@/pages/AddTodo.vue';
import NotFound from '@/pages/NotFound.vue';
import Calendar from '@/pages/Calendar.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Calendar },
    // { path: '/s', component: Home },
    { path: '/todos', component: TodoList },
    { path: '/todos/add', component: AddTodo },
    { path: '/:paths(.*)*', component: NotFound },
  ],
});
export default router;
