<template>
  <section class="user-team sha">
    <TeamHeader :user="user"></TeamHeader>

    <RoundTransfersSoFar
      :currentRound="currentRound"
      :loggedUser="user"
      :players="players"
    />

    <SelectedTransfers
      :transferedIn="transferedIn"
      :transferedOut="transferedOut"
    ></SelectedTransfers>
    <transition name="fadeDown" mode="out-in">
      <div class="error-msg" v-if="maxTransfersReached">
        <h1>
          You have a maximum of {{ transfersAvail }}
          {{ transfersAvail === 1 ? "transfer" : "transfers" }} this week!
        </h1>
      </div>
    </transition>

    <!------------------ USER TEAM  ----------------->
    <div class="team" v-if="players">
      <!------------------ TEAMMATE  ----------------->
      <TransfersTeammate
        v-for="(pos, i) in Object.keys(initialTeam)"
        :class="pos.toLowerCase()"
        :player="players[initialTeam[pos]]"
        :transfersAvail="transfersAvail"
        :transferedOut="transferedOut"
        :reset="reset"
        @makeTransferOut="makeTransferOut($event)"
        @max="max($event)"
        :key="i"
      ></TransfersTeammate>

      <!-- WILDCARD AND TRANSFERS AVAILABLE -->
      <div class="addition transfers-avail">
        <h3 class="up">Transfers</h3>
        <span
          :class="{ smallerspan: transfersAvail === 2 || transfersAvail === 3 }"
          >{{ transfersAvail }}</span
        >
      </div>
      <div class="addition wildcard" v-if="!makeSwitchUnavail">
        <h3 class="up">Wildcard</h3>
        <vs-switch class="switch" color="success" v-model="wildcard" />
      </div>
      <div class="addition wildcard" v-else>
        <h3 class="up">Wildcard</h3>
        <vs-switch class="switch-inactive" disabled="true" color="success" />
      </div>
    </div>
  </section>
</template>

