<template>
  <div class="leagues-section-container" v-if="users">
    <h1 class="section-header">Head to Head League Section</h1>

    <!-- CREATE NEW PLAYER BUTTON and POPUP -->
    <vs-popup class="holamundo" title="Create new round!" :active.sync="showPopup">
      <AddH2HRoundForm
        :h2hrounds="h2hrounds"
        :users="users"
        @updatedH2hRounds="h2hrounds = $event"
      />
    </vs-popup>
    <vs-button
      class="add-league"
      color="#59A95D"
      button="button"
      type="relief"
      size="large"
      @click.prevent="openAddH2HRoundPopup"
    >Create New H2H Round</vs-button>

    <vs-button
      color="#59A95D"
      button="submit"
      type="relief"
      size="normal"
      @click.prevent="createH2HRound"
    >TEST</vs-button>

    <!-- <div class="league-selection">
      <vs-alert
        v-if="success"
        title="Update finished!"
        active="true"
        color="success"
      >League successfully updated!</vs-alert>
      <vs-alert :active.sync="error" closable close-icon="close">{{errorMsg}}</vs-alert>
      <label>
        Leagues:
        <vs-select v-if="leagues" v-model="leagueSelected" icon>
          <vs-select-item
            :key="league.id"
            :value="league"
            :text="league.name"
            v-for="league in Object.values(leagues)"
          />
        </vs-select>
      </label>
    </div>-->

    <!-- <div class="rounds">
      <a
        href
        v-for="rnd in Object.keys(h2hrounds)"
        :key="rnd"
        @click.prevent="selectRoundHandler(rnd)"
        :class="{selected: rnd === selectedRound}"
      >{{rnd}}</a>
    </div>-->

    <!-- EDIT FORM -->
    <!-- <form @submit.prevent="editLeagueFormHandler" class="league-details-edit" v-if="leagueSelected">
      <vs-input label="League Name" :placeholder="leagueSelected.name" v-model="leagueEdited.name" />
      <vs-select label="Users" v-model="selectedUser" icon placeholder="Select an user">
        <vs-select-item
          :key="u"
          :value="u"
          :text="users[u].userTeam"
          v-for="u in Object.keys(users)"
        />
      </vs-select>
      <div v-if="leagueSelected.teams.length" class="league-teams">
        <span>Teams:</span>
        <div
          v-for="user in leagueSelected.teams"
          :key="user"
          @click.prevent="removePlayerFromLeague(user)"
        >{{users[user].userTeam}}</div>
      </div>

      <vs-button color="#59A95D" button="submit" type="relief" size="large">Create League</vs-button>
    </form>-->
  </div>
</template>

<script>
import AddH2HRoundForm from "./AddH2HRoundForm";
// import { getAllPlayersDataNormal } from "../../../utils/getAllPlayersData";
import { DATA_URL } from "../../../common";
// import getAllLeagues from "../../../utils/getAllLeagues";
// import { getCurrentRound } from "../../../utils/getCurrentRound";
import getAllUsers from "../../../utils/getAllUsers";
import getAllH2HRounds from "../../../utils/getAllH2HRounds";
// import makeNewLeague from "../../../models/League";
// import makeNewTransfer from "../../../models/Transfer";
// import { getAllPlayersDataNormal } from "../../../utils/getAllPlayersData";
// import roundPointsCalculator from "../../../utils/roundPointsCalculator";

