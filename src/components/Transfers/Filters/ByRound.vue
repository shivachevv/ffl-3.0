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
    <h3 v-if="filterRoundsArray[0]" class="rounds-label up">
      From: {{ filterRoundsArray[0] }} to {{ filterRoundsArray[1] }} round
    </h3>
    <h3 v-else class="rounds-label up">Select round range!</h3>
    <div class="slider-container">
      <vs-slider
        color="dark"
        @change="filterSelectHandler"
        step="1"
        v-model="filterRoundsArray"
        :min="min"
        :max="currentRound"
      />
    </div>
  </div>
</template>

<script>
// import "material-icons/iconfont/material-icons.css";

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
      min: 1,
      filterRoundsArray: [],
    };
  },
  computed: {},
  methods: {
    filterSelectHandler() {
      this.$emit("filterRounds", this.filterRoundsArray);
    },
  },
  watch: {
    clearFilter(nv){
      // if (nv) this.filterRoundsArray = new Array(2).fill(1)
      if (nv) this.filterRoundsArray = new Array()

    }
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

  .slider-container {
    margin: 10px;
    width: 90%;

    .con-vs-slider {
      min-width: auto;
      .vs-slider {
        width: 93% !important;
      }
    }
  }
}
</style>