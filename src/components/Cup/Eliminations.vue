<template>
  <section class="elimination" v-if="players">
    <!-- POPUP -->

    <vs-popup
      @close="deselectMatch"
      v-if="players && selectedMatch"
      class="holamundo"
      :title="
        `${users[selectedMatch.team1.id].userTeam} vs ${
          users[selectedMatch.team2.id].userTeam
        }`
      "
      :active.sync="matchPopup"
      stylePopup="width:70%"
    >
      <CupMatchPopup :players="players" :match="selectedMatch" :users="users" />
    </vs-popup>

    <!-- POPUP END -->

    <div class="elimination-matches sha">
      <div class="matches-header">
        <h2 class="up">Elimination Stage</h2>
      </div>
      <div class="elimination-stages">
        <h2 class="up">1/8 Finals</h2>
        <h2 class="up">1/4 Finals</h2>
        <h2 class="up">1/2 Finals</h2>
        <h2 class="up">Final</h2>
        <h2 class="up">1/2 Finals</h2>
        <h2 class="up">1/4 Finals</h2>
        <h2 class="up">1/8 Finals</h2>
      </div>

      <!-- ELIMINATION MATCHES FIELD -->
      <div class="elimination-matches-wrapper">
        <!-- 1/8 FINALS -->
        <div
          v-for="(match, i) in eightfinals"
          :key="`e${i}`"
          :class="`sha up eightfinal eight${i + 1}`"
        >
          <div class="label ef-label">EF{{ i + 1 }}</div>
          <div
            :class="[
              'row1',
              { eliminated: isLoser('home', match, eightfinals2, i) }
            ]"
          >
            <img
              :src="
                require(`@/assets/images/team-logos/${
                  users[match.team1.id].userLogo
                }.webp`)
              "
              alt=""
            />
            <span class="team1-name">{{ users[match.team1.id].userTeam }}</span>
          </div>
          <div class="row2">
            <!-- EF TEAM 1 -->
            <span
              v-if="match.team1.squad && match.team2.squad"
              @click="openMatchPopupHandler(match)"
              class="elimination-score match"
              >{{ calculateTeamPts(match.team1.squad) }} -
              {{ calculateTeamPts(match.team2.squad) }}</span
            >
            <span
              v-else
              @click="openMatchPopupHandler(match)"
              class="elimination-score match"
              >0 - 0</span
            >

            <!-- EF TEAM 2 -->
            <span
              v-if="eightfinals2[i].team1.squad && eightfinals2[i].team2.squad"
              @click="openMatchPopupHandler(eightfinals2[i])"
              class="elimination-score match"
              >{{ calculateTeamPts(eightfinals2[i].team2.squad) }} -
              {{ calculateTeamPts(eightfinals2[i].team1.squad) }}</span
            >
            <span
              v-else
              @click="openMatchPopupHandler(eightfinals2[i])"
              class="elimination-score match"
              >0 - 0</span
            >
          </div>
          <div
            :class="[
              'row3',
              { eliminated: isLoser('away', match, eightfinals2, i) }
            ]"
          >
            <img
              :src="
                require(`@/assets/images/team-logos/${
                  users[match.team2.id].userLogo
                }.webp`)
              "
              alt=""
            />
            <span class="team1-name">{{ users[match.team2.id].userTeam }}</span>
          </div>
        </div>

        <!-- 1/4 FINALS -->
        <div
          v-for="(match, i) in quarterfinals"
          :key="`q${i}`"
          :class="`sha up quarterfinal quarter${i + 1}`"
        >
          <div class="label qf-label">QF{{ i + 1 }}</div>
          <div
            :class="[
              'row1',
              { eliminated: isLoser('home', match, quarterfinals2, i) }
            ]"
          >
            <img
              :src="
                require(`@/assets/images/team-logos/${
                  users[match.team1.id].userLogo
                }.webp`)
              "
              alt=""
            />
            <span class="team1-name">{{ users[match.team1.id].userTeam }}</span>
          </div>
          <div class="row2">
            <!-- QF TEAM 1 -->
            <span
              v-if="match.team1.squad && match.team2.squad"
              @click="openMatchPopupHandler(match)"
              class="elimination-score match"
              >{{ calculateTeamPts(match.team1.squad) }} -
              {{ calculateTeamPts(match.team2.squad) }}</span
            >
            <span
              v-else
              @click="openMatchPopupHandler(match)"
              class="elimination-score match"
              >0 - 0</span
            >

            <!-- QF TEAM 2 -->
            <span
              v-if="
                quarterfinals2[i].team1.squad && quarterfinals2[i].team2.squad
              "
              @click="openMatchPopupHandler(quarterfinals2[i])"
              class="elimination-score match"
              >{{ calculateTeamPts(quarterfinals2[i].team2.squad) }} -
              {{ calculateTeamPts(quarterfinals2[i].team1.squad) }}</span
            >
            <span
              v-else
              @click="openMatchPopupHandler(quarterfinals2[i])"
              class="elimination-score match"
              >0 - 0</span
            >
          </div>
          <div
            :class="[
              'row3',
              { eliminated: isLoser('away', match, quarterfinals2, i) }
            ]"
          >
            <img
              :src="
                require(`@/assets/images/team-logos/${
                  users[match.team2.id].userLogo
                }.webp`)
              "
              alt=""
            />
            <span class="team1-name">{{ users[match.team2.id].userTeam }}</span>
          </div>
        </div>

        <!-- 1/2 FINALS -->
        <div
          v-for="(match, i) in semifinals"
          :key="`s${i}`"
          :class="`sha up semifinal semi${i + 1}`"
        >
          <div class="label sf-label">SF{{ i + 1 }}</div>
          <div
            :class="[
              'row1',
              { eliminated: isLoser('home', match, semifinals2, i) }
            ]"
          >
            <img
              :src="
                require(`@/assets/images/team-logos/${
                  users[match.team1.id].userLogo
                }.webp`)
              "
              alt=""
            />
            <span class="team1-name">{{ users[match.team1.id].userTeam }}</span>
          </div>
          <div class="row2">
            <!-- SF TEAM 1 -->
            <span
              v-if="match.team1.squad && match.team2.squad"
              @click="openMatchPopupHandler(match)"
              class="elimination-score match"
              >{{ calculateTeamPts(match.team1.squad) }} -
              {{ calculateTeamPts(match.team2.squad) }}</span
            >
            <span
              v-else
              @click="openMatchPopupHandler(match)"
              class="elimination-score match"
              >0 - 0</span
            >

            <!-- SF TEAM 2 -->
            <span
              v-if="semifinals2[i].team1.squad && semifinals2[i].team2.squad"
              @click="openMatchPopupHandler(semifinals2[i])"
              class="elimination-score match"
              >{{ calculateTeamPts(semifinals2[i].team2.squad) }} -
              {{ calculateTeamPts(semifinals2[i].team1.squad) }}</span
            >
            <span
              v-else
              @click="openMatchPopupHandler(semifinals2[i])"
              class="elimination-score match"
              >0 - 0</span
            >
          </div>
          <div
            :class="[
              'row3',
              { eliminated: isLoser('away', match, quarterfinals2, i) }
            ]"
          >
            <img
              :src="
                require(`@/assets/images/team-logos/${
                  users[match.team2.id].userLogo
                }.webp`)
              "
              alt=""
            />
            <span class="team1-name">{{ users[match.team2.id].userTeam }}</span>
          </div>
        </div>

        <!-- FINAL -->
        <div v-for="(match, i) in final" :key="`f${i}`" class="sha up final">
          <div class="row1">
            <img
              :src="
                require(`@/assets/images/team-logos/${
                  users[match.team1.id].userLogo
                }.webp`)
              "
              alt=""
            />
            <span class="team1-name">{{ users[match.team1.id].userTeam }}</span>
          </div>
          <div class="row2">
            <span
              v-if="match.team1.squad && match.team2.squad"
              @click="openMatchPopupHandler(match)"
              class="elimination-score match"
              >{{ calculateTeamPts(match.team1.squad) }} -
              {{ calculateTeamPts(match.team2.squad) }}</span
            >
            <span
              v-else
              @click="openMatchPopupHandler(match)"
              class="elimination-score match"
              >0 - 0</span
            >
          </div>
          <div class="row3">
            <img
              :src="
                require(`@/assets/images/team-logos/${
                  users[match.team2.id].userLogo
                }.webp`)
              "
              alt=""
            />
            <span class="team1-name">{{ users[match.team2.id].userTeam }}</span>
          </div>
        </div>

        <!-- SMALL-FINAL -->
        <div
          v-for="(match, i) in smallFinal"
          :key="`smallf${i}`"
          class="sha up littlefinal"
        >
          <div class="row1">
            <img
              :src="
                require(`@/assets/images/team-logos/${
                  users[match.team1.id].userLogo
                }.webp`)
              "
              alt=""
            />
            <span class="team1-name">{{ users[match.team1.id].userTeam }}</span>
          </div>
          <div class="row2">
            <span
              v-if="match.team1.squad && match.team2.squad"
              @click="openMatchPopupHandler(match)"
              class="elimination-score match"
              >{{ calculateTeamPts(match.team1.squad) }} -
              {{ calculateTeamPts(match.team2.squad) }}</span
            >
            <span
              v-else
              @click="openMatchPopupHandler(match)"
              class="elimination-score match"
              >0 - 0</span
            >
          </div>
          <div class="row3">
            <img
              :src="
                require(`@/assets/images/team-logos/${
                  users[match.team2.id].userLogo
                }.webp`)
              "
              alt=""
            />
            <span class="team1-name">{{ users[match.team2.id].userTeam }}</span>
          </div>
        </div>

        <!-- 3/4 FINAL -->
        <!-- <div class="sha up littlefinal">
          <div class="row1">
            <span class="team1-name">SF1 Defeated</span>
          </div>
          <div class="row2 little-final-match">
            <span class="elimination-score match">0 - 0</span>
          </div>
          <div class="row3">
            <span class="team1-name">SF2 Defeated</span>
          </div>
        </div> -->

        <!-- <div class="winner up">
            <img src="images/cup-winner.png" alt="" srcset="" />
            <a href="https://ff-legends.com/foolosophy-wanderers.html"
              >Foolosophy Wanderers</a
            >
          </div> -->
      </div>
    </div>
  </section>
  <!-- </div> -->
