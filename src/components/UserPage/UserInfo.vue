<template>
  <div class="user-stats">
    <div class="user-name">
      <img src="@/assets/images/user-page/user-head.png" alt="user-head" />
      <h2 class="up">{{user.userName}}</h2>
    </div>

    <div class="league-name">
      <h2>League {{userLeague}}</h2>
    </div>

    <div class="info-stat sha">
      <span class="up">Manager Age</span>
      <span class="pts-value up">{{user.age}} years</span>
    </div>
    <div class="info-stat sha">
      <span class="up">Location</span>
      <span class="pts-value up">{{user.location}}</span>
    </div>
    <div class="info-stat sha">
      <span class="up">Ocupation</span>
      <span class="pts-value up">{{user.ocupation}}</span>
    </div>
    <div class="info-stat sha">
      <span class="up">Favourite Team</span>
      <span class="pts-value up">{{user.favTeam}}</span>
    </div>
    <div class="info-stat sha">
      <span class="up">Team Nickname</span>
      <span class="pts-value up">{{user.teamNickname}}</span>
    </div>
    <div class="total-pts sha">
      <span class="up">Total points</span>
      <span class="pts-value">{{totalPoints}} pts</span>
    </div>
    <div class="last-week-pts sha">
      <span class="up">Last week points</span>
      <span class="last-week-pts-value">{{lastWeekPts}} pts</span>
    </div>
    <div class="league-pos sha">
      <span class="up">League position</span>
      <span class="league-pos-value"></span>
    </div>
    <div class="cup-pos sha">
      <span class="up">Cup status</span>
      <span class="cup-pos-value">
        <router-link to="/cup">Cup Page</router-link>
      </span>
    </div>
    <div class="curr-round sha">
      <span class="up">Current round</span>
      <span class="curr-round-value">Round {{currentRnd}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "UserInfo",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["currentRnd", "userPts", "standings"]),
    totalPoints() {
      if (this.userPts) {
        return this.userPts.reduce((prev, next) => {
          return Number(prev) + Number(next.total);
        }, 0);
      } else {
        return "Loading";
      }
    },
    lastWeekPts() {
      if (this.userPts) {
        return this.userPts[this.currentRnd - 2].total;
      } else {
          return "Loading"
      }
    },
    currentPos() {
      return "TO IMPLEMENT";
    },
    userLeague(){
        return this.user.teamCode < 11 ? "P E L E" : "M A R A D O N A"
    }
  },
  methods: {
    ...mapActions(["fetchStandings"])
  },
  created() {
    this.fetchStandings();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/**********************************************************
*************************  USER DETAILS SECTION **********/
.user-details {
  height: fit-content;
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 0 20px;
}

.user-stats {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

.user-name {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #3c474d;
  color: #f1f0f1;
  font-size: 1.25rem;
  position: relative;
}

.user-name img {
  width: 60px;
  height: 60px;
  position: absolute;
  left: 20px;
}

.league-name {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #9fa5a9;
  color: #3c474d;
  font-size: 1.25rem;
  border-bottom: 2px solid #3a454b;
}

.info-stat,
.total-pts,
.last-week-pts,
.league-pos,
.cup-pos,
.curr-round {
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #d3d3d3;
  color: #3c474d;
  font-size: 0.875rem;
  margin: 0 0 2px 0;
  font-weight: bold;
  padding: 0 20px 0 20px;
}

.info-stat:nth-child(7) {
  border-bottom: 2px solid #3a454b;
  margin: 0px;
}

.total-pts {
  border-top: 2px solid #3a454b;
  margin: 20px 0 2px 0;
}
.curr-round {
  margin: 0px;
  border-bottom: 2px solid #3a454b;
}

.cup-pos-value {
  width: 20%;
}

.cup-pos-value a {
  display: inline-block;
  text-align: end;
  width: 100%;
  color: #3c474d;
}

.cup-pos-value a:hover > img {
  background-color: #3c474d;
}

.cup-pos-value img {
  width: 20px;
}
</style>