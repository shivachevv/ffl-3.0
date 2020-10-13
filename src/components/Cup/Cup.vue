<template>
  <div class="cup-container" v-if="cup && selectedGroup">
    <div class="cup-menu">
      <div class="cup-header">
        <h2 class="up">Battle Stages</h2>
      </div>

      <div class="cup-stages">
        <a
          href="#"
          class="sha cup-stages-links up"
          :class="{ selected: group.name === selectedGroup.name }"
          v-for="group in Object.values(cup)"
          @click.prevent="groupSelectionHandler(group)"
          :key="group.name"
          >{{ group.name }}</a
        >
      </div>
    </div>

    <!-- GROUP A -->
    <section class="group-a" >
      <!-- <div class="group-left">
        <img src="images/group-a.png" alt="Group A" srcset="" />
      </div> -->
      <div class="group-center">
        <div class="group-standings">
          <!-- HEADER -->
          <div class="standings-header sha">
            <span class="up position">Pos</span>
            <span class="up team">Team</span>
            <span class="up games">Games</span>
            <span class="up win-draw-lose">W/D/L</span>
            <span class="up goal-diff">Goal Diff</span>
            <span class="up goal-diff-total">+ / -</span>
            <span class="up points">Pts</span>
          </div>

          <!-- TEAM 1 -->

          <div class="team-stats first-places sha">
            <span class="up position">1.</span>
            <span class="up team"
              ><a
                href="http://ff-legends.com/arbitragers.html"
                target="_self"
                rel=""
                class="clickable"
                >Arbitragers</a
              ></span
            >
            <span class="up games">4</span>
            <span class="up win-draw-lose">3/0/1</span>
            <span class="up goal-diff">186 - 154</span>
            <span class="up goal-diff-total">32</span>
            <span class="up points">9</span>
          </div>

          <!-- TEAM 2 -->

          <div class="team-stats first-places sha">
            <span class="up position">2.</span>
            <span class="up team"
              ><a
                href="http://ff-legends.com/retardisimos.html"
                target="_self"
                rel=""
                class="clickable"
                >Retardisimos</a
              ></span
            >
            <span class="up games">4</span>
            <span class="up win-draw-lose">2/0/2</span>
            <span class="up goal-diff">168 - 164</span>
            <span class="up goal-diff-total">4</span>
            <span class="up points">6</span>
          </div>

          <!-- TEAM 3 -->

          <div class="team-stats sha">
            <span class="up position">3.</span>
            <span class="up team"
              ><a
                href="http://ff-legends.com/aquile-fc.html"
                target="_self"
                rel=""
                class="clickable"
                >Aquile FC</a
              ></span
            >
            <span class="up games">4</span>
            <span class="up win-draw-lose">2/0/2</span>
            <span class="up goal-diff">158 - 164</span>
            <span class="up goal-diff-total">-6</span>
            <span class="up points">6</span>
          </div>

          <!-- TEAM 4 -->

          <div class="team-stats sha">
            <span class="up position">4.</span>
            <span class="up team"
              ><a
                href="http://ff-legends.com/cowpocalypse-now.html"
                target="_self"
                rel=""
                class="clickable"
                >Cowpocalypse Now</a
              ></span
            >
            <span class="up games">4</span>
            <span class="up win-draw-lose">2/0/2</span>
            <span class="up goal-diff">160 - 170</span>
            <span class="up goal-diff-total">-10</span>
            <span class="up points">6</span>
          </div>

          <!-- TEAM 5 -->

          <div class="team-stats sha">
            <span class="up position">5.</span>
            <span class="up team"
              ><a
                href="http://ff-legends.com/thracian-separatists.html"
                target="_self"
                rel=""
                class="clickable"
                >Thracian Separatists</a
              ></span
            >
            <span class="up games">4</span>
            <span class="up win-draw-lose">1/0/3</span>
            <span class="up goal-diff">148 - 168</span>
            <span class="up goal-diff-total">-20</span>
            <span class="up points">3</span>
          </div>
        </div>

        <!-- GROUP MATCHES -->

        <div class="group-matches sha">
          <div class="matches-header">
            <h2 class="up">Group Matches</h2>
          </div>

          <!-- GAMEWEEK 1 -->

          <!-- <div class="gameweeks up">
            <div class="gameweeks-header">
              <h2 class="up">Gameweek 1</h2>
            </div>
            <div class="gameweeks-match-wrapper" id="1">
              <span class="team1">Retardisimos</span>
              <img src="images/teamlogos/retardisimos.png" alt="" srcset="" />
              <span class="score">32 - 19</span>
              <img
                src="images/teamlogos/thracian-separatists.png"
                alt=""
                srcset=""
              />
              <span class="team2">Thracian Separatists</span>
              <a href="#" class="match-details"
                ><img src="images/soccer-field.png" alt=""
              /></a>
            </div>
            <div class="gameweeks-match-wrapper" id="2">
              <span class="team1">Aquile FC</span>
              <img src="images/teamlogos/aquile-fc.png" alt="" srcset="" />
              <span class="score">46 - 35</span>
              <img
                src="images/teamlogos/cowpocalypse-now.png"
                alt=""
                srcset=""
              />
              <span class="team2">Cowpocalypse Now</span>
              <a href="#" class="match-details"
                ><img src="images/soccer-field.png" alt=""
              /></a>
            </div>

            <span class="bye-team up"
              ><img src="images/teamlogos/arbitragers.png" alt="" /> Arbitragers
              - bye</span
            >
          </div> -->

          

            

          

          

          
        </div>
      </div>
      <!-- <div class="group-right">
        <img src="images/cup.png" alt="Group A" srcset="" />
      </div> -->
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import cupStandingsHelper from '../../utils/cupStandingsHelper'

