<template>
  <main>
    <div class="main-container">
      <!---------------- LEAGUE CHOICE -------------------------------------->

      <!-- <section class="choose-league">
        <div class="up sha choose-league-title">
          <h2>Choose your league</h2>
        </div>

        <LeagueBtn
          v-for="(l,i) in leagues"
          :key="i"
          :title="l.name"
          :logo="selectedLeague === l.name ? l.logoActive : l.logoBig"
          @selectedLeague="selectedLeague = $event"
          :class="{ lgActive : selectedLeague === l.name }"
        ></LeagueBtn>
      </section>-->

      <LeagueSelect :leagues="leagues" :selectedLeague="selectedLeague" @selectedLeague="selectedLeague = $event"></LeagueSelect>

      <!---------------- STANDINGS -------------------------------------->

      <LeagueStandings :selectedLeagueObj="selectedLeagueObj"></LeagueStandings>

      <!-- <section class="standings-container" id="card">
        <div class="st-header-container">
          <p class="standings-header up">
            Standings
            <span>Pele</span>
          </p>
          <div class="switch up">
            <span class="animated heartBeat infinite slow">switch league</span>
            <img src="images/switch.png" alt />
          </div>
        </div>
        <table class="standings-table front">
          <thead class="up">
            <tr>
              <th class="table-num">#</th>
              <th class="up table-name">Team</th>
              <th class="up table-total">
                Total
                <br />points
              </th>
              <th class="up table-rnd">
                Round
                <br />points
              </th>
              <th class="up table-move">
                Up
                <br />down
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="first">
              <td class="table-num">1.</td>
              <td class="up table-name">
                <img src="images/teamlogos/logo1.png" alt />Test team
                1
                <span>Test user 1PELE</span>
              </td>
              <td class="up table-total">2100</td>
              <td class="up table-rnd">15</td>
              <td class="up table-move"></td>
            </tr>
            <tr class="sec-thi">
              <td class="table-num">2.</td>
              <td class="up table-name">
                <img src="images/teamlogos/logo1.png" alt />Test team
                2
                <span>Test user 2</span>
              </td>
              <td class="up table-total">2100</td>
              <td class="up table-rnd">15</td>
              <td class="up table-move">
                <img src="images\team-mov\d2.png" alt />
              </td>
            </tr>
            <tr class="sec-thi">
              <td class="table-num">3.</td>
              <td class="up table-name">
                <img src="images/teamlogos/logo1.png" alt />Test team
                3
                <span>Test user 3</span>
              </td>
              <td class="up table-total">2100</td>
              <td class="up table-rnd">15</td>
              <td class="up table-move"></td>
            </tr>
            <tr class="grey">
              <td class="table-num">4.</td>
              <td class="up table-name">
                <img src="images/teamlogos/logo1.png" alt />Test team
                4
                <span>Test user 4</span>
              </td>
              <td class="up table-total">2100</td>
              <td class="up table-rnd">15</td>
              <td class="up table-move"></td>
            </tr>
            <tr class="grey">
              <td class="table-num">5.</td>
              <td class="up table-name">
                <img src="images/teamlogos/logo1.png" alt />Test team
                5
                <span>Test user 5</span>
              </td>
              <td class="up table-total">2100</td>
              <td class="up table-rnd">15</td>
              <td class="up table-move"></td>
            </tr>
            <tr class="grey">
              <td class="table-num">6.</td>
              <td class="up table-name">
                <img src="images/teamlogos/logo1.png" alt />Test team
                6
                <span>Test user 6</span>
              </td>
              <td class="up table-total">2100</td>
              <td class="up table-rnd">15</td>
              <td class="up table-move"></td>
            </tr>
            <tr class="grey">
              <td class="table-num">7.</td>
              <td class="up table-name">
                <img src="images/teamlogos/logo1.png" alt />Test team
                7
                <span>Test user 7</span>
              </td>
              <td class="up table-total">2100</td>
              <td class="up table-rnd">15</td>
              <td class="up table-move"></td>
            </tr>
            <tr class="grey">
              <td class="table-num">8.</td>
              <td class="up table-name">
                <img src="images/teamlogos/logo1.png" alt />Test team
                8
                <span>Test user 8</span>
              </td>
              <td class="up table-total">2100</td>
              <td class="up table-rnd">15</td>
              <td class="up table-move"></td>
            </tr>
            <tr class="grey">
              <td class="table-num">9.</td>
              <td class="up table-name">
                <img src="images/teamlogos/logo1.png" alt />Test team
                9
                <span>Test user 9</span>
              </td>
              <td class="up table-total">2100</td>
              <td class="up table-rnd">15</td>
              <td class="up table-move"></td>
            </tr>
            <tr class="grey">
              <td class="table-num">10.</td>
              <td class="up table-name">
                <img src="images/teamlogos/logo1.png" alt />Test team
                10
                <span>Test user 10</span>
              </td>
              <td class="up table-total">2100</td>
              <td class="up table-rnd">15</td>
              <td class="up table-move"></td>
            </tr>
          </tbody>
        </table>
      </section>-->

      <!---------------- LEAGUE DETAILS -------------------------------------->

      <SelectedLgDetails
        :selectedLeagueObj="selectedLeagueObj"
        @playerPopupSelected="playerPopupHandler($event)"
      ></SelectedLgDetails>

      <!-- <section class="maradona-container">
        <div class="league-title up sha">
          <h2>
            League
            <br />M a r a d o n a
          </h2>
          <img src="images/maradona.png" alt="Maradona logo" />
        </div>

        <div class="league-tow sha hover">
          <div class="tow-heading up">
            <div>
              <img src="images/tow.png" alt="tow icon" />
            </div>
            <h2>Team of the week</h2>
          </div>
          <div class="tow-points">
            <h2 class="tow up">Test team</h2>
            <span class="tow-points-number"></span>
          </div>
          <div class="loading-tow" id>
            <img src="images/spinner.gif" alt="loading" />
          </div>
        </div>

        <div class="league-pow sha hover">
          <div class="pow-heading up">
            <div>
              <img src="images/pow.png" alt />
            </div>
            <h2>Player of the week</h2>
          </div>

          <div class="pow-points">
            <h2 class="pow up">
              No points yet
              <span></span>
            </h2>
            <span class="pow-points-number"></span>
          </div>
          <div class="pow-points">
            <h2 class="pow up">
              No points yet
              <span></span>
            </h2>
            <span class="pow-points-number"></span>
          </div>
          <div class="pow-points">
            <h2 class="pow up">
              No points yet
              <span></span>
            </h2>
            <span class="pow-points-number"></span>
          </div>
          <div class="loading-pow" id>
            <img src="images/spinner.gif" alt="loading" />
          </div>
        </div>

        <div class="league-last5 sha hover">
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
        </div>
      </section>-->
    </div>
    <transition name="slide-left" mode="out-in">
      <PlayerPopup
        v-if="popupShow"
        :popupPlayer="popupPlayer"
        :popupShow="popupShow"
        :selectedLeagueObj="selectedLeagueObj"
        @popupClose="popupShow = $event"
      ></PlayerPopup>
    </transition>
  </main>
</template>

<script>
import LeagueSelect from "./LeagueSelect/LeagueSelect";
import LeagueStandings from "./LeagueStandings/LeagueStandings";
import SelectedLgDetails from "./SelectedLgDetails/SelectedLgDetails";
import PlayerPopup from "../Popup/PlayerPopup";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    LeagueSelect,
    LeagueStandings,
    SelectedLgDetails,
    PlayerPopup
  },
  data() {
    return {
      // leagues: leagues,
      // selectedLeague: "pele",
      popupShow: false,
      popupPlayer: "",
      selectedLgTmp: ""
    };
  },
  methods: {
    playerPopupHandler(p) {
      this.popupShow = true;
      this.popupPlayer = p;
    }
  },
  computed: {
    ...mapGetters(["loggedUser", "leagues"]),
    selectedLeagueObj() {
      return this.leagues[this.selectedLeague];
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
