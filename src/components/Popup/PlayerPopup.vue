<template>
  <div class="player-popup" v-if="playerRdy">
    <div class="popup-container sha" v-clickOutside="close">
      <div class="popup-close up">
        <span>Player Information</span>
        <a href @click.prevent="close" class="popup-close-link">
          <img :src="require(`@/assets/images/popup/close.png`)" alt="close" />
        </a>
      </div>

      <div class="popup-name up">
        <img :src="require(`@/assets/images/teamkits/${playerRdy.kit}.png`)" alt="shirt" />
        <div class="popup-name-cont">
          <span class="popup-player-name up">{{playerRdy.name}}</span>
          <span class="popup-player-team up">{{playerRdy.club}}</span>
          <span class="popup-player-pos up">{{playerRdy.pos}}</span>
        </div>
      </div>

      <div class="popup-points up">
        <div class="popup-points-total">
          <span class="popup-pts-name">Total points</span>
          <span class="popup-pts-val">{{playerRdy.total}} pts</span>
        </div>
        <div class="popup-points-per-round">
          <span class="popup-per-name">Per round</span>
          <span class="popup-per-val">{{playerRdy.perRound}} pts</span>
        </div>
        <div class="popup-points-last5">
          <span class="popup-last5-name">Last 5 rounds</span>
          <span class="popup-last5-val">{{playerRdy.last5}} pts</span>
        </div>
        <div class="popup-points-last5-per-round">
          <span class="popup-last5per-name">Last 5 per round</span>
          <span class="popup-last5per-val">{{playerRdy.last5PerRnd}} pts</span>
        </div>
      </div>

      <div class="popup-round-points up">
        <div class="popup-round-points-header up">
          <span>Round</span>
          <span>Points</span>
        </div>
        <div class="popup-round-points-container">
          <div class="popup-round-points-points up" v-for="(r,i) in playerRdy.pts" :key="i">
            <span>{{i + 1}}</span>
            <span>{{r}}</span>
          </div>
        </div>
      </div>

      <div class="popup-graph up">
        <Chart :style="chartStyle" :rounds="playerRdy.pts"></Chart>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import popupPtsHelper from "../../utils/popupPtsHelper";
import Chart from "./Chart";
import { clickOutside } from "../../directives";

export default {
  name: "PlayerPopup",
  components: {
    Chart
  },
  props: {
    popupShow: {
      type: Boolean,
      required: true
    },
    popupPlayer: {
      type: Object,
      required: true
    },
    selectedLeagueObj: {
      type: Object
    }
  },
  data() {
    return {
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
    ...mapGetters(["popupData"]),
    playerRdy() {
      if (this.popupData) {
        return {
          name: this.popupData[7],
          club: this.popupData[8],
          pos: this.posMap[this.popupData[2]],
          kit: this.popupData[9],
          pts: this.popupData.slice(11),
          total: this.popupData[10],
          perRound: popupPtsHelper.perRound(this.popupData.slice(11)),
          last5: popupPtsHelper.last5(this.popupData.slice(11)),
          last5PerRnd: popupPtsHelper.last5PerRnd(this.popupData.slice(11))
        };
      } else {
        return "";
      }
    }
  },
  methods: {
    ...mapActions(["fetchPopupData"]),
    close() {
      return this.$emit("popupClose", false);
    }
  },
  created() {
    this.fetchPopupData(this.popupPlayer);
  },
  destroyed() {
    this.fetchPopupData("");
  },
  directives: {
    clickOutside
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/**********************************************************
*************************  PLAYER POPUP SECTION **********/
/* .popup-round-points-header:nth-child(2n+1) {
    background-color: #c6c6c6;
  }
  .popup-round-points-points:nth-child(2n) {
    background-color: #d3d3d3;
  } */
.player-popup {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(80, 80, 80, 0.5);
  display: flex;
  z-index: 1000;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.popup-container {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #c6c6c6;
  z-index: 1001;
  position: relative;
  overflow: hidden;
  border-radius: 7px;
  border: 1px solid #3c474d;
  box-shadow: 5px 5px 10px -5px rgba(0, 0, 0, 0.43);
}
.popup-close {
  width: 100%;
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #3c474d;
  color: #d3d3d3;
  span {
    color: #d3d3d3;
    font-size: 0.875rem;
    padding: 0 0 0 15px;
  }
  a {
    display: inline-block;
    height: 35px;
  }
}
.popup-name {
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
  align-items: center;
  font-size: 0.75rem;
}
.popup-points-total {
  width: 25%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
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