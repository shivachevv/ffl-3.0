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
        <div
          v-for="p in Object.values(players[leagueSelected][teamSelected])"
          :key="p.id"
          class="edit-player-menu-item"
          :class="{selected: playerSelected === p}"
        >
          <a>{{p.name}}</a>
          <a
            v-for="(rnd,i) in Object.values(p.points)"
            :key="i"
            @click.prevent="selectPlayerRoundHandler(p, rnd, i + 1)"
          >{{rnd.roundPts}}player pts</a>
        </div>

        <vs-popup
          v-if="playerSelected && roundSelected"
          class="holamundo"
          :title="'Edit stats of ' + playerSelected.name + ' for round ' + roundSelected.round + '!'"
          :active.sync="showPopup"
        >
          <h2>Points: {{selectedPlayerPts}}</h2>
          <form @submit.prevent="submitPlayerRoundStatsHandler">
            <label
              v-for="stat in Object.entries(roundSelected.roundData.roundStats)"
              :key="stat[0]"
            >
              {{stat[0]}}:
              <vs-input
                :label-placeholder="stat[1]"
                type="number"
                v-model="playerSelectedStats[stat[0]]"
                color="dark"
              />
            </label>
            <vs-button color="#59A95D" button="submit" type="relief" size="large">Update Stats</vs-button>
          </form>
        </vs-popup>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllPlayersDataCathegorized } from "../../../utils/getAllPlayersData";
import { getCurrentRound } from "../../../utils/getCurrentRound";
import pointsCalculator from "../../../utils/pointsCalculator";
import { DATA_URL } from "../../../common";

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
      roundSelected: "",
      showPopup: false,
      playerSelectedStats: {}
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
    mergeStats(_new, _old) {
      let result = {};
      Object.keys(_old).forEach(stat => {
        if (_new[stat]) {
          result[stat] = _new[stat];
        } else {
          result[stat] = _old[stat];
        }
      });

      return result;
    },
    selectPlayerRoundHandler(p, rnd, rndCount) {
      this.playerSelected = p;
      this.roundSelected = {
        round: rndCount,
        roundData: rnd
      };
      return (this.showPopup = true);
    },
    submitPlayerRoundStatsHandler() {
      const merged = this.mergeStats(
        this.playerSelectedStats,
        this.roundSelected.roundData.roundStats
      );
      const payload = {
        roundPts: this.selectedPlayerPts,
        roundStats: merged
      };
      console.log(payload);
      return fetch(
        `${DATA_URL}players/${this.playerSelected.id}/points/r${this.roundSelected.round}.json`,
        {
          method: "PATCH",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      )
        .then(response => response.json())
        .then(data => {
          console.log("Success:", data);
          this.success = true;
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  },
  computed: {
    selectedPlayerPts() {
      if (this.playerSelected && this.roundSelected) {
        const merged = this.mergeStats(
          this.playerSelectedStats,
          this.roundSelected.roundData.roundStats
        );
        const arr = Object.values(merged);
        return pointsCalculator(this.playerSelected.position, ...arr);
      } else {
        return "";
      }
    }
  },
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
    },
    showPopup(nv) {
      if (!nv) {
        this.playerSelected = "";
        this.roundSelected = "";
        this.playerSelectedStats = {};
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