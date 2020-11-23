<template>
  <!-- <vs-table
    max-items="50"
    pagination
    search
    stripe
    :data="playersReady"
    v-if="playersReady"
  >
    <template slot="header">
      <h3>Players</h3>
    </template>
    <template slot="thead">
      <vs-th sort-key="name"> Name </vs-th>
      <vs-th sort-key="club"> Club </vs-th>
      <vs-th sort-key="country"> Country </vs-th>
      <vs-th sort-key="position"> Position </vs-th>
      <vs-th sort-key="total"> Total </vs-th>
      <vs-th v-for="rnd in currentRound" :key="rnd"> {{rnd}} </vs-th>
    </template>

    <template slot-scope="{ data }">
      <vs-tr :key="indextr" v-for="(tr, indextr) in data">
        <vs-td :data="tr.name">
          {{ tr.name }}
        </vs-td>

        <vs-td :data="tr.club">
          {{ tr.club }}
        </vs-td>

        <vs-td :data="tr.country">
          {{ tr.country }}
        </vs-td>

        <vs-td :data="tr.position">
          {{ tr.position }}
        </vs-td>

        <vs-td :data="tr.total">
          {{ tr.total }}
        </vs-td>

        <vs-td :data="tr.points[i]" v-for="(rnd,i) in tr.points" :key="i">
          {{ rnd }}
        </vs-td>
      </vs-tr>
    </template>
    {{ playersReady }}
  </vs-table> -->
  <table v-if="players" class="container">
    <tbody>
      <tr class="rounds">
        <td>Name</td>
        <td>Position</td>
        <td>Club</td>
        <td>Country</td>
        <td>Avail Pele</td>
        <td>Avail Mar</td>
        <td v-for="i in currentRound" :key="i">{{ i }}</td>
      </tr>
      <tr v-for="p in Object.values(players)" :key="p.id" class="player">
        <td>{{ p.name }}</td>
        <td>{{ p.position }}</td>
        <td>{{ p.club }}</td>
        <td>{{ p.country }}</td>
        <td>
          {{ p.available['33c46ff1-1756-41a1-a80f-01b2f4fb4b3c'] }}
        </td>
        <td>{{ p.available['60e2f9e6-af52-4b5e-8918-94d9c79fd1c4'] }}</td>
        <td v-for="(rnd, i) in sortedRounds(Object.entries(p.points))" :key="i">
          {{ rnd[1].roundPts }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";
import "material-icons/iconfont/material-icons.css";

export default {
  name: "AllPlayersTable",
  props: {},
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["players", "currentRound"]),
    playersReady() {
      if (this.players) {
        const players = Object.keys(this.players);

        const result = players.map((x) => {
          const player = this.players[x];
          const points = Object.values(player.points).map((x) => x.roundPts);
          const total = points.reduce((acc, pts) => {
            return acc + Number(pts);
          }, 0);
          return {
            name: player.name,
            country: player.country,
            club: player.club,
            points,
            total,
            position: player.position,
          };
        });
        return result;
      } else {
        return undefined;
      }
    },
  },
  methods: {
    sortedRounds(arr) {
      const sorted = arr.sort((x, y) => {
        const rnd1 = Number(x[0].substring(1, 3));
        const rnd2 = Number(y[0].substring(1, 3));
        return rnd1 - rnd2;
      });
      return sorted;
    },
  },
  watch: {
    players(nv) {
      if (nv) {
        this.$vs.loading.close();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  width: 100%;

  .rounds {
    width: 100%;
  }

  .player {
    width: 100%;
  }
}
</style>
