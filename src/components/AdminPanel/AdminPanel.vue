<template>
  <div class="admin-container">
    <div class="admin-menu">
      <h1 class="admin-menu-header">ADMIN MENU</h1>
      <div class="admin-menu-items">
        <button href class="menu-item-link" @click.prevent="switchComponent">Rounds</button>

        <a href class="menu-item-link" @click.prevent="showPlayersHandler">Players</a>
        <div class="admin-menu-item" v-if="showPlayers">
          <button class="menu-item-link" @click.prevent="switchComponent">PlayersEdit</button>
          <button class="menu-item-link" @click.prevent="switchComponent">PlayersPoints</button>
          <button class="menu-item-link" @click.prevent="switchComponent">SyncPoints</button>
        </div>

        <a href class="menu-item-link" @click.prevent="showUsersHandler">Users</a>
        <div class="admin-menu-item" v-if="showUsers">
          <button @click.prevent="switchComponent" class="menu-item-link">UsersPersonal</button>
        </div>

        <a href class="menu-item-link">Leagues</a>
        <div class="admin-menu-item">
          <button @click.prevent="switchComponent">Leagues</button>
        </div>

        <a href class="menu-item-link">Players</a>
        <div class="admin-menu-item">
          <button @click.prevent="switchComponent">Transfers</button>
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

export default {
  name: "AdminPanel",
  components: {
    Rounds,
    PlayersEdit,
    PlayersPoints,
    SyncPoints,
    UsersPersonal
  },
  data() {
    return {
      chosenComponent: "PlayersEdit",
      showPlayers: false,
      showUsers: false,
    };
  },
  methods: {
    switchComponent(e) {
      return (this.chosenComponent = e.target.innerText);
    },
    showPlayersHandler() {
      this.showPlayers = !this.showPlayers;
    },
    showUsersHandler() {
      this.showUsers = !this.showUsers;
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

      .admin-menu-item {
        width: 100%;
      }

      .menu-item-link {
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