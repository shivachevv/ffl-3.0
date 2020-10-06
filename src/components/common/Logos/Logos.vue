<template>
  <section class="logos-container" v-if="selectedLeague && users && loggedUser">
    <div >
      <div class="logo" v-for="team in leagueSelected1stHalf" :key="team">
        <router-link :to="`/team-details/${users[team].userLogo}`">
          <img :src="require(`@/assets/images/team-logos/${users[team].userLogo}.png`)" alt="Team logo" />
        </router-link>
      </div>

      <!-- <Half :leagueSelected="leagueSelected1stHalf"></Half> -->
      <LeaguesDropdown :leagues="this.leagues" :selected="selectedLeague" @selectedLeague="selectedLeague = $event"></LeaguesDropdown>
      <div class="logo" v-for="team in leagueSelected2ndHalf" :key="team">
        <router-link :to="`/team-details/${users[team].userLogo}`">
          <img :src="require(`@/assets/images/team-logos/${users[team].userLogo}.png`)" alt="Team logo" />
        </router-link>
      </div>

      <!-- <Half :leagueSelected="leagueSelected1stHalf"></Half> -->
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
      selectedLgTmp: ""
    };
  },
  computed: {
    ...mapGetters(["leagues", "loggedUser", "users"]),
    // menuLeagues(){

    // }
    leagueSelected1stHalf() {
      return this.leagues[this.selectedLeague].teams.filter((x, i) => {       
        return i < this.leagues[this.selectedLeague].teams.length / 2;
      });
    },
    leagueSelected2ndHalf() {
      return this.leagues[this.selectedLeague].teams.filter((x, i) => {
        return i >= this.leagues[this.selectedLeague].teams.length / 2;
      });
    },
    selectedLeague: {
      get: function() {        
        if (this.loggedUser && !this.selectedLgTmp && this.leagues) {
          return Object.values(this.leagues).filter(x => {
            if ( x.teams.includes(this.loggedUser.uid)) {
              return x.id
            }
          })[0].id
        } else {
          if (this.leagues){
            return this.selectedLgTmp ? this.selectedLgTmp : Object.keys(this.leagues)[0];
          } else {
            return undefined
          }
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