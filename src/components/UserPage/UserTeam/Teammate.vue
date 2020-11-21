<template>
  <div class="teammate">
    <div class="player-shirt">
      <img
        :src="`https://ff-legends.com/team-kits/${player.shirt}.png?version=1`"
        :alt="`${player.name} logo`"
        title="Kit"
      />
    </div>
    <div class="player-stats-cont">
      <div class="name-cont">
        <span class="pos">{{ player.position }}</span>
        <span class="name">{{ player.name }}</span>
        <a href="#" class="player-stats">
          <img src="@/assets/images/user-page/computer.png" alt />
        </a>
      </div>
      <div class="pts">{{calculatedPlayerPts}}</div>
    </div>
    <span v-if="isCap && !isTripple && !isVCap" class="captain">C</span>
    <span v-if="!isCap && !isTripple && isVCap" class="captain">VC</span>
    <span v-if="isCap && isTripple && !isVCap" class="captain">SC</span>
  </div>
</template>

<script>
export default {
  name: "Teammate",
  props: {
    tmpRndShow: {
      type: Number,
      required: true
    },
    player: {
      type: Object,
      required: true
    },
    isTripple: {
      type: Boolean
    },
    isCap: {
      type: Boolean
    },
    isVCap: {
      type: Boolean
    },
    isVCActive: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  computed: {
    calculatedPlayerPts() {
      const { isTripple, isCap, isVCap, isVCActive, player, tmpRndShow } = this;
      const pts = Number(player.points[`r${tmpRndShow}`].roundPts);
      const multiplier = isTripple ? 3 : 2;

      // console.log(isVCActive);

      if (isCap && !isVCap && !isTripple && !isVCActive) {
        // console.log(1);
        return pts * multiplier;
      } else if (isCap && !isVCap && isTripple && !isVCActive) {
        // console.log(2);
        return pts * multiplier;
      } else if (!isCap && isVCap && !isTripple && isVCActive) {
        // console.log(3);
        return pts * multiplier;
      } else if (!isCap && isVCap && isTripple && isVCActive) {
        // console.log(4);
        return pts * multiplier;
      } else {
        return pts
      }
    }
  },
  methods: {},
  watch: {},
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";


.player-shirt {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media #{$mobile} {
    width: 95%;
    align-items: center;
  }
}

.player-shirt img {
  width: 35%;
  padding: 0 0 5px 0;
  transition: all 0.3s;

  @media #{$mobile} {
    width: 65%;
  }
}

.player-stats-cont {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

.player-stats-cont::after {
  position: absolute;
  left: 0px;
  top: 40px;
  content: "";
  width: 100%;
  height: 2px;
  background-color: #bdbd00;
  max-height: 0px;
  transition: all 0.1s;
}
.teammate:hover img {
  transform: scale(1.1);
}

.gk:hover .player-stats-cont::after,
.dl1:hover .player-stats-cont::after,
.dl2:hover .player-stats-cont::after,
.dc1:hover .player-stats-cont::after,
.dc2:hover .player-stats-cont::after,
.dr1:hover .player-stats-cont::after,
.dr2:hover .player-stats-cont::after,
.ml1:hover .player-stats-cont::after,
.ml2:hover .player-stats-cont::after,
.mc1:hover .player-stats-cont::after,
.mc2:hover .player-stats-cont::after,
.mr1:hover .player-stats-cont::after,
.mr2:hover .player-stats-cont::after,
.st1:hover .player-stats-cont::after,
.st2:hover .player-stats-cont::after,
.st3:hover .player-stats-cont::after {
  max-height: 2px;
}

.name-cont {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 20px;
}

.pos {
  display: inline-block;
  width: 20%;
  color: #f1f0f1;
  font-size: 0.8125rem;
  background-color: #103210;
  height: 20px;
  line-height: 20px;
  text-align: center;

  @media #{$mobile} {
    font-size: 0.7rem;
  }
}

.name {
  display: inline-block;
  color: #f1f0f1;
  font-size: 0.75rem;
  background: #103e10;
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
}

.player-stats {
  display: inline-block;
  width: 20%;
  height: 20px;
  background-color: #103e10;
  padding: 3px 3px 3px;
  
  @media #{$mobile} {
    display: none;
  }
}

.player-stats img {
  width: 18px;
}

.pts {
  background-color: #184d18;
  color: #f1f0f1;
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-size: 0.75rem;
  text-align: center;
  line-height: 20px;
}
.captain {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  font-size: 1rem;
  font-weight: bold;
  color: #3c474d;
  background: #d3d3d3;
  text-align: center;
  padding: 4px 7px;
  border-radius: 50px;
}
</style>