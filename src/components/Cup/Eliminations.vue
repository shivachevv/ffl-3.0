<template>
  <section class="elimination">
    <div class="elimination-matches sha">
      <div class="matches-header">
        <h2 class="up">Elimination Stage</h2>
      </div>
      <div class="elimination-stages">
        <h2 class="up">1/8 Finals</h2>
        <h2 class="up">1/4 Finals</h2>
        <h2 class="up">1/2 Finals</h2>
        <h2 class="up">Final</h2>
        <h2 class="up">1/2 Finals</h2>
        <h2 class="up">1/4 Finals</h2>
        <h2 class="up">1/8 Finals</h2>
      </div>

      <!-- ELIMINATION MATCHES FIELD -->
      <div class="elimination-matches-wrapper">
        <!-- 1/8 FINALS -->
        <div v-for="i in 8" :key="`e${i}`" :class="`sha up eight${i}`">
          <div class="row1">
            <!-- <img src="images/teamlogos/arbitragers.png" alt="" /> -->
            <span class="team1-name">{{ eightfinals[`ef${i}`].m1 }}</span>
            <span class="elim-total"></span>
          </div>
          <div class="row2">
            <span class="elimination-score match">0 - 0</span>
            <span class="elimination-score match">0 - 0</span>
          </div>
          <div class="row3">
            <!-- <img src="images/teamlogos/cocky-caucasians.png" alt="" /> -->
            <span class="team1-name">{{ eightfinals[`ef${i}`].m2 }}</span>
            <span class="elim-total"></span>
          </div>
        </div>

        <!-- 1/4 FINALS -->
        <div v-for="i in 4" :key="`q${i}`" :class="`sha up quarter${i}`">
          <div class="row1">
            <!-- <img src="images/teamlogos/arbitragers.png" alt="" /> -->
            <span class="team1-name">QF{{ i }}</span>
            <span class="elim-total"></span>
          </div>
          <div class="row2">
            <span class="elimination-score match">0 - 0</span>
            <span class="elimination-score match">0 - 0</span>
          </div>
          <div class="row3">
            <!-- <img src="images/teamlogos/cocky-caucasians.png" alt="" /> -->
            <span class="team1-name">QF{{ i }}</span>
            <span class="elim-total"></span>
          </div>
        </div>

        <!-- 1/2 FINALS -->
        <div v-for="i in 2" :key="`s${i}`" :class="`sha up semi${i}`">
          <div class="row1">
            <!-- <img src="images/teamlogos/arbitragers.png" alt="" /> -->
            <span class="team1-name">SF{{ i }}</span>
            <span class="elim-total"></span>
          </div>
          <div class="row2">
            <span class="elimination-score match">0 - 0</span>
            <span class="elimination-score match">0 - 0</span>
          </div>
          <div class="row3">
            <!-- <img src="images/teamlogos/cocky-caucasians.png" alt="" /> -->
            <span class="team1-name">SF{{ i }}</span>
            <span class="elim-total"></span>
          </div>
        </div>

        <!-- FINAL -->
        <div class="sha up final">
          <div class="row1">
            <!-- <img src="images/teamlogos/foolosophy-wanderers.png" alt="" /> -->
            <span class="team1-name">SF1 Winner</span>
          </div>
          <div class="row2 final-match">
            <span class="elimination-score match">0 - 0</span>
          </div>
          <div class="row3">
            <!-- <img src="images/teamlogos/kar6iaka-pedestrians.png" alt="" /> -->
            <span class="team1-name">SF2 Winner</span>
          </div>
        </div>

        <!-- 3/4 FINAL -->
        <div class="sha up littlefinal">
          <div class="row1">
            <!-- <img src="images/teamlogos/cocky-caucasians.png" alt="" /> -->
            <span class="team1-name">SF1 Defeated</span>
          </div>
          <div class="row2 little-final-match">
            <span class="elimination-score match">0 - 0</span>
          </div>
          <div class="row3">
            <!-- <img src="images/teamlogos/cheloprachene.png" alt="" /> -->
            <span class="team1-name">SF2 Defeated</span>
          </div>
        </div>

        <!-- <div class="winner up">
            <img src="images/cup-winner.png" alt="" srcset="" />
            <a href="https://ff-legends.com/foolosophy-wanderers.html"
              >Foolosophy Wanderers</a
            >
          </div> -->
      </div>
    </div>
  </section>
  <!-- </div> -->
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
// import cupStandingsHelper from "../../utils/cupStandingsHelper";
// import CupMatchPopup from "./CupMatchPopup";
// import Standings from "../H2H/Standings";

