<template>
  <div v-if="player">
    <div class="popup-container sha">
      <div class="popup-name up">
        <img
          :src="`http://ff-legends.com/team-kits/${player.shirt}.png?version=1`"
          alt="shirt"
        />
        <div class="popup-name-cont">
          <span class="popup-player-name up">{{ player.name }}</span>
          <span class="popup-player-team up">{{ player.club }}</span>
          <span class="popup-player-pos up">{{ player.position }}</span>
        </div>
      </div>

      <div class="popup-points up">
        <div class="popup-points-total">
          <span class="popup-pts-name up">Total points</span>
          <span class="popup-pts-val">{{ playerPoints.total }} pts</span>
        </div>
        <div class="popup-points-per-round">
          <span class="popup-per-name up">Per round</span>
          <span class="popup-per-val">{{ playerPoints.perRound }} pts</span>
        </div>
        <div class="popup-points-last5">
          <span class="popup-last5-name up">Last 5 rounds</span>
          <span class="popup-last5-val">{{ playerPoints.last5 }} pts</span>
        </div>
        <div class="popup-points-last5-per-round">
          <span class="popup-last5per-name up">Last 5 per round</span>
          <span class="popup-last5per-val"
            >{{ playerPoints.last5PerRnd }} pts</span
          >
        </div>
      </div>

      <table style="overflow-x:auto;">
        <thead>
          <tr>
            <td>Rnd</td>
            <td>Pts</td>
            <td
              v-for="label in Object.keys(player.points.r1.roundStats)"
              :key="label"
            >
              <span>{{ statsMap[`${label}`].short }}</span>
              <div class="table-lable">{{ statsMap[`${label}`].long }}</div>
            </td>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(rnd, i) in sortedRounds" :key="i">
            <td class="round-number">{{ i + 1 }}</td>
            <td>{{ rnd.roundPts }}</td>
            <td v-for="stat in Object.entries(rnd.roundStats)" :key="stat[0]">
              {{ stat[1] }}
            </td>
          </tr>
        </tbody>
      </table>

      <div class="popup-graph up">
        <Chart :style="chartStyle" :rounds="playerPoints.chartPts"></Chart>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";
// import popupPtsHelper from "../../utils/popupPtsHelper";
import Chart from "./Chart";
// import { clickOutside } from "../../directives";

export default {
  name: "PlayerPopup",
  components: {
    Chart
  },
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      statsMap: {
        assists: { short: "A", long: "Assists" },
        cleanSheet: { short: "CS", long: "Clean sheet" },
        clearanceOffLine: { short: "CL", long: "Clearance off line" },
        errorLeadToGoal: { short: "ERR", long: "Error lead to goal" },
        goals: { short: "G", long: "Goals" },
        lastManTackle: { short: "LMT", long: "Last man tackle" },
        manOfTheMatch: { short: "MOM", long: "Man of the match" },
        ownGoals: { short: "OG", long: "Own goals" },
        penaltyGoals: { short: "PG", long: "Penalty goals" },
        penaltyMissed: { short: "PM", long: "Penalty Missed" },
        penaltySaved: { short: "PS", long: "Penalty Saved" },
        ratingOver85: { short: "RAT", long: "Rating over 8.5" },
        redCards: { short: "RC", long: "Red cards" },
        saves: { short: "S", long: "Saves" },
        shotsOnPost: { short: "SP", long: "Shots on post" },
        starter: { short: "ST", long: "Starter" },
        sub: { short: "SUB", long: "Substitution" },
        teamVictory: { short: "TV", long: "Team victory" },
        threeAllowed: { short: "3G", long: "Three allowed" },
        yellowCards: { short: "YC", long: "Yellow cards" }
      },
      chartStyle: "width: 100%; height: 100%; display: block;",
      posMap: {
        GK: "goalkeeper",
        DC1: "central defender",
        DC2: "central defender",
        DL1: "left defender",
        DL2: "left defender",
        DR1: "right defender",
        DR2: "right defender",
        MC1: "central midfielder",
        MC2: "central midfielder",
        ML1: "left midfielder",
        ML2: "left midfielder",
        MR1: "right midfielder",
        MR2: "right midfielder",
        ST1: "striker",
        ST2: "striker",
        ST3: "striker"
      }
    };
  },
  computed: {
    // ...mapGetters(["popupData"]),
    sortedRounds() {
      return Object.entries(this.player.points)
        .sort((a, b) => {
          const roundNum1 = Number(a[0].substring(1));
          const roundNum2 = Number(b[0].substring(1));
          return roundNum1 - roundNum2;
        })
        .map(x => x[1]);
    },
    playerPoints() {
      if (this.player) {
        const roundCount = Object.values(this.player.points).length;
        const total = Object.values(this.player.points).reduce((acc, rnd) => {
          return acc + rnd.roundPts;
        }, 0);
        const perRound = (total / roundCount).toFixed(2);
        const last5 = Object.values(this.player.points).reduce(
          (acc, rnd, i) => {
            const roundsNumToGoBack = 5;

            if (i >= roundCount - roundsNumToGoBack) {
              return acc + rnd.roundPts;
            } else {
              return 0;
            }
          },
          0
        );
        const last5PerRnd = (last5 / 5).toFixed(2);
        const chartPts = Object.values(this.player.points).map(x => {
          return x.roundPts;
        });
        return { total, perRound, last5, last5PerRnd, chartPts };
      } else {
        return "";
      }
    }
  },
  watch: {
  },
  methods: {
    // ...mapActions(["fetchPopupData"]),
    // close() {
    //   return this.$emit("popupClose", false);
    // }
  },
  created() {
    // this.fetchPopupData(this.player);
  },
  destroyed() {
    // this.fetchPopupData("");
  },
  directives: {
    // clickOutside
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../common/breakpoints.scss";

/**********************************************************
*************************  PLAYER POPUP SECTION **********/
/* .popup-round-points-header:nth-child(2n+1) {
    background-color: #c6c6c6;
  }
  .popup-round-points-points:nth-child(2n) {
    background-color: #d3d3d3;
  } */

.popup-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  // overflow: hidden;

  table {
    width: 100%;
    margin: 30px 0 0 0;

    @media #{$mobile} {
      margin: 10px 0 0 0;
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }
    thead {
      background-color: #8eca90;
      color: #103e10;

      tr {
        td {
          position: relative;
          cursor: pointer;
          padding: 8px 4px;
          font-weight: bold;
          border-bottom: 1px solid #184d18;

          // span {
          // }
          .table-lable {
            width: max-content;
            height: 20px;
            max-height: 0px;
            transition: all 0.2s;
            position: absolute;
            top: -20px;
            left: -50%;
            overflow: hidden;
            font-weight: normal;
          }
          &:nth-child(20),
          &:nth-child(21),
          &:nth-child(22) {
            .table-lable {
              right: 0px !important;
              left: auto;
            }
          }

          &:hover {
            text-decoration: underline;
            .table-lable {
              max-height: 20px;
            }
          }
        }
      }
    }
    tbody {
      tr {
        height: 20px;

        transition: all 0.2s;
        &:hover {
          background-color: #f5f5f5;
        }
        .round-number {
          font-weight: bold;
          background-color: darken(#e0e0e0, 5);
        }
        td {
          height: 25px;
          border-bottom: 1px solid #f2f2f2;
          vertical-align: middle;
          text-align: center;
        }
      }
    }
  }
}

