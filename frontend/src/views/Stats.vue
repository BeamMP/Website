<template>
  <div class="container mx-auto mt-8">
    <h1 class="text-4xl font-bold mb-4">Project Metrics</h1>

    <!-- Timeseries Graph -->
    <div v-if="dataLoaded">
      <!--<Plotly :data="graphData" :layout="graphLayout" />-->
    </div>

    <!-- Metrics -->
    <div class="mt-8">
      <p><strong>Concurrent Players (All Time High):</strong> {{ allTimeHigh }}</p>
      <p><strong>Players Online Now:</strong> {{ playersOnlineNow }}</p>
      <p><strong>Servers Online Now:</strong> {{ serversOnlineNow }}</p>
    </div>
  </div>
</template>

<script>
/*import Plotly from '@/components/stats/Plotly.vue'*/
import axios from 'axios'

export default {
  components: {
    //Plotly,
  },
  data() {
    return {
      // Sample Data
      graphData: [
        {
          x: ['2023-01-01', '2023-01-02', '2023-01-03'],
          y: [10, 15, 8],
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Concurrent Players',
        },
      ],
      graphLayout: {
        title: 'Concurrent Players Over Time',
        xaxis: {
          autorange: true,
          range: ['2015-02-17', '2017-02-16'],
          rangeselector: {buttons: [
              {
                count: 24,
                label: '24h',
                step: 'hour',
                stepmode: 'backward'
              },
              {
                count: 7,
                label: '7d',
                step: 'day',
                stepmode: 'backward'
              },
              {
                count: 1,
                label: '1m',
                step: 'month',
                stepmode: 'backward'
              },
              {
                count: 6,
                label: '6m',
                step: 'month',
                stepmode: 'backward'
              },
              {
                count: 12,
                label: '1y',
                step: 'month',
                stepmode: 'backward'
              },
              {step: 'all'}
            ]},
          rangeslider: {range: ['2015-02-17', '2017-02-16']},
          type: 'date'
        },
        yaxis: {
          title: 'Concurrent Players',
          autorange: true,
          range: [86.8700008333, 138.870004167],
          type: 'linear'
        }
      },
      allTimeHigh: 20,
      playersOnlineNow: 12,
      serversOnlineNow: 3,
      dataLoaded: false,
      timePeriod: 'today'
    };
  },
  methods: {
    setTimeRange(range) {
      // Update graph data based on the selected time range
      // You need to implement the logic to fetch data from your backend here
      console.log(`Updating graph for ${range}`);
    },
    getData() {
      axios
        .get(`https://backend.beammp.com/stats-info?period=${this.timePeriod}`)
        .then(res => {
          console.log(res)
          const data = [];
          var Labels = [];
          var Players = [];
          if (res.data.v2history) {
            res.data.v2history.forEach(function(item, index) {
              Labels.push(item.datetime)
              Players.push(item.players)
            })
            this.graphData[0].x = Labels
            this.graphData[0].y = Players
            this.allTimeHigh = res.data.maxp
            console.log('Data Downloaded & Sorted')
            this.dataLoaded = true
          }
        })
    }
  },
  beforeMount() {
    this.getData();
  },
};
</script>

<style scoped>
/* Add Tailwind CSS styles as needed */
</style>