export default {
  name: "H2HLeagues",
  components: {
    AddH2HRoundForm
  },
  data() {
    return {
      h2hrounds: undefined,
      users: undefined,
      //   currentRound: undefined,
      //   transfers: undefined,
      //   selectedRoundTransfers: undefined,
      //   players: undefined,
      //   selectedUser: undefined,
      //   selectedRound: undefined,
      //   selectedUserTeam: undefined,
      //   userEdited: {},
      leagueSelected: undefined,
      leagueEdited: {},
      success: false,
      error: false,
      errorMsg: "",
      showPopup: false,
      selectedUser: undefined
      //   newCpt: "",
      //   newViceCpt: "",
      //   roundTotal: 0
    };
  },
  methods: {
    createH2HRound() {
      const payload = {
        r1: {
          matches: {
            match1: {
              team1: "kVBr44zdDKNuR1XIRgGGoj9ku2f2",
              team2: "smAQwrSzWYPsoBVXhL1yWUmU1CE3"
            }
          },
          roundHeld: 14,
          name: "R2"
        }
      };
      return fetch(`${DATA_URL}h2h.json`, {
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
          this.h2hrounds = await getAllH2HRounds();

          // this.success = true;
          // this.$vs.loading();
          // this.users = await getAllUsers();
        })
        .catch(error => {
          console.error("Error:", error);
          // this.error = true;
          // this.errorMsg = error;
        });
    },
    openAddH2HRoundPopup() {
      return (this.showPopup = true);
    }
    // editLeagueFormHandler() {
    //   if (this.isEditedLeagueOK()) {
    //     const name = this.leagueEdited.name
    //       ? this.leagueEdited.name
    //       : this.leagueSelected.name;
    //     const { id, teams } = this.leagueSelected;
    //     const payload = makeNewLeague(id, name, teams);
    //     const users = this.createEditedUsers(id, teams);

    //     this.$vs.dialog({
    //       color: "success",
    //       title: "Confirm Edit",
    //       text: this.showSuccessMsg(payload),
    //       accept: () => {
    //         this.fetchUpdatedLeague(payload);
    //         this.fetchUpdatedUsers(users);
    //       }
    //     });
    //   } else {
    //     this.error = true;
    //     this.errorMsg = "Please enter league name and members!";
    //   }
    // },
    // createEditedUsers(leagueId, leagueTeams) {
    //   let copy = JSON.parse(JSON.stringify(this.users));

    //   Object.keys(copy).forEach(id => {
    //     let user = copy[id];
    //     if (leagueTeams.includes(id)) {
    //       if (user["league"]) {
    //         user["league"] = leagueId;
    //       } else {
    //         user["league"] = {};
    //         user["league"] = leagueId;
    //       }
    //     } else if (user["league"] && user["league"] === leagueId) {
    //       user["league"] = {};
    //     }
    //   });
    //   return copy;
    // },
    // fetchUpdatedUsers(payload) {
    //   return fetch(`${DATA_URL}users.json`, {
    //     method: "PATCH",
    //     mode: "cors",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(payload)
    //   })
    //     .then(response => response.json())
    //     .then(async data => {
    //       console.log("Success:", data);
    //       this.success = true;
    //       this.$vs.loading();
    //       this.users = await getAllUsers();
    //     })
    //     .catch(error => {
    //       console.error("Error:", error);
    //       this.error = true;
    //       this.errorMsg = error;
    //     });
    // },
    // fetchUpdatedLeague(payload) {
    //   return fetch(`${DATA_URL}leagues/${payload.id}.json`, {
    //     method: "PATCH",
    //     mode: "cors",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(payload)
    //   })
    //     .then(response => response.json())
    //     .then(async data => {
    //       console.log("Success:", data);
    //       this.success = true;
    //       this.$vs.loading();
    //       this.leagues = await getAllLeagues();
    //     })
    //     .catch(error => {
    //       console.error("Error:", error);
    //       this.error = true;
    //       this.errorMsg = error;
    //     });
    // },
    // showSuccessMsg({ name, teams }) {
    //   return `You are about to edit league ${name}! Users:
    //   ${teams
    //     .map(x => {
    //       return this.users[x].userTeam;
    //     })
    //     .join(", ")}`;
    // },
    // isEditedLeagueOK() {
    //   if (this.leagueSelected.teams.length) {
    //     return true;
    //   }
    //   return false;
    // },
    // removePlayerFromLeague(u) {
    //   return (this.leagueSelected.teams = this.leagueSelected.teams.filter(
    //     x => {
    //       return x !== u;
    //     }
    //   ));
    // }
    // fillTransfers() {
    //   const newTransfer = makeNewTransfer(
    //     14,
    //     "smAQwrSzWYPsoBVXhL1yWUmU1CE3",
    //     "DC",
    //     "8b6c6764-b08d-41f0-bad2-dc91dc0bef01",
    //     "c259f27d-835f-4cd7-8f8f-ad114cfa6fb5"
    //   );
    //   this.fetchNewTransfer(newTransfer);
    // },
    // fetchNewTransfer(payload) {
    //   return fetch(
    //     `${DATA_URL}transfers/r${payload.round}/${payload.team}/t1.json`,
    //     {
    //       method: "PATCH",
    //       mode: "cors",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(payload)
    //     }
    //   )
    //     .then(response => response.json())
    //     .then(async data => {
    //       console.log("Success:", data);
    //       //   this.success = true;
    //       this.$vs.loading();
    //       this.transfers = await getAllTransfers();
    //     })
    //     .catch(error => {
    //       console.error("Error:", error);
    //       //   this.error = true;
    //       //   this.errorMsg = error;
    //     });
    // },
    // selectRoundHandler(r) {
    //   this.selectedRound = r;
    //   this.selectedRoundTransfers = this.transfers[`r${r}`];
    // },
    // async confirmTransfer(tr) {
    //   try {
    //     await this.updateTransferStatus(tr, "confirmed");
    //     const team = this.editTeamForNextRnd(tr);
    //     // const count = this.updateTransferCounts(tr,'confirmed');
    //     // const count = this.updateTransferCounts(tr,'confirmed');
    //     // await this.uploadUserTransfersCount(count, tr);
    //     await this.uploadUserUpdatedTeam(team, tr);
    //     this.success = true;
    //     this.$vs.loading();
    //     this.transfers = await getAllTransfers();
    //     this.users = await getAllUsers();
    //     this.selectRoundHandler(this.selectedRound);
    //   } catch (error) {
    //     console.error(error);
    //     this.error = true;
    //     this.errorMsg = error;
    //   }
    // },
    // async cancelTransfer(tr) {
    //   try {
    //     const count = this.updateTransferCounts(tr, "cancelled");
    //     await this.updateTransferStatus(tr, "cancelled");
    //     await this.uploadUserTransfersCount(count, tr);
    //     this.success = true;
    //     this.$vs.loading();
    //     this.transfers = await getAllTransfers();
    //     this.users = await getAllUsers();
    //     this.selectRoundHandler(this.selectedRound);
    //   } catch (error) {
    //     console.error(error);
    //     this.error = true;
    //     this.errorMsg = error;
    //   }
    // },
    // uploadUserTransfersCount(count, tr) {
    //   const payload = {
    //     transfersMade: count
    //   };
    //   return fetch(
    //     `${DATA_URL}users/${tr[1].team}/rounds/r${this.selectedRound}.json`,
    //     {
    //       method: "PATCH",
    //       mode: "cors",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(payload)
    //     }
    //   )
    //     .then(response => response.json())
    //     .then(async data => {
    //       console.log("Success:", data);
    //       // this.success = true;
    //       // this.deselectUser();
    //       // this.$vs.loading();
    //       // this.users = await getAllUsers();
    //     })
    //     .catch(error => {
    //       console.error("Error:", error);
    //       // this.error = true;
    //       // this.errorMsg = error;
    //     });
    // },
    // uploadUserUpdatedTeam(team, tr) {
    //   const payload = {
    //     team
    //   };
    //   return fetch(
    //     `${DATA_URL}users/${tr[1].team}/rounds/r${this.selectedRound}/nextRndInfo.json`,
    //     {
    //       method: "PATCH",
    //       mode: "cors",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(payload)
    //     }
    //   )
    //     .then(response => response.json())
    //     .then(async data => {
    //       console.log("Success:", data);
    //       // this.success = true;
    //       // this.deselectUser();
    //       // this.$vs.loading();
    //       // this.users = await getAllUsers();
    //     })
    //     .catch(error => {
    //       console.error("Error:", error);
    //       // this.error = true;
    //       // this.errorMsg = error;
    //     });
    // },
    // updateTransferCounts(tr, action) {
    //   const [, transfer] = tr;
    //   const number = action === "confirmed" ? 1 : -1;
    //   return (
    //     this.users[transfer.team].rounds[`r${this.selectedRound}`]
    //       .transfersMade + number
    //   );
    // },
    // editTeamForNextRnd(tr) {
    //   const [, transfer] = tr;
    //   const userTeam = this.users[transfer.team].rounds[
    //     `r${this.selectedRound}`
    //   ].team;
    //   const userTeamForNext = this.users[transfer.team].rounds[
    //     `r${this.selectedRound}`
    //   ].nextRndInfo.team;
    //   const editTeam = userTeamForNext ? userTeamForNext : userTeam;
    //   const _in = transfer.transferIn;
    //   const _out = transfer.transferOut;

    //   return Object.values(editTeam).map(x => {
    //     return x === _out ? _in : x;
    //   });
    // },
    // updateTransferStatus(tr, status) {
    //   const payload = { status };
    //   return fetch(
    //     `${DATA_URL}transfers/r${this.selectedRound}/${tr[1].team}/${tr[0]}.json`,
    //     {
    //       method: "PATCH",
    //       mode: "cors",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(payload)
    //     }
    //   )
    //     .then(response => response.json())
    //     .then(async data => {
    //       console.log("Success:", data);
    //       // this.success = true;
    //       // this.$vs.loading();
    //       // this.transfers = await getAllTransfers();
    //       // this.selectRoundHandler(this.selectedRound);
    //     })
    //     .catch(error => {
    //       console.error("Error:", error);
    //       // this.error = true;
    //       // this.errorMsg = error;
    //     });
    // }
    // changeCaptainsHandler() {
    //   const oldCpt = this.selectedUser.rounds[`r${this.selectedRound}`].cpt;
    //   const oldViceCpt = this.selectedUser.rounds[`r${this.selectedRound}`]
    //     .viceCpt;
    //   const updatedCpt = this.newCpt ? this.newCpt : oldCpt;
    //   const updatedVCpt = this.newViceCpt ? this.newViceCpt : oldViceCpt;

    //   if (updatedCpt === updatedVCpt) {
    //     return this.$vs.dialog({
    //       color: "danger",
    //       title: "Please change Captain and ViceCaptain!",
    //       text: "Captain and ViceCaptain should not be the same!"
    //     });
    //   } else {
    //     return this.$vs.dialog({
    //       color: "success",
    //       title: "Confirm Edit",
    //       text: this.showSuccessMsg(updatedCpt, updatedVCpt),
    //       accept: () => this.fetchEditedCaptains(updatedCpt, updatedVCpt)
    //     });
    //   }
    // },
    // fetchEditedCaptains(newC, newVC) {
    //   const { uid } = this.selectedUser;
    //   const payload = {
    //     cpt: newC,
    //     viceCpt: newVC
    //   };
    //   return fetch(
    //     `${DATA_URL}users/${uid}/rounds/r${this.selectedRound}.json`,
    //     {
    //       method: "PATCH",
    //       mode: "cors",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(payload)
    //     }
    //   )
    //     .then(response => response.json())
    //     .then(async data => {
    //       console.log("Success:", data);
    //       this.success = true;
    //       this.deselectUser();
    //       this.$vs.loading();
    //       this.users = await getAllUsers();
    //     })
    //     .catch(error => {
    //       console.error("Error:", error);
    //       this.error = true;
    //       this.errorMsg = error;
    //     });
    // },
    // editUserFormHandler() {
    //   const merged = this.mergeUsers(this.userEdited, this.selectedUser);
    //   const {
    //     uid,
    //     email,
    //     userTeam,
    //     age,
    //     location,
    //     ocupation,
    //     favTeam,
    //     motto
    //   } = merged;
    //   const newUser = makeNewUser(
    //     uid,
    //     email,
    //     userTeam,
    //     age,
    //     location,
    //     ocupation,
    //     favTeam,
    //     motto
    //   );

    //   return this.$vs.dialog({
    //     color: "success",
    //     title: "Confirm Edit",
    //     text: this.showSuccessMsg(newUser),
    //     accept: () => this.fetchEditedUser(newUser)
    //   });
    // },
    // showSuccessMsg(C, VC) {
    //   return `Are you sure you want to change
    //           Captain to: ${this.players[C].name}
    //           and Vice Captain to ${this.players[VC].name}?`;
    // },
    // mergeUsers(_new, _old) {
    //   let result = {};
    //   Object.keys(_old).forEach(atttr => {
    //     if (_new[atttr]) {
    //       result[atttr] = _new[atttr];
    //     } else {
    //       result[atttr] = _old[atttr];
    //     }
    //   });
    //   // result["userLogo"] = result.userTeam.
    //   return result;
    // },
    // fetchEditedUser(payload) {
    //   return fetch(`${DATA_URL}users/${this.selectedUser.uid}.json`, {
    //     method: "PATCH",
    //     mode: "cors",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(payload)
    //   })
    //     .then(response => response.json())
    //     .then(async data => {
    //       console.log("Success:", data);
    //       this.success = true;
    //       this.deselectUsers();
    //       this.$vs.loading();
    //       this.users = await getAllUsers();
    //     })
    //     .catch(error => {
    //       console.error("Error:", error);
    //       this.error = true;
    //       this.errorMsg = error;
    //     });
    // },
    // deselectUser() {
    //   this.selectedUser = "";
    // }
    // async calcRoundTotalPts() {
    //   this.roundTotal = "...";
    //   const total = await roundPointsCalculator(
    //     this.selectedUser.rounds[`r${this.selectedRound}`],
    //     this.selectedRound
    //   );
    //   return (this.roundTotal = total);
    // }
  },
  computed: {},
  watch: {
    h2hrounds(nv) {
      if (nv && this.users) {
        this.$vs.loading.close();
      }
    },
    users(nv) {
      if (nv && this.h2hrounds) {
        this.$vs.loading.close();
      }
    },
    selectedUser(nv) {
      if (nv && !this.leagueSelected.teams.includes(nv)) {
        this.leagueSelected.teams.push(nv);
      }
    }
    // transfers(nv) {
    //   if (nv && this.users && this.players) {
    //     this.$vs.loading.close();
    //   }
    // },
    // success(nv) {
    //   if (nv === true) {
    //     setTimeout(() => {
    //       this.success = false;
    //     }, 2000);
    //   }
    // }
  },
  async created() {
    this.$vs.loading();
    this.h2hrounds = await getAllH2HRounds();
    this.users = await getAllUsers();
    // this.currentRound = await getCurrentRound();
    // this.transfers = await getAllTransfers();
  }
};
</script>

