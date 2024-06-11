<template>
    <div class="calendar">
        <h2>
            <a href="#" @click.prevent="onClickPrev">◀</a>
            {{ currentYear }}년 {{ currentMonth }}월
            <a href="#" @click.prevent="onClickNext">▶</a>
        </h2>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th v-for="(weekName, index) in weekNames" :key="index">
                        {{ weekName }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(row, rowIndex) in currentCalendarMatrix"
                    :key="rowIndex"
                >
                    <td
                        v-for="(day, columnIndex) in row"
                        :key="columnIndex"
                        :class="{ hoverable: day }"
                        @mouseenter="day && (hoveredDay = day)"
                        @mouseleave="day && (hoveredDay = null)"
                        @click="day && selectDate(day)"
                        style="padding: 20px"
                    >
                        <span
                            :class="{
                                rounded: isToday(
                                    currentYear,
                                    currentMonth,
                                    day
                                ),
                                hovered: day === hoveredDay,
                            }"
                        >
                            {{ day }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Calendar',
    props: {
        currentYear: {
            type: Number,
            required: true,
        },
        currentMonth: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            weekNames: ['월', '화', '수', '목', '금', '토', '일'],
            rootYear: 1900,
            rootDayOfWeekIndex: 1,
            currentMonthStartWeekIndex: null,
            currentCalendarMatrix: [],
            endOfDay: null,
            hoveredDay: null,
        };
    },
    mounted() {
        this.init();
    },
    watch: {
        currentYear() {
            this.init();
        },
        currentMonth() {
            this.init();
        },
    },
    methods: {
        init() {
            this.currentMonthStartWeekIndex = this.getStartWeek(
                this.currentYear,
                this.currentMonth
            );
            this.endOfDay = this.getEndOfDay(
                this.currentYear,
                this.currentMonth
            );
            this.initCalendar();
        },
        initCalendar() {
            this.currentCalendarMatrix = [];
            let day = 1;
            for (let i = 0; i < 6; i++) {
                let calendarRow = [];
                for (let j = 0; j < 7; j++) {
                    if (i === 0 && j < this.currentMonthStartWeekIndex) {
                        calendarRow.push('');
                    } else if (day <= this.endOfDay) {
                        calendarRow.push(day);
                        day++;
                    } else {
                        calendarRow.push('');
                    }
                }
                this.currentCalendarMatrix.push(calendarRow);
            }
        },
        getEndOfDay(year, month) {
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
                    return (year % 4 === 0 && year % 100 !== 0) ||
                        year % 400 === 0
                        ? 29
                        : 28;
                default:
                    return 0;
            }
        },
        getStartWeek(year, month) {
            const rootDate = new Date(this.rootYear, 0, 1);
            const targetDate = new Date(year, month - 1, 1);
            const diffDays = Math.round(
                (targetDate - rootDate) / (1000 * 60 * 60 * 24)
            );
            return (diffDays + this.rootDayOfWeekIndex) % 7;
        },
        onClickPrev() {
            let newMonth = this.currentMonth - 1;
            if (newMonth <= 0) {
                this.$emit('update:month', 12);
                this.$emit('update:year', this.currentYear - 1);
            } else {
                this.$emit('update:month', newMonth);
            }
        },
        onClickNext() {
            let newMonth = this.currentMonth + 1;
            if (newMonth > 12) {
                this.$emit('update:month', 1);
                this.$emit('update:year', this.currentYear + 1);
            } else {
                this.$emit('update:month', newMonth);
            }
        },
        isToday(year, month, day) {
            const date = new Date();
            return (
                year === date.getFullYear() &&
                month === date.getMonth() + 1 &&
                day === date.getDate()
            );
        },
        selectDate(day) {
            this.$emit('select-date', {
                year: this.currentYear,
                month: this.currentMonth,
                day,
            });
        },
    },
};
</script>

<style scoped>
.hoverable {
    cursor: pointer;
}
.rounded {
    -moz-border-radius: 20px 20px 20px 20px;
    border-radius: 20px 20px 20px 20px;
    border: solid 1px #ffffff;
    background-color: #2b6bd1;
    padding: 10px;
    color: #ffffff;
}
.hovered {
    background-color: #a1c4fd;
    color: #ffffff;
}
.table td {
    width: 150px; /* 각 날짜 칸의 너비를 조절하세요 */
    height: 150px; /* 각 날짜 칸의 높이를 조절하세요 */
}
</style>
