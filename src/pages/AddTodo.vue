<template>
    <div class="row">
        <div class="col p-3">
            <h2>가계부</h2>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label htmlfor="transaction">거래 유형:</label><br />
                <label>
                    <input
                        type="radio"
                        v-model="todoItem.transaction"
                        value="수입"
                    />
                    수입
                </label>
                <label>
                    <input
                        type="radio"
                        v-model="todoItem.transaction"
                        value="지출"
                    />
                    지출
                </label>
                <label>
                    <input
                        type="radio"
                        v-model="todoItem.transaction"
                        value="이체"
                    />
                    이체
                </label>
            </div>
            <div class="form-group">
                <label htmlfor="date">날짜:</label>
                <input
                    type="date"
                    class="form-control"
                    id="date"
                    v-model="todoItem.date"
                />
            </div>
            <div class="form-group">
                <label htmlFor="amount">금액 :</label>
                <input
                    type="text"
                    class="form-control"
                    id="amount"
                    v-model="todoItem.amount"
                    @keypress="allowOnlyNumbers"
                />
            </div>
            <div class="form-group">
                <label for="type">분류:</label>
                <select class="form-control" id="type" v-model="todoItem.type">
                    <option disabled value="">분류 선택</option>
                    <option v-for="type in types" :key="type" :value="type">
                        {{ type }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="asset">자산:</label>
                <select
                    class="form-control"
                    id="asset"
                    v-model="todoItem.asset"
                >
                    <option disabled value="">자산 선택</option>
                    <option v-for="asset in assets" :key="asset" :value="asset">
                        {{ asset }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label htmlFor="memo">내용 :</label>
                <input
                    type="text"
                    class="form-control"
                    id="memo"
                    v-model="todoItem.memo"
                />
            </div>
            <div class="form-group">
                <button
                    type="button"
                    class="btn btn-primary m-1"
                    @click="addTodoHandler"
                >
                    저 장
                </button>
                <button
                    type="button"
                    class="btn btn-primary m-1"
                    @click="router.push('/todos')"
                >
                    취 소
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { addTodo } = inject('actions');
const todoItem = ref({
    date: '',
    memo: '',
    asset: '',
    transaction: '',
    amount: 0,
    type: '',
});
const types = ['월세', '교통', '식비', '기타'];
const assets = ['카드', '현금', '이체'];

const addTodoHandler = () => {
    const { date, memo, asset, transaction, amount, type } = todoItem.value;
    if (!date || !memo || !asset || !transaction || !amount || !type) {
        alert('모든 필드를 입력해주세요.');
        return;
    }
    // 수입인 경우 '+'를 추가합니다.
    if (transaction === '수입') {
        todoItem.value.amount = todoItem.value.amount;
    }
    // 지출 또는 이체인 경우 '-'를 추가하고 빨간색으로 변경합니다.
    else {
        todoItem.value.amount = todoItem.value.amount;
    }
    addTodo({ ...todoItem.value }, () => {
        router.push('/todos');
    });
};
onMounted(() => {
    const dateParam = router.currentRoute.value.query.date;
    if (dateParam) {
        todoItem.value.date = dateParam;
    }
});
// 숫자 이외의 키 입력시 막음
const allowOnlyNumbers = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
    }
};
</script>
<style scoped>
/* 금액 색상을 파란색으로 설정합니다. */
.text-blue {
    color: blue;
}

/* 금액 색상을 빨간색으로 설정합니다. */
.text-red {
    color: red;
}
</style>
