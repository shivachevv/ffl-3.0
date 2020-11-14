<template>
  <main v-if="user && users && currentRound && players">
    <div class="main-container">
      <!---------------- USER TEAM SECTION -------------------------------------->
      <UserTeam
        :players="players"
        :user="user"
        :currentRound="currentRound"
        @playerPopupHandler="playerPopupHandler($event)"
      ></UserTeam>

      <!---------------- USER DETAILS -------------------------------------->
      <section class="user-details">
        <UserInfo
          :user="user"
          :currentRound="currentRound"
          :isThisLoggedTeam="isThisLoggedTeam"
        ></UserInfo>

        <!---------------- MATCH PREPARATION -------------------------------------->

        <MatchPrep
          :isThisLoggedTeam="isThisLoggedTeam"
          :owner="user.userTeam"
          :user="user"
          :currentRound="currentRound"
          :players="players"
        ></MatchPrep>

        <!-- TRANSFERS INFORMATION -->

        <TeamTransfers
          v-if="isThisLoggedTeam"
          :user="user"
          :currentRound="currentRound"
        ></TeamTransfers>
      </section>
    </div>
    <transition name="slide-left" mode="out-in">
      <vs-popup
        class="holamundo"
        :title="`${popupPlayer.name} Information`"
        :active.sync="popupShow"
        v-if="popupPlayer"
        @close="deselectPlayer"
      >
        <PlayerPopup :player="popupPlayer" />
      </vs-popup>
    </transition>
  </main>
</template>

<script>
import UserTeam from "./UserTeam/UserTeam";
import UserInfo from "./UserInfo";
import MatchPrep from "./MatchPrep";
import TeamTransfers from "./TeamTransfers";
import PlayerPopup from "../Popup/PlayerPopup";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserPage",
  components: {
    UserTeam,
    UserInfo,
    MatchPrep,
    PlayerPopup,
    TeamTransfers
  },
  props: {},
  data() {
    return {
      popupShow: false,
      popupPlayer: ""
    };
  },
  methods: {
    ...mapActions([
      // "fetchLeagues",
      // "fetchPlayers",
      "fetchCurrentRound",
      "fetchUsers"
      // "fetchStandings",
      // "fetchLoggedUser"
    ]),
    playerPopupHandler(p) {
      this.popupShow = true;
      this.popupPlayer = this.players[p];
    },
    deselectPlayer() {
      return (this.popupPlayer = "");
    },
    closePopup() {
      return (this.popupShow = false);
    }
  },
  computed: {
    ...mapGetters(["users", "loggedUser", "currentRound", "players"]),
    isThisLoggedTeam() {
      return this.user.uid === this.loggedUser.uid;
    },
    user() {
      if (this.users) {
        const user = Object.values(this.users).filter(x => {
          const routeTeam = this.$route.params.id;
          if (routeTeam === x.userLogo) {
            return x;
          }
        })[0];
        return user;
      } else {
        return undefined;
      }
    }
  },
  watch: {
    // loggedUser(nv){
    //   if (nv) {
    //     const WCStatus =  this.loggedUser.rounds[`r${this.currentRound}`].wildCard
    //     this.wildcard = WCStatus
    //     console.log(this.wildcard);
    //   }
    // },
    fetchCurrentRound(nv) {
      if (nv && this.players) {
        this.$vs.loading.close();
      }
    },
    players(nv) {
      if (nv) {
        this.$vs.loading.close();
      }
    },
    users(nv) {
      if (nv && this.players) {
        this.$vs.loading.close();

        // for (const id in nv) {
        //   const user = nv[id];
        //   const team = user.rounds.r10.team;
        //   for (const iid in team) {
        //     const player = team[iid];
        //     // console.log(iid, pos);
        //     const newId = iid !== "gk" ? iid.substring(0, 2) : iid;
        //     if (this.players[player]) {
        //       const pos = this.players[player].position;
        //       const check = newId === pos.toLowerCase()
        //       if (!check) {
        //         console.log(this.players[player].name ,player, id, user.userTeam);
        //       }
        //     }
        //   }
        // }
      }
    }
  },
  created() {
    this.$vs.loading();
    this.fetchUsers();
    this.fetchCurrentRound();
    // this.fetchPlayers();
  },
  beforeDestroy(){
    // console.log('beforeD');
    // this.closePopup()
    // this.popupShow = false
  },
  mounted() {
    // window.onpopstate = function() {
    //   console.log(this.popupShow);
    //   this.popupShow = false
    //   console.log(this.popupShow);
    // };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../common/breakpoints.scss";

// @include media("≥phone", "≤desktop") {
//   background-color: red;
// }
.main-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  @media #{$mobile} {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  .user-details {
    height: fit-content;
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 0 0 0 20px;

    @media #{$mobile} {
      width: 96%;
      margin: 0px;
    }
  }
} //POPUP STYLES
.vs-popup {
  width: 50% !important;
  .vs-popup--content {
    font-size: 0.9em !important;
    -webkit-transition: all 0.23s ease 0.1s !important;
    transition: all 0.23s ease 0.1s !important;
    overflow: auto !important;
    max-height: calc(100vh - 100px) !important;
    padding: 0px !important;
    width: 100% !important;
    margin: 0px !important;
    background-color: red !important;
    // background-color: #e0e0e0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.2s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>