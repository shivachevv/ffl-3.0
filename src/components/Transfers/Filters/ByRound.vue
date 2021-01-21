<template>
  <!-- <div class="filter-by-round sha">
    <ul class="centerx">
      <li v-for="round in currentRound" :key="round">
        <vs-checkbox
          v-model="filterRoundsArray"
          :vs-value="round"
          @change="filterSelectHandler"
          >{{ round }}</vs-checkbox
        >
      </li>
    </ul>
  </div> -->
  <div class="filter-by-round sha">
    <h3 class="title up">Round filter</h3>
      <select
        @change="filterSelectHandler"
        v-model="filterRound"
        class="by-round-select up"
      >
        <option
          v-for="round of currentRound"
          :key="round"
          :value="round"
          class="up"
        >
          Round {{ round }}
        </option>
      </select>
  </div>
</template>

<script>
export default {
  name: "ByRound",
  components: {},
  props: {
    currentRound: {
      type: Number,
      required: true,
    },
    clearFilter: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      filterRound: undefined,
    };
  },
  computed: {},
  methods: {
    filterSelectHandler() {
      this.$emit("filterRounds", [this.filterRound]);
    },
  },
  watch: {
    clearFilter() {
      // if (nv) this.filterRoundsArray = new Array(2).fill(1)
      // if (nv) this.filterRound = new Array();
    },
  },
  async created() {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

.filter-by-round {
  margin: 20px 0 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #d3d3d3;
  overflow: hidden;

  .title {
    width: 100%;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #3b464d;
    color: lightgrey;
    border-bottom: 2px solid #893e40;
    font-weight: bold;
  }
  .rounds-label {
    font-weight: bold;
    margin: 5px;
  }

  .by-round-select {
    padding: 5px;
    width: 94%;
    margin: 10px;
    background-color: #c6c6c6;
    height: 30px;
    color: #3b464d;
    // -webkit-appearance: none;
    // -moz-appearance: none;
    // appearance: none;
    //   background: url(../images/down-arrow.png) 100% / 10% no-repeat #eee;
    font-size: 1rem;
  }
}
</style>