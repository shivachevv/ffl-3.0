<template>
  <div class="popup animated faster fadeIn">
    <div class="venue">
      <h3 class="up">Venue: {{ users[match.team1.id].stadium }}</h3>
    </div>
    <div class="match-details">
      <!-- FIELD -->
      <div class="popup-field up">
        <div
          class="teammate"
          :class="`${player[0]}1`"
          v-for="(player, i) in Object.entries(match.team1.squad)"
          :key="`${i}1`"
        >
          <img
            :src="`https://ff-legends.com/team-kits/${
              players[player[1].id].shirt
            }.png?version=1`"
            alt=""
            srcset=""
          />
          <span class="field-player-name"
            >{{ players[player[1].id].name }}<br />{{ player[1].pts }}</span
          >
        </div>

        <!-- TEAM 2 -->

        <div
          class="teammate"
          :class="`${player[0]}2`"
          v-for="(player, i) in Object.entries(match.team2.squad)"
          :key="`${i}2`"
        >
          <img
            :src="`https://ff-legends.com/team-kits/${
              players[player[1].id].shirt
            }.png?version=1`"
            alt=""
            srcset=""
          />
          <span class="field-player-name"
            >{{ players[player[1].id].name }}<br />{{ player[1].pts }}</span
          >
        </div>
      </div>

      <!-- POPUP STATS TEAM1 -->
      <div class="popup-stats up">
        <div class="popup-stats-team1 sha">
          <div class="popup-stats-header">
            <img
              :src="
                require(`@/assets/images/team-logos/${
                  users[match.team1.id].userLogo
                }.webp`)
              "
              alt="T1 Logo"
              class="popup-team1-logo"
            />
            <h2 class="popup-team1-team">
              {{ users[match.team1.id].userTeam }}
            </h2>
          </div>
          <!-- <div class="popup-stats-name">
          <img
            :src="require(`@/assets/images/cup/spartan-head.png`)"
            alt="spartan-head"
            srcset=""
          />
          <router-link
            :to="`/team-details/${users[match.team1.id].userLogo}`"
            class="popup-name1-link animated heartBeat infinite slow"
          >
            {{users[match.team1.id].name}}
            <img
              :src="require(`@/assets/images/cup/user-info.png`)"
              alt="user-info"
              srcset=""
            />
          </router-link>
        </div> -->

          <div class="popup-players-team1 up">
            <div class="popup-players-header">
              <h3 class="">Team Players</h3>
              <span class="team1-total"
                >Total: {{ calculatedTotalPts("home") }} pts</span
              >
            </div>

            <!-- TEAM 1 GK -->
            <div
              :class="`popup-team1-${player[0]}`"
              v-for="(player, i) in Object.entries(match.team1.squad)"
              :key="`${i}1`"
            >
              <span class="popup-player-position up">{{ player[0] }}</span>
              <span class="team1-gk-name">{{
                players[player[1].id].name
              }}</span>
              <span class="team1-gk-pts">{{ player[1].pts }} pts</span>
            </div>
          </div>

          <div class="key-stats-team1">
            <div class="key-stats-header">
              <img
                :src="require(`@/assets/images/cup/key-goal.png`)"
                alt="Goal"
              />
              <img
                :src="require(`@/assets/images/cup/key-assist.png`)"
                alt="Assist"
              />
              <img :src="require(`@/assets/images/cup/key-yc.png`)" alt="YC" />
              <img :src="require(`@/assets/images/cup/key-rc.png`)" alt="RC" />
              <img
                :src="require(`@/assets/images/cup/key-post.png`)"
                alt="Post"
              />
              <img
                :src="require(`@/assets/images/cup/key-mom.png`)"
                alt="MOM"
              />
              <img
                :src="require(`@/assets/images/cup/key-saves.png`)"
                alt="Saves"
              />
            </div>
            <div class="key-stats-values">
              <span v-for="stat in stats" :key="stat.short">{{
                calculatedStatsHome[stat.long]
              }}</span>
            </div>
          </div>
        </div>

        <!-- POPUP STATS TEAM 2 -->
        <div class="popup-stats-team2 sha">
          <div class="popup-stats-header">
            <img
              :src="
                require(`@/assets/images/team-logos/${
                  users[match.team2.id].userLogo
                }.webp`)
              "
              alt="T1 Logo"
              class="popup-team1-logo"
            />
            <h2 class="popup-team2-team">
              {{ users[match.team2.id].userTeam }}
            </h2>
          </div>
          <!-- <div class="popup-stats-name">
          <img
            :src="require(`@/assets/images/cup/spartan-head.png`)"
            alt="spartan-head"
            srcset=""
          />
          <router-link
            :to="`/team-details/${users[match.team2.id].userLogo}`"
            class="popup-name1-link animated heartBeat infinite slow"
          >
            {{users[match.team2.id].name}}
            <img
              :src="require(`@/assets/images/cup/user-info.png`)"
              alt="user-info"
              srcset=""
            />
          </router-link>
        </div> -->

          <div class="popup-players-team2 up">
            <div class="popup-players-header">
              <h3 class="">Team Players</h3>
              <span class="team2-total"
                >Total: {{ calculatedTotalPts("away") }} pts</span
              >
            </div>

            <!-- TEAM 2 PLAYERS -->
            <div
              :class="`popup-team2-${player[0]}`"
              v-for="(player, i) in Object.entries(match.team2.squad)"
              :key="`${i}2`"
            >
              <span class="popup-player-position up">{{ player[0] }}</span>
              <span class="team2-gk-name">{{
                players[player[1].id].name
              }}</span>
              <span class="team2-gk-pts">{{ player[1].pts }} pts</span>
            </div>
          </div>

          <div class="key-stats-team2">
            <div class="key-stats-header">
              <img
                :src="require(`@/assets/images/cup/key-goal.png`)"
                alt="Goal"
              />
              <img
                :src="require(`@/assets/images/cup/key-assist.png`)"
                alt="Assist"
              />
              <img :src="require(`@/assets/images/cup/key-yc.png`)" alt="YC" />
              <img :src="require(`@/assets/images/cup/key-rc.png`)" alt="RC" />
              <img
                :src="require(`@/assets/images/cup/key-post.png`)"
                alt="Post"
              />
              <img
                :src="require(`@/assets/images/cup/key-mom.png`)"
                alt="MOM"
              />
              <img
                :src="require(`@/assets/images/cup/key-saves.png`)"
                alt="Saves"
              />
            </div>
            <div class="key-stats-values">
              <span v-for="stat in stats" :key="stat.short">{{
                calculatedStatsAway[stat.long]
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";
// import popupPtsHelper from "../../utils/popupPtsHelper";
// import Chart from "./Chart";
// import { clickOutside } from "../../directives";

export default {
  name: "CupMatchPopup",
  components: {},
  props: {
    match: {
      type: Object,
      required: true,
    },
    players: {
      type: Object,
      required: true,
    },
    users: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      stats: [
        { short: "G", long: "goals" },
        { short: "A", long: "assists" },
        { short: "YC", long: "yellowCards" },
        { short: "RC", long: "redCards" },
        { short: "SP", long: "shotsOnPost" },
        { short: "MOM", long: "manOfTheMatch" },
        { short: "S", long: "saves" },
      ],
      // statsMap: {
      //   assists: { short: "A", long: "Assists" },
      //   cleanSheet: { short: "CS", long: "Clean sheet" },
      //   clearanceOffLine: { short: "CL", long: "Clearance off line" },
      //   errorLeadToGoal: { short: "ERR", long: "Error lead to goal" },
      //   goals: { short: "G", long: "Goals" },
      //   lastManTackle: { short: "LMT", long: "Last man tackle" },
      //   manOfTheMatch: { short: "MOM", long: "Man of the match" },
      //   ownGoals: { short: "OG", long: "Own goals" },
      //   penaltyGoals: { short: "PG", long: "Penalty goals" },
      //   penaltyMissed: { short: "PM", long: "Penalty Missed" },
      //   penaltySaved: { short: "PS", long: "Penalty Saved" },
      //   ratingOver85: { short: "RAT", long: "Rating over 8.5" },
      //   redCards: { short: "RC", long: "Red cards" },
      //   saves: { short: "S", long: "Saves" },
      //   shotsOnPost: { short: "SP", long: "Shots on post" },
      //   starter: { short: "ST", long: "Starter" },
      //   sub: { short: "SUB", long: "Substitution" },
      //   teamVictory: { short: "TV", long: "Team victory" },
      //   threeAllowed: { short: "3G", long: "Three allowed" },
      //   yellowCards: { short: "YC", long: "Yellow cards" }
      // },
    };
  },
  computed: {
    calculatedStatsHome() {
      let result = {};
      Object.values(this.match.team1.squad).forEach((player) => {
        Object.keys(player.stats).forEach((stat) => {
          const value = Number(player.stats[stat]);
          if (result[stat]) {
            result[stat] += value;
          } else {
            result[stat] = value;
          }
        });
      });
      return result;
    },
    calculatedStatsAway() {
      let result = {};
      Object.values(this.match.team2.squad).forEach((player) => {
        Object.keys(player.stats).forEach((stat) => {
          const value = Number(player.stats[stat]);
          if (result[stat]) {
            result[stat] += value;
          } else {
            result[stat] = value;
          }
        });
      });
      return result;
    },
  },
  methods: {
    calculatedTotalPts(type) {
      const team = type === "home" ? "team1" : "team2";
      return Object.values(this.match[team].squad).reduce((acc, player) => {
        return acc + Number(player.pts);
      }, 0);
    },
    // ...mapActions(["fetchPopupData"]),
    // close() {
    //   return this.$emit("popupClose", false);
    // }
  },
  created() {
    // this.fetchPopupData(this.player);
  },
  watch: {
    match() {
      // console.log(nv);
    },
  },
  directives: {
    // clickOutside
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../common/breakpoints.scss";
/********************************************************
************** POPUP **********************************/
.con-vs-popup .vs-popup {
  width: 70% !important;
}
.popup {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media #{$mobile} {
  }

  .venue {
    width: 100%;
    padding: 10px 0 10px 12px;
    text-align: left;
    background-color: #f2f2f2;
    border-top: 2px solid #3c474d;


    h3 {
      font-weight: bold;
    }
  }

  .match-details {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    @media #{$mobile} {
      flex-direction: column;
  }

    .popup-field {
      // padding: 10px 0 0 0;
      width: 50%;
      //   height: 700px;
      background-image: url("../../assets/images/cup/pitch-cup.jpg");
      background-color: transparent;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      display: grid;
      grid-column-gap: 5px;
      grid-row-gap: 5px;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(8, 1fr);
      position: relative;
      @media #{$mobile} {
        width: 100%;
      }

      .teammate {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        span {
          text-align: center;
          font-size: 0.75rem;
          color: #d3d3d3;
          background-color: #103e10;
          padding: 2px;
        }
        img {
          width: 50px;
        }
      }
      /* POPUP FIELD POSITIONS */

      .gk1 {
        grid-row: 1 / span 1;
        grid-column: 2 / span 1;
      }

      .dl1 {
        grid-row: 2 / span 1;
        grid-column: 3 / span 1;
      }

      .dc1 {
        grid-row: 2 / span 1;
        grid-column: 2 / span 1;
      }

      .dr1 {
        grid-row: 2 / span 1;
        grid-column: 1 / span 1;
      }

      .ml1 {
        grid-row: 3 / span 1;
        grid-column: 3 / span 1;
      }

      .mc1 {
        grid-row: 3 / span 1;
        grid-column: 2 / span 1;
      }

      .mr1 {
        grid-row: 3 / span 1;
        grid-column: 1 / span 1;
      }

      .st1 {
        grid-row: 4 / span 1;
        grid-column: 2 / span 1;
      }

      .gk2 {
        grid-row: 8 / span 1;
        grid-column: 2 / span 1;
      }

      .dl2 {
        grid-row: 7 / span 1;
        grid-column: 1 / span 1;
      }

      .dc2 {
        grid-row: 7 / span 1;
        grid-column: 2 / span 1;
      }

      .dr2 {
        grid-row: 7 / span 1;
        grid-column: 3 / span 1;
      }

      .ml2 {
        grid-row: 6 / span 1;
        grid-column: 1 / span 1;
      }

      .mc2 {
        grid-row: 6 / span 1;
        grid-column: 2 / span 1;
      }

      .mr2 {
        grid-row: 6 / span 1;
        grid-column: 3 / span 1;
      }

      .st2 {
        grid-row: 5 / span 1;
        grid-column: 2 / span 1;
      }
    }

    .popup-stats {
      margin: 0 0 0 10px;
      width: 50%;
      //   height: 700px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      position: relative;
      @media #{$mobile} {
        width: 100%;
        margin: 5px 0 0 0;
      }

      .popup-stats-team1,
      .popup-stats-team2 {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: #d3d3d3;

        /* POPUP USER STATS SECTION  */

        .popup-stats-header {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 40px;
          background-color: #3c474d;
          color: #d3d3d3;
          font-size: 1rem;
          border-bottom: 2px solid #893e40;
          position: relative;

          img {
            position: absolute;
            left: 10px;
            width: 7%;
            @media #{$mobile} {
              display: none;
            }
          }
        }

        .popup-stats-name {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 40px;
          background-color: #bcc4c8;
          color: #3c474d;
          font-size: 0.75rem;
          position: relative;
          a {
            position: absolute;
            right: 10px;
            transition: all 0.2s;
            &:hover {
              transform: scale(1.1);
            }
          }
          & > img {
            position: absolute;
            left: 10px;
          }
        }

        .key-stats-team1,
        .key-stats-team2 {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;

          // padding: 10px 20px;

          .key-stats-header {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            background-color: #bbc3c7;
            border-top: 1px solid #3c474d;
            padding: 10px 5px;
          }
          .key-stats-values {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            background-color: #893e40;
            color: #d3d3d3;
            font-size: 0.75rem;
            padding: 10px 5px;
          }
        }
      }

      .popup-stats-team2 {
        margin: 0 0 0 10px;
      }

      .popup-players-team1,
      .popup-players-team2 {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        //   padding: 10px 20px;

        .popup-players-header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          border-bottom: 1px solid #3c474d;
          h3 {
            text-align: start;
            font-size: 0.75rem;
            padding: 5px;
          }
          span {
            background-color: #883e3f;
            color: #d3d3d3;
            padding: 5px;
            font-size: 0.75rem;
          }
        }

        .popup-team1-gk,
        .popup-team1-dl,
        .popup-team1-dc,
        .popup-team1-dr,
        .popup-team1-ml,
        .popup-team1-mc,
        .popup-team1-mr,
        .popup-team1-st,
        .popup-team2-gk,
        .popup-team2-dl,
        .popup-team2-dc,
        .popup-team2-dr,
        .popup-team2-ml,
        .popup-team2-mc,
        .popup-team2-mr,
        .popup-team2-st {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          background-color: #c6c6c6;
          color: #3c474d;
          padding: 5px;
          margin-bottom: 1px;
          font-size: 0.8rem;

          .popup-player-position {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 25px;
            height: 25px;
            background-color: #3b464d;
            color: lightgrey;
            border-radius: 100%;
            text-align: center;
            font-size: 0.75rem;
            @media #{$mobile} {
              width: 20px;
              height: 20px;
            }
          }

          .team1-gk-name,
          .team1-dl-name,
          .team1-dc-name,
          .team1-dr-name,
          .team1-ml-name,
          .team1-mc-name,
          .team1-mr-name,
          .team1-st-name,
          .team2-gk-name,
          .team2-dl-name,
          .team2-dc-name,
          .team2-dr-name,
          .team2-ml-name,
          .team2-mc-name,
          .team2-mr-name,
          .team2-st-name {
            text-align: start;
            width: 65%;
            @media #{$mobile} {
              font-size: 0.9rem;
              margin: 0 0 0 10px;
            }
          }

          .team1-gk-pts,
          .team1-dl-pts,
          .team1-dc-pts,
          .team1-dr-pts,
          .team1-ml-pts,
          .team1-mc-pts,
          .team1-mr-pts,
          .team1-st-pts,
          .team2-gk-pts,
          .team2-dl-pts,
          .team2-dc-pts,
          .team2-dr-pts,
          .team2-ml-pts,
          .team2-mc-pts,
          .team2-mr-pts,
          .team2-st-pts {
            text-align: center;
            width: 20%;
          }
        }
      }
    }
  }
}
</style>