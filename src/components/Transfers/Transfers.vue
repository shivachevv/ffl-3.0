<template>
  <div
    class="main-transfers-container"
    v-if="
      transfers && users && players && currentRound && leagues && selectedLeague
    "
  >
    <!---------------- FILTERS SECTION -------------------------------------->
    <section class="filters">
      <div class="header up">
        <h2 class="up">Select a league</h2>
      </div>

      <div class="filter-by-league sha">
        <div class="filter-by-league-buttons">
          <LeagueBtn
            used="transfers"
            v-for="l in leagues"
            :key="l.id"
            :title="l.name"
            :id="l.id"
            :logo="selectedLeague === l.id ? l.logoActive : l.logoBig"
            @selectedLeague="selectedLeagueHandler($event)"
            :class="{ lgActive: selectedLeague === l.id }"
          />
        </div>
      </div>
      <ByPosition
        @filterPositions="setFilters('position', $event)"
        :clearFilter="clearFilters"
      />
      <ByRound
        :currentRound="currentRound"
        @filterRounds="setFilters('round', $event)"
        :clearFilter="clearFilters"
      />
      <ByTeam
        @filterTeams="setFilters('team', $event)"
        :users="users"
        :clearFilter="clearFilters"
      />

      <!-- <div class="filter-by-team sha">
        <div class="header up">
          <h2 class="up">Filters</h2>
        </div>

        <div class="filter-by-pos sha">
          <div class="filter-header">
            <img src="images/football-field.png" alt="" />
            <h3 class="up">Filter by position</h3>
          </div>

          <div class="by-pos-select sha">
            <div class="row-1">
              <input
                class="pos-check"
                data-pos="st"
                type="checkbox"
                name=""
                value=""
                id="st"
              />
              <label for="st" class="pos-check-label up" id="st1">st</label>
            </div>

            <div class="row-2">
              <input
                class="pos-check"
                type="checkbox"
                name=""
                value=""
                id="ml"
              />
              <label for="ml" class="pos-check-label up" id="ml1">ml</label>

              <input
                class="pos-check"
                type="checkbox"
                name=""
                value=""
                id="mc"
              />
              <label for="mc" class="pos-check-label up" id="mc1">mc</label>

              <input
                class="pos-check"
                type="checkbox"
                name=""
                value=""
                id="mr"
              />
              <label for="mr" class="pos-check-label up" id="mr1">mr</label>
            </div>

            <div class="row-3">
              <input
                class="pos-check"
                type="checkbox"
                name=""
                value=""
                id="dl"
              />
              <label for="dl" class="pos-check-label up" id="dl1">dl</label>

              <input
                class="pos-check"
                type="checkbox"
                name=""
                value=""
                id="dc"
              />
              <label for="dc" class="pos-check-label up" id="dc1">dc</label>

              <input
                class="pos-check"
                type="checkbox"
                name=""
                value=""
                id="dr"
              />
              <label for="dr" class="pos-check-label up" id="dr1">dr</label>
            </div>
          </div>
        </div>

      <div class="filter-by-name sha">
        <div class="filter-header">
          <img src="images/tshirt.png" alt="" />
          <h3 class="up">Filter by name</h3>
        </div>

        <input class="" type="text" name="name" id="player_name" />
      </div>-->
      <div class="reset-filters">
        <button
          class="up sha reset-filters-button"
          @click.prevent="clearFiltersHandler"
        >
          Clear filters
        </button>
      </div>
    </section>

    <!---------------- PELE TRANSFERS -------------------------------------->
    <section class="league-transfers">
      <div class="header up">
        <h2>
          League {{ leagues[selectedLeague].name }}
          <img
            :src="
              require(`@/assets/images/home/${leagues[selectedLeague].logoSmall}.png`)
            "
            :alt="`${leagues[selectedLeague].name} logo`"
          />
        </h2>
      </div>

      <div class="transfers-container">
        <div
          class="transfer-round sha"
          v-for="(round, i) in sortedRounds"
          :key="i"
        >
          <div class="round-header">Round {{ round.substring(1) }}</div>

          <div class="round-container">
            <div class="transfers-header">
              <h3 class="header-pos up">Pos</h3>
              <h3 class="header-pos up">Status</h3>
              <h3 class="header-team up">Team</h3>
              <h3 class="header-in up">In</h3>
              <h3 class="header-in-club up">Club In</h3>
              <h3 class="header-out up">Out</h3>
              <h3 class="header-out-club up">Club Out</h3>
            </div>
            <div
              class="trans-row"
              v-for="(transfer, i) in groupRoundTransfers(
                transfersToShow[selectedLeague][round]
              )"
              :key="i"
            >
              <span class="position">{{ transfer.position }}</span>
              <span
                title="Confirmed"
                class="material-icons status status-confirmed"
                v-if="transfer.status === 'confirmed'"
                >check_box</span
              >
              <span
                title="Cancelled"
                class="material-icons status status-cancelled"
                v-if="transfer.status === 'cancelled'"
              >
                highlight_off
              </span>
              <span
                title="Pending"
                class="material-icons status status-pending"
                v-if="transfer.status === 'pending'"
              >
                watch_later
              </span>
              <span class="team">{{ users[transfer.team].userTeam }}</span>
              <span class="player-in">{{
                players[transfer.transferIn].name
              }}</span>
              <span class="player-in-club">{{
                players[transfer.transferIn].club
              }}</span>
              <span class="player-out">{{
                players[transfer.transferOut].name
              }}</span>
              <span class="player-out-club">{{
                players[transfer.transferOut].club
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const ByPosition = () => import("./Filters/ByPosition");
const ByRound = () => import("./Filters/ByRound");
const ByTeam = () => import("./Filters/ByTeam");
const LeagueBtn = () => import("../Home/LeagueSelect/LeagueBtn");
import "material-icons/iconfont/material-icons.css";

// import standingsH2HHelper from "../../utils/standingsH2HHelper";
// import CupMatchPopup from "./CupMatchPopup";

export default {
  name: "Transfers",
  components: {
    LeagueBtn,
    ByPosition,
    ByRound,
    ByTeam,
  },
  props: {},
  data() {
    return {
      filters: {
        position: [],
        round: [],
        status: [],
        team: [],
      },
      filteredTransfers: {},
      selectedLeague: undefined,
      clearFilters: false,
    };
  },
  computed: {
    ...mapGetters(["transfers", "users", "players", "currentRound", "leagues"]),
    dividedTransfers() {
      if (this.transfers && this.leagues) {
        let result = {};
        Object.keys(this.transfers).forEach((round) => {
          const usersArr = Object.keys(this.transfers[round]);

          usersArr.forEach((user) => {
            const teamLeague = this.calcTeamLeague(user);

            if (!result[teamLeague]) result[teamLeague] = {};
            if (!result[teamLeague][round]) result[teamLeague][round] = {};

            result[teamLeague][round][user] = this.transfers[round][user];
          });
        });
        // console.log(result);
        return result;
      }
      return "";
    },
    areFiltersOn() {
      let result = false;
      for (const filter in this.filters) {
        const filterArr = this.filters[filter];
        if (filterArr.length) result = true;
      }
      return result;
    },
    sortedRounds() {
      // console.log(this.transfersToShow);
      return Object.keys(this.transfersToShow[this.selectedLeague]).sort(
        (a, b) => {
          const round1 = Number(a.substring(1));
          const round2 = Number(b.substring(1));
          return round2 - round1;
        }
      );
    },
    transfersOnly() {
      if (this.dividedTransfers) {
        let result = {};
        const leagues = Object.keys(this.dividedTransfers);
        for (const league of leagues) {
          const transfers = this.dividedTransfers[league];
          result[league] = [];
          for (const round in transfers) {
            for (const user in transfers[round]) {
              const userTransfers = transfers[round][user];
              for (const num in userTransfers) {
                const transfer = userTransfers[num];
                result[league].push(transfer);
              }
            }
          }
        }
        return result;
      } else return undefined;
    },
    transfersToShow() {
      if (this.areFiltersOn) {
        return this.filteredTransfers;
      } else {
        return this.dividedTransfers;
      }
    },
  },
  methods: {
    ...mapActions(["fetchTransfers", "fetchLeagues"]),
    calcTeamLeague(user) {
      return Object.values(this.leagues).filter((league) => {
        if (league.teams.includes(user)) {
          return league;
        }
      })[0].id;
    },
    selectedLeagueHandler(x) {
      return (this.selectedLeague = x);
    },
    groupRoundTransfers(round) {
      const result = Object.values(round)
        .map((x) => {
          return Object.values(x).flat(1);
        })
        .flat(1)
        .sort((a, b) => {
          return a.team.localeCompare(b.team);
        });
      return result;
    },
    setFilters(type, values) {
      this.clearFilters = false;
      this.filters[type] = values;

      const leagues = Object.keys(this.dividedTransfers);
      for (const league of leagues) {
        const filteredArray = this.applyFilters(
          this.transfersOnly[league],
          this.filters
        );
        this.filteredTransfers[league] = this.groupFiltered(filteredArray);
      }

      // for (const u in this.users) {
      //     const user = this.users[u];
      //     console.log(user.userTeam, user.superCpt[1], user.superCpt[2  ]);
      // }
    },
    applyFilters(transfers, filters) {
      return transfers
        .filter((tr) => {
          if (!filters.position.length) return tr;
          else if (filters.position.includes(tr.position)) return tr;
        })
        .filter((tr) => {
          if (!filters.round.length) return tr;
          else if (filters.round.includes(tr.round)) return tr;
        })
        .filter((tr) => {
          if (!filters.status.length) return tr;
          else if (filters.status.includes(tr.status)) return tr;
        })
        .filter((tr) => {
          if (!filters.team.length) return tr;
          else if (filters.team.includes(tr.team)) return tr;
        });
    },
    groupFiltered(transfers) {
      let result = {};
      result = {};
      for (const transfer of transfers) {
        let num = 1;
        if (!result[`r${transfer.round}`]) result[`r${transfer.round}`] = {};
        if (!result[`r${transfer.round}`][transfer.team])
          result[`r${transfer.round}`][transfer.team] = {};

        if (result[`r${transfer.round}`][transfer.team][`t${num}`]) num = 2;
        if (result[`r${transfer.round}`][transfer.team][`t2`]) num = 3;
        if (result[`r${transfer.round}`][transfer.team][`t3`]) num = 4;

        if (!result[`r${transfer.round}`][transfer.team][`t${num}`])
          result[`r${transfer.round}`][transfer.team][`t${num}`] = {};

        result[`r${transfer.round}`][transfer.team][`t${num}`] = transfer;
      }
      return result;
      // return { [this.selectedLeague]: result };
    },
    clearFiltersHandler() {
      this.clearFilters = true;
      return (this.filters = {
        position: [],
        round: [],
        status: [],
        team: [],
      });
    },
  },
  watch: {
    players(nv) {
      if (nv && this.transfers && this.users) {
        this.$vs.loading.close();
      }
    },
    transfers(nv) {
      if (nv && this.players && this.users) {
        this.$vs.loading.close();
      }
    },
    users(nv) {
      if (nv && this.players && this.transfers) {
        this.$vs.loading.close();
      }
    },
    leagues(nv) {
      if (nv && this.players && this.transfers && this.users) {
        this.$vs.loading.close();
        this.selectedLeague = Object.keys(nv)[0];
        // console.log(this.selectedLeague);
      }
      if (nv) {
        this.selectedLeague = Object.keys(nv)[0];
      }
    },
  },
  async created() {
    this.$vs.loading();
    await this.fetchTransfers();
    await this.fetchLeagues();
    // await this.fetchLoggedUser()
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../common/breakpoints.scss";

.vs-collapse {
  width: 100%;
  &.vs-collapse-item--header {
    background-color: #a3a3a3 !important;
    box-shadow: 5px 5px 21px -5px rgba(0, 0, 0, 0.43) !important;
  }
  @media #{$mobile} {
    padding: 0px;
  }
}

header {
  background-color: #a3a3a3 !important;
  box-shadow: 5px 5px 21px -5px rgba(0, 0, 0, 0.43) !important;
}

.main-transfers-container {
  width: 90%;
  background: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  @media #{$mobile} {
    width: 98%;
    flex-direction: column;
  }
}

/******************** FILTERS SECTION **********************/

.filters {
  width: 21%;
  padding: 20px 0 0 0;
  @media #{$mobile} {
    width: 100%;
    flex-direction: column;
  }
}

.filter-by-league {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #d3d3d3;

  .filter-by-league-buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #d3d3d3;
    padding: 5px;
  }
}

