<template>
  <main>
    <div class="main-container">
      <!---------------- USER TEAM SECTION -------------------------------------->
      <UserTransfersTeam
        :user="loggedUser.info"
        :transfersAvail="transfersAvail"
        :transferedOut="transferedOut"
        :transferedIn="transferedIn"
        :maxTransfersReached="maxTransfersReached"
        @makeTransferOut="addTransferOut($event)"
        @max="max($event)"
        @wcHandler="wildcard = $event"
      ></UserTransfersTeam>

      <AllPlayersSection
        :user="loggedUser.info"
        :transferedOutInfo="transferedOut"
        :transferedIn="transferedIn"
        @makeTransferIn="addTransferIn($event)"
        @submitTransfers="submitTransfers()"
      ></AllPlayersSection>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserTransfersTeam from "./UserTransfersTeam";
import AllPlayersSection from "./AllPlayersSection/AllPlayersSection";

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
      wildcard: false,
      CAPTAINS_URL: "https://ffl-3-92418.firebaseio.com/captains-display"
    };
  },
  computed: {
    ...mapGetters(["loggedUser", "currentRnd"]),
    transfersAvail() {
      return this.wildcard ? 3 : 2;
    },
    updatedURL() {
      return `${this.CAPTAINS_URL}/${this.loggedUser.info.teamName
        .toLowerCase()
        .split(" ")
        .join("-")}/${this.currentRnd + 1}.json`;
    }
  },
  methods: {
    ...mapActions(["fetchLoggedUser"]),
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
        this.transferedIn = this.transferedIn.filter(p => p.name !== x.name);
      }
    },
    max(x) {
      this.maxTransfersReached = x;
    },
    isPositionFilled(out, inn, p) {
      let countsOut = this.countPositions(out);
      let countsIn = this.countPositions(inn);

      for (const p in countsOut) {
        if (countsIn[p]) {
          countsOut[p] -= countsIn[p];
        }
      }
      if (countsOut[p.pos.toLowerCase()]) {
        return true;
      } else {
        return false;
      }
    },
    countPositions(a) {
      let result = {};
      a.forEach(el => {
        result[el.pos.substring(0, 2).toLowerCase()] =
          (result[el.pos.substring(0, 2).toLowerCase()] || 0) + 1;
      });
      return result;
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
      const o = this.simplifyTrOut();
      const i = this.simplifyTrIn();
      if (o.length === i.length && o.length !== 0) {
        this.$vs.dialog({
          color: "success",
          title: "Transfers Confirmation",
          text: `${o.join(", ")} - OUT     ${i.join(", ")} - IN`,
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
    acceptTransfers() {
      const data = {
        transfersIn: this.simplifyTrIn().join(", "),
        transfersOut: this.simplifyTrOut().join(", "),
        wildcard: this.wildcard,
        updatedTransfers: new Date()
      };
      fetch(this.updatedURL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(x => x.json())
        .catch(err => {
          console.log(err);
        });
      this.acceptAlert();
    },
    acceptAlert() {
      this.$vs.notify({
        color: "success",
        title: `${this.transferedIn.length} transfers made!`
        // text:'Lorem ipsum dolor sit amet, consectetur'
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>