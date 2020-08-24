<template>
  <section class="standings-container" id="card">
    <div class="st-header-container">
      <p class="standings-header up">
        Standings
        <span>{{selectedLeagueObj.name}}</span>
      </p>
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
        <router-link
          :to="t.name | routeFilter"
          tag="tr"
          :class="{first : i === 0, secthi : i === 1 || i === 2, grey : i > 2 }"
          v-for="(t,i) in standingsRdy"
          :key="i"
        >
          <td class="table-num">{{i + 1}}</td>
          <td class="up table-name">
            <img :src="require(`@/assets/images/team-logos/logo1.png`)" :alt="`${t.name} logo`" />
            {{t.name}}
            <span>{{t.user}}</span>
          </td>
          <td class="up table-total">{{t.total}}</td>
          <td class="up table-rnd">{{t.roundPts}}</td>
          <td class="up table-move">
            <img
              :src="require(`@/assets/images/home/team-mov/${movement(t.move)}.png`)"
              :alt="`${t.name} logo`"
            />
          </td>
        </router-link>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LeagueStandings",
  data() {
    return {};
  },
  props: {
    selectedLeagueObj: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["standings"]),
    standingsRdy() {
      return this.standings[this.selectedLeagueObj.name];
    }
  },
  methods: {
    ...mapActions(["fetchStandings"]),
    movement(v) {
      if (v < 0) {
        return `d${v * -1}`;
      } else if (v > 0) {
        return `u${v}`;
      } else {
        return "no";
      }
    }
  },
  watch: {},
  created() {
    this.fetchStandings();
  },
  filters: {
    routeFilter: function(v) {
      return v
        .toLowerCase()
        .split(" ")
        .join("-");
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
/****************** STANDINGS ****************/

/************** TABLE *************************/
.standings-container {
  width: 40%;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}
.st-header-container {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #3b464d;
  color: #e1dfe0;
  position: relative;
  margin: 0px 0 -10px 0;
}
.standings-header {
  font-size: 1.375rem;
  span {
    color: #cc3b34;
  }
}
.standings-table {
  width: 100%;
  text-align: center;
  border-collapse: separate;
  border-spacing: 0 10px;
  transition: all 0.3s;
  th {
    background-color: #838a8e;
    color: #232f37;
    font-size: 1rem;
    border-bottom: 4px solid #4e585e;
    padding: 5px;
    vertical-align: middle;
  }
  tbody {
    tr {
      cursor: pointer;
      color: #232f37;
      font-size: 0.875rem;
      transition: all 0.2s;
      -webkit-box-shadow: 5px 0px 14px -4px rgba(0, 0, 0, 0.43);
      -moz-box-shadow: 5px 0px 14px -4px rgba(0, 0, 0, 0.43);
      box-shadow: 5px 0px 14px -4px rgba(0, 0, 0, 0.43);
      &:hover {
        transform: scale(1.02);
      }
      td {
        vertical-align: middle;
        padding: 10px 10px;
        span {
          display: block;
          font-size: 0.8rem;
          text-transform: capitalize;
          margin: 2px 0 0 0;
        }
      }
    }
  }
}
.first {
  &:hover {
    background-color: #87a487;
    z-index: 999;
  }
  background-color: #6c966c7a;
  border: 2px solid #6c966c7a;
}
.grey {
  &:hover {
    background-color: #c6c6c6;
    z-index: 999;
  }
  background-color: #d3d3d3;
}
.secthi {
  &:hover {
    background-color: #6c966c7a;
    z-index: 999;
  }
  background-color: #a6c3a67a;
}
.table-name {
  text-align: left;
  position: relative;
  padding: 10px 10px 10px 40px !important;
  a {
    color: #232f37;
  }
  img {
    width: 30px;
    position: absolute;
    top: 0 !important;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto 0;
  }
}
</style>