export default {
  name: "Eliminations",
  components: {},
  props: {},
  data() {
    return {
      eightfinals: {
        ef1: {
          m1: "A1",
          m2: "C4",
        },
        ef2: {
          m1: "A2",
          m2: "C3",
        },
        ef3: {
          m1: "A3",
          m2: "C2",
        },
        ef4: {
          m1: "A4",
          m2: "C1",
        },
        ef5: {
          m1: "B1",
          m2: "D4",
        },
        ef6: {
          m1: "B2",
          m2: "D3",
        },
        ef7: {
          m1: "B3",
          m2: "D2",
        },
        ef8: {
          m1: "B4",
          m2: "D1",
        },
      },
      //   selectedGroup: undefined,
      //   cupStandings: undefined,
      //   matchPopup: false,
      //   selectedMatch: undefined,
    };
  },
  computed: {
    // ...mapGetters(["cup", "users", "players"]),
    // isThereBye() {
    //   return Object.keys(this.selectedGroup.teams).length % 2 === 1;
    // },
    // playingTeams(){
    //   if (this.isThereBye) {
    //     return this.
    //   }
    // }
  },
  methods: {
    // ...mapActions(["fetchCup"]),
    // roundIntoArray(target) {
    //   return Object.values(target).slice(0, -1);
    // },
    // showByeTeam(i) {
    //   const roundNum = `r${i + 1}`;
    //   const round = this.selectedGroup.rounds[roundNum];
    //   const matches = Object.values(round).slice(0, -1);
    // console.log(round, matches);
    //   return this.selectedGroup.teams.filter((x) => {
    //     let teamsPlayed = [];
    //     matches.forEach((match) => {
    //       teamsPlayed.push(match.team1.      teamsPlayed.push(match.team2.    });
    //     if (!teamsPlayed.includes(x)) {
    //       return x;
    //     }
    //   })[0];
    // },
    // groupSelectionHandler(v) {
    //   return (this.selectedGroup = v);
    // },
    // calculateTeamPts(team) {
    //   // console.log("team", team);
    //   return Object.values(team).reduce((acc, player) => {
    //     return player.pts + acc;
    //   }, 0);
    // },
    // sortStandingsTeams(teams) {
    //   return Object.entries(teams)
    //     .sort((a, b) => {
    //       return b[1].goaldiff - a[1].goaldiff;
    //     })
    //     .sort((a, b) => {
    //       return b[1].pts - a[1].pts;
    //     });
    // },
    // openMatchPopupHandler(match) {
    //   this.deselectMatch();
    //   this.selectedMatch = match;
    //   return (this.matchPopup = true);
    // },
    // deselectMatch() {
    //   this.selectedMatch = undefined;
    // },
  },
  watch: {
    // cup(nv) {
    //   if (nv) {
    //     this.cupStandings = cupStandingsHelper(nv);
    //   }
    // },
  },
  async created() {
    // await this.fetchCup();
    // this.$vs.loading.close();
    // this.selectedGroup = Object.values(this.cup)[0];
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../common/breakpoints.scss";

.elimination {
  width: 130%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  margin: 20px 0 0 0;
  transition: all 0.3s;
  @media #{$mobile} {
    width: 98%;
  }

  .matches-header {
    width: 100%;

    h2 {
      width: 100%;
      background-color: #3c474d;
      color: #d3d3d3;
      border-bottom: 2px solid #893e40;
      height: 40px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 1.125rem;
    }
  }
}

/*************************************************************
********* ELIMINATION ***************************************/

.elimination-matches {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #d3d3d3;
}

.elimination-stages {
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #c6c6c6;
}

.elimination-stages h2 {
  width: 20%;
  text-align: center;
  font-size: 0.875rem;
}

.elimination-matches-wrapper {
  width: 100%;
  padding: 30px;
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(8, 1fr);

  @media #{$mobile} {
    grid-column-gap: 2px;
    grid-row-gap: 2px;
    padding: 0px;
  }
}

