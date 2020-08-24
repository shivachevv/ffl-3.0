<template>
  <section class="logos-container">
    <div v-if="leagueSelected1">
      <div class="logo" v-for="team in leagueSelected1" :key="team.email">
        <router-link :to="`/team-details/${team.teamName.toLowerCase().split(' ').join('-')}`">
          <img :src="require(`@/assets/images/team-logos/${team.teamLogo}.png`)" alt="Team logo" />
        </router-link>
      </div>

      <!-- <Half :leagueSelected="leagueSelected2"></Half> -->
      <LeaguesDropdown :leagues="menuLeagues" :selected="selectedLeague" @selectedLeague="selectedLeague = $event"></LeaguesDropdown>
      <div class="logo" v-for="team in leagueSelected2" :key="team.email">
        <router-link :to="`/team-details/${team.teamName.toLowerCase().split(' ').join('-')}`">
          <img :src="require(`@/assets/images/team-logos/${team.teamLogo}.png`)" alt="Team logo" />
        </router-link>
      </div>

      <!-- <Half :leagueSelected="leagueSelected1"></Half> -->
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import LeaguesDropdown from "./LeaguesDropdown";
// import Half from "./Half";

export default {
  name: "Logos",
  components: {
    LeaguesDropdown
  },
  data() {
    return {
      menuLeagues: ["pele", "maradona"],
      selectedLgTmp: ""
    };
  },
  computed: {
    ...mapGetters(["leagues", "loggedUser"]),
    leagueSelected1() {
      return this.leagues[this.selectedLeague].teams.filter((x, i) => {       
        return i < this.leagues[this.selectedLeague].teams.length / 2;
      });
    },
    leagueSelected2() {
      return this.leagues[this.selectedLeague].teams.filter((x, i) => {
        return i >= this.leagues[this.selectedLeague].teams.length / 2;
      });
    },
    selectedLeague: {
      get: function() {        
        if (this.loggedUser && !this.selectedLgTmp) {
          return this.leagues["pele"].teams.filter(
            x => x.email === this.loggedUser.info.email
          )[0]
            ? "pele"
            : "maradona";
        } else {
          return this.selectedLgTmp ? this.selectedLgTmp : "pele";
        }
      },
      set: function(v) {
        this.selectedLgTmp = v;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/****************TEAM LOGOS*****************/
.logos-container {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  -webkit-box-shadow: 0px 6px 19px -8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 6px 19px -8px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 6px 19px -8px rgba(0, 0, 0, 0.75);
  z-index: 999;
  > div {
    width: 80%;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  img {
    width: 40px;
    transition: all 0.1s ease-in-out;
  }
}
.logo {
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  &:hover {
    img {
      transform: scale(1.3);
    }
    > a {
      background-color: #9e9e9e;
      -webkit-box-shadow: 6px 6px 17px -11px rgba(0, 0, 0, 0.43);
      -moz-box-shadow: 6px 6px 17px -11px rgba(0, 0, 0, 0.43);
      box-shadow: 6px 6px 17px -11px rgba(0, 0, 0, 0.43);
    }
  }
}

/**************** TEAM LOGOS END *****************/
</style>