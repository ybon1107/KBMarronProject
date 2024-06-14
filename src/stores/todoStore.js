// stores/todoStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

const BASEURI = '/api/todos';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todoList: [],
    isLoading: false,
  }),
  actions: {
    async fetchTodoList() {
      this.isLoading = true;
      try {
        const response = await axios.get(BASEURI);
        if (response.status === 200) {
          this.todoList = response.data;
        } else {
          alert('데이터 조회 실패');
        }
      } catch (error) {
        alert('에러발생 :' + error);
      }
      this.isLoading = false;
    },
    async addTodo({ type, transaction, asset, amount, date, memo }, successCallback) {
      this.isLoading = true;
      try {
        const payload = { type, transaction, asset, amount, date, memo };
        const response = await axios.post(BASEURI, payload);
        if (response.status === 201) {
          this.todoList.push({ ...response.data, done: false });
          successCallback();
        } else {
          alert('Todo 추가 실패');
        }
      } catch (error) {
        alert('에러발생 :' + error);
      }
      this.isLoading = false;
    },
    async updateTodo({ id, transaction, type, asset, amount, date, memo }, successCallback) {
      this.isLoading = true;
      try {
        const payload = { id, transaction, type, asset, amount, date, memo };
        const response = await axios.put(BASEURI + `/${id}`, payload);
        if (response.status === 200) {
          const index = this.todoList.findIndex((todo) => todo.id === id);
          this.todoList[index] = payload;
          successCallback();
        } else {
          alert('Todo 변경 실패');
        }
      } catch (error) {
        alert('에러발생 :' + error);
      }
      this.isLoading = false;
    },
    async deleteTodo(id) {
      this.isLoading = true;
      try {
        const response = await axios.delete(BASEURI + `/${id}`);
        if (response.status === 200) {
          const index = this.todoList.findIndex((todo) => todo.id === id);
          this.todoList.splice(index, 1);
        } else {
          alert('Todo 삭제 실패');
        }
      } catch (error) {
        alert('에러발생 :' + error);
      }
      this.isLoading = false;
    },
  },
});