.header {
  // margin: 20px 0 0 0;
  width: 100%;
  height: 40px;
  background-color: #3b464d;
  color: #d3d3d3;
  border-bottom: 4px solid #893e40;
}

.header h2 {
  text-align: center;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
}

.filter-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.filter-header img {
  width: 24px;
  margin: 10px;
}

.filter-header h3 {
  height: 24px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #893e40;
  margin: 0 3% 0 0;
  font-size: 0.875rem;
}

select::-ms-expand {
  display: none;
  /* remove default arrow in IE 10 and 11 */
}

/* target Internet Explorer 9 to undo the custom arrow */
@media screen and (min-width: 0\0) {
  select {
    background: none\9;
    padding: 5px\9;
  }
}

.by-pos-select {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#c9c9c9+0,9fa6ad+50,c9c9c9+100 */
  background: rgb(201, 201, 201);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    rgba(201, 201, 201, 1) 0%,
    rgb(172, 177, 181) 50%,
    rgba(201, 201, 201, 1) 100%
  );
  /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    rgba(201, 201, 201, 1) 0%,
    rgb(172, 177, 181) 50%,
    rgba(201, 201, 201, 1) 100%
  );
  /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    rgba(201, 201, 201, 1) 0%,
    rgb(172, 177, 181) 50%,
    rgba(201, 201, 201, 1) 100%
  );
  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#c9c9c9', endColorstr='#c9c9c9', GradientType=0);
  /* IE6-9 */
  font-size: 0.75rem;
  margin: 10px 0 0 0;
}

