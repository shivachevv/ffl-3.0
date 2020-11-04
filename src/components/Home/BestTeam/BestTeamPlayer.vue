<template>
  <div
    class="player-container"
    v-if="player"
    @click.prevent="playerPopupHandler(player)"
  >
    <h3 class="pos">{{ player.position }}</h3>
    <img
      :src="`http://ff-legends.com/team-kits/${player.shirt}.png`"
      alt="Player"
    />
    <h3 class="name">
      {{ player.name }} :
      {{ player.points[`r${currentRound - 1}`].roundPts }} pts
    </h3>
    <h3 class="team">{{ player.club }}</h3>
  </div>
</template>
<script>
export default {
  name: "BestTeamPlayer",

  components: {},
  props: {
    player: {
      type: Object,
      required: true
    },
    currentRound: {
      type: Number,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    playerPopupHandler(p) {
      return this.$parent.$parent.$parent.$emit("playerPopupHandler", p);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

.player-container {
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  @media #{$mobile} {
    height: auto;
    margin: 0 1px;
  }

  &:hover {
    background-color: rgba(15, 53, 16, 0.5);
    cursor: pointer;

    img {
      transform: scale(1.1);
    }
  }

  .pos {
    border-bottom: 2px solid #79c486;
    color: white;
    font-size: 1.1rem;
    margin: 10px 0 10px 0;
    padding: 0 40px 10px;
    text-align: center;

    @media #{$mobile} {
      margin: 5px 0 5px 0;
      padding: 0 40px 5px;
    }
  }

  .team {
    color: white;
    font-size: 1.1rem;
    margin: 10px 0 10px 0;
    text-align: center;

    @media #{$mobile} {
      font-size: 1rem;
      margin: 5px 0 5px 0;
    }
  }

  .name {
    color: white;
    font-size: 1.1rem;
    margin: 10px 0 10px 0;
    text-align: center;

    @media #{$mobile} {
      font-size: 1rem;
      margin: 5px 0 5px 0;
    }
  }

  img {
    width: 25%;
    transition: all 0.2s;

    @media #{$mobile} {
      width: 50%;
    }
  }
}
</style>