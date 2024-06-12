<template>
  <div class="calendar">
    <div>
      <input type="data" v-model="selectedDate" @change="selectData" />
    </div>
    <h2>
      <a href="#" @click.prevent="onClickPrev">◀</a>
      {{ currentYear }}년 {{ currentMonth }}월
      <a href="#" @click.prevent="onClickNext">▶</a>
    </h2>
    <table class="table table-hover">
      <tbody>
        <tr v-for="(row, index) in currentCalendarMatrix" :key="index">
          <td
            v-for="(day, index2) in row"
            :key="index2"
            style="padding: 20px"
            @click="handleDateClick(day)"
            :class="{ hoverable: day !== '' }"
          >
            <span
              v-if="day !== '' && isToday(currentYear, currentMonth, day)"
              class="rounded"
            >
              {{ day }}
            </span>
            <span v-else>
              {{ day }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
const selectedDate = ref('null'); // 선택한 날짜를 저장하는 변수
const handleDateChange = (date) => {
  selectedDate.value = date;
};
const emit = defineEmits(['date-selected']);
const selectData = () => {
  emit('date-selected', selectedDate.value);
};

const weekNames = [
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
  '일요일',
];
const rootYear = 1904;
const rootDayOfWeekIndex = 4; // 2000년 1월 1일은 토요일
const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth() + 1);
let currentMonthStartWeekIndex = null;
let currentCalendarMatrix = [];
let endOfDay = null;

init();

function init() {
  currentMonthStartWeekIndex = getStartWeek(
    currentYear.value,
    currentMonth.value
  );
  endOfDay = getEndOfDay(currentYear.value, currentMonth.value);
  initCalendar();
}

function initCalendar() {
  currentCalendarMatrix = [];
  let day = 1;
  for (let i = 0; i < 6; i++) {
    let calendarRow = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < currentMonthStartWeekIndex) {
        calendarRow.push('');
      } else if (day <= endOfDay) {
        calendarRow.push(day);
        day++;
      } else {
        calendarRow.push('');
      }
    }
    currentCalendarMatrix.push(calendarRow);
  }
}

function getEndOfDay(year, month) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
    default:
      console.log('unknown month ' + month);
      return 0;
  }
}

function getStartWeek(targetYear, targetMonth) {
  let year = rootYear;
  let month = 1;
  let sumOfDay = rootDayOfWeekIndex;
  while (true) {
    if (targetYear > year) {
      for (let i = 0; i < 12; i++) {
        sumOfDay += getEndOfDay(year, month + i);
      }
      year++;
    } else if (targetYear === year) {
      if (targetMonth > month) {
        sumOfDay += getEndOfDay(year, month);
        month++;
      } else if (targetMonth === month) {
        return sumOfDay % 7;
      }
    }
  }
}

function onClickPrev() {
  currentMonth.value--;
  if (currentMonth.value <= 0) {
    currentMonth.value = 12;
    currentYear.value -= 1;
  }
  init();
}

function onClickNext() {
  currentMonth.value++;
  if (currentMonth.value > 12) {
    currentMonth.value = 1;
    currentYear.value += 1;
  }
  init();
}

function isToday(year, month, day) {
  const date = new Date();
  return (
    year === date.getFullYear() &&
    month === date.getMonth() + 1 &&
    day === date.getDate()
  );
}
import { ref, onMounted } from 'vue';
import { todoList } from './TodoList.vue';
const todoList = ref([date]);
function convertToCalendarFormat(todoList) {
  const calendarData = {};
  todoList.forEach((todo) => {
    const date = todo.date;
    if (!calendarData[date]) {
      calendarData[date] = [];
    }
    calendarData[date].push(todo);
  });
  return calendarData;
}
</script>

<style scoped>
.rounded {
  border-radius: 20px;
  border: solid 1px #ffffff;
  background-color: #2b6bd1;
  padding: 10px;
  color: #ffffff;
}
.table td {
  width: 150px; /* 각 날짜 칸의 너비를 조절하세요 */
  height: 150px; /* 각 날짜 칸의 높이를 조절하세요 */
}
.hoverable {
  cursor: pointer;
}
.hovered {
  background-color: #a1c4fd;
  color: #ffffff;
}
</style>
