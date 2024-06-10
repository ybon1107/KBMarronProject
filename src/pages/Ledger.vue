<template>
    <div class="ledger">
        <h2>가계부</h2>
        <div class="ledger-form">
            <label for="type">유형:</label>
            <input type="text" v-model="type" id="type" />

            <label for="asset">자산:</label>
            <input type="text" v-model="asset" id="asset" />

            <label for="amount">금액:</label>
            <input type="number" v-model="amount" id="amount" />

            <label for="date">날짜:</label>
            <input type="date" v-model="date" id="date" />

            <label for="memo">메모:</label>
            <input type="text" v-model="memo" id="memo" />

            <button @click="submitEntry">입력</button>
        </div>

        <h3>가계부 내역</h3>
        <ul>
            <li v-for="entry in ledger" :key="entry.id">
                {{ entry.type }} | {{ entry.asset }} | {{ entry.amount }} |
                {{ entry.date }} | {{ entry.memo }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Ledger',
    data() {
        return {
            type: '',
            asset: '',
            amount: 0,
            date: '',
            memo: '',
            ledger: [], // db.json의 내용을 받을 배열
        };
    },
    methods: {
        submitEntry() {
            // 입력된 내용을 ledger 배열에 추가하는 로직
            const newEntry = {
                type: this.type,
                asset: this.asset,
                amount: this.amount,
                date: this.date,
                memo: this.memo,
            };
            this.ledger.push(newEntry);

            // 입력 후 입력 칸 초기화
            this.type = '';
            this.asset = '';
            this.amount = 0;
            this.date = '';
            this.memo = '';

            axios
                .post('/api/ledger', newEntry) // 실제 API 엔드포인트로 수정
                .then((response) => {
                    console.log(response.data);
                    // 서버에서 응답을 받아 처리
                })
                .catch((error) => {
                    console.error('Error submitting entry:', error);
                });
        },
        fetchLedgerFromDB() {
            // db.json 파일에서 가계부 데이터를 가져오는 로직
            fetch('/path/to/db.json') // 실제 경로로 수정해주세요.
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    this.ledger = data.ledger;
                })
                .catch((error) => {
                    console.error(
                        'There was a problem with your fetch operation:',
                        error
                    );
                });
        },
    },
    mounted() {
        this.fetchLedgerFromDB(); // 페이지가 로드될 때 db.json으로부터 가계부 데이터를 가져옴
    },
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>
