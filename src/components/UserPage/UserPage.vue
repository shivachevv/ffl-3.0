<template>
  <main>
    <div class="main-container">
      <!---------------- USER TEAM SECTION -------------------------------------->
      <UserTeam :user="user" @playerPopupHandler="playerPopupHandler($event)"></UserTeam>

      <!---------------- USER DETAILS -------------------------------------->
      <section class="user-details">
        <UserInfo :user="user"></UserInfo>
        
        <!---------------- MATCH PREPARATION -------------------------------------->

        <MatchPrep :logCheck="logCheck" :owner="user.teamName" ></MatchPrep>

        <!-- TRANSFERS INFORMATION -->

        <TeamTransfers v-if="logCheck" :ownerId="user.teamCode" :owner="user.teamName"></TeamTransfers>
      </section>
    </div>
    <transition name="slide-left" mode="out-in">
      <PlayerPopup
        v-if="popupShow"
        :popupPlayer="popupPlayer"
        :popupShow="popupShow"
        @popupClose="popupShow = $event"
      ></PlayerPopup>
    </transition>
  </main>
</template>

<script>
import UserTeam from "./UserTeam/UserTeam";
import UserInfo from "./UserInfo";
import MatchPrep from "./MatchPrep";
import TeamTransfers from "./TeamTransfers";
import PlayerPopup from "../Popup/PlayerPopup";
import { mapGetters } from "vuex";

export default {
  name: "UserPage",
  components: {
    UserTeam,
    UserInfo,
    MatchPrep,
    PlayerPopup,
    TeamTransfers
  },
  data() {
    return {
      popupShow: false,
      popupPlayer: ""
    };
  },
  methods: {
    playerPopupHandler(p) {
      this.popupShow = true;
      this.popupPlayer = p;
    }
  },
  computed: {
    ...mapGetters(["leagues", "loggedUser"]),
    logCheck(){
      return this.user === this.loggedUser.info
    },
    user() {
      let a = this.leagues["pele"].teams.filter(
        x =>
          x.teamName
            .toLowerCase()
            .split(" ")
            .join("-") === this.$route.params.id
      )[0];
      let b = this.leagues["maradona"].teams.filter(
        x =>
          x.teamName
            .toLowerCase()
            .split(" ")
            .join("-") === this.$route.params.id
      )[0];
      return a ? a : b;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @include media("≥phone", "≤desktop") {
//   background-color: red;
// }

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

.user-details {
  height: fit-content;
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 0 20px;
}
</style>