<template>
  <div class="users-container">
    <h1 class="section-header">Edit User Teams Section</h1>

    <div class="user-selection">
      <label>
        Users:
        <vs-select v-if="users" v-model="selectedUser" icon>
          <vs-select-item
            :key="u.uid"
            :value="u"
            :text="u.userTeam"
            v-for="u in Object.values(users)"
          />
        </vs-select>
      </label>
    </div>
    <vs-alert
      v-if="success"
      title="Update finished!"
      active="true"
      color="success"
    >User succesfully updated!</vs-alert>
    <vs-alert :active.sync="error" closable close-icon="close">{{errorMsg}}</vs-alert>

    <!-- USER SELECTED -->
    <div class="user-details" v-if="selectedUser">
      <h2>Selected User: {{selectedUser.email}}</h2>
      <div class="rounds">
        <a
          href
          v-for="rnd in currentRound"
          :key="rnd"
          @click.prevent="selectRoundHandler(rnd)"
          :class="{selected: rnd === selectedRound}"
        >{{rnd}}</a>
      </div>

      <div v-if="selectedRound && selectedUserTeam">
        <h3>{{selectedUser.email}} team for round: {{selectedRound}}</h3>
        <div>
          <div v-for="player in selectedUserTeam" :key="player">
            {{players[player].name}} : {{players[player].position}}
          </div>
        </div>
      </div>
      <div v-else>User does not have a team selected for round {{selectedRound}}!</div>
      <!-- <form @submit.prevent="editUserTeamFormHandler">
        <label>
          Email:
          <vs-input :label-placeholder="selectedUser.email" v-model="userEdited.email" icon />
        </label>
        <label>
          User Team Name:
          <vs-input :label-placeholder="selectedUser.userTeam" v-model="userEdited.userTeam" icon />
        </label>
        <label>
          User Age:
          <vs-input
            type="number"
            :label-placeholder="selectedUser.age"
            v-model="userEdited.age"
            icon
          />
        </label>
        <label>
          User Favourite Team:
          <vs-input :label-placeholder="selectedUser.favTeam" v-model="userEdited.favTeam" icon />
        </label>
        <label>
          User Location:
          <vs-input :label-placeholder="selectedUser.location" v-model="userEdited.location" icon />
        </label>
        <label>
          User Motto:
          <vs-input :label-placeholder="selectedUser.motto" v-model="userEdited.motto" icon />
        </label>
        <label>
          User Ocupation:
          <vs-input
            :label-placeholder="selectedUser.ocupation"
            v-model="userEdited.ocupation"
            icon
          />
        </label>
        <label>
          <input type="checkbox" v-model="userEdited.isAdmin" />
          User Admin Rights. Currently user is {{selectedUser.isAdmin ? '' : 'NOT'}} an admin!
        </label>

        <div class="buttons">
          <vs-button color="#59A95D" button="submit" type="relief" size="large">Edit User Team</vs-button>
        </div>
      </form> -->
    </div>
  </div>
</template>

<script>
import { getAllPlayersDataNormal } from '../../../utils/getAllPlayersData';
// import { DATA_URL } from "../../../common";
import getAllUsers from "../../../utils/getAllUsers";
import { getCurrentRound } from '../../../utils/getCurrentRound';

export default {
  name: "UsersTeams",
  components: {},
  data() {
    return {
      users: undefined,
      players: undefined,
      selectedUser: undefined,
      selectedRound: undefined,
      selectedUserTeam:undefined,
      userEdited: {},
      success: false,
      error: false,
      errorMsg: "",
    };
  },
  methods: {
    editUserTeamFormHandler() {
      return;
    },
    selectRoundHandler(r) {
      this.selectedRound = r
      if (this.selectedUser.rounds[`r${r}`]){
        if (this.selectedUser.rounds[`r${r}`].team) {
          this.selectedUserTeam = this.selectedUser.rounds[`r${r}`].team
        }
      }
    }
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
    // showSuccessMsg(user) {
    //   return `Edited User:
    //       age:${user.age}
    //       email:${user.email}
    //       favTeam:${user.favTeam}
    //       isAdmin:${user.isAdmin}
    //       location:${user.location}
    //       motto:${user.motto}
    //       ocupation:${user.ocupation}
    //       userTeam:${user.userTeam}
    //       `;
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
    // deselectUsers() {
    //   this.userEdited = {};
    //   this.selectedUser = "";
    // }
  },
  computed: {},
  watch: {
    users(nv) {
      if (nv && this.players) {
        this.$vs.loading.close();
      }
    },
    players(nv) {
      if (nv && this.users) {
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
    this.players = await getAllPlayersDataNormal()
    this.users = await getAllUsers();
    this.currentRound = await getCurrentRound()
  }
};
</script>

<style scoped lang="scss">
.users-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  .con-vs-alert-success {
    background: #46c93a80;
    color: white;
    margin: 15px;
    width: 97%;
  }

  .user-selection {
    width: 50%;
    padding: 20px 0 20px 20px;

    label {
      font-weight: bold;
      display: inline-block;
      div {
        margin: 10px 0 0 0;
      }
    }
  }

  .user-details {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
    margin: 10px;
    background-color: darkgrey;
    border-radius: 10px;

    h2 {
      font-weight: bold;
      width: 100%;
      margin: 0 0 10px 0;
      padding: 0 0 5px 0;
      text-align: center;
      border-bottom: 1px solid black;
    }

    .rounds {
      padding: 0 0 10px 0;
      border-bottom: 1px solid #3c474d;
      a {
        display: inline-block;
        padding: 5px;
        transition: all 0.3s;
        color: black;
        border-radius: 3px;
        margin: 0 1px 0 1px;

        &:hover {
          background-color: #59a95d;
        }

        &.selected {
          background-color: #356538;
          color: white;
        }
        &.unavailable {
          background-color: #9d9d9d;
          cursor: not-allowed;
        }
      }
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      label {
        width: 90%;
        margin: 10px 0 0 0;
        padding: 0 0 10px 0;
        border-bottom: 1px solid #3b454b;

        input[type="checkbox"] {
          margin: 10px;
        }
      }

      .buttons {
        margin: 10px 0 0 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
      }
    }
  }
}
</style>