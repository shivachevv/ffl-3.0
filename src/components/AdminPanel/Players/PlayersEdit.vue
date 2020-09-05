<template>
  <div class="players-edit-container">
    <h1 class="section-header">Edit Players personal details section</h1>
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

      <!-- EDIT FORM -->
      <div class="players-details-edit" v-if="playerSelected">
        <form @submit.prevent="editPlayerFormHandler">
          <label>
            Country:
            <vs-select
              :label="playerSelected.country"
              v-model="playerEdited.country"
              icon
              @change="playerEdited.club = ''"
            >
              <vs-select-item :key="l" :value="l" :text="l" v-for="l in Object.keys(players)" />
            </vs-select>
          </label>
          <label>
            Club:
            <vs-select
              v-if="players[playerEdited.country]"
              :label="playerSelected.club"
              v-model="playerEdited.club"
              icon
            >
              <vs-select-item
                :key="l"
                :value="l"
                :text="l"
                v-for="l in Object.keys(players[playerEdited.country])"
              />
            </vs-select>

            <vs-select v-else :label="playerSelected.club" v-model="playerEdited.club" icon>
              <vs-select-item
                :key="l"
                :value="l"
                :text="l"
                v-for="l in Object.keys(players[leagueSelected])"
              />
            </vs-select>
          </label>
          <label>
            Name:
            <vs-input
              :label-placeholder="playerSelected.name"
              v-model="playerEdited.name"
              color="dark"
            />
          </label>
          <label>
            Position:
            <vs-select :label="playerSelected.position" v-model="playerEdited.position" icon>
              <vs-select-item :key="pos" :value="pos" :text="pos" v-for="pos in positions" />
            </vs-select>
          </label>

          <vs-button color="#59A95D" button="submit" type="relief" size="large">Edit Player</vs-button>
        </form>

        <vs-alert
          v-if="success"
          title="Update finished!"
          active="true"
          color="success"
        >Player succesfully updated!</vs-alert>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllPlayersDataCathegorized } from "../../../utils/getAllPlayersData";
import { teamCodes, DATA_URL } from "../../../common";

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
      },
      positions: ["GK", "DL", "DC", "DR", "ML", "MC", "MR", "ST"],
      success: false
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
      this.playerEdited = {
        club: "",
        country: "",
        id: "",
        name: "",
        position: "",
        shirt: ""
      };
      return (this.playerSelected = p);
    },
    mergePlayers(_new, _old) {
      let result = {};
      Object.keys(_old).forEach(atttr => {
        if (_new[atttr]) {
          result[atttr] = _new[atttr];
        } else {
          result[atttr] = _old[atttr];
        }
      });
      if (_new["club"]) {
        result["shirt"] = teamCodes[_new["club"]];
      }
      return result;
    },
    showSuccessMsg({ club, country, name, position }) {
      return `You are about to edit ${name}!\nLeague: ${country},\nClub: ${club},\nName: ${name},\nPosition: ${position}`;
    },
    fetchDataToPlayer(payload) {
      return fetch(`${DATA_URL}players/${payload.id}.json`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(data => {
          console.log("Success:", data);
          this.success = true
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },
    editPlayerFormHandler() {
      const payload = this.mergePlayers(this.playerEdited, this.playerSelected);

      if (this.players[payload.country][payload.club]) {
        this.$vs.dialog({
          color: "success",
          title: "Confirm Edit",
          text: this.showSuccessMsg(payload),
          accept: () => this.fetchDataToPlayer(payload)
        });
      } else {
        this.$vs.dialog({
          color: "warning",
          title: "Incorrect Edit",
          text: "There is no such club in this league!"
        });
      }
    }
  },
  computed: {},
  watch: {
    players(nv) {
      if (nv) {
        this.$vs.loading.close();
      }
    },
    success(nv) {
      if (nv === true) {
        setTimeout(() => {
          this.success = false;
        }, 2000);
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