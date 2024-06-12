<template>
  <div>
    <h1>가계부</h1>
    <input type="date" v-model="selectedDate" @change="fetchLedger" />
    <div v-if="ledger">
      <p>수입: {{ ledger.income }}</p>
      <p>지출: {{ ledger.expense }}</p>
    </div>
  </div>
</template>

<script>
import { getLedgerByDate } from '../services/LedgerService';

export default {
  data() {
    return {
      selectedDate: '',
      ledger: null,
    };
  },
  methods: {
    async fetchLedger() {
      try {
        this.ledger = await getLedgerByDate(this.selectedDate);
      } catch (error) {
        console.error('Error fetching ledger:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
