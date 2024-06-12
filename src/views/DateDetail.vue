<template>
  <div>
    <h2>{{ date }}</h2>
    <p>수입: {{ ledger.income }}</p>
    <p>지출: {{ ledger.expense }}</p>
  </div>
</template>

<script>
import { getLedgerByDate } from '../services/ledgerService';

export default {
  data() {
    return {
      date: '',
      ledger: null,
    };
  },
  mounted() {
    this.date = this.$route.params.date;
    this.fetchLedger();
  },
  methods: {
    async fetchLedger() {
      try {
        this.ledger = await getLedgerByDate(this.date);
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
