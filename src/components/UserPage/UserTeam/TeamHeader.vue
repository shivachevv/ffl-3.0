<template>
  <div class="team-header">
    <div class="team-name-venue">
      <h1 class="up">{{ user.userTeam }}</h1>
      <!-- <div class="venue">
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="50px"
          height="50px"
          viewBox="0 0 455.563 455.563"
          style="enable-background: new 0 0 455.563 455.563"
          xml:space="preserve"
        >
          <g>
            <path
              fill="#d3d3d3"
              d="M454.575,79.102l-28.792-67.977l-15.895,6.732L402.342,0l-23.979,10.132l31.964,75.651l21.509-9.088l2.739,6.467v39.687
		c-11.928-14.683-29.19-27.94-51.292-39.092c-41.819-21.099-97.043-32.718-155.501-32.718S114.1,62.658,72.281,83.758
		c-22.102,11.151-39.364,24.409-51.292,39.092V83.163l2.739-6.467l21.509,9.088l31.964-75.651L53.221,0.001l-7.545,17.857
		l-15.895-6.732L0.989,79.102v248.816h0.293V329c0,36.469,24.782,70.027,69.782,94.495c29.306,15.936,65.179,26.881,104.155,32.067
		v-30.34c0-29.03,23.533-52.563,52.563-52.563c29.029,0,52.562,23.533,52.562,52.563v30.341
		c38.977-5.188,74.85-16.133,104.155-32.067c45-24.468,69.782-58.025,69.782-94.495v-1.081h0.293V79.102z M162.081,240.014
		l18.319-8.024l-9.61-21.939c18.262-2.664,37.403-4.049,56.992-4.049s38.729,1.385,56.992,4.049l-9.61,21.939l18.319,8.024
		l11.566-26.408c22.581,4.664,43.418,11.406,61.58,20.025c-37.021,18.323-86.246,28.407-138.849,28.407
		c-52.603,0-101.828-10.084-138.849-28.407c18.162-8.62,38.999-15.362,61.58-20.025L162.081,240.014z M387.138,221.674
		c-2.273-1.256-4.598-2.492-6.991-3.7c-19.618-9.897-42.294-17.654-66.914-23.051l17.668-40.338
		c14.516,4.321,28.033,9.588,40.236,15.745c17.005,8.579,30.391,18.32,39.782,28.765
		C405.372,206.974,397.352,214.602,387.138,221.674z M293.072,191.103c-20.864-3.354-42.823-5.103-65.29-5.103
		s-44.426,1.748-65.29,5.103l-18.238-41.639c25.866-5.869,54.198-8.964,83.528-8.964s57.662,3.095,83.528,8.964L293.072,191.103z
		 M142.33,194.923c-24.62,5.396-47.296,13.153-66.914,23.051c-2.394,1.208-4.718,2.444-6.991,3.7
		c-10.214-7.071-18.234-14.699-23.783-22.579c9.392-10.444,22.777-20.186,39.783-28.765c12.203-6.157,25.72-11.424,40.236-15.745
		L142.33,194.923z M51.954,139.134c4.771-4.821,10.281-9.437,16.464-13.799c5.712-3.955,12.104-7.737,19.145-11.289
		c37.171-18.754,86.969-29.082,140.22-29.082s103.049,10.328,140.22,29.082c7.04,3.552,13.434,7.334,19.146,11.289
		c6.183,4.362,11.692,8.979,16.464,13.799c10.602,11.005,16.316,22.767,16.316,34.368c0,1.927-0.162,3.857-0.473,5.789
		c-10.365-9.827-23.531-18.858-39.307-26.817c-12.565-6.34-26.389-11.8-41.168-16.327l7.504-17.133l-18.319-8.024l-8.696,19.854
		c-28.359-6.771-59.506-10.343-91.686-10.343c-32.179,0-63.325,3.571-91.686,10.343l-8.696-19.854l-18.319,8.024l7.504,17.133
		c-14.781,4.527-28.603,9.987-41.168,16.327c-15.776,7.959-28.941,16.99-39.307,26.817c-0.311-1.932-0.472-3.862-0.472-5.789
		C35.638,161.9,41.352,150.138,51.954,139.134z"
            />
          </g>
        </svg>
        <h3>Копнежа</h3>
      </div> -->
    </div>

    <div class="logo-cont">
      <div class="color-1" :style="`background-color:${colors.first};`"></div>
      <div class="color-2" :style="`background-color:${colors.second};`">
        <img
          :src="require(`@/assets/images/team-logos/${user.userLogo}.webp`)"
          :alt="`${user.userLogo} logo`"
        />
      </div>
      <div class="color-1" :style="`background-color:${colors.first};`"></div>
    </div>
  </div>
</template>

<script>
import { userColorMap } from "../../../common";
export default {
  name: "TeamHeader",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    colors() {
      return {
        first: userColorMap[this.user.userLogo].first,
        second: userColorMap[this.user.userLogo].second,
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

// .team-header {
//   width: 100%;
//   height: 100px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: flex-start;
//   background-color: #3c474d;
//   @media #{$mobile} {
//     height: 50px;
//   }
// }

// .team-name {
//   width: 100%;
//   height: 100px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   background-color: #3c474d;
//   color: #f1f0f1;
//   font-size: 1.375rem;
//   position: relative;
//   padding: 0 120px 0 15px;
//   margin: 0 0 0 15px;
//   @media #{$mobile} {
//     height: 50px;
//     font-size: 1.1rem;
//     margin: 0 40px 0 15px;
//     padding: 0 40px 0 15px;
//   }
// }
.team-header {
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
  // margin: 0 0 0 15px;
  @media #{$mobile} {
    height: 50px;
    font-size: 1.1rem;
    margin: 0 40px 0 15px;
    padding: 0 40px 0 15px;
  }

  &:before {
    position: absolute;
    content: "";
    top: 15px;
    left: 20px;
    width: 5px;
    height: 70px;
    background-color: #9d5659;
    @media #{$mobile} {
      top: 10px;
      height: 30px;
    }
  }

  .team-name-venue {
    margin: 0 0 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 80%;
    width: 50%;

    h1 {
      font-size: 1.5rem;
    }

    .venue {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      svg {
        width: 10%;
        height: 80%;
      }
      h3 {
        margin: 0 0 0 10px;
      }
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

      img {
        width: 70%;
        transform: skew(40deg);
        -webkit-filter: drop-shadow(3px 3px 5px #222);
        filter: drop-shadow(3px 3px 5px #222);
      }
    }
  }
}
</style>