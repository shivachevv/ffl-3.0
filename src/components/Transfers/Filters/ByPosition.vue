<template>
  <div class="filter-by-pos sha">
    <h3 class="title up">Position filter</h3>
    <ul class="centerx checkboxes">
      <li
        v-for="position in positions"
        :key="position"
        :class="position.toLowerCase()"
      >
        <!-- <vs-checkbox
          v-model="filterPosArray"
          :vs-value="position"
          @change="filterSelectHandler"
          >{{ position }}</vs-checkbox
        > -->
        <label :class="{ checked: filterPosArray.includes(position) }">
          {{ position }}
          <input
            type="checkbox"
            :value="position"
            v-model="filterPosArray"
            @change="filterSelectHandler"
          />
        </label>
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
      this.filterPosArray = new Array();
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
    display: grid;
    // grid-column-gap: 5px;
    // grid-row-gap: 5px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);

    li {
      margin: 10px;
      justify-self: center;
      filter: drop-shadow(0px 0px 6px rgb(34, 34, 34,0.7));
      @media #{$mobile} {
        margin: 10px 0 10px 0;
      }
      input {
        display: none;
      }
      label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background-color: #3b464d;
        color: lightgrey;
        border-radius: 100%;
        text-align: center;
        position: relative;
        z-index: 2;
        font-weight: bold;
        font-size: 0.8rem;

        &::after {
          position: absolute;
          top: auto;
          left: auto;
          content: "";
          width: 140%;
          height: 140%;
          max-width: 0%;
          max-height: 0%;
          background-color: #3b464d4f;
          z-index: 1;
          border-radius: 50%;
          transition: all 0.2s;
        }

        &.checked::after {
          max-height: 140%;
          max-width: 140%;
          z-index: -1;
        }
      }
    }

    .gk {
      grid-column: 2 / span 1;
      grid-row: 4 / span 1;
    }
    .dl {
      grid-column: 1 / span 1;
      grid-row: 3 / span 1;
    }
    .dc {
      grid-column: 2 / span 1;
      grid-row: 3 / span 1;
    }
    .dr {
      grid-column: 3 / span 1;
      grid-row: 3 / span 1;
    }
    .ml {
      grid-column: 1 / span 1;
      grid-row: 2 / span 1;
    }
    .mc {
      grid-column: 2 / span 1;
      grid-row: 2 / span 1;
    }
    .mr {
      grid-column: 3 / span 1;
      grid-row: 2 / span 1;
    }
    .st {
      grid-column: 2 / span 1;
      grid-row: 1 / span 1;
    }
  }
}
</style>