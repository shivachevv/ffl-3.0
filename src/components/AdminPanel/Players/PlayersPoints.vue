<template>
  <div class="players-points-container">
    <!-- LEAGUES -->
    <div class="leagues-container" v-if="players">
      <a
        v-for="l in Object.keys(players)"
        :key="l"
        @click.prevent="selectLeagueHandler(l)"
        :class="{selected: leagueSelected === l}"
        class="points-player-menu-item"
      >
        <img
          :src="require(`@/assets/images/user-transfers/leagues/${makeLeagueToImg(l)}.png`)"
          :alt="l"
        />
      </a>
    </div>
    <!-- TEAMS -->
    <div class="teams-container" v-if="players && leagueSelected">
      <a
        v-for="(t,i) in Object.keys(players[leagueSelected])"
        :key="i"
        @click.prevent="selectTeamHandler(t)"
        class="points-player-menu-item"
        :class="{selected: teamSelected === t}"
      >{{t}}</a>
    </div>

    <!-- PLAYERS -->
    <div class="players-container" v-if="players && leagueSelected && teamSelected">
      <div class="players-names">
        <a
          v-for="p in Object.values(players[leagueSelected][teamSelected])"
          :key="p.id"
          @click.prevent="selectPlayerHandler(p)"
          class="edit-player-menu-item"
          :class="{selected: playerSelected === p}"
        >{{p.name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllPlayersDataCathegorized } from "../../../utils/getAllPlayersData";
import getCurrentRound from "../../../utils/getCurrentRound";

export default {
  name: "PlayersPoints",
  components: {},
  data() {
    return {
      currentRound: undefined,
      players: undefined,
      leagueSelected: "",
      teamSelected: "",
      playerSelected: "",
    };
  },
  methods: {
    makeLeagueToImg(v) {
      return v
        .toLowerCase()
        .split(" ")
        .join("_");
    },
    selectLeagueHandler(l) {
      this.teamSelected = "";
      return (this.leagueSelected = l);
    },
    selectTeamHandler(t) {
      this.playerSelected = "";
      return (this.teamSelected = t);
    },
    selectPlayerHandler(p) {
      return this.playerSelected = p
    }
  },
  computed: {},
  watch: {
    players(nv) {
      if (nv && this.currentRound) {
        this.$vs.loading.close();
      }
    },
    currentRound(nv) {
      if (nv && this.players) {
        this.$vs.loading.close();
      }
    }
  },
  async created() {
    this.$vs.loading();
    this.players = await getAllPlayersDataCathegorized();
    this.currentRound = await getCurrentRound();
  }
};
</script>

<style lang="scss">
.players-points-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .leagues-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin: 20px 0 0 0;

    a.points-player-menu-item {
      width: 5%;
      height: 50px;
      transition: all 0.3s;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 4px;
      background-color: #a0a0a0;
      border-radius: 7px;

      &:hover {
        cursor: pointer;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
      }
      &:active {
        background-color: #71b171;
      }
      &.selected {
        background-color: #84c884;
      }
      img {
        width: 60%;
      }
    }
  }

  .teams-container {
    width: 100%;
    margin: 20px 0 0 0;
    padding: 0 10px;
    display: grid;
    grid-column-gap: 5px;
    grid-row-gap: 5px;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(2, 1fr);

    a.points-player-menu-item {
      width: 100%;
      transition: all 0.3s;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 4px;
      background-color: #a0a0a0;
      border-radius: 7px;
      text-align: center;

      &:hover {
        cursor: pointer;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
      }
      &:active {
        background-color: #71b171;
      }
      &.selected {
        background-color: #84c884;
      }
      img {
        width: 60%;
      }
    }
  }

  .players-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 20px 0 0 0;

    .players-names {
      width: 15%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      margin: 0 0 0 20px;
      background-color: #b4b4b4;
      border-radius: 5px;
      padding: 5px 10px;

      a.points-player-menu-item {
        padding: 0 5px;
        width: 100%;
        transition: all 0.3s;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 4px;
        border-radius: 5px;
        text-align: center;

        &:hover {
          cursor: pointer;
          background-color: #71b171;
        }
        &:active {
          background-color: #71b171;
        }
        &.selected {
          background-color: #59a959;
        }
        img {
          width: 60%;
        }
      }
    }

    .players-details-points {
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      margin: 0 0 0 20px;
      background-color: #b4b4b4;
      border-radius: 5px;
      padding: 20px 20px;

      form {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        & > label {
          width: 30%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin: 15px 0 0 0;
          border-bottom: 1px solid #7c7c7c;
          padding: 0 0 10px 0;

          &:last-child {
            border: none;
          }

          & > div {
            font-weight: bold;
            margin: 0px;
          }
        }
        button {
          margin: 15px 0 0 0;
        }
      }

      .con-vs-alert-success {
        background: #46c93a80;
        color: white;
        margin: 15px 0 0 0;
      }
    }
  }
}
</style>