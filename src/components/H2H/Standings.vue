<template>
  <div class="group-standings">
    <!-- HEADER -->
    <h2 class="header up">{{ title }} standings</h2>
    <!-- TABLE HEADER -->
    <div class="standings-header sha">
      <span class="up position">Pos</span>
      <span class="up team">Team</span>
      <span class="up games">Games</span>
      <span class="up win-draw-lose">W/D/L</span>
      <span class="up goal-diff">Goal Diff</span>
      <span class="up goal-diff-total">+ / -</span>
      <span class="up points">Pts</span>
    </div>

    <!-- TEAMS -->

    <router-link
      :to="`/team-details/${users[team[0]].userLogo}`"
      tag="a"
      class="team-stats sha"
      :class="{
        first_place: place === 0,
        second_place: place === 1,
        third_place: type === 'cup' ? place === 2 || place === 3 : place === 2
      }"
      v-for="(team, place) in sortStandingsTeams(standings)"
      :key="team[0]"
    >
      <span class="up position">{{ place + 1 }}.</span>
      <span class="up team"
        ><a href="" class="clickable">{{ users[team[0]].userTeam }}</a></span
      >
      <span class="up games">{{ team[1].games }}</span>
      <span class="up win-draw-lose"
        >{{ team[1].wdl.win }}/{{ team[1].wdl.draw }}/{{
          team[1].wdl.loss
        }}</span
      >
      <span class="up goal-diff"
        >{{ team[1].for }} - {{ team[1].against }}</span
      >
      <span class="up goal-diff-total">{{ team[1].goaldiff }}</span>
      <span class="up points">{{ team[1].pts }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Standings",
  components: {},
  props: {
    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    standings: {
      type: Object,
      required: true
    },
    users: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    sortStandingsTeams(teams) {
      return Object.entries(teams)
        .sort((a, b) => {
          return b[1].goaldiff - a[1].goaldiff;
        })
        .sort((a, b) => {
          return b[1].pts - a[1].pts;
        });
    }
  },
  watch: {},
  async created() {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/**************************************************
****************  STANDINGS **************************/

.group-standings {
  margin: 20px 0 0 0;
  width: 100%;
  font-size: 0.875rem;

  .header {
    width: 100%;
    text-align: center;
    padding: 10px 0;
    font-size: 1.2rem;
    background-color: #893f40;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: #f1f0f1;
  }

  .standings-header {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #3c474d;
    border-bottom: 2px solid #893e40;
    color: #d3d3d3;
    text-align: center;
  }

  .team-stats {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #d3d3d3;
    color: #3c474d;
    margin: 0 0 5px 0;
    text-align: start;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #bbbbbb;
      transform: scale(1.02);
    }
  }

  .first_place {
    background-color: #bcc4c8;
    border-left: 5px solid #893e40;
    transition: all 0.3s;

    &:hover {
      background-color: #a6aeb3;
    }
  }
  .second_place {
    background-color: #bcc4c8;
    border-left: 5px solid #893e40;
    transition: all 0.3s;

    &:hover {
      background-color: #a6aeb3;
    }
  }
  .third_place {
    background-color: #bcc4c8;
    border-left: 5px solid #893e40;
    transition: all 0.3s;

    &:hover {
      background-color: #a6aeb3;
    }
  }

  .position {
    width: 7%;
    text-align: center;
  }

  .team {
    width: 30%;
    text-align: start;

    a {
      color: #3c474d;
      text-decoration: none;
      transition: all 0.2s;

      &:hover {
        color: #3c474d;
        text-decoration: underline;
      }
    }
  }

  .games {
    width: 10%;
    text-align: center;
  }

  .win-draw-lose {
    width: 15%;
    text-align: center;
  }

  .goal-diff {
    width: 10%;
    text-align: center;
  }

  .points {
    width: 7%;
    text-align: center;
  }
}
</style>