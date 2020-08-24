<template>
  <div class="preparation sha">
    <div class="prep-header up">
      <h2>Next round preparation</h2>
    </div>
    <div class="deadline up">
      <span>Deadline for round {{currentRnd + 1}}</span>
    </div>
    <div class="countdown-cont">
      <img src="@/assets/images/user-page/swords.png" alt="countdown-img" />
      <Timer :starttime="starttime" :endtime="endtime" :trans="trans" :endtimeRaw="endtimeRaw"></Timer>
    </div>
    <div class="captain-selected">
      <h2 v-if="captainSelected && logCheck">
        You have selected {{captainSelected.captain.toUpperCase()}}
        <br />for your captain!
      </h2>
      <h2 v-if="!captainSelected && logCheck">You have not yet selected your captain for this round!</h2>
    </div>

    <!---------------- CAPTAIN SELECTION -------------------------------------->

    <form v-if="logCheck" @submit.prevent="captainHandler">
      <div class="row1">
        <div class="captain-select">
          <div>
            <img
              v-if="!superCpt"
              src="@/assets/images/user-page/cpt.png"
              alt="captain-img"
              id="cpt-image"
            />
            <img v-else src="@/assets/images/user-page/cpt1.png" alt="captain-img" id="cpt-image" />
            <select class="hover-form up" name="captain" v-model="captain" required v-if="userPts">
              <option value hidden>Choose your captain</option>
              <option
                v-for="(p,i) of userPts[currentRnd - 1].team"
                :key="i"
                :value="p.name"
              >{{p.name}}</option>
            </select>
          </div>
          <div class="form-down">
            <div>
              <input
                class="check"
                type="checkbox"
                name="superCpt"
                id="superCpt"
                v-model="isSuperCpt"
                @click="addSuperCpt()"
              />
              <label for="superCpt" class="up">SUPER CAPTAIN</label>
            </div>
            <button class="button" type="submit">Submit</button>
          </div>
        </div>
      </div>
    </form>
    <!---------------- CAPTAIN SELECTION END -------------------------------------->

    <div v-if="!logCheck" class="please-login">
      <img src="@/assets/images/user-page/sad-face.png" alt />
      <h2>
        You should be the coach of {{owner}}
        <br />to view this panel!
      </h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Timer from "./Timer";
import deadline from "../../utils/deadlineHelper";

