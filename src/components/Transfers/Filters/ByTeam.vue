<template>
  <div class="filter-by-team sha">
    <h3 class="title up">User Teams filter</h3>

    <select
      @change="filterSelectHandler"
      v-model="filterTeam"
      class="by-team-select up"
    >
      <!-- <option value="all">All teams</option> -->
      <option
        v-for="user of realUsers"
        :key="user.uid"
        :value="user.uid"
        class="up"
      >
        {{ user.userTeam }}
      </option>
    </select>
  </div>
</template>

<script>
// import "material-icons/iconfont/material-icons.css";

export default {
  name: "ByTeam",
  components: {},
  props: {
    users: {
      type: Object,
      required: true,
    },
    clearFilter: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      filterTeam: "",
    };
  },
  computed: {
    realUsers() {
      return Object.values(this.users).filter((x) => {
        if (x.code) return x;
      });
    },
  },
  methods: {
    filterSelectHandler() {
      this.$emit("filterTeams", [this.filterTeam]);
    },
  },
  watch: {
      clearFilter(nv){
      if (nv) this.$emit("filterTeams", []);

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

.filter-by-team {
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

  .by-team-select {
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