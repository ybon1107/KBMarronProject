<template>
  <div class="d-flex">
    <!-- 내비게이션 바 -->
    <nav class="navbar navbar-expand-sm custom-navbar fixed-left">
      <div>
        <h4 class="ms-3 navbar-brand">마론케익 가계부</h4>
        <!-- 마론케익 가계부 이름 -->
        <button
          class="navbar-toggler"
          type="button"
          @click="isNavShow = !isNavShow"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          :class="
            isNavShow
              ? 'collapse navbar-collapse show'
              : 'collapse navbar-collapse'
          "
        >
          <ul class="navbar-nav flex-column mt-5">
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                캘린더
              </router-link>
              <!-- 캘린더 -->
            </li>
            <br />
            <li class="nav-item">
              <router-link class="nav-link" to="/todos"
                >&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp내역
              </router-link>
              <!-- 내역 -->
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- 캘린더 -->
    <div class="content flex-grow-1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isNavShow = ref(false);
</script>

<style scoped>
.d-flex {
  height: 100vh;
  position: relative;
  display: flex;
}

.navbar {
  width: 200px;
  height: 100%;
  overflow: hidden;
}

.custom-navbar {
  background-color: beige;
  color: black;
}

.custom-navbar .nav-link {
  color: purple;
  writing-mode: horizontal-tb;
  margin-right: 500px;
  text-align: center;
  white-space: nowrap;
  position: relative;
}

.custom-navbar .navbar-brand {
  color: black;
}

.ms-3 {
  margin-left: 3rem;
  left: 18px;
  position: relative;
  top: -250px;
}

.mb-3 {
  margin-bottom: 3rem;
}

.fixed-left {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
}

.nav-link {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
</style>
