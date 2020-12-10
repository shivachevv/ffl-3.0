<template>
  <div
    class="cup-container"
    v-if="users && cup && selectedGroup && cupStandings"
  >
    <vs-popup
      @close="deselectMatch"
      v-if="players && selectedMatch"
      class="holamundo"
      :title="`${users[selectedMatch.team1.id].userTeam} vs ${
        users[selectedMatch.team2.id].userTeam
      }`"
      :active.sync="matchPopup"
      stylePopup="width:70%"
    >
      <CupMatchPopup :players="players" :match="selectedMatch" :users="users" />
    </vs-popup>
    <div class="cup-menu">
      <div class="cup-header">
        <h2 class="up">Battle Stages</h2>
      </div>

      <div class="cup-stages">
        <a
          href="#"
          class="sha cup-stages-links up"
          :class="{ selected: group.name === selectedGroup.name }"
          v-for="group in cupGroups"
          @click.prevent="groupSelectionHandler(group)"
          :key="group.name"
          >{{ group.name }}</a
        >
        <a
          href="#"
          class="sha cup-stages-links up"
          :class="{ selected: selectedGroup === 'elimination' }"
          @click.prevent="groupSelectionHandler(`elimination`)"
          >Elimination</a
        >
      </div>
    </div>

    <!-- GROUP A -->
    <section class="group-a">
      <!-- <div class="group-left">
        <img src="images/group-a.webp" alt="Group A" srcset="" />
      </div> -->
      <div class="group-center">
        <Standings
          v-if="cupStandings[selectedGroup.name]"
          :standings="cupStandings[selectedGroup.name]"
          :users="users"
          :title="`Group ${selectedGroup.name}`"
          type="cup"
        />
        <!-- GROUP MATCHES -->

        <div class="group-matches sha" v-if="selectedGroup !== 'elimination'">
          <div class="matches-header">
            <h2 class="up">Group Matches</h2>
          </div>

          <!-- GAMEWEEKS -->

          <div
            class="gameweeks up"
            v-for="(round, i) in Object.values(selectedGroup.rounds)"
            :key="i"
          >
            <div class="gameweeks-header">
              <h2 class="up">Gameweek {{ i + 1 }}</h2>
            </div>
            <div
              class="gameweeks-match-wrapper"
              v-for="(match, i) in roundIntoArray(round)"
              :key="i"
              @click="openMatchPopupHandler(match)"
            >
              <span class="team1">{{ users[match.team1.id].userTeam }}</span>
              <img
                :src="
                  require(`@/assets/images/team-logos/${
                    users[match.team1.id].userLogo
                  }.webp`)
                "
                alt=""
                srcset=""
              />
              <span class="score" v-if="match.team1.squad && match.team2.squad"
                >{{ calculateTeamPts(match.team1.squad) }} -
                {{ calculateTeamPts(match.team2.squad) }}</span
              >
              <span class="score" v-else> - </span>

              <img
                :src="
                  require(`@/assets/images/team-logos/${
                    users[match.team2.id].userLogo
                  }.webp`)
                "
                alt=""
                srcset=""
              />
              <span class="team2">{{ users[match.team2.id].userTeam }}</span>
              <!-- <a href="#" class="match-details"
                ><img
                  :src="require(`@/assets/images/cup/soccer-field.png`)"
                  alt=""
              /></a> -->
            </div>

            <span class="bye-team up" v-if="isThereBye"
              ><img
                :src="
                  require(`@/assets/images/team-logos/${
                    users[showByeTeam(i)].userLogo
                  }.webp`)
                "
                alt=""
              />{{ users[showByeTeam(i)].userTeam }} - bye</span
            >
          </div>
        </div>
        <Eliminations v-if="selectedGroup === 'elimination'" />
         
      </div>
      <!-- <div class="group-right">
        <img src="images/cup.png" alt="Group A" srcset="" />
      </div> -->
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import cupStandingsHelper from "../../utils/cupStandingsHelper";
// import CupMatchPopup from "./CupMatchPopup";
// import Standings from "../H2H/Standings";
// import Eliminations from "./Eliminations";
const CupMatchPopup = () => import("./CupMatchPopup");
const Standings = () => import("../H2H/Standings");
const Eliminations = () => import("./Eliminations");

export default {
  name: "Cup",
  components: {
    CupMatchPopup,
    Standings,
    Eliminations
  },
  props: {},
  data() {
    return {
      selectedGroup: undefined,
      cupStandings: undefined,
      matchPopup: false,
      selectedMatch: undefined,
    };
  },
  computed: {
    ...mapGetters(["cup", "users", "players"]),
    isThereBye() {
      return Object.keys(this.selectedGroup.teams).length % 2 === 1;
    },
    cupGroups(){
      return Object.values(this.cup)
      .filter(x=>{
        if (x.name === "A" || x.name === "B" || x.name === "C" || x.name === "D") {
          return x
        }
      })
    }
    // playingTeams(){
    //   if (this.isThereBye) {
    //     return this.
    //   }
    // }
  },
  methods: {
    ...mapActions(["fetchCup"]),
    roundIntoArray(target) {
      return Object.values(target).slice(0, -1);
    },
    showByeTeam(i) {
      const roundNum = `r${i + 1}`;
      const round = this.selectedGroup.rounds[roundNum];
      const matches = Object.values(round).slice(0, -1);

      // console.log(round, matches);

      return this.selectedGroup.teams.filter((x) => {
        let teamsPlayed = [];
        matches.forEach((match) => {
          teamsPlayed.push(match.team1.id);
          teamsPlayed.push(match.team2.id);
        });
        if (!teamsPlayed.includes(x)) {
          return x;
        }
      })[0];
    },
    groupSelectionHandler(v) {
      return (this.selectedGroup = v);
    },
    calculateTeamPts(team) {
      // console.log("team", team);
      return Object.values(team).reduce((acc, player) => {
        return player.pts + acc;
      }, 0);
    },
    sortStandingsTeams(teams) {
      return Object.entries(teams)
        .sort((a, b) => {
          return b[1].goaldiff - a[1].goaldiff;
        })
        .sort((a, b) => {
          return b[1].pts - a[1].pts;
        });
    },
    openMatchPopupHandler(match) {
      this.deselectMatch();
      this.selectedMatch = match;
      return (this.matchPopup = true);
    },
    deselectMatch() {
      this.selectedMatch = undefined;
    },
  },
  watch: {
    cup(nv) {
      if (nv) {
        this.cupStandings = cupStandingsHelper(nv);
      }
    },
  },
  async created() {
    await this.fetchCup();
    this.$vs.loading.close();
    this.selectedGroup = Object.values(this.cup)[0];
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

.cup-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #c6c6c6;
  position: relative;
  margin: 20px 0 0 0;
  @media #{$mobile} {
    width: 98%;
  }
}

.cup-menu {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #c6c6c6;
  @media #{$mobile} {
    width: 100%;
  }
}

.cup-header {
  width: 100%;
}

.cup-header h2 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #3c474d;
  color: #d3d3d3;
  font-size: 1.5rem;
  border-bottom: 5px solid #893e40;
}

.cup-stages {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  margin: 20px 0 0 0;
  color: #d3d3d3;
  font-size: 1.25rem;
  @media #{$mobile} {
    justify-content: space-between;
  }
}

.cup-stages-links {
  width: 19%;
  height: 100%;
  background-color: #893e40;
  color: #d3d3d3;
  font-size: 1.25rem;
  border-bottom: 5px solid #3c474d;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s;
  @media #{$mobile} {
    margin: 0px;
    width: 24%;
  }
}

.cup-stages-links:hover {
  text-decoration: underline;
  background-color: #712f32;
}

.cup-stages-links:nth-child(2),
.cup-stages-links:nth-child(4) {
  margin: 0 20px;
  @media #{$mobile} {
    margin: 2px;
    width: 24%;
  }
}

.selected {
  background-color: #3c474d;
  border: 3px solid #893e40;
}

.selected::before {
  position: absolute;
  content: "";
  width: 5px;
  height: 20px;
  top: -23px;
  left: 49%;
  background-color: #893e40;
}

/**************************************************
****************  GROUPS **************************/
.group-a,
.group-b,
.group-c,
.group-d{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  margin: 20px 0 0 0;
  transition: all 0.3s;
}


// .elimination {
//   width: 130%;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
//   align-items: flex-start;
//   margin: 20px 0 0 0;
//   transition: all 0.3s;
// }

.group-left,
.group-right {
  width: 25%;
  margin: 0 20px;
}

.group-left img,
.group-right img {
  width: 100%;
}

.group-center {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media #{$mobile} {
    width: 100%;
  }
}

/******** GAMEWEEKS *********************/
.group-matches {
  width: 80%;
  background-color: #cccccc;
  margin: 20px 0 0 0;
  @media #{$mobile} {
    width: 100%;
  }
}

// .gameweeks {
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
//   @media #{$mobile} {
//     width: 100%;
//   }
// }

.matches-header {
  width: 100%;
}

.matches-header h2 {
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

.gameweeks {
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #3c474d;
  position: relative;
  @media #{$mobile} {
    padding: 5px;
  }
}

.gameweeks-header {
  width: 100%;
  border-bottom: 1px solid #3c474d;
  font-size: 0.875rem;
  padding: 0 0 5px 0;
}

.gameweeks-match-wrapper {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #b1b2b2;
  text-align: center;
  transition: all 0.4s;
  font-size: 0.9rem;
  font-weight: bold;
}

.gameweeks-match-wrapper:hover {
  background-color: #bbbbbb;
  cursor: pointer;
}

.gameweeks-match-wrapper .team1,
.gameweeks-match-wrapper .team2 {
  width: 37%;
}

.gameweeks-match-wrapper .score {
  width: 10%;
  @media #{$mobile} {
    width: 20%;
  }
}

.gameweeks-match-wrapper img {
  width: 5%;
}

.match-details {
  position: absolute;
  right: 30px;
  @media #{$mobile} {
    display: none;
  }
}

.match-details img {
  width: 20px;
  transition: all 0.2s;
}

.match-details img:hover {
  transform: scale(1.5);
}

.bye-team {
  margin: 20px 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.bye-team img {
  width: 30px;
  margin: 0 10px 0 0;
}


</style>