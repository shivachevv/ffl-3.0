<script>
import { Bar } from "vue-chartjs";

export default {
  name: "Chart",
  extends: Bar,
  props: {
    dataSet: {
      type: Array,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      chartWidth: undefined,
      options: {
        // maintainAspectRatio: false,
        gridLines: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "top",
          labels: {
            fontSize: 16,
          },
        },
        hover: {
          mode: "label",
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                steps: 4,
                stepValue: 10,
                // max: 100
              },
            },
          ],
        },
      },
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
              data: this.dataSet,
            },
          ],
        };
      } else {
        return "";
      }
    },
  },
  created() {
    // const width = window.innerWidth;
    // this.chartWidth = width > 500 ? '400px' : "100%";
    // console.log(this.chartWidth);
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);

    // const charts = document.querySelectorAll("canvas");
    // charts.forEach(() => {
      // console.log(chart);
      // chart.style.height = this.chartWidth;
      // chart.style.width = this.chartWidth;
    // });
  },
};
</script>

<style>
</style>