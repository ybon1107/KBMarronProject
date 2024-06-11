<template>
    <div>
        <Calendar
            v-if="showCalendar"
            :currentYear="currentYear"
            :currentMonth="currentMonth"
            @update:year="updateYear"
            @update:month="updateMonth"
            @select-date="onSelectDate"
        />
        <Ledger
            v-else
            :selectedDate="selectedDate"
            @go-back="showCalendarAgain"
        />
    </div>
</template>

<script>
import Calendar from './Calendar.vue';
import Ledger from './Ledger.vue';

export default {
    name: 'ParentComponent',
    components: {
        Calendar,
        Ledger,
    },
    data() {
        return {
            currentYear: new Date().getFullYear(),
            currentMonth: new Date().getMonth() + 1,
            showCalendar: true,
            selectedDate: null, // 선택된 날짜를 저장할 데이터
        };
    },
    methods: {
        updateYear(newYear) {
            this.currentYear = newYear;
        },
        updateMonth(newMonth) {
            this.currentMonth = newMonth;
        },
        onSelectDate(selectedDate) {
            this.selectedDate = selectedDate; // Calendar 컴포넌트에서 선택된 날짜를 저장
            this.showCalendar = false; // Ledger 컴포넌트를 표시하기 위해 showCalendar를 false로 설정
        },
        showCalendarAgain() {
            this.showCalendar = true;
        },
    },
};
</script>
