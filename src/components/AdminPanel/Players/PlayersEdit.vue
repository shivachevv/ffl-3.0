<template>
  <div>players</div>
</template>

<script>
import { getAllPlayersDataCathegorized } from "../../../utils/getAllPlayersData";

export default {
  name: "PlayersEdit",
  components: {},
  data() {
    return {
      players: undefined
    };
  },
  methods: {},
  computed: {},
  watch: {
    players(nv) {
      if (nv) {
        this.$vs.loading.close();
      }
    }
  },
  async created() {
    this.$vs.loading();
    this.players = await getAllPlayersDataCathegorized();
  }
};
</script>

<style lang="scss">
</style>