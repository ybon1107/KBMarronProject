<template>
    <div class="calendar">
        <div>
            <h3>캘린더</h3>
        </div>
        <h2>
            <a href="#" @click.prevent="onClickPrev">◀</a>
            {{ currentYear }}년 {{ currentMonth }}월
            <a href="#" @click.prevent="onClickNext">▶</a>
        </h2>

        <div class="row mt-3">
            <div class="col">
                <h3 style="color: blue">
                    수입: {{ formatAmount(filteredTotalIncome) }} 원
                </h3>
            </div>
            <div class="col">
                <h3 style="color: red">
                    지출: {{ formatAmount(filteredTotalExpense) }} 원
                </h3>
            </div>
            <div class="col">
                <h3>
                    전체: {{ filteredTotalExpenseIncomeDiff < 0 ? '-' : ''
                    }}{{ formatAmount(filteredTotalExpenseIncomeDiff) }} 원
                </h3>
            </div>
        </div>

        <table class="table table-hover">
            <thead>
                <tr>
                    <td v-for="(weekName, index) in weekNames" :key="index">
                        {{ weekName }}
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in currentCalendarMatrix" :key="index">
                    <td
                        v-for="(day, index2) in row"
                        :key="index2"
                        style="padding: 20px"
                        @click="day !== '' && onDateClick(day)"
                    >
                        <span
                            v-if="
                                day !== '' &&
                                isToday(currentYear, currentMonth, day)
                            "
                            class="rounded"
                        >
                            {{ day }}
                        </span>
                        <span v-else>
                            {{ day }}
                        </span>
                        <div
                            v-if="day !== '' && getTodoForDate(day).length > 0"
                        >
                            <div
                                v-for="item in getTodoForDate(day)"
                                :key="item.id"
                            >
                                <span
                                    :style="{
                                        color:
                                            item.transaction === '수입'
                                                ? 'blue'
                                                : 'red',
                                    }"
                                >
                                    {{ item.amount }}
                                </span>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const weekNames = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
];
const rootYear = 1904;
const rootDayOfWeekIndex = 4; // 2000년 1월 1일은 토요일
const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth() + 1);
const todoList = ref([]);

let currentMonthStartWeekIndex = null;
let currentCalendarMatrix = [];
let endOfDay = null;

init();
onMounted(() => {
    fetchTodoList();
});

async function fetchTodoList() {
    try {
        const response = await axios.get('/api/todos');
        todoList.value = response.data.filter((item) => {
            const date = new Date(item.date);
            return (
                date.getMonth() === currentMonth.value - 1 &&
                date.getFullYear() === currentYear.value
            );
        });
        calculateTotals(); // 데이터 필터링 후 총합 계산
    } catch (error) {
        console.error('할 일 목록을 불러오는 데 실패했습니다:', error);
    }
}

function calculateTotals() {
    // 현재 달의 지출 총액 계산
    filteredTotalExpense.value = todoList.value.reduce((total, todo) => {
        if (
            todo.transaction === '지출' ||
            (todo.transaction === '이체' && todo.type === '출금')
        ) {
            total += parseInt(todo.amount);
        }
        return total;
    }, 0);

    // 현재 달의 수입 총액 계산
    filteredTotalIncome.value = todoList.value.reduce((total, todo) => {
        if (
            todo.transaction === '수입' ||
            (todo.transaction === '이체' && todo.type === '입금')
        ) {
            total += parseInt(todo.amount);
        }
        return total;
    }, 0);

    // 현재 달의 지출 수입 차액 계산
    filteredTotalExpenseIncomeDiff.value =
        filteredTotalIncome.value - filteredTotalExpense.value;
}

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
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
                ? 29
                : 28;
        default:
            console.log('알 수 없는 월입니다: ' + month);
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
                return (sumOfDay + 1) % 7;
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
    fetchTodoList(); // 이전 월로 이동 시 데이터 다시 가져오기
}

function onClickNext() {
    currentMonth.value++;
    if (currentMonth.value > 12) {
        currentMonth.value = 1;
        currentYear.value += 1;
    }
    fetchTodoList(); // 다음 월로 이동 시 데이터 다시 가져오기
}

function isToday(year, month, day) {
    const date = new Date();
    return (
        year === date.getFullYear() &&
        month === date.getMonth() + 1 &&
        day === date.getDate()
    );
}

function onDateClick(day) {
    if (day !== '') {
        const selectedDate = new Date(
            currentYear.value,
            currentMonth.value - 1,
            day
        );
        router.push({
            path: '/todos/add',
            query: { date: selectedDate.toISOString().split('T')[0] },
        });
    }
}

function getTodoForDate(day) {
    if (!todoList.value.length) {
        return [];
    }

    const selectedDate = new Date(
        currentYear.value,
        currentMonth.value - 1,
        day
    );
    return todoList.value.filter(
        (item) =>
            new Date(item.date).getDate() === selectedDate.getDate() &&
            new Date(item.date).getMonth() === selectedDate.getMonth() &&
            new Date(item.date).getFullYear() === selectedDate.getFullYear()
    );
}

const formatAmount = (amount) => {
    return new Intl.NumberFormat().format(Math.abs(amount));
};

// 현재 달의 지출 총액 계산
const filteredTotalExpense = ref(0);

// 현재 달의 수입 총액 계산
const filteredTotalIncome = ref(0);

// 현재 달의 지출 수입 차액 계산
const filteredTotalExpenseIncomeDiff = ref(0);
</script>

<style scoped>
.rounded {
    border-radius: 20px;
    border: solid 1px #ffffff;
    background-color: #ffcd28;
    padding: 10px;
    color: #ffffff;
}
.table td {
    width: 150px; /* 각 날짜 칸의 너비를 조절하세요 */
    height: 100px; /* 각 날짜 칸의 높이를 조절하세요 */
}
.table td:hover {
    background-color: #ffcc80; /* 연한 주황색 */
    cursor: pointer;
}
</style>
