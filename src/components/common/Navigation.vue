<template>
  <nav>
    <router-link to="/">
      <img src="@/assets/images/home/logo.png" alt="Logo" />
    </router-link>

    <!---------------- NAVIGATION -------------------------------------->

    <ul class="navigation">
      <li class="nav-links up" v-for="link in menuLinks" :key="link.title">
        <router-link v-if="link.path && link.toShow" :to="link.path">
          {{link.title}}
          <!-- <img
            v-if="link.isMyTeam && link.title !== 'Logout'"
            :src="require(`@/assets/images/team-logos/${link.logo}.png`)"
          /> -->
        </router-link>
      </li>
      <li class="nav-links up" v-if="loggedUser">
        <a href @click.prevent="logoutHandler">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Navigation",
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions(["fetchLoggedUser", 'fetchMenuLinks']),
    logoutHandler() {
      firebase
        .auth()
        .signOut()
        .then(() => { 
          this.fetchLoggedUser()   
          // this.$router.push('/')
          location.reload()
        });
    }
  },
  computed: {
    ...mapGetters(["leagues", "menuLinks", "loggedUser"])
  },
  beforeCreate() {},
  created() {
    this.fetchMenuLinks();
  },
  filters: {
    // routeFilter: function(v) {
    //   return v
    //     .toLowerCase()
    //     .split(" ")
    //     .join("-");
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/***********  NAVIGATION ***************/

nav {
  width: 100%;
  height: 60px;
  background-color: rgb(35, 47, 55, 0.6);
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  margin: 80px 0 0 0;
  position: absolute;
  top: 20px;
  left: 0;
  > a {
    > img {
      width: 148px;
      position: absolute;
      left: 9%;
      top: -55px;
    }
  }
}
.navigation {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 0 0 200px;
}
.nav-links {
  text-align: center;
  letter-spacing: 1px;
  height: 60px;
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
  position: relative;
  > a {
    text-decoration: none;
    color: #f1f0f1;
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 23px 0px;
    &::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      transition: all 0.1s;
      top: 0px;
      left: 0px;
    }
    &:hover {
      &::after {
        background-color: #ba4a4c21;
        border-bottom: 4px solid #983434;
      }
    }
  }
  a {
    img {
      width: 25px;
      transition: all 0.2s;
      position: absolute;
      top: 17px;
      right: 6px;
    }
  }
}
.nav-selected {
  > a {
    &:hover {
      &::after {
        border-bottom: none;
      }
    }
  }
  border-bottom: 4px solid #983434;
  background-color: #ba4a4b;
  &:hover {
    background-color: hsl(359, 44%, 46%);
  }
}

/***********NAVIGATION END **************/
</style>
