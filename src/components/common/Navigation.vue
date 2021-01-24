<template>
  <nav :class="{ scrolled: scrollPosition > 50 }">
    <router-link to="/">
      <img src="@/assets/images/home/logo.png" alt="Logo" />
    </router-link>

    <!---------------- NAVIGATION -------------------------------------->

    <ul class="navigation">
      <li class="nav-links" v-for="link in filteredLinks" :key="link.title">
        <router-link v-if="link.path && link.toShow" :to="link.path" class="up">
          {{ link.title }}
          <!-- <img
            v-if="link.isMyTeam && link.title !== 'Logout'"
            :src="require(`@/assets/images/team-logos/${link.logo}.png`)"
          /> -->
        </router-link>
      </li>
      <li class="nav-links up" v-if="loggedUser">
        <a href @click.prevent="logoutHandler">LOGOUT</a>
      </li>
      <li>
        <form
          action="https://www.paypal.com/donate"
          method="post"
          target="_blank"
        >
          <input type="hidden" name="cmd" value="_donations" />
          <input type="hidden" name="business" value="ENJ3T48MPRGXJ" />
          <input type="hidden" name="currency_code" value="EUR" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
            border="0"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
          />
          <!-- <img
            alt=""
            border="0"
            src="https://www.paypal.com/en_BG/i/scr/pixel.gif"
            width="1"
            height="1"
          /> -->
        </form>
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
    return {
      scrollPosition: null,
    };
  },
  methods: {
    ...mapActions(["fetchLoggedUser", "fetchMenuLinks"]),
    logoutHandler() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("logout");
          this.fetchLoggedUser();
          // this.$router.push('/')
          location.reload();
        });
    },
    updateScroll() {
      const width = window.innerWidth
      if (width > 500) {  
        this.scrollPosition = window.scrollY;
      }
    },
  },
  computed: {
    ...mapGetters(["leagues", "menuLinks", "loggedUser"]),
    filteredLinks() {
      return this.menuLinks.filter((x) => {
        if (x.path && x.toShow) {
          return x;
        }
      });
    },
  },
  beforeCreate() {},
  created() {
    this.fetchMenuLinks();
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../common/breakpoints.scss";
/***********  NAVIGATION ***************/

nav {
  width: 100%;
  /* height: 60px; */
  background-color: rgba(35, 47, 55, 0.6);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin: 40px 0 0 0;
  position: fixed;
  z-index: 9999;
  top: 0;
  /* top: 20px; */
  /* left: 0; */
  box-shadow: 0px 6px 19px -8px rgba(0, 0, 0, 0.75);
  transition: all 0.2s;

  &.scrolled {
    background-color: rgba(59, 70, 77, 1);
    margin: 0 0 0 0;
    >a {
      position: relative;
    }
    a {
      width: 40px;
      position: static;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 0 0 0 10px;

      img {
        width: 120%;
        margin: 0 0 0 10px;
      }
    }
  }

  @media #{$mobile} {
    height: auto;
    width: 100%;
    margin: 0px;
    position: inherit;
  }

  > a {
    /*border-right: 2px solid #c6c6c6; */
    width: 100px;
    /* display: inline-block; */
    /* margin: 5px; */
    /* padding: 5px; */
    position: absolute;
    top: -38px;
    left: 2%;

    @media #{$mobile} {
      display: none;
    }
    > img {
      width: 120%;
      /* position: absolute; */
      /* left: 6%; */
      /* top: -55px; */
      /* margin: 0 5px 0 0;*/
    }
  }
}
.navigation {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0 2% 0 0;
  @media #{$mobile} {
    padding: 0px;
    width: 100%;
    flex-direction: column;
  }

  .nav-links {
    text-align: center;
    letter-spacing: 1px;
    /* height: 60px; */
    /* width: 160px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.1s;
    position: relative;
    padding: 0 30px;

    @media #{$mobile} {
      height: 35px;
      width: 100%;
    }

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

          @media #{$mobile} {
            border-bottom: 2px solid #983434;
          }
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
