<template>
  <div class="filter-by-status sha">
    <h3 class="title up">Status Filter</h3>
    <ul class="centerx checkboxes">
      <li v-for="status in statuses" :key="status">
        <vs-checkbox
          v-model="filterStatusArray"
          :vs-value="status"
          @change="filterSelectHandler"
          >{{ status }}</vs-checkbox
        >
      </li>
    </ul>
  </div>
</template>

<script>
// import "material-icons/iconfont/material-icons.css";

export default {
  name: "ByStatus",
  components: {},
  props: {
    clearFilter: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      filterStatusArray: [],
      statuses: ["Confirmed", "Cancelled", "Pending"],
    };
  },
  computed: {},
  methods: {
    filterSelectHandler() {
      this.$emit(
        "filterStatuses",
        this.filterStatusArray.map((x) => x.toLowerCase())
      );
    },
  },
  watch: {
    clearFilter(nv) {
      this.filterStatusArray = new Array();
      if (nv) this.$emit("filterStatuses", []);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

.filter-by-status {
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
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    li {
      margin: 5px;
      font-weight: bold;
    }
  }
}
</style>