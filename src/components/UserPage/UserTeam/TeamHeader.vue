<template>
  <div class="team-header">
    <h1 class="team-name up">
      {{user.teamName}}
      <div class="logo-cont">
        <div class="color-1"></div>
        <div class="color-2">
          <img
            :src="require(`@/assets/images/team-logos/${user.teamLogo}.png`)"
            :alt="`${user.teamLogo} logo`"
          />
        </div>
        <div class="color-1"></div>
      </div>
    </h1>
  </div>
</template>

<script>
export default {
  name: "TeamHeader",
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.team-header {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: #3c474d;
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
}

.team-name::before {
  position: absolute;
  content: "";
  top: 25px;
  left: 0px;
  width: 5px;
  height: 50px;
  background-color: #9d5659;
}

.logo-cont {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 220px;
  height: 100%;
  transform: skew(-40deg);
}

.logo-cont img {
  width: 60%;
  transform: skew(40deg);
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