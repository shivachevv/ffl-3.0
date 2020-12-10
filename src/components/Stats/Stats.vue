<template>
  <div class="stats-container" v-if="stats">
    <Chart
      :labels="mostCptPts.labels"
      :dataSet="mostCptPts.data"
      title="mostCptPts"
    ></Chart>
    12312312312
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const Chart = () => import("./Chart");

export default {
  name: "Stats",
  components: { Chart },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["stats"]),
    mostCptPts() {
      if (this.stats) {
        const data = Object.values(this.stats.stats["mostCptPts"]).map(
          (x) => x.cptTotal
        );
        const labels = Object.values(this.stats.stats["mostCptPts"]).map(
          (x) => x.uid
        );
        return {
          data,
          labels,
        };
      } else {
        return undefined;
      }

    },
  },
  methods: {
    ...mapActions(["fetchStats"]),
  },
  watch: {},
  async created() {
    this.fetchStats();
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../common/breakpoints.scss";

con-vs-popup .vs-popup {
  width: 70% !important;
}

.h2h-container {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  align-items: flex-start;
  background-color: #c6c6c6;
  position: relative;
  margin: 20px 0 0 0;
  @media #{$mobile} {
    width: 98%;
    flex-direction: column;
    align-items: center;
  }

  .h2h-standings {
    width: 50%;
    @media #{$mobile} {
      width: 98%;
    }
  }
}
</style>