<template>
  <div class="filter-by-pos sha">
    <h3 class="title up">Position filter</h3>
    <ul class="centerx checkboxes">
      <li v-for="position in positions" :key="position">
        <vs-checkbox
          v-model="filterPosArray"
          :vs-value="position"
          @change="filterSelectHandler"
          >{{ position }}</vs-checkbox
        >
      </li>
    </ul>
  </div>
</template>

<script>
// import "material-icons/iconfont/material-icons.css";

export default {
  name: "ByPosition",
  components: {},
  props: {
    clearFilter: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      filterPosArray: [],
      positions: ["GK", "DL", "DC", "DR", "ML", "MC", "MR", "ST"],
    };
  },
  computed: {},
  methods: {
    filterSelectHandler() {
      this.$emit("filterPositions", this.filterPosArray);
    },
  },
  watch: {
    clearFilter(nv) {
        this.filterPosArray = new Array()
      if (nv) this.$emit("filterPositions", []);
    },
  },
  async created() {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

.filter-by-pos {
  margin: 20px 0 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #d3d3d3;

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

  .checkboxes {
    width: 80%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    li {
      margin: 5px;
      .vs-icon {
        line-height: 0.8 !important;
      }
    }
  }
}
</style>