<template>
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

export default {
  name: "AllPlayersTable",
  props: {},
  computed: {
    ...mapGetters(["players", "currentRound"])
  },
  methods: {
    sortedRounds(arr) {
      const sorted = arr.sort((x, y) => {
        const rnd1 = Number(x[0].substring(1, 3));
        const rnd2 = Number(y[0].substring(1, 3));
        return rnd1 - rnd2;
      });
      return sorted;
    }
  },
  watch: {
    players(nv) {
      if (nv) {
        this.$vs.loading.close();
      }
    }
  }
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
