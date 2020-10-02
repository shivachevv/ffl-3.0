<template>
  <div class="slider-container" v-if="bestTeamReady">
    <h2>FFL BEST TEAM FOR ROUND {{currentRound - 1}}</h2>
    <carousel :navigationEnabled="true" :perPage="4" :paginationSize="10" :paginationPadding="10">
      <slide>
        <BestTeamPlayer :currentRound="currentRound" :player="bestTeamReady.GK" />
      </slide>
      <slide>
        <BestTeamPlayer :currentRound="currentRound" :player="bestTeamReady.DL" />
      </slide>
      <slide>
        <BestTeamPlayer :currentRound="currentRound" :player="bestTeamReady.DC" />
      </slide>
      <slide>
        <BestTeamPlayer :currentRound="currentRound" :player="bestTeamReady.DR" />
      </slide>
      <slide>
        <BestTeamPlayer :currentRound="currentRound" :player="bestTeamReady.ML" />
      </slide>
      <slide>
        <BestTeamPlayer :currentRound="currentRound" :player="bestTeamReady.MC" />
      </slide>
      <slide>
        <BestTeamPlayer :currentRound="currentRound" :player="bestTeamReady.MR" />
      </slide>
      <slide>
        <BestTeamPlayer :currentRound="currentRound" :player="bestTeamReady.ST" />
      </slide>
    </carousel>
  </div>
</template>
<script>
// import slider components
import { Carousel, Slide } from "vue-carousel";
import BestTeamPlayer from "./BestTeamPlayer";

export default {
  name: "BestTeam",
  components: {
    Carousel,
    Slide,
    BestTeamPlayer
  },
  props: {
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
    };
  },
  computed: {
    bestTeamReady() {
      let result = {};
      Object.keys(this.players).forEach(id => {
        const player = this.players[id];
        const lastRnd = player.points[`r${this.currentRound - 1}`].roundPts;
        if (result[player.position]) {
          if (
            result[player.position].points[`r${this.currentRound - 1}`]
              .roundPts < lastRnd
          ) {
            result[player.position] = player;
          }
        } else {
          result[player.position] = player;
        }
      });

      return result;
    }
  },
  methods: {
    playerPopupHandler(p) {
      return this.$emit('playerPopupHandler', p)
    }
  }
};
</script>

<style lang="scss">
.slider-container {
  width: 100%;
  background-color: #5c745c;
  border-radius: 10px;
  margin: 20px 0 0 0;
  //   overflow: hidden;

  h2 {
    padding: 15px 0 15px 0;
    font-size: 1.2rem;
    width: 100%;
    text-align: center;
    color: white;
    font-weight: bold;
    background-color: rgb(15 53 16);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .VueCarousel {
    width: 100%;
    border-radius: 10px;

    .VueCarousel-navigation {
      button {
        padding: 8px 16px !important;
        font-size: 1.3rem !important;
        background-color: #4e585e4d !important;
        transition: all 0.2s !important;
        border-radius: 50px;
        margin: 0 -10px !important;
        &:hover {
          background-color: darken(#4e585e4d, 20) !important;
        }
      }
    }
    .VueCarousel-pagination {
      .VueCarousel-dot-container {
        margin: 0px;
      }
    }
  }
}
</style>