</template>

<script>
// import { mapGetters } from "vuex";
// import cupStandingsHelper from "../../utils/cupStandingsHelper";
import CupMatchPopup from './CupMatchPopup'
// import Standings from "../H2H/Standings";

export default {
  name: 'Eliminations',
  components: {
    CupMatchPopup
  },
  props: {
    players: {
      type: Object,
      required: true
    },
    users: {
      type: Object,
      required: true
    },
    cup: {
      type: Object,
      required: true
    }
  },
  data () {
    return { matchPopup: false, selectedMatch: undefined }
  },
  computed: {
    // ...mapGetters(["cup", "users"]),
    eightfinals () {
      if (this.cup) {
        return Object.values(this.cup.EF.rounds.r1).filter(x => {
          if (typeof x !== 'string') {
            return x
          }
        })
      } else {
        return undefined
      }
    },
    eightfinals2 () {
      if (this.cup) {
        return Object.values(this.cup.EF.rounds.r2).filter(x => {
          if (typeof x !== 'string') {
            return x
          }
        })
      } else {
        return undefined
      }
    },
    quarterfinals () {
      if (this.cup) {
        return Object.values(this.cup.QF.rounds.r1).filter(x => {
          if (typeof x !== 'string') {
            return x
          }
        })
      } else {
        return undefined
      }
    },
    quarterfinals2 () {
      if (this.cup) {
        return Object.values(this.cup.QF.rounds.r2).filter(x => {
          if (typeof x !== 'string') {
            return x
          }
        })
      } else {
        return undefined
      }
    },
    semifinals () {
      if (this.cup) {
        return Object.values(this.cup.SF.rounds.r1).filter(x => {
          if (typeof x !== 'string') {
            return x
          }
        })
      } else {
        return undefined
      }
    },
    semifinals2 () {
      if (this.cup) {
        return Object.values(this.cup.SF.rounds.r2).filter(x => {
          if (typeof x !== 'string') {
            return x
          }
        })
      } else {
        return undefined
      }
    },
    final () {
      if (this.cup) {
        return Object.values(this.cup.F.rounds.r1).filter(x => {
          if (typeof x !== 'string') {
            return x
          }
        })
      } else {
        return undefined
      }
    },
    smallFinal () {
      if (this.cup) {
        return Object.values(this.cup.SmallFinal.rounds.r1).filter(x => {
          if (typeof x !== 'string') {
            return x
          }
        })
      } else {
        return undefined
      }
    }
  },
  methods: {
    isLoser (type, ef1, ef2, i) {
      const scoreHome =
        this.calculateTeamPts(ef1.team1.squad) +
        this.calculateTeamPts(ef2[i].team2.squad)
      const scoreAway =
        this.calculateTeamPts(ef1.team2.squad) +
        this.calculateTeamPts(ef2[i].team1.squad)

      return type === 'home' ? scoreHome < scoreAway : scoreAway < scoreHome
    },
    calculateTeamPts (team) {
      return Object.values(team).reduce((acc, player) => {
        return player.pts + acc
      }, 0)
    },
    openMatchPopupHandler (match) {
      this.deselectMatch()
      this.selectedMatch = match
      return (this.matchPopup = true)
    },
    deselectMatch () {
      this.selectedMatch = undefined
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../common/breakpoints.scss';

.elimination {
  width: 130%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  margin: 20px 0 0 0;
  transition: all 0.3s;
  @media #{$mobile} {
    width: 98%;
  }

  .matches-header {
    width: 100%;

    h2 {
      width: 100%;
      background-color: #3c474d;
      color: #d3d3d3;
      border-bottom: 2px solid #893e40;
      height: 40px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 1.125rem;
    }
  }
}

/*************************************************************
********* ELIMINATION ***************************************/

.elimination-matches {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #d3d3d3;
}

.elimination-stages {
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #c6c6c6;
}

.elimination-stages h2 {
  width: 20%;
  text-align: center;
  font-size: 0.875rem;
}

.elimination-matches-wrapper {
  width: 100%;
  padding: 30px;
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(8, 1fr);

  @media #{$mobile} {
    grid-column-gap: 2px;
    grid-row-gap: 2px;
    padding: 0px;
  }
}

/********** ELIMINATION MATCHES POSITIONS ************/
.eight1 {
  grid-row: 1 / span 2;
  grid-column: 1 / span 2;
}
.eight2 {
  grid-row: 3 / span 2;
  grid-column: 1 / span 2;
}
.eight3 {
  grid-row: 5 / span 2;
  grid-column: 1 / span 2;
}
.eight4 {
  grid-row: 7 / span 2;
  grid-column: 1 / span 2;
}
.eight5 {
  grid-row: 1 / span 2;
  grid-column: 11 / span 2;
}
.eight6 {
  grid-row: 3 / span 2;
  grid-column: 11 / span 2;
}
.eight7 {
  grid-row: 5 / span 2;
  grid-column: 11 / span 2;
}
.eight8 {
  grid-row: 7 / span 2;
  grid-column: 11 / span 2;
}

.quarter1 {
  grid-row: 3 / span 2;
  grid-column: 3 / span 2;
}

.quarter2 {
  grid-row: 5 / span 2;
  grid-column: 3 / span 2;
}

.quarter3 {
  grid-row: 3 / span 2;
  grid-column: 9 / span 2;
}

.quarter4 {
  grid-row: 5 / span 2;
  grid-column: 9 / span 2;
}

.semi1 {
  grid-row: 3 / span 4;
  grid-column: 5 / span 2;
  align-self: center;
}

.semi2 {
  grid-row: 3 / span 4;
  grid-column: 7 / span 2;
  align-self: center;
}

.final {
  grid-row: 1 / span 2;
  grid-column: 5 / span 4;
}

.littlefinal {
  grid-row: 7 / span 2;
  grid-column: 5 / span 4;
}

.eightfinal,
.quarterfinal,
.semifinal {
  position: relative;
  overflow: hidden;
  .label {
    position: absolute;
    font-size: 0.7rem;
    color: white;
    top: 6px;
    left: -18px;
    background-color: #000000;
    padding: 2px 20px;
    transform: rotate(315deg);

    &.ef-label {
      background-color: #893e40;
    }
    &.qf-label {
      background-color: #3c474d;
    }
    &.sf-label {
      background-color: #000000;
    }
  }

  .row2 {
    font-weight: bold;
  }
}

.match {
  width: 100%;
  //   background-color: #c6c6c6;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
}

.quarterfinal .row2 {
  background-color: #9ec1d6;
  font-weight: bold;
}
// .quarter1:hover .row2,
// .quarter2:hover .row2,
// .quarter3:hover .row2,
// .quarter4:hover .row2 {
//   background-color: #a6aeb3;
// }

.semifinal .row2 {
  background-color: #5faed6;
  font-weight: bold;
}
// .semi1:hover .row2,
// .semi2:hover .row2 {
//   background-color: #222a2e;
// }

.littlefinal .row2 {
  background-color: #c05f61;
  font-weight: bold;
}
.final:hover .row2 {
  background-color: #692a2c;
}

.row1,
.row3 {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 1rem;
  text-align: center;

  span {
    width: 50%;
    @media #{$mobile} {
      display: none;
    }
  }
}

.eliminated {
  img {
    filter: opacity(0.5);
  }
  span {
    filter: opacity(0.5);
  }
}

.row1 img,
.row3 img {
  width: 25px;
  display: none;
  @media #{$mobile} {
    display: inline-block;
  }
}

.row2 {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #bcc4c8;
  border-bottom: 1px solid #b1b2b2;
  border-top: 1px solid #b1b2b2;
  font-size: 1.125rem;

  @media #{$mobile} {
    flex-direction: column;
  }
}

.row2 a {
  right: 10px;
  top: 25%;
}

.semis {
  background-color: #3c474d;
  color: #d3d3d3;
}

.row2 a img {
  transition: all 0.3s;
}

.row2 a img:hover {
  transform: scale(1.2);
}

.final-match {
  background-color: #893e40;
  color: #d3d3d3;
  font-weight: bold;
}

.winner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.winner a {
  color: #3c474d;
  text-decoration: none;
  font-size: 1.125rem;
  margin: 20px 0 0 0;
}

.winner a:hover {
  text-decoration: underline;
}
</style>