<script>
import TransfersTeammate from "./TransfersTeammate";
import TeamHeader from "../UserTeam/TeamHeader";
import SelectedTransfers from "./SelectedTransfers";
import RoundTransfersSoFar from "./RoundTransfersSoFar";
// import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserTransfersTeam",
  components: {
    TransfersTeammate,
    TeamHeader,
    SelectedTransfers,
    RoundTransfersSoFar
  },
  props: {
    user: {
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
    },
    transfersAvail: {
      type: Number,
      required: true
    },
    transferedOut: {
      type: Array,
      required: true
    },
    transferedIn: {
      type: Array,
      required: true
    },
    maxTransfersReached: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      wildcard: "",
      reset: false
    };
  },
  computed: {
    // wildcard: {
    //   get() {
    //     if (this.wcTemp === null) {
    //       const WCStatus = this.user.rounds[`r${this.currentRound}`].wildCard;
    //       this.$emit("wcHandler", WCStatus);
    //       // if (WCStatus) {
    //       //   this.makeSwitchUnavail = true;
    //       // }
    //       return WCStatus;
    //     } else {
    //       this.$emit("wcHandler", this.wcTemp);
    //       return this.wcTemp;
    //     }
    //   },
    //   set(val) {
    //     this.wcTemp = val;
    //   }
    // },
    makeSwitchUnavail() {
      const WCStatus = this.user.rounds[`r${this.currentRound}`].wildCard;
      this.$emit("wcHandler", WCStatus);
      return WCStatus;
    },
    initialTeam() {
      const next = this.user.rounds[`r${this.currentRound}`].nextRndInfo.team;
      const prev = this.user.rounds[`r${this.currentRound}`].team;

      return next ? next : prev;
      // .map(id => {
      //   return this.players[id];
      // })
      // .sort((a, b) => {
      //   return a.position.localeCompare(b.position);
      // });
    }
  },
  methods: {
    makeTransferOut(x) {
      return this.$emit("makeTransferOut", x);
    },
    max(x) {
      return this.$emit("max", x);
    }
  },
  watch: {
    wildcard(nv) {
      if (!nv) {
        this.$emit("makeTransferOut", "empty");
      }
      this.reset = !nv;
      return this.$emit("wcHandler", nv);
    }
  },
  filters: {
    // playerClassFilter: function(v) {
    //   return v.toLowerCase();
    // }
  },
  created() {
    // this.fetchUserPts(this.user.teamCode);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/********************  USER TEAM **********************/
.user-team {
  // height: 900px;
  width: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #d3d3d3;
  overflow: hidden;
}

/**************  ROUND CHANGE ********************/
.team-round-change {
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #3c474d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.buttons-cont {
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.prev,
.next {
  display: inline-block;
  width: 150px;
  height: 35px;
  color: #3c474d;
  background-color: #9fa5a9;
  font-size: 0.875rem;
  text-decoration: none;
  line-height: 35px;
  padding: 0 10px 0 10px;
  font-weight: bold;
  position: relative;
  transition: all 0.3s;
}

.prev {
  text-align: right;
}

.next {
  text-align: left;
}

.prev:hover,
.next:hover {
  /*text-decoration: underline;*/
  background-color: #c6c6c6;
  border: 1px solid #1b2e32;
  -webkit-box-shadow: 6px 6px 17px -11px rgba(0, 0, 0, 0.43);
  -moz-box-shadow: 6px 6px 17px -11px rgba(0, 0, 0, 0.43);
  box-shadow: 6px 6px 17px -11px rgba(0, 0, 0, 0.43);
}

.round {
  font-size: 1.25rem;
  font-weight: bold;
}

.prev img {
  width: 10%;
  position: absolute;
  top: 11px;
  left: 11px;
  z-index: 10;
}

.next img {
  width: 10%;
  position: absolute;
  top: 11px;
  right: 11px;
  z-index: 10;
}

.prev div,
.next div {
  display: inline-block;
  background-color: transparent;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}

.prev div::after,
.next div::after {
  position: absolute;
  top: 7px;
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #3c474d87;
  transition: all 0.3s;
  opacity: 0;
  z-index: 0;
}

.prev div::after {
  left: 8px;
}

.next div::after {
  right: 8px;
}

.prev div:hover::after,
.next div:hover::after {
  opacity: 0.4;
  transform: scale(1.4);
}

/******************************************************************
  ******************      FIELD WITH PLAYERS *************************/

.team {
  width: 100%;
  height: 700px;
  background-image: url("../../../assets/images/user-page/pitch1.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin: 20px 0 0 0;
  padding: 0 0 20px 0;
  display: grid;
  grid-column-gap: 30px;
  grid-row-gap: 10px;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  position: relative;
}

.gk,
.dl1,
.dl2,
.dc1,
.dc2,
.dr1,
.dr2,
.ml1,
.ml2,
.mc1,
.mc2,
.mr1,
.mr2,
.st1,
.st2,
.st3 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

/************SQUAD POSITIONING ****************
*******************************************/

.gk {
  grid-row: 11 / span 2;
  grid-column: 5 / span 2;
}

.dl1 {
  grid-row: 7 / span 2;
  grid-column: 2 / span 2;
}

.dl2 {
  grid-row: 9 / span 2;
  grid-column: 2 / span 2;
}

.dc1 {
  grid-row: 8 / span 2;
  grid-column: 4 / span 2;
}

.dc2 {
  grid-row: 8 / span 2;
  grid-column: 6 / span 2;
}

.dr1 {
  grid-row: 7 / span 2;
  grid-column: 8 / span 2;
}

.dr2 {
  grid-row: 9 / span 2;
  grid-column: 8 / span 2;
}

.ml1 {
  grid-row: 3 / span 2;
  grid-column: 2 / span 2;
}

.ml2 {
  grid-row: 5 / span 2;
  grid-column: 2 / span 2;
}

.mc1 {
  grid-row: 4 / span 2;
  grid-column: 4 / span 2;
}

.mc2 {
  grid-row: 4 / span 2;
  grid-column: 6 / span 2;
}

.mr1 {
  grid-row: 3 / span 2;
  grid-column: 8 / span 2;
}

.mr2 {
  grid-row: 5 / span 2;
  grid-column: 8 / span 2;
}

.st1 {
  grid-row: 1 / span 2;
  grid-column: 3 / span 2;
}

.st2 {
  grid-row: 1 / span 2;
  grid-column: 5 / span 2;
}

.st3 {
  grid-row: 1 / span 2;
  grid-column: 7 / span 2;
}

.teammate {
  position: relative;
  cursor: pointer;
}

/************** ROUND TOTAL *******************/
.round-total-points {
  width: 112px;
  height: 105px;
  position: absolute;
  top: 0px;
  right: 0px;
  background-image: url("../../../assets/images/user-page/wreath.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  margin: 0 10px 0 0;
}
.inactiveBtn {
  opacity: 0;
}
.error-msg {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #793638;
  h1 {
    color: lightgrey;
    font-size: 1.2rem;
  }
}
.addition {
  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &.transfers-avail {
    top: 0px;
    left: 10px;
  }
  &.wildcard {
    top: 0px;
    right: 10px;
    .switch {
      margin: 10px;
      &.vs-switch-success {
        background: #793638;
      }
      &.vs-switch-active {
        background: rgb(70, 201, 58);
      }
    }
    .switch-inactive {
      margin: 10px;
      &.vs-switch-success {
        background: #2e7125;
      }
    }
  }
  span {
    margin: 10px;
    padding: 5px 12px;
    border: 2px solid #184d18;
    border-radius: 50px;
    font-weight: bold;
  }
  span.smallerspan {
    padding: 5px 10px;
  }
  h3 {
    font-size: 1rem;
    font-weight: bold;
    color: #3c474d;
  }
}
/************  TRANSITION   *******************/

.fadeUp-enter {
  opacity: 0;
}
.fadeUp-enter-active {
  animation: slide-in 0.3s ease-in-out forwards;
  transition: opacity 0.3s;
}

.fadeUp-leave-active {
  animation: slide-out 0.3s ease-in-out forwards;
  transition: opacity 0.3s;
  opacity: 0;
}

.fadeDown-enter {
  opacity: 0;
}
.fadeDown-enter-active {
  animation: slide-in-down 0.3s ease-in-out forwards;
  transition: opacity 0.3s;
}

.fadeDown-leave-active {
  animation: slide-out-down 0.3s ease-in-out forwards;
  transition: opacity 0.3s;
  opacity: 0;
}

@keyframes slide-in {
  from {
    transform: translateY(2rem);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-2rem);
  }
}

@keyframes slide-in-down {
  from {
    transform: translateY(-2rem);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out-down {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(2rem);
  }
}
</style>