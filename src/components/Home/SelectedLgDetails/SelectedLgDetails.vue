<template>
  <section class="maradona-container">
    <div class="league-title up sha">
      <h2>
        League
        <br />
        {{selectedLeagueObj.name | leagueName}}
      </h2>
      <img
        :src="require(`@/assets/images/home/${selectedLeagueObj.logoSmall}.png`)"
        :alt="`${selectedLeagueObj.name} logo`"
      />
    </div>

    <Tow :selectedLeagueObj="selectedLeagueObj"></Tow>

    <Pow :selectedLeagueObj="selectedLeagueObj" @playerPopupSelected="playerPopupHandler($event)"></Pow>

    <Last5Transfers :selectedLeagueObj="selectedLeagueObj"></Last5Transfers>

    <!-- <div class="league-last5 sha hover">
      <div class="last5-heading up">
        <div>
          <img src="images/last5.png" alt />
        </div>
        <h2>Last 5 transfers</h2>
      </div>
      <div class="transfers-container">
        <div class="transfer">
          <p class="up arr">Transfer team 1</p>

          <div class="transfer-details">
            <span class="tr-round up">round</span>
            <span class="tr-in">
              transfer in 1
              <br />
              <span>team</span>
            </span>
            <span class="tr-pos up">st</span>
            <span class="tr-out">
              transfer out 1
              <br />
              <span>team</span>
            </span>
          </div>
        </div>

        <div class="transfer">
          <p class="up">Transfer team 2</p>

          <div class="transfer-details">
            <span class="tr-round up">round</span>
            <span class="tr-in">
              transfer in 2
              <br />
              <span>team</span>
            </span>
            <span class="tr-pos up">st</span>
            <span class="tr-out">
              transfer out 2
              <br />
              <span>team</span>
            </span>
          </div>
        </div>

        <div class="transfer">
          <p class="up">Transfer team 3</p>

          <div class="transfer-details">
            <span class="tr-round up">round</span>
            <span class="tr-in">
              transfer in 3
              <br />
              <span>team</span>
            </span>
            <span class="tr-pos up">st</span>
            <span class="tr-out">
              transfer out 3
              <br />
              <span>team</span>
            </span>
          </div>
        </div>

        <div class="transfer">
          <p class="up">Transfer team 4</p>

          <div class="transfer-details">
            <span class="tr-round up">round</span>
            <span class="tr-in">
              transfer in 4
              <br />
              <span>team</span>
            </span>
            <span class="tr-pos up">st</span>
            <span class="tr-out">
              transfer out 4
              <br />
              <span>team</span>
            </span>
          </div>
        </div>

        <div class="transfer">
          <p class="up">Transfer team 5</p>

          <div class="transfer-details">
            <span class="tr-round up">round</span>
            <span class="tr-in">
              transfer in 5
              <br />
              <span>team</span>
            </span>
            <span class="tr-pos up">st</span>
            <span class="tr-out">
              transfer out 5
              <br />
              <span>team</span>
            </span>
          </div>
        </div>
        <div class="loading-tr" id>
          <img src="images/spinner.gif" alt="loading" />
        </div>
      </div>
    </div>-->
  </section>
</template>

<script>
import Tow from "./Tow";
import Pow from "./Pow";
import Last5Transfers from "./Last5Transfers";

export default {
  name: "SelectedLgDetails",
  components: {
    Tow,
    Pow,
    Last5Transfers
  },
  props: {
    selectedLeagueObj: {
      type: Object,
      required: true
    }
  },
  methods:{
    playerPopupHandler(p) {
      return this.$emit('playerPopupSelected', p)
    }
  },
  filters: {
    leagueName: function(v) {
      return v.split("").join(" ");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pele-container,
.maradona-container {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s;
  /*overflow:hidden;*/
}

.pele-container {
  z-index: 900;
}

.maradona-container {
  z-index: 800;
}

/*************** TITLE ************/

.league-title {
  width: 100%;
  background-color: #3b464d;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  /*overflow: hidden;*/
}

.league-title::after {
  content: "";
  position: absolute;
  left: 0px;
  width: 100%;
  height: 0%;
  border-bottom: 1px solid #cc3b34;
}

.league-title img {
  height: 49px;
  position: absolute;
  background-color: #3b464d;
  top: 0px;
  z-index: 900;
  transition: all 0.1s;
}

.pele-container > .league-title img {
  padding: 5px 5px 5px 0px;
  right: 0px;
}

.maradona-container > .league-title img {
  padding: 5px 0px 5px 5px;
  left: 0px;
}

.league-title h2 {
  font-size: 1.125rem;
  color: #e5e3e4;
  /* margin: 6px 0; */
  line-height: 25px;
  text-align: center;
}
</style>