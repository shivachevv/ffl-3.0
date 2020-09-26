<template>
  <div class="admin-container">
    <div class="admin-menu">
      <h1 class="admin-menu-header">ADMIN MENU</h1>
      <div class="admin-menu-items">
        <button href class="menu-item-section" @click.prevent="switchComponent">Rounds</button>

        <a href class="menu-item-section" @click.prevent="showSectionHandler('players')">Players</a>
        <div class="admin-menu-item" v-if="showPlayers">
          <button class="menu-item-link" @click.prevent="switchComponent">PlayersEdit</button>
          <button class="menu-item-link" @click.prevent="switchComponent">PlayersPoints</button>
          <button class="menu-item-link" @click.prevent="switchComponent">SyncPoints</button>
        </div>

        <a href class="menu-item-section" @click.prevent="showSectionHandler('users')">Users</a>
        <div class="admin-menu-item" v-if="showUsers">
          <button @click.prevent="switchComponent" class="menu-item-link">UsersPersonal</button>
          <button @click.prevent="switchComponent" class="menu-item-link">UsersTeams</button>
        </div>

        <a href class="menu-item-section" @click.prevent="showSectionHandler('transfers')">Transfers</a>
        <div class="admin-menu-item" v-if="showTransfers">
          <button class="menu-item-link" @click.prevent="switchComponent">Transfers</button>
        </div>

        <a href class="menu-item-section" @click.prevent="showSectionHandler('leagues')">Leagues</a>
        <div class="admin-menu-item" v-if="showLeagues">
          <button class="menu-item-link" @click.prevent="switchComponent">Leagues</button>
        </div>
        <a href class="menu-item-section" @click.prevent="showSectionHandler('h2h')">H2HLeague</a>
        <div class="admin-menu-item" v-if="showH2H">
          <button class="menu-item-link" @click.prevent="switchComponent">H2HLeague</button>
        </div>
        <a href class="menu-item-section" @click.prevent="showSectionHandler('cup')">Cup</a>
        <div class="admin-menu-item" v-if="showCup">
          <button class="menu-item-link" @click.prevent="switchComponent">Cup</button>
          <button class="menu-item-link" @click.prevent="switchComponent">CupSquadSelect</button>
        </div>
      </div>
    </div>
    <div class="admin-details">
      <!-- <keep-alive> -->
      <component v-bind:is="chosenComponent" />
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
import PlayersEdit from "./Players/PlayersEdit";
import PlayersPoints from "./Players/PlayersPoints";
import SyncPoints from "./Players/SyncPoints";
import Rounds from "./Rounds/Rounds";
import UsersPersonal from "./Users/UsersPersonal";
import UsersTeams from "./Users/UsersTeams";
import Transfers from "./Transfers/Transfers";
import Leagues from "./Leagues/Leagues";
import H2HLeague from "./H2HLeague/H2HLeague";
import Cup from "./Cup/Cup";
import CupSquadSelect from "./Cup/CupSquadSelect";

export default {
  name: "AdminPanel",
  components: {
    Rounds,
    PlayersEdit,
    PlayersPoints,
    SyncPoints,
    UsersPersonal,
    UsersTeams,
    Transfers,
    Leagues,
    H2HLeague,
    Cup,
    CupSquadSelect
  },
  data() {
    return {
      chosenComponent: "PlayersEdit",
      showPlayers: false,
      showUsers: false,
      showTransfers: false,
      showLeagues: false,
      showH2H: false,
      showCup: false
    };
  },
  methods: {
    switchComponent(e) {
      return (this.chosenComponent = e.target.innerText);
    },
    showSectionHandler(s) {
      if (s === "players") {
        this.showPlayers = !this.showPlayers;
      } else if (s === "users") {
        this.showUsers = !this.showUsers;
      } else if (s === "transfers") {
        this.showTransfers = !this.showTransfers;
      } else if (s === "leagues") {
        this.showLeagues = !this.showLeagues;
      } else if (s === "h2h") {
        this.showH2H = !this.showH2H;
      }else if (s === "cup") {
        this.showCup = !this.showCup;
      }
    }
  },
  computed: {},
  watch: {},
  created() {}
};
</script>

<style lang="scss">
.admin-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  .admin-menu {
    width: 15%;
    background-color: #3c474d;
    h1 {
      text-align: center;
      width: 100%;
      color: #fbffff;
      padding: 10px 0;
      border-bottom: 3px solid #893f40;
    }

    .admin-menu-items {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      .menu-item-section {
        padding: 10px 0;
        color: #fbffff;
        width: 100%;
        text-align: center;
        transition: all 0.3s;
        background-color: #3b454b;
        border: none;
        font-size: 1rem;
        cursor: pointer;

        &:hover {
          background-color: darkorange;
        }
      }

      .admin-menu-item {
        width: 100%;

        .menu-item-link {
          padding: 10px 0;
          color: #3b454b;
          width: 100%;
          text-align: center;
          transition: all 0.3s;
          background-color: #b7b7b7;
          border: none;
          font-size: 1rem;
          cursor: pointer;

          &:hover {
            background-color: darkorange;
          }
        }
      }
    }
  }

  .admin-details {
    width: 85%;

    .section-header {
      margin: 20px 0 0 0;
      font-size: 1.3rem;
      text-decoration: underline;
      width: 100%;
      text-align: center;
    }
  }
}
</style>