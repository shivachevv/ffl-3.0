<template>
  <main>
    <div
      class="main-container"
      v-if="loggedUser && currentRound && playersCathegorized"
    >
      <!---------------- USER TEAM SECTION -------------------------------------->
      <UserTransfersTeam
        :user="loggedUser"
        :players="players"
        :currentRound="currentRound"
        :transfersAvail="transfersAvail"
        :transferedOut="transferedOut"
        :transferedIn="transferedIn"
        :maxTransfersReached="maxTransfersReached"
        @makeTransferOut="addTransferOut($event)"
        @max="max($event)"
        @wcHandler="wildcard = $event"
      ></UserTransfersTeam>

      <AllPlayersSection
        :user="loggedUser"
        :transferedOutInfo="transferedOut"
        :transferedIn="transferedIn"
        :playersCathegorized="playersCathegorized"
        @makeTransferIn="addTransferIn($event)"
        @submitTransfers="submitTransfers()"
      ></AllPlayersSection>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import UserTransfersTeam from "./UserTransfersTeam";
import AllPlayersSection from "./AllPlayersSection/AllPlayersSection";
import { cathegorizePlayers } from "../../../utils/getAllPlayersData";
import { DATA_URL } from "../../../common";

export default {
  name: "UserTransfers",
  components: {
    UserTransfersTeam,
    AllPlayersSection
  },
  data() {
    return {
      transferedOut: [],
      transferedIn: [],
      maxTransfersReached: false,
      wildcard: false
    };
  },
  computed: {
    ...mapGetters(["loggedUser", "currentRound", "players"]),
    transfersAvail() {
      const currentTransfersCount =
        this.loggedUser.rounds[`r${this.currentRound}`].transfersAvail -
        this.loggedUser.rounds[`r${this.currentRound}`].transfersMade;
      return this.wildcard ? 3 : currentTransfersCount;
    },
    transfersMadeSoFar() {
      return this.loggedUser.rounds[`r${this.currentRound}`].transfersMade;
    },
    updatedURL() {
      return `${DATA_URL}/${this.loggedUser.uid}/rounds/r${this.currentRound}/`;
    },
    playersCathegorized() {
      if (this.players) {
        return cathegorizePlayers(this.players);
      } else {
        return "";
      }
    }
  },
  methods: {
    // ...mapActions(["fetchPlayersCathegorized"]),
    addTransferOut(x) {
      if (typeof x === "string" && x.includes("remove")) {
        const name = x.substring(7);
        this.transferedOut = this.transferedOut.filter(x => x.name !== name);
      } else if (typeof x === "string" && x.includes("empty")) {
        this.transferedOut = [];
        this.transferedIn = [];
        this.maxTransfersReached = false;
      } else {
        this.transferedOut.push(x);
      }
    },
    addTransferIn(x) {
      if (typeof x === "string" && x.includes("empty")) {
        this.transferedIn = [];
      } else if (
        !this.transferedIn.includes(x) &&
        this.isPositionFilled(this.transferedOut, this.transferedIn, x)
      ) {
        return this.transferedIn.push(x);
      } else if (this.transferedIn.includes(x)) {
        this.transferedIn = this.transferedIn.filter(p => p.id !== x.id);
      }
    },
    max(x) {
      this.maxTransfersReached = x;
    },
    isPositionFilled(out, inn, p) {
      let countsOut = this.countPositions(out);
      let countsIn = this.countPositions(inn);

      for (const pos in countsOut) {
        if (countsIn[pos]) {
          countsOut[pos] -= countsIn[pos];
        }
      }
      if (countsOut[p.position]) {
        return true;
      } else {
        return false;
      }
    },
    countPositions(arr) {
      let positionsCount = {};
      arr.forEach(player => {
        if (positionsCount[player.position]) {
          positionsCount[player.position]++;
        } else {
          positionsCount[player.position] = 1;
        }
      });
      return positionsCount;
    },
    simplifyTrIn() {
      return this.transferedIn.map(x => {
        return x.name;
      });
    },
    simplifyTrOut() {
      return this.transferedOut.map(x => {
        return x.name;
      });
    },
    submitTransfers() {
      const _out = this.simplifyTrOut();
      const _in = this.simplifyTrIn();
      if (_out.length === _in.length && _out.length !== 0) {
        this.$vs.dialog({
          color: "success",
          title: "Transfers Confirmation",
          text: `${_out.join(", ")} - OUT     ${_in.join(", ")} - IN`,
          accept: this.acceptTransfers
        });
      } else {
        this.$vs.dialog({
          color: "warning",
          title: "Incorrect transfers",
          text: "Please make the correct\n amount of transfers!"
        });
      }
    },
    async acceptTransfers() {
      const next = this.loggedUser.rounds[`r${this.currentRound}`].nextRndInfo
        .team;
      const prev = this.loggedUser.rounds[`r${this.currentRound}`].team;
      const oldTeam = next ? next : prev;
      const mergedTeams = this.mergeTeams(
        this.transferedIn,
        this.transferedOut,
        oldTeam
      );
      const updatedCount = {
        transfersMade: this.transfersMadeSoFar + this.transferedIn.length
      };
      await this.fetchUpdatedTeam(mergedTeams);
      await this.fetchUpdatedTransfersMade(updatedCount);

      this.acceptAlert();
    },
    fetchUpdatedTeam(payload) {
      return fetch(`${this.updatedURL}nextRndInfo/team.json`, {
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
          //   this.success = true;
          // this.$vs.loading();
          // this.transfers = await getAllTransfers();
        })
        .catch(error => {
          console.error("Error:", error);
          //   this.error = true;
          //   this.errorMsg = error;
        });
    },
    fetchUpdatedTransfersMade(payload) {
      return fetch(`${this.updatedURL}.json`, {
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
          //   this.success = true;
          // this.$vs.loading();
          // this.transfers = await getAllTransfers();
        })
        .catch(error => {
          console.error("Error:", error);
          //   this.error = true;
          //   this.errorMsg = error;
        });
    },
    mergeTeams(transfersIn, transfersOut, oldTeam) {
      let transfersPositions = [];
      let merged = {};
      for (const pos in oldTeam) {
        transfersOut.forEach(oldPLayer => {
          if (oldTeam[pos] === oldPLayer.id) {
            transfersPositions.push(pos);
          }
        });
        merged[pos] = oldTeam[pos];
      }
      let playersAlreadyTransfered = [];
      transfersPositions.forEach(pos => {
        transfersIn.forEach(newPlayer => {
          if (
            pos.includes(newPlayer.position.toLowerCase()) &&
            !playersAlreadyTransfered.includes(newPlayer.id)
          ) {
            merged[pos] = newPlayer.id;
            playersAlreadyTransfered.push(newPlayer.id);
          }
        });
      });
      return merged;
    },
    acceptAlert() {
      this.$vs.notify({
        color: "success",
        title: `${this.transferedIn.length} transfers made!`
        // text:'Lorem ipsum dolor sit amet, consectetur'
      });
    }
  },
  watch: {
    // playersCathegorized(nv) {
    //   if (nv) {
    //     this.$vs.loading.close();
    //   }
    // }
  },
  created() {
    // this.$vs.loading();
    // this.fetchPlayersCathegorized();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main-container {
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}
</style>