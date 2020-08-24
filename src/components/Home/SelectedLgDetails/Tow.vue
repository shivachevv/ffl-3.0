<template>
  <div class="league-tow sha hover" v-if="towRdy">
    <div class="tow-heading up">
      <div>
        <img :src="require(`@/assets/images/home/tow.png`)" alt="tow-icon`" />
      </div>
      <h2>Team of the week</h2>
    </div>
    <div class="tow-points">
      <!-- <transition name="slide-left" mode="out-in">
      <img
        :src="require(`@/assets/images/team-logos/logo1.png`)"
        :alt="`${towRdy.team} logo`"
        v-if="towtoggle"
      />
      </transition>-->
      <router-link :to="towRdy.team | routeFilter" tag="h2" class="tow up">{{towRdy.team}}</router-link>
      <span class="tow-points-number">{{towRdy.pts}} pts</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Tow",
  props: {
    selectedLeagueObj: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      //   towtoggle: false
    };
  },
  methods: {
    ...mapActions(["fetchTow"])
  },
  computed: {
    ...mapGetters(["tow"]),
    towRdy() {
      return this.tow[this.selectedLeagueObj.name];
    }
  },
  created() {
    this.fetchTow();
  },
  filters: {
    routeFilter: function(v) {
      return v
        .toLowerCase()
        .split(" ")
        .join("-");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.2s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
/*************** TEAM OF THE WEEK ***********/
* {
  transition: all 0.3s;
}
.league-tow {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #4e585e;
  margin: 20px 0 0 0;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.02);
  }
}
.tow-heading {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #4e585e;
  > div {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-color: #838a8e;
    text-align: center;
  }
  img {
    width: 30px;
    margin: 10px 0 10px 0;
  }
  h2 {
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 1.125rem;
    color: #c6c6c6;
    line-height: 50px;
  }
}
.tow-points {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #9fa5a9;
  cursor: pointer;
  &:hover {
    h2 {
      text-decoration: underline;
      background-color: darken($color: #9fa5a9, $amount: 5);
    }
    span {
      width: 50%;
      border-left: 10px solid #794446;
      background-color: darken($color: #633d3e, $amount: 5);
    }
  }
  img {
    width: 8%;
    margin: 10px;
  }
  h2 {
    width: 100%;
    height: 100%;
    text-align: left;
    font-size: 1.125rem;
    color: #232f37;
    line-height: 50px;
    padding: 0 0 0 15px;
    transition: all 0.3s;
  }
  a {
    text-decoration: none;
    color: #232f37;
    &:hover {
      text-decoration: underline;
      color: #232f37;
    }
  }
  span {
    display: inline-block;
    align-self: flex-end;
    height: 50px;
    width: 35%;
    background-color: #633d3e;
    border-left: 5px solid #794446;
    text-align: center;
    line-height: 50px;
    color: #e5e3e4;
  }
}
</style>