.popup-name {
  padding: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  -webkit-box-shadow: inset 0px 0px 90px 39px rgba(0, 0, 0, 0.29);
  -moz-box-shadow: inset 0px 0px 90px 39px rgba(0, 0, 0, 0.29);
  box-shadow: inset 0px 0px 62px -5px rgba(0, 0, 0, 0.4);
  img {
    height: 120px;
  }
}
.popup-name-cont {
  width: 70%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}
.popup-player-name {
  width: 100%;
  font-size: 1.25rem;
  text-align: center;
  margin: 0 0 15px 0;
}
.popup-player-team {
  width: 100%;
  font-size: 1rem;
  text-align: center;
  margin: 0px 0 10px 0;
}
.popup-player-pos {
  width: 80%;
  font-size: 1rem;
  text-align: center;
  padding: 13px 0 0 0;
  border-top: 1px solid #000000;
}
.popup-points {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  font-size: 0.75rem;
  box-shadow: 5px 5px 21px -5px rgba(0, 0, 0, 0.43);
}
.popup-points-total {
  width: 25%;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  span {
    &:first-child {
      width: 100%;
      text-align: center;
      background-color: #184d18;
      color: #d3d3d3;
      padding: 5px 0 5px 0;
    }
    &:last-child {
      width: 100%;
      text-align: center;
      background-color: #103e10;
      color: #d3d3d3;
      padding: 5px 0 5px 0;
    }
  }
}
.popup-points-per-round {
  width: 25%;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  span {
    &:first-child {
      width: 100%;
      text-align: center;
      background-color: #184d18;
      color: #d3d3d3;
      padding: 5px 0 5px 0;
    }
    &:last-child {
      width: 100%;
      text-align: center;
      background-color: #103e10;
      color: #d3d3d3;
      padding: 5px 0 5px 0;
    }
  }
}
.popup-points-last5 {
  width: 25%;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  span {
    &:first-child {
      width: 100%;
      text-align: center;
      background-color: #184d18;
      color: #d3d3d3;
      padding: 5px 0 5px 0;
    }
    &:last-child {
      width: 100%;
      text-align: center;
      background-color: #103e10;
      color: #d3d3d3;
      padding: 5px 0 5px 0;
    }
  }
}
.popup-points-last5-per-round {
  width: 25%;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  span {
    &:first-child {
      width: 100%;
      text-align: center;
      background-color: #184d18;
      color: #d3d3d3;
      padding: 5px 0 5px 0;
    }
    &:last-child {
      width: 100%;
      text-align: center;
      background-color: #103e10;
      color: #d3d3d3;
      padding: 5px 0 5px 0;
    }
  }
}
.popup-round-points {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: #3c474d;
  overflow: scroll;
  -webkit-box-shadow: 0px 2px 14px -5px rgba(0, 0, 0, 0.43);
  -moz-box-shadow: 0px 2px 14px -5px rgba(0, 0, 0, 0.43);
  box-shadow: 0px 2px 14px -5px rgba(0, 0, 0, 0.43);
  z-index: 1;
}
.popup-round-points-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-right: 1px solid #9fa5a9;
  span {
    &:first-child {
      width: 100%;
      border-bottom: 1px solid #9fa5a9;
      padding: 5px 10px;
      font-weight: 200;
      background-color: #d3d3d3;
    }
    &:last-child {
      width: 100%;
      padding: 5px 10px;
    }
  }
}
.popup-round-points-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  color: #3c474d;
}
.popup-round-points-points {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  span {
    &:first-child {
      width: 100%;
      border-bottom: 1px solid #9fa5a9;
      padding: 5px 10px;
      text-align: center;
      background-color: #d3d3d3;
    }
    &:last-child {
      width: 100%;
      padding: 5px 10px;
      text-align: center;
      font-weight: bold;
    }
  }
}
.popup-graph {
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0 0 0;
}
</style>