export default {
  name: "Cup",
  components: {},
  props: {},
  data() {
    return {
      selectedGroup: undefined
    };
  },
  computed: {
    ...mapGetters(["cup"]),
    cupStandings(){
        const result = cupStandingsHelper(this.cup)

        console.log(result);
        return 'test'
    }
  },
  methods: {
    ...mapActions(["fetchCup"]),
    groupSelectionHandler(v) {
      return (this.selectedGroup = v);
    }
  },
  async created() {
    await this.fetchCup();
    this.selectedGroup = Object.values(this.cup)[0];
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/*------------RESET--------------
---------------------------------*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
font,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-weight: inherit;
  font-style: inherit;
  font-size: 100%;
  font-family: "Montserrat", sans-serif;
  vertical-align: baseline;
}

/* remember to define focus styles! */
:focus {
  outline: 0;
}

body {
  line-height: 1;
  color: black;
  background: white;
}

ol,
ul {
  list-style: none;
}

/* tables still need 'cellspacing="0"' in the markup */
table {
  border-collapse: separate;
  border-spacing: 0;
}

caption {
  text-align: left;
  font-weight: normal;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
}

blockquote,
q {
  quotes: "" "";
}

/* * 	{
font-family: 'Source Sans Pro', sans-serif;
} */
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

/*************************************
*****     RESET END   ***************/
.up {
  text-transform: uppercase;
}

.sha {
  -webkit-box-shadow: 5px 5px 21px -5px rgba(0, 0, 0, 0.43);
  -moz-box-shadow: 5px 5px 21px -5px rgba(0, 0, 0, 0.43);
  box-shadow: 5px 5px 21px -5px rgba(0, 0, 0, 0.43);
}

html {
  font-size: 16px;
}

/*************** CONTAINER **********/

body {
  width: 100%;
  color: #000000;
  background-color: #c6c6c6;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}

/*********** HEADER & NAVIGATION ***************/
header {
  width: 100%;
  /* height:352px; */
  margin: 0px;
  padding: 0px;
  /* background-image: url("../images/banner_home.jpg"); */
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
}

header > img {
  width: 100%;
  float: left;
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

nav {
  width: 100%;
  height: 60px;
  background-color: rgb(35, 47, 55, 0.6);
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  margin: 80px 0 0 0;
  position: absolute;
  top: 20px;
  left: 0;
}

/* nav a {
    display:inline-block;
} */
nav > a > img {
  width: 148px;
  position: absolute;
  left: 9%;
  top: -55px;
}

.navigation {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.nav-links {
  text-align: center;

  letter-spacing: 1px;
  height: 60px;
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
  position: relative;
}

/* .nav-links:nth-child(2)::before {
  position: absolute;
    content: '';
    right: 10px;
    bottom: 18px;
    width: 20px;
    height: 20px;

    border-top: 10px solid #8e5e60;
    border-bottom: 0px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    transition: all 0.2s;
}
.nav-links:nth-child(2):hover::before {
  transform: rotateZ(45deg);

} */

.nav-links > a {
  text-decoration: none;
  color: #f1f0f1;
  font-size: 1rem;
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 23px 0px;
}

.nav-links > a::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  transition: all 0.1s;
  top: 0px;
  left: 0px;
}

.nav-links > a:hover::after {
  background-color: #ba4a4c21;
  border-bottom: 4px solid #983434;
}

.nav-selected > a:hover::after {
  border-bottom: none;
}

.nav-links a img {
  width: 15px;
  transition: all 0.2s;
  position: absolute;
  top: 23px;
  right: 12px;
}

.nav-links:hover > a img {
  -moz-transform: rotate(270deg);
  -webkit-transform: rotate(270deg);
  -o-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  transform: rotate(270deg);
}

.nav-selected {
  border-bottom: 4px solid #983434;
  background-color: #ba4a4b;
}

.nav-selected:hover {
  background-color: hsl(359, 44%, 46%);
}

/*************** DROPDOWN **********/

.dropdown {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  top: 60px;
  left: 0px;
  width: 441px;
  max-height: 0px;
  overflow: hidden;
  transition: all 0.2s;
}

/* .nav-links:hover > .dropdown {
  max-height: 370px;
}  */
.drop-pele,
.drop-maradona {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 220px;
  background-color: #3b464d;
  z-index: 999;
}

.drop-pele {
  border-right: 1px solid #4e585e;
}

.dropdown h2 {
  display: block;
  width: 100%;
  padding: 10px 0;
  color: #d6d5d7;
  font-size: 1rem;
  position: relative;
}

.dropdown h2::after {
  content: "";
  position: absolute;
  bottom: 0px;
  width: 95%;
  height: 1px;
  background-color: #d3d3d3;
  z-index: 999;
}

.drop-pele h2::after {
  right: -1px;
}

.drop-maradona h2::after {
  left: 0px;
}

.dropdown a {
  color: #d6d5d7;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 32px;
  padding: 6px 0;
  font-size: 0.75rem;
  letter-spacing: normal;
  position: relative;
  transition: all 0.2s;
}

/* .dropdown a::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 22px;
  background-image: url("../images/teamlogos/logo1.png");
  background-size: cover;
  top: 5px;
  right: 13px;
  display: none;
} */

.dropdown a img {
  width: 10%;
  position: absolute;
  top: 3px;
  right: 5px;
  display: none;
}

.drop-pele a:hover,
.drop-maradona a:hover {
  background-color: #4e585e;
}

.dropdown a:hover > img {
  display: inline-block;
}

/* .drop-pele a:hover::after,
.drop-maradona a:hover::after {
  display: inline-block;
} */

.drop-toggle {
  max-height: 340px;
}

/***********NAVIGATION END **************/

/****************TEAM LOGOS*****************/
.logos-container {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  -webkit-box-shadow: 0px 6px 19px -8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 6px 19px -8px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 6px 19px -8px rgba(0, 0, 0, 0.75);
}

.logos-container div {
  width: 80%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.logos-container img {
  width: 40px;
  transition: all 0.1s ease-in-out;
}

.logo-separator img {
  width: 60px;
}

.logo a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  /* padding-top: 10px; */
}

.logo:hover img {
  transform: scale(1.3);
}

.logo:hover > a {
  background-color: #9e9e9e;
  -webkit-box-shadow: 6px 6px 17px -11px rgba(0, 0, 0, 0.43);
  -moz-box-shadow: 6px 6px 17px -11px rgba(0, 0, 0, 0.43);
  box-shadow: 6px 6px 17px -11px rgba(0, 0, 0, 0.43);
}

/**************** TEAM LOGOS END *****************/

/***************************************************
*****************  MAIN   *************************/

main {
  width: 100%;
  margin: 20px 0 0 0;
  background-color: #c6c6c6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.main-container {
  width: 100%;
  background: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.cup-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #c6c6c6;
  position: relative;
}

.cup-menu {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #c6c6c6;
}

.cup-header {
  width: 100%;
}

.cup-header h2 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #3c474d;
  color: #d3d3d3;
  font-size: 1.5rem;
  border-bottom: 5px solid #893e40;
}

.cup-stages {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  margin: 20px 0 0 0;
  color: #d3d3d3;
  font-size: 1.25rem;
}

.cup-stages-links {
  width: 19%;
  height: 100%;
  background-color: #893e40;
  color: #d3d3d3;
  font-size: 1.25rem;
  border-bottom: 5px solid #3c474d;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s;
}

.cup-stages-links:hover {
  text-decoration: underline;
  background-color: #712f32;
}

.cup-stages-links:nth-child(2),
.cup-stages-links:nth-child(4) {
  margin: 0 20px;
}

.selected {
  background-color: #3c474d;
  border: 3px solid #893e40;
}

.selected::before {
  position: absolute;
  content: "";
  width: 5px;
  height: 20px;
  top: -23px;
  left: 49%;
  background-color: #893e40;
}

/**************************************************
****************  GROUPS **************************/
.group-a,
.group-b,
.group-c,
.group-d,
.elimination {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  margin: 20px 0 0 0;
  transition: all 0.3s;
}

.group-left,
.group-right {
  width: 25%;
  margin: 0 20px;
}

.group-left img,
.group-right img {
  width: 100%;
}

.group-center {
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.group-standings {
  width: 100%;
  font-size: 0.875rem;
}

.standings-header {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #3c474d;
  border-bottom: 2px solid #893e40;
  color: #d3d3d3;
  text-align: center;
}

.team-stats {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #d3d3d3;
  color: #3c474d;
  margin: 0 0 5px 0;
  text-align: start;
  cursor: pointer;
  transition: all 0.2s;
}

.team-stats:hover {
  background-color: #bbbbbb;
  transform: scale(1.02);
}

.first-places {
  background-color: #bcc4c8;
  border-left: 5px solid #893e40;
  transition: all 0.3s;
}

.first-places:hover {
  background-color: #a6aeb3;
}

.position {
  width: 7%;
  text-align: center;
}

.team {
  width: 30%;
  text-align: start;
}

.team a {
  color: #3c474d;
  text-decoration: none;
  transition: all 0.2s;
}

.team a:hover {
  color: #3c474d;
  text-decoration: underline;
}

.games {
  width: 10%;
  text-align: center;
}

.win-draw-lose {
  width: 15%;
  text-align: center;
}

.goal-diff {
  width: 10%;
  text-align: center;
}

.points {
  width: 7%;
  text-align: center;
}

/******** GAMEWEEKS *********************/
.group-matches {
  width: 100%;
  background-color: #cccccc;
  margin: 20px 0 0 0;
}

.gameweeks {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.matches-header {
  width: 100%;
}

.matches-header h2 {
  width: 100%;
  background-color: #3c474d;
  color: #d3d3d3;
  border-bottom: 2px solid #893e40;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
}

.gameweeks {
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #3c474d;
  position: relative;
}

.gameweeks-header {
  width: 100%;
  border-bottom: 1px solid #3c474d;
  font-size: 0.875rem;
  padding: 0 0 5px 0;
}

.gameweeks-match-wrapper {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #b1b2b2;
  text-align: center;
  transition: all 0.4s;
  font-size: 0.9rem;
  font-weight: bold;
}

.gameweeks-match-wrapper:hover {
  background-color: #bbbbbb;
  cursor: pointer;
}

.gameweeks-match-wrapper .team1,
.gameweeks-match-wrapper .team2 {
  width: 37%;
}

.gameweeks-match-wrapper .score {
  width: 10%;
}

.gameweeks-match-wrapper img {
  width: 5%;
}

.match-details {
  position: absolute;
  right: 30px;
}

.match-details img {
  width: 20px;
  transition: all 0.2s;
}

.match-details img:hover {
  transform: scale(1.5);
}

.bye-team {
  margin: 20px 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.bye-team img {
  width: 30px;
  margin: 0 10px 0 0;
}

/*************************************************************
********* ELIMINATION ***************************************/

.elimination-matches {
  width: 135%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #d3d3d3;
}

.elimination-stages {
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #c6c6c6;
}

.elimination-stages h2 {
  width: 20%;
  text-align: center;
  font-size: 0.875rem;
}

.elimination-matches-wrapper {
  width: 100%;
  padding: 30px;
  display: grid;
  grid-column-gap: 30px;
  grid-row-gap: 10px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

/********** ELIMINATION MATCHES POSITIONS ************/
.quarter1 {
  grid-row: 1 / span 1;
  grid-column: 1 / span 1;
}

.quarter2 {
  grid-row: 3 / span 1;
  grid-column: 1 / span 1;
}

.quarter3 {
  grid-row: 1 / span 1;
  grid-column: 5 / span 1;
}

.quarter4 {
  grid-row: 3 / span 1;
  grid-column: 5 / span 1;
}

.semi1 {
  grid-row: 2 / span 1;
  grid-column: 2 / span 1;
}

.semi2 {
  grid-row: 2 / span 1;
  grid-column: 4 / span 1;
}

.final {
  grid-row: 3 / span 1;
  grid-column: 3 / span 1;
}

.winner {
  grid-row: 1 / span 1;
  grid-column: 3 / span 1;
}

.match {
  width: 100%;
  background-color: #c6c6c6;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  transition: all 0.3s;
}

.match:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.quarter1:hover .row2,
.quarter2:hover .row2,
.quarter3:hover .row2,
.quarter4:hover .row2 {
  background-color: #a6aeb3;
}

.semi1:hover .row2,
.semi2:hover .row2 {
  background-color: #222a2e;
}

.final:hover .row2 {
  background-color: #692a2c;
}

.row1,
.row3 {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 1rem;
  text-align: center;
}

.row1 img,
.row3 img {
  width: 25px;
  position: absolute;
  left: 10px;
}

.row2 {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #bcc4c8;
  border-bottom: 1px solid #b1b2b2;
  border-top: 1px solid #b1b2b2;
  font-size: 1.125rem;
}

.row2 a {
  right: 10px;
  top: 25%;
}

.semis {
  background-color: #3c474d;
  color: #d3d3d3;
}

.row2 a img {
  transition: all 0.3s;
}

.row2 a img:hover {
  transform: scale(1.2);
}

.final-match {
  background-color: #893e40;
  color: #d3d3d3;
}

.winner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.winner a {
  color: #3c474d;
  text-decoration: none;
  font-size: 1.125rem;
  margin: 20px 0 0 0;
}

.winner a:hover {
  text-decoration: underline;
}

/********************************************************
************** POPUP **********************************/
.popup-container {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #a1a1a1d6;
  display: none;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 50px 0;
}

.popup {
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50px;
}

.popup-close {
  position: absolute;
  top: -20px;
  right: 0px;
}

.popup-field {
  padding: 10px 0 0 0;
  width: 50%;
  height: 700px;
  //   background-image: url(../images/pitch-cup.jpg);
  background-color: transparent;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  display: grid;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(8, 1fr);
  position: relative;
}

.teammate {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.teammate img {
  width: 50px;
}

.teammate span {
  text-align: center;
  font-size: 0.75rem;
  color: #d3d3d3;
  background-color: #103e10;
  padding: 2px;
}

/* POPUP FIELD POSITIONS */

.gk1 {
  grid-row: 1 / span 1;
  grid-column: 2 / span 1;
}

.dl1 {
  grid-row: 2 / span 1;
  grid-column: 3 / span 1;
}

.dc1 {
  grid-row: 2 / span 1;
  grid-column: 2 / span 1;
}

.dr1 {
  grid-row: 2 / span 1;
  grid-column: 1 / span 1;
}

.ml1 {
  grid-row: 3 / span 1;
  grid-column: 3 / span 1;
}

.mc1 {
  grid-row: 3 / span 1;
  grid-column: 2 / span 1;
}

.mr1 {
  grid-row: 3 / span 1;
  grid-column: 1 / span 1;
}

.st1 {
  grid-row: 4 / span 1;
  grid-column: 2 / span 1;
}

.gk2 {
  grid-row: 8 / span 1;
  grid-column: 2 / span 1;
}

.dl2 {
  grid-row: 7 / span 1;
  grid-column: 1 / span 1;
}

.dc2 {
  grid-row: 7 / span 1;
  grid-column: 2 / span 1;
}

.dr2 {
  grid-row: 7 / span 1;
  grid-column: 3 / span 1;
}

.ml2 {
  grid-row: 6 / span 1;
  grid-column: 1 / span 1;
}

.mc2 {
  grid-row: 6 / span 1;
  grid-column: 2 / span 1;
}

.mr2 {
  grid-row: 6 / span 1;
  grid-column: 3 / span 1;
}

.st2 {
  grid-row: 5 / span 1;
  grid-column: 2 / span 1;
}

/* POPUP USER STATS SECTION  */

.popup-stats {
  margin: 0 0 0 20px;
  width: 35%;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

.popup-close {
  position: absolute;
  top: -40px;
  right: 0px;
}

.popup-stats-team1,
.popup-stats-team2 {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #d3d3d3;
}

.popup-stats-team2 {
  margin-top: 20px;
}

.popup-stats-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #3c474d;
  color: #d3d3d3;
  font-size: 1rem;
  border-bottom: 2px solid #893e40;
  position: relative;
}

.popup-stats-header img {
  position: absolute;
  left: 10px;
  width: 7%;
}

.popup-stats-name {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #bcc4c8;
  color: #3c474d;
  font-size: 0.75rem;
  position: relative;
}

.popup-stats-name > img {
  position: absolute;
  left: 10px;
}

.popup-stats-name a {
  position: absolute;
  right: 10px;
  transition: all 0.2s;
}

.popup-stats-name a:hover {
  transform: scale(1.1);
}

.popup-players-team1,
.popup-players-team2 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
}

.popup-players-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #3c474d;
}

.popup-players-header h3 {
  text-align: start;
  font-size: 0.75rem;
  padding: 5px;
}

.popup-players-header span {
  background-color: #883e3f;
  color: #d3d3d3;
  padding: 5px;
  font-size: 0.75rem;
}

.popup-team1-gk,
.popup-team1-dl,
.popup-team1-dc,
.popup-team1-dr,
.popup-team1-ml,
.popup-team1-mc,
.popup-team1-mr,
.popup-team1-st,
.popup-team2-gk,
.popup-team2-dl,
.popup-team2-dc,
.popup-team2-dr,
.popup-team2-ml,
.popup-team2-mc,
.popup-team2-mr,
.popup-team2-st {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #c6c6c6;
  color: #3c474d;
  padding: 5px;
  margin-bottom: 1px;
  font-size: 0.8rem;
}

.popup-player-position {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  background-color: #3b464d;
  color: lightgrey;
  border-radius: 100%;
  text-align: center;
  font-size: 0.75rem;
}

.team1-gk-name,
.team1-dl-name,
.team1-dc-name,
.team1-dr-name,
.team1-ml-name,
.team1-mc-name,
.team1-mr-name,
.team1-st-name,
.team2-gk-name,
.team2-dl-name,
.team2-dc-name,
.team2-dr-name,
.team2-ml-name,
.team2-mc-name,
.team2-mr-name,
.team2-st-name {
  text-align: start;
  width: 65%;
}

.team1-gk-pts,
.team1-dl-pts,
.team1-dc-pts,
.team1-dr-pts,
.team1-ml-pts,
.team1-mc-pts,
.team1-mr-pts,
.team1-st-pts,
.team2-gk-pts,
.team2-dl-pts,
.team2-dc-pts,
.team2-dr-pts,
.team2-ml-pts,
.team2-mc-pts,
.team2-mr-pts,
.team2-st-pts {
  text-align: center;
  width: 20%;
}

.key-stats-team1,
.key-stats-team2 {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding: 10px 20px;
}

.key-stats-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #bbc3c7;
  border-top: 1px solid #3c474d;
  padding: 10px 5px;
}

.key-stats-header img {
}

.key-stats-values {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #893e40;
  color: #d3d3d3;
  font-size: 0.75rem;
  padding: 10px 5px;
}

/***************** FOOTER *******************/

footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #4e585e;
  margin: 20px 0 0 0;
  font-size: 0.75rem;
}

.footer-logo,
.footer-fb {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 50px 0 0;
}

.footer-logo a,
.footer-fb a {
  color: #ffffff;
  text-decoration: none;
  transition: all 0.2s;
  margin: 0 0 0 10px;
}

.footer-logo a:hover,
.footer-fb a:hover {
  text-decoration: underline;
}

.footer-logo img,
.footer-fb img {
  width: 44px;
}

.footer-pele,
.footer-maradona,
.footer-cat {
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-left: 1px solid #60666a;
  margin: 10px 0;
  padding: 10px 50px;
}

.footer-maradona,
.footer-cat {
  border-right: 1px solid #60666a;
}

.footer-pele h2,
.footer-maradona h2,
.footer-cat h2 {
  color: #ffffff;
  margin: 0 0 10px;
}

.footer-pele a,
.footer-maradona a,
.footer-cat a {
  color: #ffffff;
  text-decoration: none;
  margin: 5px 0;
  text-align: left;
  width: 100%;
}

.footer-pele a:hover,
.footer-maradona a:hover,
.footer-cat a:hover {
  text-decoration: underline;
}

.hover {
  transition: all 0.2s;
}

.hover:hover {
  /* border: 1px solid #1b2e32; */
  transform: scale(1.01);
  -webkit-box-shadow: 5px 5px 21px -5px rgba(0, 0, 0, 0.43);
  -moz-box-shadow: 5px 5px 21px -5px rgba(0, 0, 0, 0.43);
  box-shadow: 4px 8px 26px -5px rgba(0, 0, 0, 0.43);
}

.player-popup {
  display: inline-block;
  width: 90%;
  height: 100px;
  background-color: red;
  position: absolute;
  top: -230%;
  left: 5%;
  transition: all 0.3s;
  opacity: 0;
}

.player-popup::after {
  position: absolute;
  content: "";
  top: 100px;
  left: 90px;
  border-bottom: 0px solid transparent;
  border-top: 20px solid #ff0000;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
}

/***********************************************************************
****************   MEDIA QUERIES   *************************************
************************************************************************/
@media (min-width: 1281px) and (max-width: 2000px) {
  .nav-links:hover > .dropdown {
    max-height: 370px;
  }
}

@media (min-width: 1281px) and (max-width: 1900px) {
  .popup {
    width: 90%;
  }

  .popup-stats {
    width: 60%;
    height: 700px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .popup-stats-team2 {
    margin: 0 0 0 10px;
  }
}

@media (min-width: 1281px) and (max-width: 1600px) {
  /* For laptops: */
  html {
    font-size: 14px;
  }

  .main-container {
    width: 100%;
  }

  nav {
    height: 50px;
    margin: 50px 0 0 0;
  }

  .nav-links {
    height: 50px;
    width: 150px;
  }

  .nav-links a {
    padding: 16px 0px;
  }

  .nav-links a img {
    width: 14px;
    top: 16px;
  }

  nav > a > img {
    width: 120px;
    top: -45px;
  }

  .dropdown {
    top: 50px;
  }

  .logos-container {
    height: 45px;
  }

  .logos-container div {
    height: 45px;
  }

  .logo img {
    width: 30px;
  }

  .logo-separator img {
    width: 45px;
  }

  .logo a {
    /* padding-top: 8px; */
  }

  .cup-menu {
    width: 80%;
  }

  .group-center {
    width: 50%;
  }

  .popup {
    width: 90%;
    align-items: flex-start;
  }

  .popup-field {
    padding: 10px 0 0 0;
    width: 35%;
    height: 540px;
    // background-image: url(../images/pitch-cup.jpg);
    background-color: transparent;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    display: grid;
    grid-column-gap: 5px;
    grid-row-gap: 0px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(8, 1fr);
    position: relative;
  }

  .popup-stats {
    width: 50%;
    height: 700px;
  }

  .teammate img {
    width: 40px;
  }

  .teammate span {
    font-size: 0.75rem;
  }

  .elimination-matches {
    width: 285%;
  }

  .elimination-matches-wrapper {
    width: 100%;
    padding: 10px;
    grid-column-gap: 10px;
    grid-row-gap: 0px;
  }
}

@media (min-width: 1101px) and (max-width: 1280px) {
  /* For small laptops: */
  html {
    font-size: 14px;
  }

  nav {
    height: 40px;
    margin: 40px 0 0 0;
  }

  .nav-links {
    height: 40px;
    width: 130px;
  }

  .nav-links a {
    padding: 13px 0px;
  }

  .nav-links a img {
    width: 14px;
    top: 12px;
  }

  .nav-links:hover > .dropdown {
    max-height: 370px;
  }

  nav > a > img {
    width: 110px;
    top: -43px;
  }

  .dropdown {
    top: 40px;
  }

  .dropdown h2 {
    padding: 8px 0;
  }

  .dropdown a {
    padding: 6px 0;
    height: 25px;
  }

  .dropdown a::after {
    width: 16px;
    height: 16px;
    top: 4px;
  }

  .logos-container {
    height: 45px;
  }

  .logos-container div {
    height: 45px;
    width: 92%;
  }

  .logo img {
    width: 30px;
  }

  .logo-separator img {
    width: 45px;
  }

  .logo a {
    /* padding-top: 8px; */
  }

  .main-container {
    width: 100%;
  }

  .cup-menu {
    width: 95%;
  }

  .cup-stages-links {
    font-size: 1.15rem;
  }

  .group-center {
    width: 50%;
  }

  .gameweeks {
    padding: 10px;
  }

  .match-details {
    right: 10px;
  }

  .group-left,
  .group-right {
    width: 0%;
  }

  .popup {
    width: 80%;
    align-items: flex-start;
  }

  .popup-field {
    padding: 10px 0 0 0;
    width: 50%;
    height: 570px;
    // background-image: url(../images/pitch-cup.jpg);
    background-color: #d3d3d3;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    display: grid;
    grid-column-gap: 5px;
    grid-row-gap: 5px;
    grid-template-columns: repeat(3, 25%);
    grid-template-rows: repeat(8, 1fr);
    position: relative;
    align-items: center;
    justify-content: center;
  }

  .elimination-matches {
    width: 285%;
  }

  .elimination-matches-wrapper {
    width: 100%;
    padding: 10px;
    grid-column-gap: 10px;
    grid-row-gap: 0px;
  }
}

@media (min-width: 901px) and (max-width: 1100px) {
  /* For small laptops: */
  html {
    font-size: 11px;
  }

  nav {
    height: 30px;
    margin: 40px 0 0 0;
  }

  .nav-links {
    height: 30px;
    width: 110px;
  }

  .nav-links:hover > .dropdown {
    max-height: 370px;
  }

  .nav-links a {
    padding: 11px 0px;
  }

  .nav-links a img {
    width: 9px;
    top: 11px;
  }

  nav > a > img {
    width: 80px;
    top: -31px;
    left: 8%;
  }

  .dropdown {
    top: 30px;
    width: 350px;
  }

  .dropdown h2 {
    padding: 6px 0;
  }

  .dropdown a {
    padding: 6px 0;
    height: 22px;
  }

  .dropdown a::after {
    width: 14px;
    height: 14px;
    top: 4px;
  }

  .logos-container {
    height: 45px;
  }

  .logos-container div {
    height: 45px;
    width: 100%;
  }

  .logo img {
    width: 30px;
  }

  .logo-separator img {
    width: 45px;
  }

  .logo a {
    /* padding-top: 8px; */
  }

  .main-container {
    width: 100%;
  }

  .cup-menu {
    width: 95%;
  }

  .cup-stages-links {
    font-size: 1.15rem;
  }

  .group-center {
    width: 50%;
  }

  .gameweeks {
    padding: 10px;
  }

  .match-details {
    right: 10px;
  }

  .group-left,
  .group-right {
    width: 0%;
  }

  .gameweeks-match-wrapper {
    font-size: 1rem;
  }

  .group-standings {
    font-size: 1rem;
  }

  .popup {
    width: 80%;
    align-items: flex-start;
  }

  .popup-field {
    padding: 10px 0;
    width: 65%;
    height: 600px;
    // background-image: url(../images/pitch-cup.jpg);
    background-color: transparent;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    display: grid;
    grid-column-gap: 5px;
    grid-row-gap: 5px;
    grid-template-columns: repeat(3, 25%);
    grid-template-rows: repeat(8, 1fr);
    position: relative;
    align-items: center;
    justify-content: center;
  }

  .popup-player-position {
    width: 20px;
    height: 20px;
  }

  .popup-stats-name {
    font-size: 1rem;
  }

  .team1-gk-name,
  .team1-dl-name,
  .team1-dc-name,
  .team1-dr-name,
  .team1-ml-name,
  .team1-mc-name,
  .team1-mr-name,
  .team1-st-name,
  .team2-gk-name,
  .team2-dl-name,
  .team2-dc-name,
  .team2-dr-name,
  .team2-ml-name,
  .team2-mc-name,
  .team2-mr-name,
  .team2-st-name {
    font-size: 0.875rem;
  }

  .popup-players-team1,
  .popup-players-team2 {
    padding: 0px;
  }

  .key-stats-team1,
  .key-stats-team2 {
    padding: 0px;
  }

  .key-stats-header img {
    /* width:100%*/
  }

  .key-stats-header {
    padding: 5px 5px;
  }

  .key-stats-values {
    font-size: 1rem;
    padding: 5px 5px;
  }

  .elimination-matches {
    width: 285%;
  }

  .elimination-stages h2 {
    font-size: 1rem;
  }

  .elimination-matches-wrapper {
    width: 100%;
    padding: 5px;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
}

@media (min-width: 751px) and (max-width: 900px) {
  /* For tablet portrait: */
  html {
    font-size: 11px;
  }

  nav {
    height: 50px;
    margin: 0px;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;
    top: 0px;
  }

  .nav-links {
    height: 50px;
    width: 130px;
  }

  .nav-links:hover > .dropdown {
    max-height: 370px;
  }

  .nav-links a {
    padding: 19px 0px;
  }

  .nav-links a img {
    width: 9px;
    top: 19px;
  }

  nav > a > img {
    width: 40px;
    position: static;
    padding: 0px 10px 0px 0px;
    margin: 0px 20px 0 10px;
    border-right: 1px solid #843c3f;
  }

  .navigation {
    width: auto;
  }

  .dropdown {
    top: 50px;
    width: 350px;
  }

  .dropdown h2 {
    padding: 6px 0;
  }

  .dropdown a {
    padding: 6px 0;
    height: 22px;
  }

  .dropdown a::after {
    width: 14px;
    height: 14px;
    top: 4px;
  }

  .logos-container {
    height: 40px;
  }

  .logos-container div {
    height: 40px;
    width: 100%;
  }

  .logo img {
    width: 30px;
  }

  .logo-separator img {
    width: 40px;
  }

  .logo a {
    /* padding-top: 5px; */
  }

  main {
    margin: 10px 0 0 0;
  }

  .main-container {
    width: 100%;
  }

  .cup-menu {
    width: 99%;
  }

  .cup-stages-links:nth-child(2),
  .cup-stages-links:nth-child(4) {
    margin: 0 10px;
  }

  .cup-stages-links {
    font-size: 1.15rem;
  }

  .group-center {
    width: 70%;
  }

  .gameweeks {
    padding: 10px;
  }

  .match-details {
    right: 10px;
  }

  .group-left,
  .group-right {
    width: 0%;
    margin: 0px;
  }

  .gameweeks-match-wrapper {
    font-size: 1rem;
  }

  .group-standings {
    font-size: 1rem;
  }

  .popup {
    width: 100%;
    align-items: flex-start;
    justify-content: center;
  }

  .popup-field {
    padding: 10px 0;
    width: 50%;
    height: 470px;
    // background-image: url(../images/pitch-cup.jpg);
    background-color: transparent;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    display: grid;
    grid-column-gap: 5px;
    grid-row-gap: 8px;
    grid-template-columns: repeat(3, 25%);
    grid-template-rows: repeat(8, 11%);
    position: relative;
    align-items: center;
    justify-content: center;
  }

  .teammate img {
    width: 35px;
    margin: 0 0 5px 0;
  }

  .popup-player-position {
    width: 20px;
    height: 20px;
  }

  .popup-stats-name {
    font-size: 1rem;
  }

  .team1-gk-name,
  .team1-dl-name,
  .team1-dc-name,
  .team1-dr-name,
  .team1-ml-name,
  .team1-mc-name,
  .team1-mr-name,
  .team1-st-name,
  .team2-gk-name,
  .team2-dl-name,
  .team2-dc-name,
  .team2-dr-name,
  .team2-ml-name,
  .team2-mc-name,
  .team2-mr-name,
  .team2-st-name {
    font-size: 0.875rem;
  }

  .popup-players-team1,
  .popup-players-team2 {
    padding: 0px;
  }

  .key-stats-team1,
  .key-stats-team2 {
    padding: 0px;
  }

  .popup-stats-header img {
    width: 10%;
  }

  .key-stats-header img {
    /* width:100%*/
  }

  .key-stats-header {
    padding: 5px 5px;
  }

  .key-stats-values {
    font-size: 1rem;
    padding: 5px 5px;
  }

  .elimination-matches {
    width: 285%;
  }

  .elimination-stages h2 {
    font-size: 1rem;
  }

  .elimination-matches-wrapper {
    width: 100%;
    padding: 20px 5px;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    grid-template-rows: repeat(3, 30%);
  }
}

@media (min-width: 651px) and (max-width: 750px) {
  /* For tablet portrait: */
  html {
    font-size: 11px;
  }

  header {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    background: #4e585e;
  }

  header > img {
    float: none;
    margin: 240px 0 0 0;
    height: 100%;
  }

  .h1-hidden {
    display: block;
  }

  nav {
    height: 40px;
    margin: 0px;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    top: 0px;
    height: fit-content;
  }

  .nav-links {
    height: 40px;
    width: 100%;
  }

  .nav-links:hover > .dropdown {
    max-height: 370px;
  }

  .nav-links a {
    padding: 14px 0px;
  }

  .nav-links a img {
    width: 15px;
    top: 11px;
    right: 15px;
  }

  nav > a > img {
    width: 40px;
    position: static;
    padding: 0px 10px 0px 0px;
    margin: 0px 20px 0 10px;
    border-right: 1px solid #c3c3c3;
    position: absolute;
    top: 3px;
    left: 0;
  }

  .navigation {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 40px 0 0 0;
    background: #633d3e;
  }

  .dropdown {
    top: 40px;
    width: 100%;
  }

  .nav-links:hover > .dropdown {
    max-height: fit-content;
  }

  .dropdown h2 {
    padding: 6px 0;
  }

  .dropdown a {
    padding: 6px 0;
    height: 22px;
  }

  .dropdown a::after {
    width: 14px;
    height: 14px;
    top: 4px;
  }

  .logos-container {
    height: 40px;
  }

  .logos-container div {
    height: 40px;
    width: 100%;
  }

  .logo img {
    width: 30px;
  }

  .logo-separator img {
    width: 40px;
  }

  .logo a {
    /* padding-top: 5px; */
  }

  main {
    margin: 10px 0 0 0;
  }

  .main-container {
    width: 96%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .cup-menu {
    width: 99%;
  }

  .cup-stages-links:nth-child(2),
  .cup-stages-links:nth-child(4) {
    margin: 0 10px;
  }

  .cup-stages-links {
    font-size: 1.15rem;
    text-align: center;
  }

  .group-center {
    width: 90%;
  }

  .gameweeks {
    padding: 10px;
  }

  .match-details {
    right: 10px;
  }

  .group-left,
  .group-right {
    width: 0%;
    margin: 0px;
  }

  .gameweeks-match-wrapper {
    font-size: 1rem;
  }

  .group-standings {
    font-size: 1.25rem;
  }

  .row1,
  .row3 {
    height: 30px;
  }

  .row1 img,
  .row3 img {
    width: 20px;
    left: 5px;
  }

  .row2 a img {
    display: none;
  }

  .row2 {
    height: 30px;
  }

  .popup {
    width: 100%;
    align-items: flex-start;
    justify-content: center;
  }

  .popup-field {
    padding: 10px 0;
    width: 59%;
    height: 470px;
    // background-image: url(../images/pitch-cup.jpg);
    background-color: transparent;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    display: grid;
    grid-column-gap: 5px;
    grid-row-gap: 7px;
    grid-template-columns: repeat(3, 25%);
    grid-template-rows: repeat(8, 11%);
    position: relative;
    align-items: center;
    justify-content: center;
  }

  .teammate img {
    width: 35px;
    margin: 0 0 5px 0;
  }

  .popup-player-position {
    width: 20px;
    height: 20px;
  }

  .popup-stats-name {
    font-size: 1rem;
  }

  .team1-gk-name,
  .team1-dl-name,
  .team1-dc-name,
  .team1-dr-name,
  .team1-ml-name,
  .team1-mc-name,
  .team1-mr-name,
  .team1-st-name,
  .team2-gk-name,
  .team2-dl-name,
  .team2-dc-name,
  .team2-dr-name,
  .team2-ml-name,
  .team2-mc-name,
  .team2-mr-name,
  .team2-st-name {
    font-size: 1rem;
  }

  .popup-stats {
    margin: 0 0 0 5px;
    width: 40%;
  }

  .popup-players-team1,
  .popup-players-team2 {
    padding: 0px;
  }

  .popup-stats-header {
    font-size: 1rem;
  }

  .key-stats-team1,
  .key-stats-team2 {
    padding: 0px;
  }

  .popup-stats-header img {
    width: 10%;
  }

  .key-stats-header img {
    /* width:100%*/
  }

  .key-stats-header {
    padding: 5px 5px;
  }

  .key-stats-values {
    font-size: 1rem;
    padding: 5px 5px;
  }

  .elimination-matches {
    width: 285%;
  }

  .elimination-stages h2 {
    font-size: 1rem;
  }

  .elimination-matches-wrapper {
    width: 100%;
    padding: 20px 5px;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    grid-template-rows: repeat(3, 30%);
  }

  footer {
    margin: 10px 0 0 0;
  }

  .footer-logo,
  .footer-fb {
    margin: 0 20px 0 20px;
  }

  .footer-pele,
  .footer-maradona,
  .footer-cat {
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /* align-items: center; */
    align-self: flex-start;
    border-left: 1px solid #60666a;
    margin: 10px 0;
    padding: 0px 20px;
  }

  .footer-pele a,
  .footer-maradona a,
  .footer-cat a {
    margin: 2px 0;
  }

  .no-stand-pele,
  .no-stand-mar {
    padding: 50px;
  }

  .no-stand-pele > img,
  .no-stand-mar > img {
    width: 100%;
  }

  .no-stand-pele a,
  .no-stand-mar a {
    font-size: 1.5rem;
  }

  .no-stand-mar a img,
  .no-stand-pele a img {
    top: 7px;
  }
}

@media (min-width: 501px) and (max-width: 650px) {
  /* For mobiles */
  html {
    font-size: 11px;
  }

  header {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    background: #4e585e;
  }

  header > img {
    float: none;
    margin: 240px 0 0 0;
    height: 100%;
  }

  .h1-hidden {
    display: block;
  }

  nav {
    margin: 0px;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    top: 0px;
    height: fit-content;
  }

  .nav-links {
    height: 40px;
    width: 100%;
  }

  .nav-links a {
    padding: 14px 0px;
  }

  .nav-links a img {
    width: 15px;
    top: 11px;
    right: 15px;
  }

  .nav-links:hover > .dropdown {
    max-height: fit-content;
  }

  nav > a > img {
    width: 40px;
    position: static;
    padding: 0px 10px 0px 0px;
    margin: 0px 20px 0 10px;
    border-right: 1px solid #c3c3c3;
    position: absolute;
    top: 3px;
    left: 0;
  }

  .navigation {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 40px 0 0 0;
    background: #633d3e;
  }

  .dropdown {
    top: 40px;
    width: 100%;
  }

  .nav-links:hover > .dropdown {
    max-height: fit-content;
  }

  .dropdown h2 {
    padding: 6px 0;
  }

  .dropdown a {
    padding: 6px 0;
    height: 22px;
  }

  .dropdown a::after {
    width: 14px;
    height: 14px;
    top: 4px;
  }

  .logos-container {
    height: 80px;
    position: relative;
  }

  .logos-container::after {
    position: absolute;
    content: "";
    top: 40px;
    left: 3px;
    width: 98%;
    border-bottom: 2px solid #8e3f42;
  }

  .logos-container div {
    height: 40px;
    width: 100%;
    align-self: flex-start;
    justify-self: center;
  }

  .logos-container > div {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(10, 10%);
    grid-template-rows: 40px 40px;
    grid-gap: 2px;
    margin: 0 5px;
  }

  .logo img {
    width: 30px;
  }

  .logo-separator {
    display: none !important;
  }

  .logo-separator img {
    width: 40px;
  }

  .logo a {
    /* padding: 5px 0 0px 0; */
  }

  main {
    margin: 10px 0 0 0;
  }

  .main-container {
    width: 96%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .cup-menu {
    width: 99%;
  }

  .cup-stages-links:nth-child(2),
  .cup-stages-links:nth-child(4) {
    margin: 0 10px;
  }

  .cup-stages-links {
    font-size: 1.15rem;
    text-align: center;
  }

  .group-center {
    width: 90%;
  }

  .gameweeks {
    padding: 10px;
  }

  .match-details {
    right: 10px;
  }

  .group-left,
  .group-right {
    width: 0%;
    margin: 0px;
  }

  .gameweeks-match-wrapper {
    font-size: 1rem;
  }

  .bye-team img {
    width: 25px;
  }

  .group-standings {
    font-size: 1.25rem;
  }

  .row1,
  .row3 {
    height: 30px;
  }

  .row1 img,
  .row3 img {
    width: 20px;
    left: 5px;
  }

  .row2 a img {
    display: none;
  }

  .row2 {
    height: 30px;
  }

  .popup {
    width: 100%;
    align-items: flex-start;
    justify-content: center;
  }

  .popup-field {
    padding: 10px 0;
    width: 65%;
    height: 470px;
    // background-image: url(../images/pitch-cup.jpg);
    background-color: transparent;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    display: grid;
    grid-column-gap: 5px;
    grid-row-gap: 7px;
    grid-template-columns: repeat(3, 25%);
    grid-template-rows: repeat(8, 11%);
    position: relative;
    align-items: center;
    justify-content: center;
  }

  .teammate img {
    width: 35px;
    margin: 0 0 5px 0;
  }

  .popup-player-position {
    width: 20px;
    height: 20px;
  }

  .popup-stats-name {
    font-size: 1rem;
  }

  .team1-gk-name,
  .team1-dl-name,
  .team1-dc-name,
  .team1-dr-name,
  .team1-ml-name,
  .team1-mc-name,
  .team1-mr-name,
  .team1-st-name,
  .team2-gk-name,
  .team2-dl-name,
  .team2-dc-name,
  .team2-dr-name,
  .team2-ml-name,
  .team2-mc-name,
  .team2-mr-name,
  .team2-st-name {
    font-size: 1rem;
    margin: 0 0 0 6px;
  }

  .popup-stats {
    margin: 0 0 0 5px;
    width: 35%;
  }

  .popup-stats-name a {
    right: 5px;
  }

  .popup-stats-name a img {
    width: 20px;
  }

  .popup-players-team1,
  .popup-players-team2 {
    padding: 0px;
  }

  .popup-stats-header {
    font-size: 1rem;
  }

  .key-stats-team1,
  .key-stats-team2 {
    padding: 0px;
  }

  .popup-stats-header img {
    width: 10%;
  }

  .key-stats-header img {
    /* width:100%*/
  }

  .key-stats-header {
    padding: 5px 5px;
  }

  .key-stats-values {
    font-size: 1rem;
    padding: 5px 5px;
  }

  .elimination-matches {
    width: 285%;
  }

  .elimination-stages h2 {
    font-size: 1rem;
  }

  .elimination-matches-wrapper {
    width: 100%;
    padding: 20px 5px;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    grid-template-rows: repeat(3, 30%);
  }

  footer {
    margin: 10px 0 0 0;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, auto);
    padding: 10px 0 0 0;
    height: 240px;
    font-size: 0.9rem;
  }

  .footer-logo,
  .footer-fb {
    margin: 0 20px 0 20px;
  }

  .footer-logo {
    margin: 0 20px 0 20px;
    grid-column: 1 / span 3;
    grid-row: 1 / span 1;
  }

  .footer-fb {
    grid-column: 4 / span 3;
    grid-row: 1 / span 1;
  }

  .footer-pele {
    grid-column: 1 / span 2;
    grid-row: 2 / span 1;
  }

  .footer-maradona {
    grid-column: 3 / span 2;
    grid-row: 2 / span 1;
  }

  .footer-cat {
    grid-column: 5 / span 2;
    grid-row: 2 / span 1;
  }

  .footer-pele,
  .footer-maradona,
  .footer-cat {
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /* align-items: center; */
    align-self: flex-start;
    border-left: 1px solid #60666a;
    margin: 10px 0;
    padding: 0px 20px;
  }

  .footer-pele a,
  .footer-maradona a,
  .footer-cat a {
    margin: 2px 0;
    text-align: center;
  }

  .footer-logo img,
  .footer-fb img {
    width: 30px;
  }

  .no-stand-pele,
  .no-stand-mar {
    padding: 50px;
  }

  .no-stand-pele > img,
  .no-stand-mar > img {
    width: 100%;
  }

  .no-stand-pele a,
  .no-stand-mar a {
    font-size: 1.5rem;
  }

  .no-stand-mar a img,
  .no-stand-pele a img {
    top: 9px;
  }
}

@media (max-width: 500px) {
  /* For mobiles */
  html {
    font-size: 11px;
  }

  header {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    background: #4e585e;
  }

  header > img {
    float: none;
    margin: 240px 0 0 0;
    height: 100%;
  }

  .h1-hidden {
    display: block;
  }

  nav {
    margin: 0px;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    top: 0px;
    height: fit-content;
  }

  .nav-links {
    height: 40px;
    width: 100%;
  }

  .nav-links a {
    padding: 14px 0px;
    height: 40px;
  }

  .nav-links a img {
    width: 15px;
    top: 11px;
    right: 15px;
  }

  nav > a > img {
    width: 40px;
    position: static;
    padding: 0px 10px 0px 0px;
    margin: 0px 20px 0 10px;
    border-right: 1px solid #c3c3c3;
    position: absolute;
    top: 3px;
    left: 0;
  }

  .navigation {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 40px 0 0 0;
    background: #633d3e;
  }

  .dropdown {
    top: 40px;
    width: 100%;
  }

  .nav-links:hover > .dropdown {
    max-height: fit-content;
  }

  .dropdown h2 {
    padding: 6px 0;
  }

  .dropdown a {
    padding: 6px 0;
    height: 22px;
  }

  .dropdown a::after {
    width: 14px;
    height: 14px;
    top: 4px;
  }

  .logos-container {
    height: 80px;
    position: relative;
  }

  .logos-container::after {
    position: absolute;
    content: "";
    top: 40px;
    left: 3px;
    width: 98%;
    border-bottom: 2px solid #8e3f42;
  }

  .logos-container div {
    height: 40px;
    width: 100%;
    align-self: flex-start;
    justify-self: center;
  }

  .logos-container > div {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(10, 10%);
    grid-template-rows: 40px 40px;
    margin: 0 5px;
  }

  .logo img {
    width: 30px;
  }

  .logo-separator {
    display: none !important;
  }

  .logo-separator img {
    width: 40px;
  }

  .logo a {
    /* padding: 5px 0 0px 0; */
  }

  main {
    margin: 10px 0 0 0;
  }

  .main-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .cup-menu {
    width: 99%;
  }

  .cup-stages {
    justify-content: space-between;
  }

  .cup-stages-links:nth-child(2),
  .cup-stages-links:nth-child(4) {
    margin: 0 2px;
  }

  .cup-stages-links {
    font-size: 0.75rem;
    text-align: center;
    height: 80%;
  }

  .group-center {
    width: 97%;
  }

  .standings-header {
    justify-content: space-around;
  }

  .gameweeks {
    padding: 10px;
  }

  .selected::before {
    height: 25px;
    top: -28px;
  }

  .match-details {
    right: 5px;
  }

  .match-details img {
    display: none;
  }

  .group-left,
  .group-right {
    width: 0%;
    margin: 0px;
  }

  .gameweeks-match-wrapper {
    font-size: 1rem;
  }

  .gameweeks-match-wrapper .score {
    width: 13%;
  }

  .group-standings {
    font-size: 1rem;
  }

  .winner img {
    width: 100%;
  }

  .bye-team img {
    width: 20px;
  }

  .row1,
  .row3 {
    height: 30px;
  }

  .row1 img,
  .row3 img {
    width: 20px;
    left: 5px;
  }

  .row2 a img {
    display: none;
  }

  .row2 {
    height: 30px;
  }

  .popup {
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
  }

  .popup-field {
    padding: 10px 0;
    width: 100%;
    height: 410px;
    // background-image: url(../images/pitch-cup.jpg);
    background-color: transparent;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    display: grid;
    grid-column-gap: 25px;
    grid-row-gap: 7px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(8, 11%);
    position: relative;
    align-items: center;
    justify-content: center;
  }

  .teammate img {
    width: 35px;
    /* margin: 0 0 5px 0; */
  }

  .popup-player-position {
    width: 20px;
    height: 20px;
  }

  .popup-stats-name {
    font-size: 1rem;
  }

  .team1-gk-name,
  .team1-dl-name,
  .team1-dc-name,
  .team1-dr-name,
  .team1-ml-name,
  .team1-mc-name,
  .team1-mr-name,
  .team1-st-name,
  .team2-gk-name,
  .team2-dl-name,
  .team2-dc-name,
  .team2-dr-name,
  .team2-ml-name,
  .team2-mc-name,
  .team2-mr-name,
  .team2-st-name {
    font-size: 1rem;
    margin: 0 0 0 6px;
  }

  .popup-stats {
    margin: 0px;
    width: 95%;
  }

  .popup-stats-team1,
  .popup-stats-team2 {
    margin: 10px 0 0 0;
  }

  .popup-stats-name a {
    right: 5px;
  }

  .popup-stats-name a img {
    width: 20px;
  }

  .popup-players-team1,
  .popup-players-team2 {
    padding: 0px;
  }

  .popup-stats-header {
    font-size: 1rem;
  }

  .key-stats-team1,
  .key-stats-team2 {
    padding: 0px;
  }

  .popup-stats-header img {
    width: 10%;
  }

  .key-stats-header img {
    /* width:100%*/
  }

  .key-stats-header {
    padding: 5px 5px;
  }

  .key-stats-values {
    font-size: 1rem;
    padding: 5px 5px;
  }

  .elimination-matches {
    width: 285%;
  }

  .elimination-stages h2 {
    font-size: 1rem;
  }

  .elimination-matches-wrapper {
    width: 100%;
    padding: 20px 5px;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    grid-template-rows: repeat(3, 30%);
    grid-template-columns: repeat(10, 1fr);
    grid-column-gap: 5px;
    grid-row-gap: 5px;
  }

  /********** ELIMINATION MATCHES POSITIONS ************/
  .quarter1 {
    grid-row: 1 / span 1;
    grid-column: 1 / span 3;
  }

  .quarter2 {
    grid-row: 3 / span 1;
    grid-column: 1 / span 3;
  }

  .quarter3 {
    grid-row: 1 / span 1;
    grid-column: 8 / span 3;
  }

  .quarter4 {
    grid-row: 3 / span 1;
    grid-column: 8 / span 3;
  }

  .semi1 {
    grid-row: 2 / span 1;
    grid-column: 2 / span 3;
  }

  .semi2 {
    grid-row: 2 / span 1;
    grid-column: 7 / span 3;
  }

  .final {
    grid-row: 3 / span 1;
    grid-column: 4 / span 4;
  }

  .winner {
    grid-row: 1 / span 1;
    grid-column: 5 / span 2;
  }

  .winner a {
    text-align: center;
  }

  footer {
    margin: 10px 0 0 0;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, auto);
    padding: 10px 0 10px 0;
    height: 350px;
    font-size: 0.9rem;
  }

  .footer-logo {
    margin: 0 20px 0 20px;
    grid-column: 1 / span 3;
    grid-row: 1 / span 1;
    justify-self: flex-start;
  }

  .footer-fb {
    grid-column: 4 / span 3;
    grid-row: 1 / span 1;
    justify-self: flex-end;
  }

  .footer-pele {
    grid-column: 1 / span 2;
    grid-row: 2 / span 1;
  }

  .footer-maradona {
    grid-column: 3 / span 2;
    grid-row: 2 / span 1;
  }

  .footer-cat {
    grid-column: 5 / span 2;
    grid-row: 2 / span 1;
  }

  .footer-pele,
  .footer-maradona,
  .footer-cat {
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /* align-items: center; */
    align-self: flex-start;
    border-left: 1px solid #60666a;
    margin: 10px 0;
    padding: 0px;
  }

  .footer-pele a,
  .footer-maradona a,
  .footer-cat a {
    margin: 2px 0;
    text-align: center;
    font-size: 1rem;
  }

  .footer-logo img,
  .footer-fb img {
    width: 30px;
  }

  .footer-logo img {
    margin: 0px 10px 0 10px;
  }

  .footer-fb img {
    margin: 0px 10px 0 10px;
  }

  .footer-logo,
  .footer-fb {
    margin: 0px;
  }

  .footer-logo a,
  .footer-fb a {
    margin: 0px;
  }

  .no-stand-pele,
  .no-stand-mar {
    padding: 10px;
  }

  .no-stand-pele > img,
  .no-stand-mar > img {
    width: 100%;
  }

  .no-stand-pele a,
  .no-stand-mar a {
    font-size: 1.5rem;
  }

  .no-stand-mar a img,
  .no-stand-pele a img {
    top: 30%;
  }

  .no-stand-pele a img {
    left: 0px;
  }

  .no-stand-mar a img {
    right: 0px;
  }
}

/*********************************************************
*****************   CLASSES FOR JS   *********************
**********************************************************/

.drop-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.drop-close {
  grid-column: 1 / span 2;
  text-align: right;
  background-color: #3b464d;
  z-index: 999;
  padding: 0 0 10px 0;
}

.drop-close a {
  text-align: center;
  width: 20%;
  display: inline-block;
  color: #ffffff;
  background-color: #ba4a4b;
  font-size: 1.1rem;
  opacity: 1;
  z-index: 999;
  height: 30px;
  line-height: 20px;
}

.drop-gr-pele {
  grid-column: 1 / span 1;
  align-self: start;
  justify-self: right;
  width: 100%;
}

.drop-gr-maradona {
  grid-column: 2 / span 1;
  align-self: start;
  justify-self: left;
  width: 100%;
}

.drop-toggle {
  max-height: fit-content;
}

.league-toggle {
  z-index: 700;
  height: 0px;
}

.icon-rotate {
  transform: rotateZ(180deg);
  left: 10px;
}

.change-league {
  width: 96%;
  background-color: #ba4a4b;
  text-align: right;
  height: 35px;
}

.change-league a {
  font-size: 1.2rem;
  text-decoration: none;
  color: #e5e3e4;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 11px 0 0 0;
  position: relative;
  text-align: center;
}

.change-league img {
  width: 25px;
  /* margin: 0 0 0 10px; */
  transition: all 0.3s;
  position: absolute;
  top: 5px;
  right: 10px;
}

.loading-pow,
.loading-tow,
.loading-tr,
.loading-st,
.loading-popup {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(80, 80, 80, 0.7);
  z-index: 1000;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>