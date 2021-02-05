<template>
  <div class="container" v-if="stats && statsNames && typeSelected">
    <div class="stats-header sha">
      <h1>FFL Statistics Page</h1>
    </div>
    <vs-tabs :color="colorx">
      <vs-tab
        @click="statsSelectHandler(`${category}`)"
        :label="category | capitalize"
        v-for="category in Object.keys(statsNames)"
        :key="category"
      >
        <div class="con-tab-ejemplo stats-container">
          <div
            v-for="stat in statsNames[typeSelected]"
            :key="stat"
            class="chart"
          >
            <Chart
              :labels="makeGraphData(stats[typeSelected][stat]).names"
              :dataSet="makeGraphData(stats[typeSelected][stat]).values"
              :title="titleMap[stat]"
            ></Chart>
          </div>
        </div>
      </vs-tab>
      <!-- <vs-tab @click="statsSelectHandler('clubs')" label="Clubs Stats">
        <div class="con-tab-ejemplo stats-container">
          <div
            v-for="stat in statsNames[typeSelected]"
            :key="stat"
            class="chart"
          >
            <Chart
              :labels="makeGraphData(stats[typeSelected][stat]).names"
              :dataSet="makeGraphData(stats[typeSelected][stat]).values"
              :title="titleMap[stat]"
            ></Chart>
          </div>
        </div>
      </vs-tab>
      <vs-tab @click="statsSelectHandler('draft')" label="Draft Stats">
        <div class="con-tab-ejemplo stats-container">
          <div
            v-for="stat in statsNames[typeSelected]"
            :key="stat"
            class="chart"
          >
            <Chart
              :labels="makeGraphData(stats[typeSelected][stat]).names"
              :dataSet="makeGraphData(stats[typeSelected][stat]).values"
              :title="titleMap[stat]"
            ></Chart>
          </div>
        </div>
      </vs-tab> -->
      <!-- <vs-tab @click="colorx = 'danger'" label="Danger">
        <div class="con-tab-ejemplo">
          Danger
        </div>
      </vs-tab>
      <vs-tab @click="colorx = 'warning'" label="Warning">
        <div class="con-tab-ejemplo">
          Warning
        </div>
      </vs-tab>
      <vs-tab @click="colorx = 'dark'" label="Dark">
        <div class="con-tab-ejemplo">
          Dark
        </div>
      </vs-tab>
        <vs-tab @click="colorx = 'rgb(16, 233, 179)'" label="RGB | HEX">
        <div class="con-tab-ejemplo">
          RGB | HEX
        </div>
      </vs-tab> -->
    </vs-tabs>
    <!-- <div class="stats-container" v-if="statsNames">
    <div v-for="stat in statsNames" :key="stat">
      <Chart
        :labels="makeGraphData(stats.stats[typeSelected][stat]).names"
        :dataSet="makeGraphData(stats.stats[typeSelected][stat]).values"
        :title="titleMap[stat]"
      ></Chart>
    </div> -->
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
      colorx: "#3d474d",
      typeSelected: "players",
      titleMap: {
        mostCptPts: "Most Captain Points",
        mostPtsInRnd: "Most Points in Round",
        mostTimesOver15: "Most Times Over 15 pts",
        playersBestCaptainEfficiency: "Players Best Captain Efficiency",
        playersDCTop10: "DC Top 10",
        playersDLTop10: "DL Top 10",
        playersDRTop10: "DR Top 10",
        playersEnglandTop10: "England Top 10",
        playersFranceTop10: "France Top 10",
        playersGKTop10: "GK Top 10",
        playersGermanyTop10: "Germany Top 10",
        playersItalyTop10: "Italy Top 10",
        playersMCTop10: "MC Top 10",
        playersMLTop10: "ML Top 10",
        playersMRTop10: "MR Top 10",
        playersNetherlandsTop10: "Netherlands Top 10",
        playersPortugalTop10: "Portugal Top 10",
        playersSTTop10: "ST Top 10",
        playersSpainTop10: "Spain Top 10",
        playersTop10: "Players Top 10",
        playersTurkeyTop10: "Turkey Top 10",
        userBestScore: "User Best Round Score",
        clubsMostPlayers: "Clubs With Most Players",
        clubsMostPlayersMaradona: "Clubs With Most Players Maradona League",
        clubsMostPlayersPele: "Clubs With Most Players Pele League",
        leaguesPlayersTop100: "Leagues with players in top 100",
        playersPerLeagueActive: "Active players per country",
        playersPerLeagueActiveMaradona:
          "Active players per country in Maradona",
        playersPerLeagueActivePele: "Active players per country in Pele",
        teamsByLeague: "Chosen players by team in league",
        teamsPlayersTop100: "Teams with players in top 100",
        draftOriginalMaradona: "Original teams total points in Maradona",
        draftOriginalPele: "Original teams total points in Pele",
        draftPlayersIn: "Count of draft players still in",
        draftTop5Maradona: "Top 5 players total in Maradona",
        draftTop5Pele: "Top 5 players total in Pele",
        draftBestPickPele: "Best Draft Pick in Pele",
        draftBestPickMaradona: "Best Draft Pick in Maradona",
      },
      statsNames: {
        players: [
          "mostPtsInRnd",
          "userBestScore",
          "mostCptPts",
          "playersBestCaptainEfficiency",
          "playersTop10",
          "playersGKTop10",
          "playersDLTop10",
          "playersDCTop10",
          "playersDRTop10",
          "playersMLTop10",
          "playersMCTop10",
          "playersMRTop10",
          "playersSTTop10",
          "playersEnglandTop10",
          "playersFranceTop10",
          "playersGermanyTop10",
          "playersItalyTop10",
          "playersSpainTop10",
          "playersNetherlandsTop10",
          "playersPortugalTop10",
          "playersTurkeyTop10",
          "mostTimesOver15",
        ],
        clubs: [
          "clubsMostPlayers",
          "clubsMostPlayersMaradona",
          "clubsMostPlayersPele",
          "leaguesPlayersTop100",
          "playersPerLeagueActive",
          "playersPerLeagueActiveMaradona",
          "playersPerLeagueActivePele",
          "teamsByLeague",
          "teamsPlayersTop100",
        ],
        draft: [
          "draftOriginalMaradona",
          "draftOriginalPele",
          "draftPlayersIn",
          "draftTop5Maradona",
          "draftTop5Pele",
          "draftBestPickPele",
          "draftBestPickMaradona",
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["stats"]),
    // statsNames() {
    //   if (this.stats) {
    //     console.log(Object.keys(this.stats.stats[this.typeSelected]))
    //     return Object.keys(this.stats.stats[this.typeSelected]);
    //   } else return undefined;
    // },
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
    statsSelectHandler(value) {
      this.typeSelected = value;
    },
  },
  watch: {},
  async created() {
    this.fetchStats();
  },
  filters: {
    capitalize: function (value) {
      return value.charAt(0).toUpperCase() + value.slice(1) + " Stats";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../common/breakpoints.scss";

.container {
  width: 80%;
  @media #{$mobile} {
    width: 100%;
  }

  .stats-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #3d474d;
    border-bottom: 5px solid #863d3e;
    margin: 20px 0 20px 0;

    h1 {
      font-size: 2rem;
      color: #c6c6c6;
    }
  }
  .stats-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;

    .chart {
      width: 100%;
    }
  }
}
</style>