<template>
  <div class="h2h-container" v-if="users && h2h && currentRound && players">
      <H2HRounds v-if="h2h" :rounds="h2h" :users="users" :currentRound="currentRound" :players="players"/>
    <div class="h2h-standings">
      <Standings v-if="standings" :standings="standings" :users="users" title="Head to Head league" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import standingsH2HHelper from "../../utils/standingsH2HHelper";
import Standings from "./Standings";
import H2HRounds from "./H2HRounds";
// import CupMatchPopup from "./CupMatchPopup";

export default {
  name: "H2H",
  components: {
    Standings,
    H2HRounds
  },
  props: {},
  data() {
    return {
      //   selectedGroup: undefined,
      standings: undefined
      //   matchPopup: false,
      //   selectedMatch: undefined
    };
  },
  computed: {
    ...mapGetters(["h2h", "users", "players", "currentRound"])
    // isThereBye() {
    //   return Object.keys(this.selectedGroup.teams).length % 2 === 1;
    // }
    // playingTeams(){
    //   if (this.isThereBye) {
    //     return this.
    //   }
    // }
  },
  methods: {
    ...mapActions(["fetchH2h"])
    // roundIntoArray(target) {
    //   return Object.values(target).slice(0, -1);
    // },
    // showByeTeam(i) {
    //   const roundNum = `r${i + 1}`;
    //   const round = this.selectedGroup.rounds[roundNum];
    //   const matches = Object.values(round).slice(0, -1);

    //   // console.log(round, matches);

    //   return this.selectedGroup.teams.filter(x => {
    //     let teamsPlayed = [];
    //     matches.forEach(match => {
    //       teamsPlayed.push(match.team1.id);
    //       teamsPlayed.push(match.team2.id);
    //     });
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
    //   this.selectedMatch = match;
    //   return (this.matchPopup = true);
    // }
  },
  watch: {
    players(nv) {
      if (nv && this.h2h && this.users) {
        this.$vs.loading.close();
        this.standings = standingsH2HHelper(this.h2h, this.players, this.users, this.currentRound);
      }
    },
    h2h(nv) {
      if (nv && this.players && this.users) {
        this.$vs.loading.close();
        if (!this.standings) {
          this.standings = standingsH2HHelper(
            this.h2h,
            this.players,
            this.users,
            this.currentRound
          );
        }
      }
    },
    users(nv) {
      if (nv && this.players && this.h2h) {
        this.$vs.loading.close();
      }
    }
  },
  async created() {
    this.$vs.loading();
    this.fetchH2h();
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


con-vs-popup .vs-popup {
  width: 70% !important;
}

.h2h-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #c6c6c6;
  position: relative;
  margin: 20px 0 0 0;

  

  .h2h-standings{
      width: 50%;
  }
}


</style>