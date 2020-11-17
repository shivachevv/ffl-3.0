<template>
  <main>
    <div
      class="main-container"
      v-if="loggedUser && currentRound && playersCathegorized && players"
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
import { mapGetters, mapActions } from "vuex";
import UserTransfersTeam from "./UserTransfersTeam";
import AllPlayersSection from "./AllPlayersSection/AllPlayersSection";
import { cathegorizePlayers } from "../../../utils/getAllPlayersData";
import { DATA_URL } from "../../../common";
import makeNewTransfer from "../../../models/Transfer";
import { setLastUpdateDB } from '../../../utils/setLastUpdate';

export default {
  name: "UserTransfers",
  components: {
    UserTransfersTeam,
    AllPlayersSection,
  },
  data() {
    return {
      transferedOut: [],
      transferedIn: [],
      maxTransfersReached: false,
      wildcard: "",
    };
  },
  computed: {
    ...mapGetters(["loggedUser", "currentRound", "players", "transfers"]),
    // wildcard: {
    //   get() {
    //     if (this.wcTemp === null) {
    //       const WCStatus = this.loggedUser.rounds[`r${this.currentRound}`]
    //         .wildCard;
    //       console.log(this.loggedUser, WCStatus);
    //       return WCStatus;
    //     } else {
    //       return this.wcTemp;
    //     }
    //   },
    //   set(val) {
    //     this.wcTemp = val;
    //   }
    // },
    transfersAvail() {
      const made = this.loggedUser.rounds[`r${this.currentRound}`]
        .transfersMade;
      const avail = this.loggedUser.rounds[`r${this.currentRound}`]
        .transfersAvail;
      const currentTransfersCount = this.wildcard ? 3 - made : avail - made;
      return currentTransfersCount;
    },
    transfersMadeSoFar() {
      return this.loggedUser.rounds[`r${this.currentRound}`].transfersMade;
    },
    userLeague() {
      return this.loggedUser.league;
    },
    updatedURL() {
      return `${DATA_URL}users/${this.loggedUser.uid}/rounds/r${this.currentRound}/`;
    },
    playersCathegorized() {
      if (this.players) {
        return cathegorizePlayers(this.players);
      } else {
        return "";
      }
    },
  },
  methods: {
    ...mapActions(["fetchTransfers", "fetchUsers", "fetchLoggedUser"]),
    addTransferOut(x) {
      if (typeof x === "string" && x.includes("remove")) {
        const id = x.substring(7);
        this.transferedOut = this.transferedOut.filter((x) => x.id !== id);
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
        this.transferedIn = this.transferedIn.filter((p) => p.id !== x.id);
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
      arr.forEach((player) => {
        if (positionsCount[player.position]) {
          positionsCount[player.position]++;
        } else {
          positionsCount[player.position] = 1;
        }
      });
      return positionsCount;
    },
    simplifyTr(arr) {
      return arr.map((x) => {
        return x.name;
      });
    },
    async areInAvailable(transfers) {
      let result = true;
      let unavailable = [];

      for (let i = 0; i < transfers.length; i++) {
        const player = transfers[i];
        const response = await fetch(
          `${DATA_URL}players/${player.id}/available/${this.userLeague}.json`
        );
        const isAvailable = await response.json();
        if (!isAvailable) {
          unavailable.push(player);
          result = false;
        }
      }

      return {
        result,
        unavailable,
      };
    },
    comparePositions(_in, _out) {
      const transform = (arr) => {
        return arr
          .map((x) => {
            return x.position;
          })
          .sort((a, b) => {
            return a.localeCompare(b);
          })
          .join(",");
      };
      const inString = transform(_in);
      const outString = transform(_out);

      return inString === outString;
    },
    async submitTransfers() {
      const _out = this.simplifyTr(this.transferedOut);
      const _in = this.simplifyTr(this.transferedIn);
      const availStatus = await this.areInAvailable(this.transferedIn);
      const comparedPos = this.comparePositions(
        this.transferedIn,
        this.transferedOut
      );
      const WCPermission = this.wildcard
        ? _in.length === 3
          ? true
          : false
        : true;

      if (
        _out.length === _in.length &&
        _out.length !== 0 &&
        availStatus.result &&
        comparedPos &&
        WCPermission
      ) {
        this.$vs.dialog({
          color: "success",
          title: "Transfers Confirmation",
          text: `${_out.join(", ")} - OUT ${_in.join(", ")} - IN`,
          accept: this.acceptTransfers,
        });
      } else {
        let errorMsg = "";
        if (!availStatus.result) {
          const unavailSimple = availStatus.unavailable.length
            ? this.simplifyTr(availStatus.unavailable)
            : [];
          errorMsg = `Players: ${unavailSimple.join(", ")} not available!`;
        } else {
          errorMsg = "Transfers do not match!";
        }
        this.$vs.dialog({
          color: "warning",
          title: "Incorrect transfers",
          text: errorMsg,
        });
      }
    },
    async acceptTransfers() {
      // const next = this.loggedUser.rounds[`r${this.currentRound}`].nextRndInfo
      //   .team;
      // const prev = this.loggedUser.rounds[`r${this.currentRound}`].team;
      // const oldTeam = next ? next : prev;
      // const mergedTeams = this.mergeTeams(
      //   this.transferedIn,
      //   this.transferedOut,
      //   oldTeam
      // );
      const updatedCount = {
        transfersMade: this.transfersMadeSoFar + this.transferedIn.length,
      };
      // console.log( updatedCount);
      try {
        // await this.fetchUpdatedTeam(mergedTeams);
        await this.fetchUpdatedTransfersMade(updatedCount);
        await this.fetchUpdatedPlayerStatus(this.transferedIn);
        await this.fetchNewTransfers(this.transferedIn, this.transferedOut);
        if (this.wildcard) {
          await this.fetchUpdatedWildcard();
          console.log("wc");
        }

        this.acceptAlert();
        this.deselectTransfers("in");
        this.deselectTransfers("out");
        this.fetchLoggedUser();
      } catch (error) {
        console.log("ERROR", error);
      }
    },
    async fetchNewTransfers(_in, _out) {
      const sort = (arr) => {
        return arr.sort((a, b) => {
          return a.position.localeCompare(b.position);
        });
      };
      const sortedIn = sort(_in);
      const sortedOut = sort(_out);
      for (let i = 0; i < sortedIn.length; i++) {
        const player = sortedIn[i];

        const isFirstTransfer = this.transfers
          ? this.transfers[`r${this.currentRound}`]
          : false;
        const userTransfers = this.transfers
          ? isFirstTransfer
            ? this.transfers[`r${this.currentRound}`][this.loggedUser.uid]
            : undefined
          : undefined;

        const transferNumber = userTransfers
          ? Object.keys(userTransfers).length + 1
          : 1;
        const payload = makeNewTransfer(
          this.currentRound,
          this.loggedUser.uid,
          player.position,
          sortedOut[i].id,
          player.id
        );

        await fetch(
          `${DATA_URL}transfers/r${this.currentRound}/${this.loggedUser.uid}/t${transferNumber}.json`,
          {
            method: "PATCH",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        )
          .then((response) => response.json())
          .then(async () => {
            await this.fetchTransfers();
            // console.log("Success:", data);
            //   this.success = true;
            // this.$vs.loading();
            // this.transfers = await getAllTransfers();
          })
          .catch((error) => {
            console.error("Error:", error);
            //   this.error = true;
            //   this.errorMsg = error;
          });
      }
    },
    fetchUpdatedWildcard() {
      const [empty, firstWC, secondWC] = this.loggedUser.wildCards;
      const now = new Date();
      const endOfFirstHalf = new Date("2020/12/29");
      const isItFirstHalf = endOfFirstHalf - now > 0;
      const wildCards = isItFirstHalf
        ? [empty, true, secondWC]
        : [empty, firstWC, true];
      const WCGlobal = { wildCards };
      const WCRound = { wildCard: true };

      fetch(`${this.updatedURL}.json`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(WCRound),
      })
        .then((response) => response.json())
        .then(() => {})
        .catch((error) => {
          console.error("Error:", error);
        });
      fetch(`${DATA_URL}users/${this.loggedUser.uid}.json`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(WCGlobal),
      })
        .then((response) => response.json())
        .then(() => {
          // console.log("Success:", data);
          //   this.success = true;
          // this.$vs.loading();
          // this.transfers = await getAllTransfers();
        })
        .catch((error) => {
          console.error("Error:", error);
          //   this.error = true;
          //   this.errorMsg = error;
        });
    },
    fetchUpdatedPlayerStatus(transfers) {
      const payload = { [this.userLeague]: false };
      for (let i = 0; i < transfers.length; i++) {
        const player = transfers[i];
        fetch(`${DATA_URL}players/${player.id}/available/.json`, {
          method: "PATCH",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.json())
          .then(async () => {
            setLastUpdateDB()
            // console.log("Success:", data);
            //   this.success = true;
            // this.$vs.loading();
            // this.transfers = await getAllTransfers();
          })
          .catch((error) => {
            console.error("Error:", error);
            //   this.error = true;
            //   this.errorMsg = error;
          });
      }
    },
    fetchUpdatedTeam(payload) {
      // console.log("team", payload, `${this.updatedURL}nextRndInfo/team.json`);
      return fetch(`${this.updatedURL}nextRndInfo/team.json`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log("Success:", data);
          //   this.success = true;
          // this.$vs.loading();
          // this.transfers = await getAllTransfers();
        })
        .catch((error) => {
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log("Success:", data);
          this.$vs.loading();
          this.fetchUsers();
          //   this.success = true;
          // this.transfers = await getAllTransfers();
        })
        .catch((error) => {
          console.error("Error:", error);
          //   this.error = true;
          //   this.errorMsg = error;
        });
    },
    // mergeTeams(transfersIn, transfersOut, oldTeam) {
    //   // console.log(transfersIn, transfersOut);
    //   let transfersPositions = [];
    //   let merged = {};
    //   for (const pos in oldTeam) {
    //     transfersOut.forEach(oldPLayer => {
    //       if (oldTeam[pos] === oldPLayer.id) {
    //         transfersPositions.push(pos);
    //       }
    //     });
    //     merged[pos] = oldTeam[pos];
    //   }
    //   let playersAlreadyTransfered = [];
    //   transfersPositions.forEach(pos => {
    //     transfersIn.forEach(newPlayer => {
    //       if (
    //         pos.includes(newPlayer.position.toLowerCase()) &&
    //         !playersAlreadyTransfered.includes(newPlayer.id)
    //       ) {
    //         merged[pos] = newPlayer.id;
    //         playersAlreadyTransfered.push(newPlayer.id);
    //       }
    //     });
    //   });
    //   return merged;
    // },
    acceptAlert() {
      this.$vs.notify({
        color: "success",
        title: `${this.transferedIn.length} transfers made!`,
        // text:'Lorem ipsum dolor sit amet, consectetur'
      });
    },
    deselectTransfers(type) {
      return type === "in"
        ? (this.transferedIn = [])
        : (this.transferedOut = []);
    },
  },
  watch: {
    // loggedUser(nv){
    //   if (nv) {
    //     const WCStatus =  this.loggedUser.rounds[`r${this.currentRound}`].wildCard
    //     this.wildcard = WCStatus
    //     console.log(this.wildcard);
    //   }
    // },
    transfers(nv) {
      if (nv && this.players) {
        this.$vs.loading.close();
      }
    },
    players(nv) {
      if (nv) {
        this.$vs.loading.close();
      }
    },
    // users(nv) {
    //   if (nv && this.players) {
    //     this.$vs.loading.close();
    //   }
    // }
  },
  created() {
    this.$vs.loading();
    this.fetchTransfers();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

.main-container {
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  @media #{$mobile} {
    width: 98%;
    flex-direction: column;
    align-items: center;
  }
}
</style>