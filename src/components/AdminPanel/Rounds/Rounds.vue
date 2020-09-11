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
      <vs-button
        color="#59A95D"
        button="submit"
        type="relief"
        size="normal"
        @click.prevent="fetchNewRndDataToUsers"
      >TEST</vs-button>
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
import { addUserRound } from "../../../models/User";
import getAllUsers from "../../../utils/getAllUsers";

export default {
  name: "Rounds",
  components: {},
  data() {
    return {
      currentRound: undefined,
      players: undefined,
      users: undefined,
      success: false,
      error: false,
      errorMsg: ""
    };
  },
  methods: {
    // deleteRndHandler() {},
    addRndHandler() {
      const editedPlayers = this.createUpdatedPlayersObject();
      const editedUsers = this.createUpdatedUsersObject();

      this.$vs.dialog({
        color: "success",
        title: "Confirm New Round!",
        text: `Are you sure you want to add new round ${this.currentRound +
          1}?`,
        accept: () => {
          this.fetchNewRound();
          this.fetchNewRndDataToPlayers(editedPlayers);
          this.fetchNewRndDataToUsers(editedUsers);
        }
      });
    },
    async fetchNewRound() {
      try {
        this.currentRound = await setNewRound(this.currentRound + 1);
      } catch (error) {
        this.error = true;
        this.errorMsg = error;
      }
    },
    fetchNewRndDataToUsers(payload) {
      // const payload = this.createUpdatedUsersObject()
      return fetch(`${DATA_URL}users.json`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(async () => {
          this.users = await getAllUsers();
          this.success = true;
          this.$vs.loading.close();
        })
        .catch(error => {
          console.error("Error:", error);
          this.error = true;
          this.$vs.loading.close();
          this.errorMsg = error;
        });
    },
    fetchNewRndDataToPlayers(payload) {
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
        .then(async () => {
          this.players = await getAllPlayersDataNormal();
          this.success = true;
          this.$vs.loading.close();
        })
        .catch(error => {
          console.error("Error:", error);
          this.error = true;
          this.$vs.loading.close();
          this.errorMsg = error;
        });
    },
    createUpdatedUsersObject() {
      let copy = JSON.parse(JSON.stringify(this.users));
      // const testTeam = {
      //   gk: "2e94d6fb-6c7f-40d0-a5a0-8ace746e7b73",
      //   dl1: "550346ce-6f54-44ec-9bec-ae55ab0dfe06",
      //   dl2: "c2dce738-3946-4f38-a42e-1f35fee51865",
      //   dc1: "8b6c6764-b08d-41f0-bad2-dc91dc0bef01",
      //   dc2: "a57a402e-2023-4123-9975-aac2e7121180",
      //   dr1: "6d886bda-dd5b-4c15-aaee-f7d72ce0b47c",
      //   dr2: "b5d90bfb-7244-4719-a753-9f45b817145b",
      //   ml1: "032fb291-8795-427f-a06b-c004c2340a0d",
      //   ml2: "9612f8c3-758f-4e59-a80c-5daefcf41858",
      //   mc1: "1fcf1059-6a31-45c0-a29d-690fa4320a8f",
      //   mc2: "3ba37c17-cab7-4c3f-8c7b-d50dbcedc882",
      //   mr1: "32e88f9f-512b-4ebc-9786-f7ddfa8d77b9",
      //   mr2: "4095e200-fda8-499d-956c-72b37b162481",
      //   st1: "d6510b1e-bafe-4e43-b732-66687c632eee",
      //   st2: "7df4b751-eb71-42bc-ae65-1aec69e7cef3",
      //   st3: "646d32fa-5694-4ad3-9576-4720034d1c7d"
      // };

      Object.keys(copy).forEach(id => {
        const current = copy[id]["rounds"][`r${this.currentRound}`].team;
        const next = copy[id]["rounds"][`r${this.currentRound}`].teamForNextRnd;
        const team = next ? next : current;

        const avail =
          copy[id]["rounds"][`r${this.currentRound}`].transfersAvail;
        const made = copy[id]["rounds"][`r${this.currentRound}`].transfersMade;
        const transfers = avail - made === 0 ? 1 : 2;

        // if (Object.prototype.hasOwnProperty.call(copy[id], "rounds")) {
        //   console.log(1);
        //   copy[id]["rounds"][`r${this.currentRound}`].transfersAvail = 2;
        //   copy[id]["rounds"][`r${this.currentRound}`].transfersMade = 1;
        // } else {
        //   console.log(2);
        //   copy[id]["rounds"] = {};
        //   copy[id]["rounds"][`r${this.currentRound}`].transfersAvail = 2;
        //   copy[id]["rounds"][`r${this.currentRound}`].transfersMade = 1;
        // }
        if (copy[id]["rounds"]) {
          copy[id]["rounds"][`r${this.currentRound + 1}`] = addUserRound(
            team,
            transfers
          );
        } else {
          copy[id]["rounds"] = {};
          copy[id]["rounds"][`r${this.currentRound + 1}`] = addUserRound(
            team,
            transfers
          );
        }
      });
      return copy;
    },
    createUpdatedPlayersObject() {
      let copy = JSON.parse(JSON.stringify(this.players));
      const playerStatsEmptyValues = Array(20).fill("");

      Object.keys(copy).forEach(id => {
        if (copy[id]["points"]) {
          copy[id]["points"][`r${this.currentRound + 1}`] = addPlayerPts(
            0,
            ...playerStatsEmptyValues
          );
        } else {
          copy[id]["points"] = {};
          copy[id]["points"][`r${this.currentRound + 1}`] = addPlayerPts(
            0,
            ...playerStatsEmptyValues
          );
        }
      });
      return copy;
    }
  },
  computed: {},
  watch: {
    players(nv) {
      if (nv && this.currentRound && this.users) {
        this.$vs.loading.close();
      }
    },
    currentRound(nv) {
      if (nv && this.players && this.users) {
        this.$vs.loading.close();
      }
    },
    users(nv) {
      if (nv && this.players && this.currentRound) {
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
    this.users = await getAllUsers();
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