export default {
  name: "MatchPrep",
  components: { Timer },
  props: {
    logCheck: {
      type: Boolean,
      required: true
    },
    owner: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      starttime: deadline.now,
      endtime: deadline.next.toLocaleString(),
      endtimeRaw: deadline.next,
      trans: {
        day: "Day",
        hours: "Hours",
        minutes: "Minuts",
        seconds: "Seconds",
        expired: "",
        running: "",
        upcoming: "",
        status: {
          expired: "",
          running: "",
          upcoming: ""
        }
      },
      CAPTAINS_URL: "https://ffl-3-92418.firebaseio.com/captains-display",
      superCpt: false,
      captain: "",
      isSuperCpt: false,
      captainSelected: ""
    };
  },
  computed: {
    ...mapGetters(["userPts", "currentRnd"]),
    updatedURL() {
      return `${this.CAPTAINS_URL}/${this.owner
        .toLowerCase()
        .split(" ")
        .join("-")}/${this.currentRnd + 1}.json`;
    }
  },
  methods: {
    addSuperCpt() {
      return (this.superCpt = !this.superCpt);
    },
    captainHandler() {
      let data = {
        captain: this.captain,
        isSuper: this.isSuperCpt,
        updatedCpt: new Date()
      };
      fetch(this.updatedURL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(x => x.json())
        .then(x => {
          this.captainSelected = x;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    async updatedURL() {
      this.captainSelected = await fetch(this.updatedURL).then(x => x.json());
    }
  },
  async created() {
    this.captainSelected = await fetch(this.updatedURL).then(x => x.json());
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/********************************************************
***************   MATCH PREPARATION   ******************/

.preparation {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0 0 0;
}

.prep-header {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #3c474d;
  color: #f1f0f1;
  font-size: 1.125rem;
}

.deadline {
  width: 100%;
  height: 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #9fa5a9;
  color: #3c474d;
  font-weight: bold;
  font-size: 1.125rem;
}

.countdown-cont {
  width: 100%;
  height: 65px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #8a4e50;
  color: #3c474d;
  font-size: 1.25rem;
  padding: 0px 0px 0 20px;
  position: relative;
}

.countdown-cont img {
  width: 45px;
}

.countdown-cont span {
  color: #d3d3d3;
  width: 350px;
}

/*******************************************
************   FORM   *********************/

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
}

.row1 {
  width: 100%;
  margin: 2px 0 0 0;
  background-color: #d3d3d3;
}

.captain-select {
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #d3d3d3;
  padding: 0 20px 0 66px;
  margin: 0 0 30px 0;
  position: relative;
}

.captain-select > div {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  // justify-content: flex-start;
  align-items: center;
}

.captain-select > div:first-child {
  margin: 16px 0 0 0;
}

.captain-select img {
  position: absolute;
  left: 10px;
  width: 36px;
}

.captain-select select {
  width: 100%;
  height: 30px;
  background-color: #c6c6c6;
  font-size: 0.9rem;
  text-transform: uppercase;
  padding: 5px 0 5px 5px;
  border: none;
}

input.check {
  transform: scale(1.5);
}

.captain-select label {
  font-size: 0.875rem;
  margin: 0 0 0 5px;
}

.user-email {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 0 66px;
}

.user-email input {
  margin: 15px 0 20px 0;
  width: 90%;
  height: 30px;
  color: #3c474d;
  background-color: #c6c6c6;
  border: none;
  font-size: 1rem;
  line-height: 24px;
  padding: 0 0 0 10px;
}

.row2 {
  width: 100%;
  margin: 2px 0 0 0;
  background-color: #d3d3d3;
  position: relative;
}

.transfers {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px 0 0 66px;
  background-color: #d3d3d3;
}

.transfers span {
  color: #3c474d;
  font-size: 1rem;
}

.transfers textarea {
  width: 90%;
  height: 30px;
  color: #3c474d;
  background-color: #c6c6c6;
  border: none;
  font-size: 0.85rem;
  line-height: 24px;
  padding: 0 0 0 10px;
  resize: none;
  font-weight: bold;
  margin: 5px 0;
}

.textarea-div1 textarea {
  border-bottom: 2px solid #5b745b;
  /* margin:15px 0 0 0; */
}

.textarea-div2 textarea {
  border-bottom: 2px solid #8a4e50;
}

.textarea-div1 {
  width: 100%;
  position: relative;
  margin: 20px 0 20px 0;
}

.textarea-div2 {
  width: 100%;
  position: relative;
  margin: 20px 0 20px 0;
}

.textarea-div1::before {
  position: absolute;
  content: "";
  left: -12%;
  top: 13px;
  width: 40px;
  height: 17px;
  border-bottom: 15px solid #5b745b;
  border-top: 0px solid transparent;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}

.textarea-div2::before {
  position: absolute;
  content: "";
  left: -12%;
  top: 13px;
  width: 40px;
  height: 17px;
  border-top: 15px solid #8e5e60;
  border-bottom: 0px solid transparent;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}

.row3 {
  width: 100%;
  height: 65px;
  margin: 2px 0 0 0;
  background-color: #d3d3d3;
}

.row3 > div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 91%;
  height: 65px;
  padding: 0 0 0 66px;
  font-size: 0.75rem;
  background-color: #d3d3d3;
  color: #3c474d;
}

.row3 input {
  transform: scale(1.5);
}

.row3 label {
  font-size: 0.875rem;
  margin: 0 0 0 5px;
}

.row3 > div > div {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.875rem;
}

.row3 button {
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0px;
  color: #d3d3d3;
  background: #3c474d;
  padding: 0px 0 0 10px;
  border: none;
  text-decoration: none;
  font-size: 1rem;
  width: 120px;
  height: 35px;
  line-height: 35px;
  transition: all 0.3s;
  -moz-box-shadow: inset 0px 0px 0px 0px #3c474d;
  -webkit-box-shadow: inset 0px 0px 0px 0px #3c474d;
  box-shadow: inset 0px 0px 0px 0px #3c474d;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.row3 button:hover {
  -moz-box-shadow: inset 0px -2px 0px 0px #3c474d;
  -webkit-box-shadow: inset 0px -2px 0px 0px #3c474d;
  box-shadow: inset 0px -2px 0px 0px #3c474d;
  background-color: #c6c6c6;
  color: #3c474d;
  cursor: pointer;
}

.row3 button div {
  height: 35px;
  width: 35%;
  background-color: #4d5a61;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.row3 button img {
  height: 22px;
}

.row3 button:hover > div {
  -moz-box-shadow: inset 0px -2px 0px 0px #3c474d;
  -webkit-box-shadow: inset 0px -2px 0px 0px #3c474d;
  box-shadow: inset 0px -2px 0px 0px #3c474d;
  background-color: #9fa5a9;
  color: #3c474d;
}

.please-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  h2 {
    width: 100%;
    font-size: 1.4rem;
    border-top: 1px solid #3c474d;
    padding: 20px;
    text-align: center;
  }
  img {
    width: 30%;
    margin: 0 0 20px 0;
  }
}
.captain-selected {
  margin: 2px 0;
  width: 100%;
  background-color: #184d18;
  color: lightgrey;
  h2 {
    margin: 20px 10px;
    text-align: center;
    font-size: 1.1rem;
    line-height: normal;
  }
}
.form-down {
  justify-content: space-between;
  margin: 20px 0 0 0;
  .button {
    padding: 10px 20px;
    background-color: #3c474d;
    color: lightgrey;
    font-size: 1rem;
    font-family: "Montserrat", sans-serif;
    text-transform: uppercase;
    border: none;
    border-radius: 7px;
    transition: all 0.3s;
    &:hover {
      background-color: #b8b8b8;
      color: #3c474d;
      cursor: pointer;
      font-weight: bold;
      box-shadow: 3px 3px 10px -5px rgba(0, 0, 0, 0.43);
    }
  }
}
</style>