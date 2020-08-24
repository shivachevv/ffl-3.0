<template>
  <section class="user-tr-cont">
    <!-- HEADER -->
    <div class="user-tr-header">
      <img src="@/assets/images/user-transfers/transfers-head.png" alt="user-head" />
      <h2 class="up">Player Selection</h2>
    </div>

    <!-- LEAGUES -->
    <div class="user-tr-section sha">
      <div class="section-header">
        <h2 class="up" v-if="!selectedLeague">Select a league</h2>
        <h2 class="up" v-else>Selected League</h2>
      </div>

      <div class="elements-cont" v-if="!selectedLeague">
        <div class="league" v-for="(l,i) in leagues" :key="i" @click="selectLeagueHandler(l)">
          <img :src="require(`@/assets/images/user-transfers/leagues/${l}.png`)" alt="league" />
          <h3 class="league up">{{l.split('_').join(' ')}}</h3>
        </div>
      </div>
      <div v-if="selectedLeague" class="selected">
        <img src="@/assets/images/user-transfers/triangle.png" alt="triangle" />
        <img
          :src="require(`@/assets/images/user-transfers/leagues/${selectedLeague}.png`)"
          alt="league"
        />
        <h3 class="up">{{selectedLeague.split('_').join(' ')}}</h3>
        <a @click.prevent="deselectLeague">
          <img src="@/assets/images/user-transfers/close.png" alt />
        </a>
      </div>
    </div>

    <!-- TEAMS -->

    <div class="user-tr-section sha" v-if="selectedLeague">
      <div class="section-header">
        <h2 class="up" v-if="!selectedTeam">Select a team</h2>
        <h2 class="up" v-else>Selected Team</h2>
      </div>

      <div class="elements-cont" v-if="!selectedTeam && selectedLeague">
        <div class="team" v-for="(t,i) in teams" :key="i" @click="selectTeamHandler(t)">
          <img
            :src="require(`@/assets/images/user-transfers/teams/${selectedLeague}/${t}.png`)"
            alt="league"
          />
          <h3 class="league up">{{t.split('_').join(' ')}}</h3>
        </div>
      </div>
      <div v-if="selectedTeam" class="selected">
        <img src="@/assets/images/user-transfers/triangle.png" alt="triangle" />
        <img
          :src="require(`@/assets/images/user-transfers/teams/${selectedLeague}/${selectedTeam}.png`)"
          alt="league"
        />
        <h3 class="up">{{selectedTeam.split('_').join(' ')}}</h3>
        <a @click.prevent="deselectTeam">
          <img src="@/assets/images/user-transfers/close.png" alt />
        </a>
      </div>
    </div>

    <!-- PLAYERS -->

    <div class="user-tr-section sha" v-if="selectedTeam">
      <div class="section-header">
        <h2 class="up" v-if="selectedTeam">Select a player</h2>
      </div>

      <div class="elements-cont players" v-if="selectedTeam && selectedLeague">
        <div class="players-head">
          <h3 class="up pl-name">Name</h3>
          <h3 class="up pl-pos">Position</h3>
          <h3 class="up pl-total">Total</h3>
        </div>
        <div
          class="player"
          :class="{takenplayer: !!p[userLeague], selectedplayer: transferedIn.includes(p)}"
          v-for="(p,i) in playersToShow"
          :key="i"
          @click="selectPlayerHandler(p)"
        >
          <h3 class="pl-name">{{p.name}}</h3>
          <h3 class="pl-pos">{{p.pos}}</h3>
          <h3 class="pl-total">{{p.total}} pts</h3>
        </div>
      </div>
    </div>
    <div class="buttons-cont">
      <a class="clear-transfers-in up" @click.prevent="clearTransfersIn">Clear All<br>Transfers In</a>
      <a class="submit-transfers up" @click.prevent="submitTransfers">Submit<br>Transfers</a>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AllPlayersSection",
  props: {
    user: {
      type: Object,
      required: true
    },
    transferedOutInfo: {
      type: Array
    },
    transferedIn: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedLeague: "",
      selectedTeam: ""
    };
  },
  watch: {
    allPlayersData(nv) {
      if (nv) {
        // console.log("ready", new Date());
        this.$vs.loading.close();
      }
    }
  },
  computed: {
    ...mapGetters(["allPlayersData"]),
    userLeague() {
      return this.user.teamCode < 11 ? "league1" : "league2";
    },
    leagues() {
      return Object.keys(this.allPlayersData);
    },
    teams() {
      if (this.selectedLeague) {
        return this.allPlayersData[this.selectedLeague]
          .filter(x => {
            if (x) {
              return x;
            }
          })
          .map(x => {
            return Object.keys(x)[0];
          });
      } else {
        return "";
      }
    },
    players() {
      if (this.selectedLeague && this.selectedTeam) {
        const teamPlayers = this.allPlayersData[this.selectedLeague].filter(
          x => {
            if (x) {
              return Object.keys(x)[0] === this.selectedTeam;
            }
          }
        )[0];
        return Object.values(teamPlayers)[0];
      } else {
        return "";
      }
    },
    playersToShow() {
      if (this.players.length) {
        return this.players
          .filter(x => {
            const tmp = Object.keys(x)[0];
            if (this.positions.includes(tmp)) {
              return x[tmp];
            } else if (this.positions.length === 0) {
              return x[tmp];
            }
          })
          .map(x => {
            return x[Object.keys(x)[0]];
          })
          .flat(1);
      } else return "";
    },
    positions() {
      if (this.transferedOutInfo.length) {
        return this.transferedOutInfo.map(x => {
          return x.pos.substring(0, 2).toLowerCase();
        });
      } else return "";
    }
  },
  methods: {
    ...mapActions(["fetchAllPlayersData"]),
    selectLeagueHandler(l) {
      this.selectedLeague = l;
    },
    deselectLeague() {
      this.selectedLeague = "";
      this.selectedTeam = "";
    },
    selectTeamHandler(l) {
      this.selectedTeam = l;
    },
    deselectTeam() {
      return (this.selectedTeam = "");
    },
    selectPlayerHandler(p) {
      if (
        this.transferedIn.length < this.transferedOutInfo.length &&
        !p[this.userLeague]
      ) {
        return this.$emit("makeTransferIn", p);
      } else if (this.transferedIn.includes(p)) {
        return this.$emit("makeTransferIn", p);
      }
    },
    clearTransfersIn() {
      return this.$emit("makeTransferIn", "empty");
    },
    submitTransfers() {
      return this.$emit("submitTransfers");
    }
  },
  created() {
    // console.log("created", new Date());
    this.$vs.loading();
    this.fetchAllPlayersData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.user-tr-cont {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .user-tr-header {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #3c474d;
    color: #f1f0f1;
    font-size: 1.25rem;
    position: relative;
    img {
      width: 50px;
      position: absolute;
      left: 20px;
    }
  }

  .user-tr-section {
    margin: 20px 0 0 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .section-header {
      width: 100%;
      height: 50px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: #9fa5a9;
      color: #3c474d;
      font-size: 1.25rem;
      font-weight: bold;
    }

    .elements-cont {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: flex-end;
      padding: 20px 0 20px 0;

      .league {
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        transition: all 0.2s;
        border-radius: 5px;
        padding: 5px;
        &:hover {
          background-color: #91ca91;
          cursor: pointer;
        }

        img {
          width: 30%;
        }

        h3 {
          margin: 5px 0 0 0;
          width: 100%;
          font-size: 0.8rem;
          text-align: center;
        }
      }

      .team {
        max-width: 25%;
        flex: 1 0 25%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        transition: all 0.2s;
        border-radius: 5px;
        padding: 5px;
        &:hover {
          background-color: #91ca91;
          cursor: pointer;
        }

        img {
          width: 30%;
        }

        h3 {
          margin: 5px 0 0 0;
          width: 100%;
          font-size: 0.8rem;
          text-align: center;
        }
      }

      .players-head {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
      }
    }
    .selected {
      padding: 10px 0 10px 0;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      position: relative;

      img:first-child {
        padding: 0 10px 0 20px;
      }
      img:nth-child(2) {
        margin: 0 10px 0 10px;
        width: 10%;
      }
      h3 {
        margin: 0 10px 0 10px;
        font-weight: bold;
      }
      a {
        justify-self: flex-end;
        cursor: pointer;
        position: absolute;
        right: 10px;
        img {
          padding: 0px !important;
        }
      }
    }
    .players {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      .players-head {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        padding: 5px 0 5px 0;
        margin: 0 10px 0 10px;
        border-bottom: 2px solid #3c474d;
      }

      .player {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 95%;
        padding: 5px 10px 5px 10px;
        margin: 5px 0 0 0;
        border-radius: 5px;
        transition: all 0.2s;

        &:hover {
          background-color: #91ca91;
          cursor: pointer;
        }
      }
      .pl-name {
        width: 55%;
      }
      .pl-pos {
        width: 25%;
        text-align: center;
      }
      .pl-total {
        width: 20%;
        text-align: end;
      }

      .takenplayer {
        background-color: #b28a8b;
        cursor: not-allowed;

        &:hover {
          background-color: #b28a8b;
          cursor: not-allowed;
        }
      }
      .selectedplayer {
        background-color: #184d18;
        color: lightgrey;
        &:hover {
          background-color: #184d18;
          color: lightgrey;
        }
      }
    }
  }
  .buttons-cont {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0 0 0;
    width: 100%;

    .clear-transfers-in {
      padding: 10px 20px;
      background-color: #793638;
      color: #d3d3d3;
      font-size: 1rem;
      font-family: "Montserrat", sans-serif;
      text-decoration: none;
      font-weight: bold;
      border: none;
      border-radius: 7px;
      transition: all 0.3s;
      text-align: center;

      &:hover {
        background-color: #8e3f42;
        color: #d3d3d3;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 2px 2px 11px 0px rgba(0, 0, 0, 0.43);
      }
    }

    .submit-transfers {
      padding: 10px 20px;
      background-color: #3b7e32;
      color: #d3d3d3;
      font-size: 1rem;
      font-family: "Montserrat", sans-serif;
      text-decoration: none;
      font-weight: bold;
      border: none;
      border-radius: 7px;
      transition: all 0.3s;
      text-align: center;

      &:hover {
        background-color: #4e843f;
        color: #d3d3d3;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 2px 2px 11px 0px rgba(0, 0, 0, 0.43);
      }
    }
  }
}
</style>