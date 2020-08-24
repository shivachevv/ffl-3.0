<template>
  <div class="choose-lg-container sha" @click="selectLeagueHandler(title)">
    <img :src="require(`@/assets/images/home/${logo}.png`)" :alt="`${title} logo`" />
    <p class="up">{{title}}</p>
  </div>
</template>

<script>
export default {
  name: "LeagueBtn",
  props: {
    title: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    }
  },
  methods: {
    selectLeagueHandler(x) {
      return this.$emit("selectedLeague", x);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$dark-grey: #1b2e32;
$light-grey: #d3d3d3;
$dark-red: #9d5659;

.choose-lg-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
  transition:all 0.3s;
  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 30%;
    margin: 10px;
  }
  p {
    font-size: 1rem;
    margin: 0 20px 0 0;
    padding: 5px;
    border-top: 2px solid $dark-grey;
    border-bottom: 2px solid $dark-grey;
    width: 70%;
    text-align: center;
    text-decoration: none;
    color: $dark-grey;
    transition: all 0.2s;

    &:hover {
      padding: 10px;
    }
  }
}
.lgActive {
  background-color: $dark-red;
  p {
    border-top: 2px solid $light-grey;
    border-bottom: 2px solid $light-grey;
    color: $light-grey;
    padding: 10px;
  }
}
</style>