<style scoped lang="scss">
.leagues-section-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 0 0 20px;

  .league-selection {
    margin: 20px 0 0 0;
  }
  .league-details-edit {
    width: 50%;
    margin: 20px 0 0 0;
    div {
      margin: 20px 0 0 0;
    }
    .league-teams {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      span {
        font-size: 1.1rem;
        font-weight: bold;
        margin: 5px;
      }
      div {
        margin: 5px;
        border-left: 1px solid grey;
        padding: 5px 5px 5px 11px;
        transition: all 0.3s;
        position: relative;
        width: 20%;

        &::after {
          position: absolute;
          content: "x";
          top: 3px;
          right: 7px;
          width: 5px;
          height: 5px;
        }

        &:hover {
          cursor: pointer;
          background-color: #ffbcbc;
        }
      }
    }
  }

  //   .rounds {
  //     padding: 0 0 10px 0;
  //     border-bottom: 1px solid #3c474d;
  //     width: 100%;
  //     a {
  //       display: inline-block;
  //       padding: 5px;
  //       transition: all 0.3s;
  //       color: black;
  //       border-radius: 3px;
  //       margin: 0 1px 0 1px;

  //       &:hover {
  //         background-color: #59a95d;
  //       }

  //       &.selected {
  //         background-color: #356538;
  //         color: white;
  //       }
  //       &.unavailable {
  //         background-color: #9d9d9d;
  //         cursor: not-allowed;
  //       }
  //     }
  //   }

  //   .transfers-container {
  //     width: 100%;
  //     display: flex;
  //     flex-direction: column;
  //     align-items: flex-start;
  //     justify-content: flex-start;
  //     margin: 10px 0 0 0;

  //     .user-transfers {
  //       width: 98%;
  //       display: flex;
  //       flex-direction: column;
  //       justify-content: flex-start;
  //       align-items: flex-start;
  //       background-color: #96969669;
  //       border-radius: 10px;
  //       padding: 10px 0;
  //       margin: 10px 0 0 0;

  //       .user-trans-heading {
  //         width: 98%;
  //         font-weight: bold;
  //         padding: 5px 0;
  //         border-bottom: 1px solid black;
  //         margin: 0 10px 0 10px;
  //       }

  //       .user-transfer {
  //         padding: 10px;
  //         display: flex;
  //         flex-direction: row;
  //         justify-content: space-between;
  //         align-items: center;
  //         width: 100%;
  //         transition: all 0.3s;

  //         .in {
  //           background-color: #669f69b8;
  //           padding: 10px;
  //         }
  //         .out {
  //           background-color: #893f4091;
  //           padding: 10px;
  //         }

  //         &:hover {
  //           background-color: darken(#96969669, 10);
  //         }
  //       }
  //     }
  //   }
  //   .no-transfers {
  //     h2 {
  //       margin: 20px;
  //       font-weight: bold;
  //     }
  //   }

  .con-vs-alert-success {
    background: #46c93a80;
    color: white;
    margin: 15px;
    width: 97%;
  }
}
</style>