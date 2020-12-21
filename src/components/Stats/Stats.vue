<template>
  <div class="stats-container" v-if="statsNames">
    <div v-for="stat in statsNames" :key="stat">
      <Chart
        :labels="makeGraphData(stats.stats[typeSelected][stat]).names"
        :dataSet="makeGraphData(stats.stats[typeSelected][stat]).values"
        :title="titleMap[stat]"
      ></Chart>
    </div>
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
    return {
      typeSelected: "players",
      titleMap:{
        "mostCptPts": "Most Captain Points",
        "mostPtsInRnd": "Most Points in Round",
        "mostTimesOver15": "Most Times Over 15 pts",
        "playersBestCaptainEfficiency": "Players Best Captain Efficiency",
        "playersDCTop10": "DC Top 10",
        "playersDLTop10": "DL Top 10",
        "playersDRTop10": "DR Top 10",
        "playersEnglandTop10": "England Top 10",
        "playersFranceTop10": "France Top 10",
        "playersGKTop10": "GK Top 10",
        "playersGermanyTop10": "Germany Top 10",
        "playersItalyTop10": "Italy Top 10",
        "playersMCTop10": "MC Top 10",
        "playersMLTop10": "ML Top 10",
        "playersMRTop10": "MR Top 10",
        "playersNetherlandsTop10": "Netherlands Top 10",
        "playersPortugalTop10": "Portugal Top 10",
        "playersSTTop10": "ST Top 10",
        "playersSpainTop10": "Spain Top 10",
        "playersTop10": "Players Top 10",
        "playersTurkeyTop10": "Turkey Top 10",
        "userBestScore": "User Best Round Score"
      }
    };
  },
  computed: {
    ...mapGetters(["stats"]),
    statsNames() {
      if (this.stats) {
        return Object.keys(this.stats.stats[this.typeSelected]);
      } else return undefined;
    },
    // mostCptPts() {
    //   if (this.stats) {
    //     const data = Object.values(this.stats.stats["mostCptPts"]).map(
    //       (x) => x.cptTotal
    //     );
    //     const labels = Object.values(this.stats.stats["mostCptPts"]).map(
    //       (x) => x.uid
    //     );
    //     return {
    //       data,
    //       labels,
    //     };
    //   } else {
    //     return undefined;
    //   }
    // },
  },
  methods: {
    ...mapActions(["fetchStats"]),
    makeGraphData(stat) {
      const names = stat.map((x) => x.name);
      const values = stat.map((x) => x.value);
      return {
        names,
        values,
      };
    },
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

.stats-container {
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width:100%;
  flex-wrap: wrap;
}
</style>