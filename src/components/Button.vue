<template>
  <router-link class="button pulse" :to="path" tag="a">{{title}}</router-link>
</template>

<script>
export default {
  name: "Button",
  props: {
    title: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* BUTTON */
@keyframes "pulse" {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  33% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}
.button {
  text-align: center;
  display: inline-flex;
  align-items: center;
  background: #873c40;
  box-shadow: 0 3px 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  color: #fff;
  font-family: Lato, Arial, sans-serif;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  will-change: transform;
  &:hover {
    background: #da6369;
    box-shadow: 0 4px 17px rgba(0, 0, 0, 0.2);
    transform: translate3d(0, -2px, 0);
  }
  &:active {
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    transform: translate3d(0, 1px, 0);
  }
}
.pulse {
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    opacity: 0;
    margin: auto;
    animation: pulse 1.5s infinite linear;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    opacity: 0;
    margin: auto;
    animation: pulse 2s 0.4s infinite linear;
  }
  &:hover {
    &:before {
      display: none;
    }
    &:after {
      display: none;
    }
  }
}

/*  BUTTON END  */
</style>