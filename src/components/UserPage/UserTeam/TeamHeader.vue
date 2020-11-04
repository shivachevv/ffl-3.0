<template>
  <div class="team-header">
    <h1 class="team-name up">
      {{ user.userTeam }}
      <div class="logo-cont">
        <div class="color-1" :style="`background-color:${colors.first};`"></div>
        <div class="color-2" :style="`background-color:${colors.second};`">
          <img
            :src="require(`@/assets/images/team-logos/${user.userLogo}.png`)"
            :alt="`${user.userLogo} logo`"
          />
        </div>
        <div class="color-1" :style="`background-color:${colors.first};`"></div>
      </div>
    </h1>
  </div>
</template>

<script>
import { userColorMap } from "../../../common";
export default {
  name: "TeamHeader",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    colors() {
      return {
        first: userColorMap[this.user.userLogo].first,
        second: userColorMap[this.user.userLogo].second
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

.team-header {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: #3c474d;
  @media #{$mobile} {
    height: 50px;
  }
}

.team-name {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #3c474d;
  color: #f1f0f1;
  font-size: 1.375rem;
  position: relative;
  padding: 0 120px 0 15px;
  margin: 0 0 0 15px;
  @media #{$mobile} {
    height: 50px;
    font-size: 1.1rem;
    margin: 0 40px 0 15px;
    padding: 0 40px 0 15px;
  }
}

.team-name::before {
  position: absolute;
  content: "";
  top: 25px;
  left: 0px;
  width: 5px;
  height: 50px;
  background-color: #9d5659;
  @media #{$mobile} {
    top: 10px;
    height: 30px;
  }
}

.logo-cont {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 220px;
  height: 100%;
  transform: skew(-40deg);
  @media #{$mobile} {
    width: 35%;
    font-size: 1.1rem;
  }
}

.logo-cont img {
  width: 70%;
  transform: skew(40deg);
  -webkit-filter: drop-shadow(3px 3px 5px #222);
  filter: drop-shadow(3px 3px 5px #222);
}

.color-1 {
  background-color: yellow;
  width: 60px;
  height: 100%;
  -webkit-box-shadow: inset 0px 0px 35px -6px rgba(0, 0, 0, 0.43);
  -moz-box-shadow: inset 0px 0px 35px -6px rgba(0, 0, 0, 0.43);
  box-shadow: inset 0px 0px 15px 3px rgba(0, 0, 0, 0.43);
}

.color-2 {
  width: 100px;
  height: 100%;
  background-color: black;
  //   background-image: url("../images/teamlogos/logo1.png");
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>