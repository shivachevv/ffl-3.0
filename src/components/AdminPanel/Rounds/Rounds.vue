<template>
  <div class="rounds-container" v-if="currentRound && players">
    <h1 class="section-header">Rounds section</h1>
    <div class="rounds">
      <span>Current Round: {{currentRound}}</span>
      <div class="round-buttons">
        <!-- <button @click.prevent="deleteRndHandler">Delete Round</button> -->
        <vs-button
          color="#59A95D"
          button="submit"
          type="relief"
          size="normal"
          @click.prevent="addRndHandler"
        >Add Round</vs-button>
      </div>
    </div>
    <vs-alert
      v-if="success"
      title="Update finished!"
      active="true"
      color="success"
    >Successfully added new round: {{currentRound}}</vs-alert>
    <vs-alert
      v-if="error"
      title="An Error occured!"
      active="true"
      color="danger"
    >There was an error: {{errorMsg}}</vs-alert>
  </div>
</template>

<script>
import { getCurrentRound, setNewRound } from "../../../utils/getCurrentRound";
import { getAllPlayersDataNormal } from "../../../utils/getAllPlayersData";
import { DATA_URL } from "../../../common";
import { addPlayerPts } from "../../../models/Player";

export default {
  name: "Rounds",
  components: {},
  data() {
    return {
      currentRound: undefined,
      players: undefined,
      success: false,
      error: false,
      errorMsg: ""
    };
  },
  methods: {
    // deleteRndHandler() {},
    addRndHandler() {
      const playerStatsEmptyValues = Array(20).fill('')
      Object.keys(this.players).forEach(id => {
        if (this.players[id]["points"]) {
          this.players[id]["points"][
            `r${this.currentRound + 1}`
          ] = addPlayerPts(0,...playerStatsEmptyValues);
        } else {
          this.players[id]["points"] = {};
          this.players[id]["points"][`r${this.urrentRound + 1}`] = addPlayerPts(0,...playerStatsEmptyValues);
        }
      });
      this.$vs.dialog({
        color: "success",
        title: "Confirm New Round!",
        text: `Are you sure you want to add new round ${this.currentRound +
          1}?`,
        accept: () => this.fetchDataToPlayer(this.players)
      });
    },
    async fetchDataToPlayer(payload) {
      try {
        this.currentRound = await setNewRound(this.currentRound + 1);
      } catch (error) {
        this.error = true;
        this.errorMsg = error;
      }
      this.$vs.loading();

      return fetch(`${DATA_URL}players.json`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(() => {
          this.success = true;
          this.$vs.loading.close();
        })
        .catch(error => {
          console.error("Error:", error);
          this.error = true;
          this.$vs.loading.close();
          this.errorMsg = error;
        });
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
    },
    success(nv) {
      if (nv === true) {
        setTimeout(() => {
          this.success = false;
        }, 3000);
      }
    }
    // error(nv) {
    //   if (nv === true) {
    //     setTimeout(() => {
    //       this.error = false;
    //     }, 3000);
    //   }
    // }
  },
  async created() {
    this.$vs.loading();
    this.currentRound = await getCurrentRound();
    this.players = await getAllPlayersDataNormal();
  }
};
</script>

<style lang="scss">
$btn-color: #5ac683;

.rounds-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  

  .rounds {
    width: 40%;
    border-radius: 5px;
    margin: 20px 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-size: 1.4rem;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);

    & > span {
      margin: 0 0 20px 0;
    }
  }

  .con-vs-alert-success {
    background: #46c93a80;
    color: white;
    margin: 15px 0 0 0;
  }
}
</style>