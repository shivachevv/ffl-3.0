<template>
  <div class="add-form-container">
    <vs-alert :active.sync="error" closable close-icon="close">{{errorMsg}}</vs-alert>
    <vs-alert
      v-if="success"
      title="Upload finished!"
      active="true"
      color="success"
    >Player succesfully added!</vs-alert>
    <form @submit.prevent="addPlayerHandler">
      <vs-select label="Leagues" v-model="newPlayer.country" icon placeholder="Select a league">
        <vs-select-item :key="l" :value="l" :text="l" v-for="l in Object.keys(players)" />
      </vs-select>

      <vs-select
        v-if="newPlayer.country"
        label="Clubs"
        v-model="newPlayer.club"
        icon
        placeholder="Select team"
      >
        <vs-select-item
          :key="p"
          :value="p"
          :text="p"
          v-for="p in Object.keys(players[newPlayer.country])"
        />
      </vs-select>
      <vs-input label="Name" placeholder="Insert player name" v-model="newPlayer.name" />
     
      <vs-select label="Position" v-model="newPlayer.position" icon placeholder="Select position">
        <vs-select-item :key="pos" :value="pos" :text="pos" v-for="pos in positions" />
      </vs-select>

      <vs-button color="#59A95D" button="submit" type="relief" size="large">Edit Player</vs-button>
    </form>
  </div>
</template>

<script>
import { teamCodes, DATA_URL } from "../../../common";
import { makeNewPlayer } from "../../../models/Player";
import { getAllPlayersDataCathegorized } from "../../../utils/getAllPlayersData";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "AddPlayerForm",
  props: {
    players: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      newPlayer: {},
      showClub: false,
      positions: ["GK", "DL", "DC", "DR", "ML", "MC", "MR", "ST"],
      error: false,
      errorMsg: "",
      success: false
    };
  },
  methods: {
    addPlayerHandler() {
      if (this.isNewPlayerOK()) {
        const { country, club, name, position, shirt } = this.newPlayer;
        const id = uuidv4();
        const player = makeNewPlayer(name, position, club, shirt, id, country);
        this.uploadNewPlayer(player);
      }
    },
    isNewPlayerOK() {
      const { country, club, name, position } = this.newPlayer;
      if (country && club && name && position) {
        if (this.players[country] && this.players[country][club]) {
          return true;
        } else {
          this.errorMsg = "Club and country do not match!";
          this.error = true;
          return false;
        }
      } else {
        this.errorMsg = "Please fill all fields!";
        this.error = true;
        return false;
      }
    },
    uploadNewPlayer(payload) {
      return fetch(`${DATA_URL}players/${payload.id}.json`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(async data => {
          console.log("Success:", data);
          this.success = true;
            const updatedPlayers = await getAllPlayersDataCathegorized();
            this.$emit("updatedPlayers", updatedPlayers);
        })
        .catch(err => {
          console.error("Error:", err);
          this.error = true;
          this.errorMsg = err;
        });
    }
  },
  computed: {},
  watch: {
    "newPlayer.club": function(nv) {
      if (nv) {
        this.newPlayer["shirt"] = teamCodes[nv];
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
  }
};
</script>

<style lang="scss">
.add-form-container {
  .con-vs-alert-primary {
    width: 98%;
    margin: 10px;
    background-color: #e5000059;
    color: white;
    font-weight: bold;

    .con-x {
      background-color: #a30000;
      color: #fff;
    }
  }
}
</style>