<template>
  <header>
    <img src="@/assets/images/home/banner_home.jpg" alt="banner_home" />
    <h1 class="up h1-hidden">Fantasy Legends</h1>
    <Navigation></Navigation>
  </header>
</template>

<script>
import Navigation from "./Navigation";

export default {
  name: "Header",
  components: {
    Navigation
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/*********** HEADER & NAVIGATION ***************/
header {
  width: 100%;
  margin: 0px;
  padding: 0px;
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  > img {
    width: 100%;
    float: left;
  }
}
.h1-hidden {
  z-index: 999;
  background-color: transparent;
  width: 100%;
  position: absolute;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 1.75rem;
  color: #edeaeb;
  display: none;
}

/***********NAVIGATION END **************/
</style>
