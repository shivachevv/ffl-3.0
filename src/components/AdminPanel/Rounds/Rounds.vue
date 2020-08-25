<template>
  <div class="rounds-container" v-if="currentRound && players">
    <div class="rounds">
      <span>Current Round: {{currentRound}}</span>
      <div class="round-buttons">
        <button @click.prevent="deleteRndHandler">Delete Round</button>
        <button @click.prevent="addRndHandler">Add Round</button>
      </div>
    </div>
  </div>
</template>

<script>
import getCurrentRound from "../../../utils/getCurrentRound";
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
      counter:0
    };
  },
  methods: {
    deleteRndHandler() {},
    addRndHandler() {
      Object.keys(this.players).forEach(id => {
        // let result = {};
        // result[this.currentRound] = addPlayerPts(10)
          let result = this.players[id];
          if (result["points"]) {
            result["points"][`r${this.currentRound}`] = addPlayerPts(10);
          } else {
            result["points"] = {};
            result["points"][`r${this.currentRound}`] = addPlayerPts(10);
          }

          this.fetchDataToPlayer(id, result);
      });
    },
    fetchDataToPlayer(id, payload) {
      return fetch(`${DATA_URL}testplayers/${id}.json`, {
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
          this.counter++
        })
        .catch(error => {
          console.error("Error:", error);
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
    }
  },
  async created() {
    this.$vs.loading();
    this.currentRound = await getCurrentRound();
    this.players = await getAllPlayersDataNormal();
  }
};
</script>

<style lang="scss">
.rounds-container {
}
</style>