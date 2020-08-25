<template>
  <div class="admin-container">
    <div class="admin-menu">
      <h1 class="admin-menu-header">ADMIN MENU</h1>
      <div class="admin-menu-items">
        <a href class="menu-item-link" @click.prevent="switchComponent">Rounds</a>

        <a href class="menu-item-link" @click.prevent="showPlayersHandler">Players</a>
        <div class="admin-menu-item" v-if="showPlayers">
          <button @click.prevent="switchComponent">PlayersEdit</button>
          <button @click.prevent="switchComponent">PlayersPoints</button>
        </div>

        <a href class="menu-item-link">Users</a>
        <div class="admin-menu-item">
          <button @click.prevent="switchComponent">Users</button>
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
      <keep-alive>
        <component v-bind:is="chosenComponent" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import PlayersEdit from "./Players/PlayersEdit";
import PlayersPoints from "./Players/PlayersPoints";
import Rounds from "./Rounds/Rounds";
import Users from "./Users";

export default {
  name: "AdminPanel",
  components: {
    Rounds,
    PlayersEdit,
    PlayersPoints,
    Users
  },
  data() {
    return {
      chosenComponent: "PlayersEdit",
      showPlayers: false
    };
  },
  methods: {
    switchComponent(e) {
      return (this.chosenComponent = e.target.innerText);
    },
    showPlayersHandler() {
      this.showPlayers = !this.showPlayers;
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

      a {
        padding: 10px 0;
        color: #fbffff;
      }
    }
  }

  .admin-details {
    width: 85%;
  }
}
</style>