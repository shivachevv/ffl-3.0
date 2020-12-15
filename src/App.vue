<template>
  <div id="app" class="container">
    <Header></Header>
    <Logos></Logos>
    <transition name="slide-left" mode="out-in">
      <router-view></router-view>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Logos from "./components/common/Logos/Logos";
import { mapActions, mapGetters } from "vuex";
import { DATA_URL } from "./common";
// import axios from "axios";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Logos,
  },
  data() {
    return {
      loadBegin: 0,
      loadEnd: 0,
    };
  },
  methods: {
    ...mapActions([
      "fetchLoggedUser",
      "fetchStandings",
      "fetchLeagues",
      "fetchPlayers",
      "fetchCurrentRound",
      "fetchUsers",
    ]),
    uploadSiteEnter(user, loadTime) {
      const siteEnterUrl = `${DATA_URL}/enters.json`;
      const enterDate = new Date();
      const payload = {
        [enterDate]: {
          user: user.uid,
          loadTime,
        },
      };

      return fetch(siteEnterUrl, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then(() => {})
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    // test() {
    //   const etag = localStorage.getItem("lightPlayersETag");
    //   let headers = {};
    //   if (etag) {
    //     headers["If-None-Match"] = etag;
    //   }
    //   return axios
    //     .get(
    //       "https://ffl-3-new.firebaseio.com/lightPlayers/001e0b21-21ef-42db-92de-bc62926be429.json",
    //       { headers }
    //     )
    //     .then((res) => {
    //       console.log("load resource from DB");
    //       const etag = res.headers.etag;
    //       localStorage.setItem("lightPlayersETag", etag);
    //     })
    //     .catch((err) => {
    //       if (err && err.response.status === 304) {
    //         console.log("load resource from CACHE");
    //       }
    //     });
    // },
  },
  computed: { ...mapGetters(["players", "loggedUser", "users"]) },
  watch: {
    // leagues(nv) {
    //   if (
    //     nv &&
    //     this.players &&
    //     this.currentRound &&
    //     this.users &&
    //     this.loggedUser &&
    //     this.standings
    //   ) {
    //     this.$vs.loading.close();
    //   }
    // },
    async players(nv) {
      if (nv) {
        // this.$vs.loading.close();
        console.log("end", new Date());
        this.loadEnd = new Date().getTime();
        const loadTime = (this.loadEnd - this.loadBegin) / 1000;
        this.uploadSiteEnter(this.loggedUser, loadTime);
        // console.log("players", new Date());
        // const cache = await caches.open("ffl-cache");
        // const playersRes = await cache.match("https://ffl-3-new.firebaseio.com/players.json")
        // const cacheNames = await caches.keys();
        // console.log(cacheNames);
        // if (playersRes) {
        //   const players = await playersRes.json()
        //   players
        //   console.log(1);
        // }
        // if (!playersRes) {
        //   cache.add("https://ffl-3-new.firebaseio.com/players.json");
        //   console.log(2);
        // }
        // console.log("players", new Date());
        // // const request = new Request("https://ffl-3-new.firebaseio.com/players.json")
        // // const response = await fetch(request)
      }
    },
    // currentRound(nv) {
    //   if (
    //     nv &&
    //     this.players &&
    //     this.leagues &&
    //     this.users &&
    //     this.standings &&
    //     this.loggedUser
    //   ) {
    //     this.$vs.loading.close();
    //   }
    // },
    // users(nv) {
    //   if (
    //     nv &&
    //     this.players &&
    //     this.leagues &&
    //     this.currentRound &&
    //     this.loggedUser &&
    //     this.standings
    //   ) {
    //     this.$vs.loading.close();
    //   }
    // },
    // standings(nv) {
    //   if (
    //     nv &&
    //     this.players &&
    //     this.leagues &&
    //     this.currentRound &&
    //     this.loggedUser &&
    //     this.users
    //   ) {
    //     this.$vs.loading.close();
    //   }
    // },
    // loggedUser(nv) {
    //   if (nv) {
    //     this.uploadSiteEnter(nv);
    //   }
    // },
  },
  async created() {
    console.log("begin", new Date());
    this.loadBegin = new Date().getTime();
    // console.log("App");
    // this.$vs.loading();
    this.fetchStandings();
    this.fetchLeagues();
    this.fetchPlayers();
    this.fetchCurrentRound();
    await this.fetchUsers();
    let users = this.users;
    this.fetchLoggedUser(users);
    users = null;
    // this.test();
  },
};
</script>

<style lang="scss">
@import "./common/breakpoints.scss";

.vs-popup {
  width: 60% !important;
  @media #{$mobile} {
    width: 95% !important;
  }
  .vs-popup--content {
    font-size: 0.9em !important;
    -webkit-transition: all 0.23s ease 0.1s !important;
    transition: all 0.23s ease 0.1s !important;
    overflow: auto !important;
    max-height: calc(100vh - 100px) !important;
    padding: 0px !important;
    width: 100% !important;
    margin: 0px !important;
    background-color: #e0e0e0 !important;
  }
}
// $breakpoints: (
//   phone: 380px,
//   tablet: 768px,
//   desktop: 1300px
// );

@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

/* TRANSITION CLASSES */

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

.con-vs-alert-success {
  background: #46c93a80;
  color: white;
  margin: 15px;
  width: 97%;
}

.con-vs-alert-primary {
  width: 98% !important;
  margin: 10px !important;
  background-color: #e5000059 !important;
  color: white !important;

  .con-vs-alert-primary .con-x {
    background-color: #3b454b !important;
    color: #fff !important;
    .vs-alert--close {
      background-color: red !important;
    }
  }
}

/*------------RESET--------------
---------------------------------*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
font,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-weight: inherit;
  font-style: inherit;
  font-size: 100%;
  font-family: "Montserrat", sans-serif;
  vertical-align: baseline;
}

/* remember to define focus styles! */
:focus {
  outline: 0;
}

body {
  line-height: 1;
  color: black;
  background: white;
}

ol,
ul {
  list-style: none;
}

/* tables still need 'cellspacing="0"' in the markup */
table {
  border-collapse: separate;
  border-spacing: 0;
}

caption {
  text-align: left;
  font-weight: normal;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
}

blockquote,
q {
  quotes: "" "";
}

/* * 	{
font-family: 'Source Sans Pro', sans-serif;
} */
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

/*************************************
*****     RESET END   ***************/

.up {
  text-transform: uppercase;
}

.sha {
  -webkit-box-shadow: 5px 5px 21px -5px rgba(0, 0, 0, 0.43);
  -moz-box-shadow: 5px 5px 21px -5px rgba(0, 0, 0, 0.43);
  box-shadow: 5px 5px 21px -5px rgba(0, 0, 0, 0.43);
}

html {
  font-size: 16px;

  @media #{$mobile} {
    font-size: 13px;
  }
}

/*************** CONTAINER **********/

body {
  width: 100%;
  color: #000000;
  background-color: #c6c6c6;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

/***************************************************
*****************  MAIN   *************************/

main {
  width: 100%;
  margin: 20px 0 0 0;
  background-color: #c6c6c6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}

.main-container {
  width: 90%;
  background: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media #{$mobile} {
    width: 100%;
  }
}
</style>