.row-1,
.row-2,
.row-3,
.row-4 {
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  /* margin: 10px; */
  padding: 10px;
  z-index: 1;
}

.row-1 {
  border-bottom: 1px solid #3b464d;
}

.row-3 {
  border-top: 1px solid #3b464d;
  border-bottom: 1px solid #3b464d;
}

.pos-check {
  display: none;
}

.pos-check-label {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #3b464d;
  color: lightgrey;
  /* padding: 12px 10px; */
  border-radius: 100%;
  text-align: center;
  position: relative;
}

.pos-check-label::after {
  position: absolute;
  top: auto;
  left: auto;
  content: "";
  width: 140%;
  height: 140%;
  max-width: 0%;
  max-height: 0%;
  background-color: #3b464d4f;
  z-index: -1;
  border-radius: 50%;
  transition: all 0.2s;
}

.pos-check-label:hover::after {
  max-width: 140%;
  max-height: 140%;
}

.filter-by-name {
  margin: 20px 0 0 0;
  padding: 0 10px 10px 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #d3d3d3;
}

.filter-by-name input {
  padding: 0 0 0 10px;
  width: 94%;
  margin: 10px;
  background-color: #c6c6c6;
  height: 30px;
  color: #3b464d;
  padding: 0 0 0 10px;
  width: 94%;
  margin: 10px;
  background-color: #c6c6c6;
  height: 30px;
  color: #3b464d;
  border-bottom: 2px solid #893e40;
  border-top: none;
  border-left: none;
  border-right: none;
  font-size: 0.875rem;
}

