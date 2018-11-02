<template>
  <div class="card bg-white">
    <div class="card-title bg-teal text-white">
      {{cardTitle}}
      <div class=" float-right">
        <q-fab icon="keyboard_arrow_left" direction="left"  classNames="primary">
        </q-fab>
        <button class="primary circular raised gt-sm inline" @click="toImage()">
          <i>portrait</i>
        </button>
      </div>
    </div>
    <div class="card-content">
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>
<script type="text/javascript">
  /* eslint-disable */
  import Chart from 'chart.js'
  export default {
    data () {
      return {
        type: 'horizontalBar',
        chart: '',
      }
    },
    props: {
      data: {
        type: Object,
        required: true
      },
      cardTitle: {
        default () { return 'Graph'}
      }
    },
    watch: {
      data () {
        this.startChart()
      },
      type () {
        this.chart.destroy()
        this.startChart()
      }
    },
    computed: {
      dataForChart () {
        return {
          labels: Object.keys(this.data),
          datasets: [{
            data: Object.values(this.data),
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ]
          }]
        }
      }
    },
    methods: {
      startChart () {
        let axesStartFromZero = [{
          ticks: {
            beginAtZero:true
          }
        }]
        this.chart = new Chart(this.$refs.chart,
          {
            type: this.type,
            data: this.dataForChart,
            options: {
              legend: {
                display: false
              },
              scales: {
                yAxes: axesStartFromZero,
                xAxes: axesStartFromZero
              }
            }
          })
      },
      toImage () {
        window.open(this.chart.toBase64Image());
      }
    }
  }
</script>
<style scoped>

</style>
