<template>
  <div class="rounds" v-if="rounds && users && players && currentRound">
    <vs-popup
      @close="deselectMatch"
      v-if="selectedMatch"
      class="holamundo"
      :active.sync="matchPopup"
      :title="
        `${users[selectedMatch.match.team1].userTeam} vs ${
          users[selectedMatch.match.team2].userTeam
        }`
      "
    >
      <H2HMatchPopup :players="players" :match="selectedMatch" :users="users" />
    </vs-popup>
    <!-- <vs-tabs alignment="center" color="#873c40">
      <vs-tab label="matches"> -->
    <div class="buttons-and-labels">
      <vs-button
        color="#783638"
        gradient-color-secondary="#924243"
        type="gradient"
        @click.prevent="rndPrev"
        ><img
          width="20"
          height="20"
          style="transform: scale(-1, -1);"
          src="https://www.flaticon.com/premium-icon/icons/svg/647/647801.svg"
          alt="Previous"
          title="Previous"
          class="loaded"
      /></vs-button>
      <span class="round-selected">Round {{ selectedRound }}</span>
      <vs-button
        color="#783638"
        gradient-color-secondary="#924243"
        type="gradient"
        ><img
          width="20"
          height="20"
          src="https://www.flaticon.com/premium-icon/icons/svg/647/647801.svg"
          alt="Next"
          title="Next"
          class="loaded"
          @click.prevent="rndNext"
      /></vs-button>
    </div>

    <div class="round-matches">
      <div
        class="gameweeks-match-wrapper"
        v-for="(match, i) in rounds[`r${selectedRound}`].matches"
        :key="i"
        @click="openMatchPopupHandler(match)"
      >
        <span class="team1">{{ users[match.team1].userTeam }}</span>
        <img
          :src="
            require(`@/assets/images/team-logos/${
              users[match.team1].userLogo
            }.png`)
          "
          alt=""
          srcset=""
        />
        <span class="score"
          >{{
            calculateTeamPts(match.team1, rounds[`r${selectedRound}`].roundHeld)
          }}
          -
          {{
            calculateTeamPts(match.team2, rounds[`r${selectedRound}`].roundHeld)
          }}</span
        >
        <img
          :src="
            require(`@/assets/images/team-logos/${
              users[match.team2].userLogo
            }.png`)
          "
          alt=""
          srcset=""
        />
        <span class="team2">{{ users[match.team2].userTeam }}</span>
      </div>
    </div>
    <!-- </vs-tab> -->
    <!-- <vs-tab label="FIXTURES">
        <div></div>
      </vs-tab> -->
    <!-- </vs-tabs> -->
  </div>
</template>

<script>
import roundPointsCalculator from "../../utils/roundPointsCalculator";
import H2HMatchPopup from './H2HMatchPopup'

export default {
  name: "H2HRounds",
  components: {
    H2HMatchPopup
  },
  props: {
    rounds: {
      type: Object,
      required: true
    },
    users: {
      type: Object,
      required: true
    },
    players: {
      type: Object,
      required: true
    },
    currentRound: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      tempSelected: undefined,
      matchPopup: false,
      selectedMatch: undefined
    };
  },
  computed: {
    selectedRound: {
      get() {
        if (this.tempSelected) {
          return this.tempSelected;
        } else {
          return Object.values(this.rounds).filter(round => {
            if (Number(round.roundHeld) <= this.currentRound) {
              return round;
            }
          }).length;
        }
      },
      set(val) {
        return (this.tempSelected = val);
      }
    }
  },
  methods: {
    openMatchPopupHandler(match) {
      this.selectedMatch = {
        match,
        roundHeld:this.rounds[`r${this.selectedRound}`].roundHeld
      }
      return (this.matchPopup = true);
    },
    deselectMatch() {
      return (this.selectedMatch = undefined);
    },
    rndPrev() {
      if (this.selectedRound > 1) {
        this.selectedRound--;
      }
    },
    rndNext() {
      if (this.selectedRound < Object.keys(this.rounds).length)
        this.selectedRound++;
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
    calculateTeamPts(usedId, roundHeld) {
      if (roundHeld <= this.currentRound) {
        const team = this.users[usedId].rounds[`r${roundHeld}`];
        const result = roundPointsCalculator(
          team,
          roundHeld,
          this.players,
          true
        );
        return result;
      } else {
        return " ";
      }
    }
  },
  watch: {},
  async created() {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../common/breakpoints.scss";

/**************************************************
****************  ROUNDS **************************/

.rounds {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0 0 0;
  @media #{$mobile} {
    width: 100%;
  }

  .buttons-and-labels {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    @media #{$mobile} {
      width: 100%;
    }
  }

  .round-matches {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0 0 0;
    @media #{$mobile} {
      width: 100%;
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

      &:hover {
        background-color: #bbbbbb;
        cursor: pointer;
      }
      .team1,
      .team2 {
        width: 37%;
      }

      .score {
        width: 10%;
        @media #{$mobile} {
          width: 20%;
        }
      }

      img {
        width: 4%;
        @media #{$mobile} {
          width: 7%;
        }
      }
    }
  }
}
</style>