.reset-filters {
  text-align: right;
  margin: 20px 0 0 0;

  .reset-filters-button {
    width: 50%;
    padding: 10px 5px;
    background-color: #893e40;
    color: lightgrey;
    border: none;
    font-size: 0.875rem;
    position: relative;
    transition: all 0.3s;

    &:hover {
      background-color: #aa5a5d;
      color: lightgrey;
      padding: 10px 0 10px 30px;
      cursor: pointer;
    }
    &::before {
      content: "";
      position: absolute;
      top: 8px;
      left: 20px;
      width: 2px;
      height: 20px;
      background-color: lightgrey;
      display: none;
    }
    &::after {
      content: "";
      position: absolute;
      top: 17px;
      left: 11px;
      width: 20px;
      height: 2px;
      background-color: lightgrey;
      display: none;
    }
    &:hover::before {
      display: inline-block;
      transform: rotate(-45deg);
    }

    &:hover::after {
      display: inline-block;
      transform: rotate(-45deg);
    }
  }
}

/***********************************************************
  ******************* TRANSFERS PELE SECTION ***************/

.league-transfers {
  margin: 20px 0 0 0;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;

  @media #{$mobile} {
    width: 100%;
    margin: 20px 0 0 0;
  }

  .header {
    position: relative;
    @media #{$mobile} {
      width: 100%;
      margin: 0px;
    }

    img {
      position: absolute;
      top: 2px;
      left: 5px;
      width: 28px;
    }
  }
}

