<template>
  <div class="d-flex">
    <!-- 전체 레이아웃을 Flexbox로 설정 -->
    <nav class="navbar navbar-expand-sm custom-navbar flex-column">
      <!-- flex-column 클래스를 추가하여 세로 정렬 -->
      <span class="navbar-brand ps-2">마론케익 가계부</span>
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
        <ul class="navbar-nav flex-column mt-3">
          <!-- flex-column 클래스를 추가하여 세로 정렬 -->

          <li class="nav-item">
            <router-link class="nav-link" to="/todos"> 내역 </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/"> 캘린더 </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="content flex-grow-1">
      <!-- 나머지 화면 공간을 차지하는 컨텐츠 -->
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
    height: 100vh; /* 전체 화면 높이를 차지하도록 설정 */
}

.navbar {
  width: 200px; /* 네비게이션 바의 너비를 설정 */
  height: 80vh; /* 네비게이션 바의 높이를 전체 화면 높이로 설정 */
}

.content {
    padding: 20px; /* 컨텐츠 영역에 패딩을 추가 */
}

.custom-navbar {
    background-color: beige;
    color: black;
}

.custom-navbar .nav-link {
    color: purple;
}

.custom-navbar .navbar-brand {
  color: black;
  margin-bottom: 40px; /* 브랜드와 다른 항목 간의 간격 추가 */
}
</style>
