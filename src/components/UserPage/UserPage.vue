<template>
  <main v-if="user && users && loggedUser && currentRound && players">
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
        <UserInfo :user="user" :currentRound="currentRound"></UserInfo>

        <!---------------- MATCH PREPARATION -------------------------------------->

        <MatchPrep
          :isThisLoggedTeam="isThisLoggedTeam"
          :owner="user.userTeam"
          :user="user"
          :currentRound="currentRound"
          :players="players"
        ></MatchPrep>

        <!-- TRANSFERS INFORMATION -->

        <TeamTransfers v-if="isThisLoggedTeam" :ownerId="user.uid" :owner="user.userTeam"></TeamTransfers>
      </section>
    </div>
    <transition name="slide-left" mode="out-in">
      <vs-popup
        class="holamundo"
        :title="`${popupPlayer.name} Information`"
        :active.sync="popupShow"
        v-if="popupPlayer"
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
  created() {
    this.fetchUsers();
    this.fetchCurrentRound();
    // this.fetchPlayers();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @include media("≥phone", "≤desktop") {
//   background-color: red;
// }
.main-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .user-details {
    height: fit-content;
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 0 0 0 20px;
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