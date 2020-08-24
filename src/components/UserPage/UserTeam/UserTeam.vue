<template>
  <section class="user-team sha">
    <Keypress key-event="keyup" :key-code="37" @success="prevRnd()" />
    <Keypress key-event="keyup" :key-code="39" @success="nextRnd()" />
    <TeamHeader :user="user"></TeamHeader>

    <div class="team-round-change">
      <div class="buttons-cont">
        <a
          href="#"
          class="prev up"
          @click.prevent="prevRnd()"
          :class="{inactiveBtn:isShowingFirstRnd}"
        >
          Previous
          <div>
            <img src="@/assets/images/user-page/left-arrow.png" alt />
          </div>
        </a>
        <span class="round up">Round {{tmpRndShow}}</span>
        <a
          :class="{inactiveBtn:isShowingLastRnd}"
          href="#"
          class="next up"
          @click.prevent="nextRnd()"
        >
          Next
          <div>
            <img src="@/assets/images/user-page/right-arrow.png" alt />
          </div>
        </a>
      </div>
    </div>

    <!------------------ USER TEAM  ----------------->
    <div class="team" v-if="rndShow">
      <!------------------ TEAMMATE  ----------------->
      <Teammate
        v-for="(pl,i) in rndShow.team"
        :class="pl.pos | playerClassFilter"
        :player="pl"
        :isTripple="rndShow.tripple"
        :key="i"
        @click.prevent.native="playerPopupHandler(pl)"
      ></Teammate>

      <div class="round-total-points up">
        {{rndShow.total}}
        <br />points
      </div>

      <!--------------------- PLAYER POPUP ------------------------>
    </div>
  </section>
</template>

<script>
import Teammate from "./Teammate";
import TeamHeader from "./TeamHeader";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserTeam",
  components: {
    Teammate,
    TeamHeader,
    Keypress: () => import('vue-keypress')
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tmpRndShow: ""
    };
  },
  computed: {
    ...mapGetters(["userPts"]),
    isShowingLastRnd() {
      return this.tmpRndShow === this.userPts.length;
    },
    isShowingFirstRnd() {
      return this.tmpRndShow === 1;
    },
    rndShow: {
      get: function() {
        if (this.userPts) {
          return this.userPts[this.tmpRndShow - 1];
        } else {
          return 1;
        }
      },
      set: function(v) {
        return (this.tmpRndShow = v);
      }
    }
  },
  methods: {
    ...mapActions(["fetchUserPts"]),
    prevRnd() {
      if (this.tmpRndShow > 1) this.tmpRndShow--;
    },
    nextRnd() {
      if (this.tmpRndShow < this.userPts.length) this.tmpRndShow++;
    },
    playerPopupHandler(p) {
      return this.$emit("playerPopupHandler", p);
    }
  },
  watch: {
    userPts(nv) {
      this.tmpRndShow = nv.length;
    },
    user(nv) {
      this.fetchUserPts(nv.teamCode);
    }
  },
  filters: {
    playerClassFilter: function(v) {
      return v.toLowerCase();
    }
  },
  created() {
    this.fetchUserPts(this.user.teamCode);
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/********************  USER TEAM **********************/
.user-team {
  height: 900px;
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
</style>