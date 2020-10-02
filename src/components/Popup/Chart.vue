<script>
import { Bar } from "vue-chartjs";

export default {
  name: "Chart",
  extends: Bar,
  props: {
    rounds: {
      type: Array,
      required: true
    }
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
            fontSize: 12
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
                max: 40
              }
            }
          ]
        }
      }
    };
  },
  computed: {
    chartdata() {
      if (this.rounds) {
        return {
          labels: this.rounds.map((x, i) => i),
          datasets: [
            {
              label: "Points per round",
              backgroundColor: "#157019",
              borderColor: "none",
              data: this.rounds
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