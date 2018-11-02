<template>
  <div>
  </div>

</template>
<script type="text/javascript">
  /* eslint-disable */
  //import { Toast } from 'quasar'
  export default {
    data () {
      return {
        minExpenses: 0,
        minIncome: 0,
        maxIncome: 5000,
        currentIncome: 998,
        currentExpenses: 125,
        doubleRangeMinMax: {
          min: 0,
          max: 5000
        }
      }
    },
    watch: {
      currentIncome () {
        if (this.currentIncome < this.currentExpenses){
          this.currentExpenses = this.currentIncome
          //Toast.create.negative({html: `You're in financial trouble.`})
        }
      }
    },
    computed: {
      maxExpenses () {
        return this.currentIncome
      }

    },
    props: ['cardTitle'],
  }
</script>
<style scoped>
</style>