.transfers-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* height: fit-content; */
  /* background-color: #a0a5a9; */
  color: #3b464d;
  font-size: 0.75rem;
  font-weight: bold;

  .transfer-round {
    width: 100%;
    margin: 15px 0 0 0;
    border-radius: 5px;
    overflow: hidden;

    &:first-child {
      margin: 0px;
      border-radius: 0px 0px 5px 5px;
    }
    .round-header {
      width: 100%;
      padding: 10px;
      background-color: #3b464d;
      color: lightgrey;
      font-weight: bold;
    }

    header {
      i {
        background-color: red !important;
      }
    }

    .round-container {
      .transfers-header {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 2px solid #893e40;
        @media #{$mobile} {
          font-size: 0.8rem;
          display: none;
        }

        .header-pos {
          width: 6%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 30px;
          /* margin: 9px 0 0 0; */
          background-color: #a0a5a9;
          @media #{$mobile} {
            height: 20px;
          }
        }

        .header-team {
          width: 18%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 30px;
          /* margin: 9px 0 0 0; */
          background-color: #a0a5a9;
          border-left: 1px solid #3b464d;
          border-right: 1px solid #3b464d;
          @media #{$mobile} {
            height: 20px;
          }
        }

        .header-in {
          width: 20%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 30px;
          /* margin: 9px 0 0 0; */
          background-color: #a0a5a9;
          //   border-left: 1px solid #3b464d;
          //   border-right: 1px solid #3b464d;
          @media #{$mobile} {
            height: 20px;
          }
        }
        .header-in-club {
          width: 18%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 30px;
          /* margin: 9px 0 0 0; */
          background-color: #a0a5a9;
          border-left: 1px solid #3b464d;
          border-right: 1px solid #3b464d;
          @media #{$mobile} {
            height: 20px;
          }
        }

        .header-out {
          width: 20%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 30px;
          /* margin: 9px 0 0 0; */
          background-color: #a0a5a9;
          @media #{$mobile} {
            height: 20px;
          }
        }
        .header-out-club {
          width: 18%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 30px;
          /* margin: 9px 0 0 0; */
          background-color: #a0a5a9;
          border-left: 1px solid #3b464d;
          //   border-right: 1px solid #3b464d;
          @media #{$mobile} {
            height: 20px;
          }
        }
      }
      .trans-row {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: stretch;
        border-bottom: 1px solid #3b464d;

        &:first-child {
          border-top: 1px solid #3b464d;
        }
        &:last-child {
          border-bottom: none;
        }

        span {
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          @media #{$mobile} {
            font-size: 0.65rem;
          }
        }

        .position {
          width: 6%;
        }
        .status {
          width: 6%;
          border-left: 1px solid #3b464d;
          @media #{$mobile} {
            font-size: 1.2rem;
          }
        }
        .status-pending {
          color: #6d6eff;
        }
        .status-confirmed {
          color: green;
        }
        .status-cancelled {
          color: #d40003;
        }

        .team {
          width: 18%;
          border-left: 1px solid #3b464d;
          border-right: 1px solid #3b464d;
        }
        .player-in {
          width: 20%;
          //   border-left: 1px solid #3b464d;
          //   border-right: 1px solid #3b464d;
          background-color: #5b745b63;
        }
        .player-in-club {
          width: 18%;
          border-left: 1px solid #3b464d;
          border-right: 1px solid #3b464d;
          background-color: #5b745b63;
        }

        .player-out {
          width: 20%;
          text-align: center;
          background-color: #8a4e5080;
        }
        .player-out-club {
          width: 18%;
          text-align: center;
          background-color: #8a4e5080;
          border-left: 1px solid #3b464d;
          //   border-right: 1px solid #3b464d;
        }
      }
    }
  }
}

// .trans-pele-cont,
// .trans-maradona-cont {
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
// }

// .trans-row .trans-row .trans-rnd-cont {
//   width: 7%;
//   height: 100%;
// }

// .trans-team-cont {
//   width: 30%;
//   height: 100%;
//   border-left: 1px solid #3b464d;
//   border-right: 1px solid #3b464d;
// }

// .trans-pos-cont {
//   width: 6%;
//   height: 100%;
// }

// .trans-in-cont {
//   width: 30%;
//   height: 100%;
//   /* border: 1px solid black; */
//   border-left: 1px solid #3b464d;
//   border-right: 1px solid #3b464d;
// }

// .trans-out-cont {
//   width: 30%;
//   height: 100%;
// }

// .trans-rnd-cont,
// .trans-team-cont,
// .trans-pos-cont,
// .trans-in-cont,
// .trans-out-cont {
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
// }

// .trans-rnd-cont h3,
// .trans-team-cont h3,
// .trans-pos-cont h3,
// .trans-in-cont h3,
// .trans-out-cont h3 {
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 30px;
//   /* margin: 9px 0 0 0; */
//   background-color: #a0a5a9;
// }

// .trans-row span {
//   display: inline-block;
//   padding: 5px 0px;
//   text-align: center;
// }

.light {
  background-color: #d3d3d3;
}

.dark {
  background-color: #c6c6c6;
}

.light-green {
  background-color: #afb6af;
}

.dark-green {
  background-color: #a6ada6;
}

.light-red {
  background-color: #bda6a7;
}

.dark-red {
  background-color: #b49d9e;
}
</style>