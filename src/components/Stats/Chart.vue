<script>
import { Bar } from "vue-chartjs";

export default {
  name: "Chart",
  extends: Bar,
  props: {
    dataSet: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      options: {
        maintainAspectRatio: false,
        gridLines: {
          display: false
        },
        responsive: true,
        legend: {
          position: "top",
          labels: {
            fontSize: 16
          }
        },
        hover: {
          mode: "label"
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true
              }
            }
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                steps: 4,
                stepValue: 10,
                // max: 100
              }
            }
          ]
        }
      }
    };
  },
  computed: {
    chartdata() {
      if (this.dataSet) {
        return {
          labels: this.labels,
          datasets: [
            {
              label: this.title,
              backgroundColor: "#157019",
              borderColor: "none",
              data: this.dataSet
            }
          ]
        };
      } else {
        return "";
      }
    }
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>

<style>
</style>