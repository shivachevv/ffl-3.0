<template>
  <div class="popup">
    <div class="venue">
      <h3 class="up">Venue: {{ users[match.match.team1].stadium }}</h3>
    </div>
    <!-- POPUP STATS TEAM1 -->
    <div class="popup-stats up">
      <div class="popup-stats-team1 sha">
        <div class="popup-stats-header ">
          <img
            :src="
              require(`@/assets/images/team-logos/${
                users[match.match.team1].userLogo
              }.webp`)
            "
            alt="T1 Logo"
            class="popup-team1-logo"
          />
          <h2 class="popup-team1-team">
            {{ users[match.match.team1].userTeam }}
          </h2>
        </div>

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
            v-for="(player, i) in Object.entries(
              users[match.match.team1].rounds[`r${match.roundHeld}`].team
            )"
            :key="`${i}1`"
          >
            <span class="popup-player-position up">{{ player[0].length === 2 ? player[0] : player[0].substring(0,2) }}</span>
            <span class="team1-gk-name">{{ players[player[1]].name }}</span>
            <span class="team1-gk-pts"
              >{{
                players[player[1]].points[`r${match.roundHeld}`].roundPts
              }}
              pts</span
            >
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
            <img :src="require(`@/assets/images/cup/key-mom.png`)" alt="MOM" />
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
        <div class="popup-stats-header ">
          <img
            :src="
              require(`@/assets/images/team-logos/${
                users[match.match.team2].userLogo
              }.webp`)
            "
            alt="T1 Logo"
            class="popup-team1-logo"
          />
          <h2 class="popup-team2-team">
            {{ users[match.match.team2].userTeam }}
          </h2>
        </div>

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
            v-for="(player, i) in Object.entries(
              users[match.match.team2].rounds[`r${match.roundHeld}`].team
            )"
            :key="`${i}2`"
          >
            <span class="popup-player-position up">{{ player[0].length === 2 ? player[0] : player[0].substring(0,2) }}</span>
            <span class="team2-gk-name">{{ players[player[1]].name }}</span>
            <span class="team2-gk-pts"
              >{{
                players[player[1]].points[`r${match.roundHeld}`].roundPts
              }}
              pts</span
            >
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
            <img :src="require(`@/assets/images/cup/key-mom.png`)" alt="MOM" />
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
</template>

<script>
import roundPointsCalculator from "../../utils/roundPointsCalculator";

export default {
  name: "H2HMatchPopup",
  components: {},
  props: {
    match: {
      type: Object,
      required: true
    },
    players: {
      type: Object,
      required: true
    },
    users: {
      type: Object,
      required: true
    }
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
        { short: "S", long: "saves" }
      ]
    };
  },
  computed: {
    calculatedStatsHome() {
      let result = {};
      const teamId = this.match.match.team1;
      const rnd = this.match.roundHeld;
      Object.values(this.users[teamId].rounds[`r${rnd}`].team).forEach(id => {
        const player = this.players[id].points[`r${rnd}`];
        Object.keys(player.roundStats).forEach(stat => {
          const value = Number(player.roundStats[stat]);
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
      const teamId = this.match.match.team2;
      const rnd = this.match.roundHeld;
      Object.values(this.users[teamId].rounds[`r${rnd}`].team).forEach(id => {
        const player = this.players[id].points[`r${rnd}`];
        Object.keys(player.roundStats).forEach(stat => {
          const value = Number(player.roundStats[stat]);
          if (result[stat]) {
            result[stat] += value;
          } else {
            result[stat] = value;
          }
        });
      });
      return result;
    }
  },
  methods: {
    calculatedTotalPts(type) {
      const team = type === "home" ? "team1" : "team2";
      const teamId = this.match.match[`${team}`];
      const rndNumber = this.match.roundHeld;
      const round = this.users[teamId].rounds[`r${rndNumber}`];

      const result = roundPointsCalculator(
        round,
        rndNumber,
        this.players,
        true
      );

      return result;
    }
  },
  created() {},
  watch: {}
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
    width: 100%;
    flex-direction: column;
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

  .popup-stats {
    // margin: 0 0 0 10px;
    width: 100%;
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
        padding: 25px;
        img {
          position: absolute;
          left: 10px;
          top: 8px;
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
      .popup-team1-dl1,
      .popup-team1-dl2,
      .popup-team1-dc1,
      .popup-team1-dc2,
      .popup-team1-dr1,
      .popup-team1-dr2,
      .popup-team1-ml1,
      .popup-team1-ml2,
      .popup-team1-mc1,
      .popup-team1-mc2,
      .popup-team1-mr1,
      .popup-team1-mr2,
      .popup-team1-st1,
      .popup-team1-st2,
      .popup-team1-st3,
      .popup-team2-gk,
      .popup-team2-dl1,
      .popup-team2-dl2,
      .popup-team2-dc1,
      .popup-team2-dc2,
      .popup-team2-dr1,
      .popup-team2-dr2,
      .popup-team2-ml1,
      .popup-team2-ml2,
      .popup-team2-mc1,
      .popup-team2-mc2,
      .popup-team2-mr1,
      .popup-team2-mr2,
      .popup-team2-st1,
      .popup-team2-st2,
      .popup-team2-st3 {
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
</style>