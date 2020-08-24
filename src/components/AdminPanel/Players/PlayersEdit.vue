<template>
  <div class="players-edit-container">
    <!-- LEAGUES -->
    <div class="leagues-container" v-if="players">
      <a
        v-for="l in Object.keys(players)"
        :key="l"
        @click.prevent="selectLeagueHandler(l)"
        :class="{selected: leagueSelected === l}"
        class="edit-player-menu-item"
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
        class="edit-player-menu-item"
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
      <div class="players-details-edit" v-if="playerSelected">
        <form @submit.prevent="editPlayerFormHandler">
          <!-- <template v-if="$v.email.$error">
            <span class="error-msg" v-if="!$v.email.required">Email is required!</span>
            <span class="error-msg" v-else-if="!$v.email.email">Email is not valid!</span>
          </template>-->
          <label>
            Country:
            <input
              type="text"
              :placeholder="playerSelected.country"
              v-model="playerEdited.country"
            />
          </label>
          <label>
            Club:
            <input type="text" :placeholder="playerSelected.club" v-model="playerEdited.club" />
          </label>
          <label>
            Name:
            <input type="text" :placeholder="playerSelected.name" v-model="playerEdited.name" />
          </label>
          <label>
            Shirt Code:
            <input
              type="text"
              :placeholder="playerSelected.shirt"
              v-model="playerEdited.shirt"
            />
          </label>
          <label>
            Position:
            <input
              type="text"
              :placeholder="playerSelected.position"
              v-model="playerEdited.position"
            />
          </label>
          <!-- 
          country:"Serie A"
            club:"Atalanta BC"
          name:"T. Castagne"
          position:"DR"
          shirt:43-->
          <!-- <template v-if="$v.password.$error">
            <span class="error-msg" v-if="!$v.password.required">Password is required!</span>
            <span
              class="error-msg"
              v-else-if="!$v.password.minLength"
            >Password should be minimum 6 characters!</span>
          </template>-->
          <button type="submit">Edit Player</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllPlayersDataCathegorized } from "../../../utils/getAllPlayersData";

export default {
  name: "PlayersEdit",
  components: {},
  data() {
    return {
      players: undefined,
      leagueSelected: "",
      teamSelected: "",
      playerSelected: "",
      playerEdited: {
        club: "",
        country: "",
        id: "",
        name: "",
        position: "",
        shirt: ""
      }
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
      return (this.playerSelected = p);
    }
  },
  computed: {},
  watch: {
    players(nv) {
      if (nv) {
        this.$vs.loading.close();
      }
    }
  },
  async created() {
    this.$vs.loading();
    this.players = await getAllPlayersDataCathegorized();
  }
};
</script>

<style lang="scss">
.players-edit-container {
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

    a.edit-player-menu-item {
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

    a.edit-player-menu-item {
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

      a.edit-player-menu-item {
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

    .players-details-edit {
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

        label {
          width: 26%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;

        input {
          padding: 5px;
    border-radius: 4px;
    border: none;
    font-weight: bold;
        }
        }
      }
    }
  }
}
</style>