/********** ELIMINATION MATCHES POSITIONS ************/
.eight1 {
  grid-row: 1 / span 2;
  grid-column: 1 / span 2;
}
.eight2 {
  grid-row: 3 / span 2;
  grid-column: 1 / span 2;
}
.eight3 {
  grid-row: 5 / span 2;
  grid-column: 1 / span 2;
}
.eight4 {
  grid-row: 7 / span 2;
  grid-column: 1 / span 2;
}
.eight5 {
  grid-row: 1 / span 2;
  grid-column: 11 / span 2;
}
.eight6 {
  grid-row: 3 / span 2;
  grid-column: 11 / span 2;
}
.eight7 {
  grid-row: 5 / span 2;
  grid-column: 11 / span 2;
}
.eight8 {
  grid-row: 7 / span 2;
  grid-column: 11 / span 2;
}

.quarter1 {
  grid-row: 3 / span 2;
  grid-column: 3 / span 2;
}

.quarter2 {
  grid-row: 5 / span 2;
  grid-column: 3 / span 2;
}

.quarter3 {
  grid-row: 3 / span 2;
  grid-column: 9 / span 2;
}

.quarter4 {
  grid-row: 5 / span 2;
  grid-column: 9 / span 2;
}

.semi1 {
  grid-row: 3 / span 4;
  grid-column: 5 / span 2;
  align-self: center;
}

.semi2 {
  grid-row: 3 / span 4;
  grid-column: 7 / span 2;
  align-self: center;
}

.final {
  grid-row: 1 / span 2;
  grid-column: 5 / span 4;
}

.littlefinal {
  grid-row: 7 / span 2;
  grid-column: 5 / span 4;
}

.match {
  width: 100%;
  //   background-color: #c6c6c6;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  transition: all 0.3s;
}

.match:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.eight1 .row2,
.eight2 .row2,
.eight3 .row2,
.eight4 .row2,
.eight5 .row2,
.eight6 .row2,
.eight7 .row2,
.eight8 .row2 {
  font-weight: bold;
}
.quarter1 .row2,
.quarter2 .row2,
.quarter3 .row2,
.quarter4 .row2 {
  background-color: #9ec1d6;
  font-weight: bold;
}
// .quarter1:hover .row2,
// .quarter2:hover .row2,
// .quarter3:hover .row2,
// .quarter4:hover .row2 {
//   background-color: #a6aeb3;
// }

.semi1 .row2,
.semi2 .row2 {
  background-color: #5faed6;
  font-weight: bold;
}
// .semi1:hover .row2,
// .semi2:hover .row2 {
//   background-color: #222a2e;
// }

.littlefinal .row2 {
  background-color: #c05f61;
  font-weight: bold;
}
.final:hover .row2 {
  background-color: #692a2c;
}

.row1,
.row3 {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 1rem;
  text-align: center;
}

.row1 img,
.row3 img {
  width: 25px;
  position: absolute;
  left: 10px;
}

.row2 {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #bcc4c8;
  border-bottom: 1px solid #b1b2b2;
  border-top: 1px solid #b1b2b2;
  font-size: 1.125rem;

  @media #{$mobile} {
    flex-direction: column;
  }
}

.row2 a {
  right: 10px;
  top: 25%;
}

.semis {
  background-color: #3c474d;
  color: #d3d3d3;
}

.row2 a img {
  transition: all 0.3s;
}

.row2 a img:hover {
  transform: scale(1.2);
}

.final-match {
  background-color: #893e40;
  color: #d3d3d3;
  font-weight: bold;
}

.winner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.winner a {
  color: #3c474d;
  text-decoration: none;
  font-size: 1.125rem;
  margin: 20px 0 0 0;
}

.winner a:hover {
  text-decoration: underline;
}
</style>