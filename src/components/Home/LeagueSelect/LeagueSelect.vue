<template>
  <section class="choose-league">
    <div class="up sha choose-league-title">
      <h2>Choose your league</h2>
    </div>

    <LeagueBtn
      v-for="(l,i) in leagues"
      :key="i"
      :title="l.name"
      :logo="selectedLeague === l.name ? l.logoActive : l.logoBig"
      @selectedLeague="selectedLeagueHandler($event)"
      :class="{ lgActive : selectedLeague === l.name }"
    ></LeagueBtn>
  </section>
</template>

<script>
import LeagueBtn from "./LeagueBtn";
import { mapGetters } from "vuex";

export default {
  name: "LeagueSelect",
  components: {
    LeagueBtn
  },
  props: {
    leagues: {
      type: Object,
      required: true
    },
    selectedLeague :{
      type: String
    }
  },
  data() {
    return {
      selectedLgTmp: ""
    };
  },
  computed: {
    ...mapGetters(["loggedUser"]),

    // selectedLeague: {
    //   get: function() {
    //     if (this.loggedUser && !this.selectedLgTmp) {
    //       return this.leagues["pele"].teams.filter(
    //         x => x.email === this.loggedUser.info.email
    //       )[0]
    //         ? "pele"
    //         : "maradona";
    //     } else {
    //       return this.selectedLgTmp ? this.selectedLgTmp : "pele";
    //     }
    //   },
    //   set: function(v) {
    //     this.selectedLgTmp = v;
    //   }
    // }
  },
  methods: {
    selectedLeagueHandler(x) {
      // this.selectedLeague = x;
      return this.$emit("selectedLeague", x);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.choose-league {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s;

  .choose-league-title {
    width: 100%;
    height: 50px;
    background-color: #3b464d;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;

    h2 {
      font-size: 1rem;
      color: #e5e3e4;
      text-align: center;
    }
  }
}
</style>