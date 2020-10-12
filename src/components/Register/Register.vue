  <template>
  <div class="login sha">
    <p>Register</p>
    <h2 v-if="error">{{error}}</h2>

    <form class="user-form" @submit.prevent="registerHandler">
      <div class="form-group">
        <h2 class="section-header">User Details:</h2>
        <template v-if="$v.email.$error">
          <span class="error-msg" v-if="!$v.email.required">Email is required!</span>
          <span class="error-msg" v-else-if="!$v.email.email">Email is not valid!</span>
        </template>
        <input
          type="text"
          name="email"
          placeholder="Email*"
          v-model="email"
          @blur="$v.email.$touch"
        />

        <template v-if="$v.password.$error">
          <span class="error-msg" v-if="!$v.password.required">Password is required!</span>
          <span class="error-msg" v-else-if="!$v.password.minLength">Password should be 6 chars min!</span>
        </template>
        <input
          type="password"
          name="password"
          placeholder="Password*"
          v-model="password"
          @blur="$v.password.$touch"
        />

        <template v-if="$v.rePassword.$error">
          <span class="error-msg" v-if="!$v.rePassword.sameAs">The 2 passwords should match!</span>
        </template>
        <input
          type="password"
          name="rePassword"
          placeholder="Repeat password*"
          v-model="rePassword"
          @blur="$v.rePassword.$touch"
        />

        <template v-if="$v.name.$error">
          <span class="error-msg" v-if="!$v.name.required">User Name is required!</span>
        </template>
        <input
          type="text"
          name="name"
          placeholder="User Name*"
          v-model="name"
          @blur="$v.name.$touch"
        />

        <h2 class="section-header">Team details:</h2>
        <template v-if="$v.teamName.$error">
          <span class="error-msg" v-if="!$v.teamName.required">Team Name is required!</span>
        </template>
        <input
          type="text"
          name="teamName"
          placeholder="Name your team*"
          v-model="teamName"
          @blur="$v.teamName.$touch"
        />
        <input type="text" name="motto" placeholder="What is your team motto?" v-model="motto" />
        <input type="number" name="age" placeholder="What is your age?" v-model="age" />
        <input type="text" name="location" placeholder="What is your location?" v-model="location" />
        <input
          type="text"
          name="ocupation"
          placeholder="What is your ocupation?"
          v-model="ocupation"
        />
        <input
          type="text"
          name="favTeam"
          placeholder="What is your favourite team?"
          v-model="favTeam"
        />

        <button>Register</button>
      </div>

      <!-- <div class="form-group">
        <select @change="clubSelectionHandler">
          <option value="none" selected disabled hidden>Select a Team</option>
          <option v-for="(club,i) in clubsData" :key="i" :value="club.name">{{club.name}}</option>
        </select>
        <template v-if="$v.teamName.$error">
          <span class="error-msg" v-if="!$v.teamName.required">Team Name is required!</span>
        </template>
        <input
          type="text"
          name="teamName"
          placeholder="Name your team"
          v-model="teamName"
          @blur="$v.teamName.$touch"
        />

        <template v-if="$v.teamLogo.$error">
          <span class="error-msg" v-if="!$v.teamLogo.required">Team Logo is required!</span>
          <span class="error-msg" v-else-if="!$v.teamLogo.url">Team Logo must be an URL!</span>
        </template>
        <input
          type="text"
          name="teamLogo"
          placeholder="Enter your logo URL"
          v-model="teamLogo"
          @blur="$v.teamLogo.$touch"
        />
      </div>-->

      <!-- NEW PLAYERS SELECTION RADIO BUTTONS -->
      <!-- <div class="form-group" v-if="playersData">
        <h3>Goalkeepers</h3>
        <div v-for="(gk,i) in playersData[0].gk" :key="i">
          <input
            name="gk"
            :id="gk"
            type="radio"
            :value="gk"
            v-model="selectedPlayers.gk"
          />
          <label :for="gk">{{gk}}</label>
        </div>
      </div>

      <div class="form-group" v-if="playersData">
        <h3>Defenders</h3>
        <div v-for="(def,i) in playersData[1].def" :key="i">
          <input
            name="def"
            :id="def"
            type="radio"
            :value="def"
            v-model="selectedPlayers.def"
          />
          <label :for="def">{{def}}</label>
        </div>
      </div>

      <div class="form-group" v-if="playersData">
        <h3>Midfielders</h3>
        <div v-for="(mid,i) in playersData[2].mid" :key="i">
          <input
            name="mid"
            :id="mid"
            type="radio"
            :value="mid"
            v-model="selectedPlayers.mid"
          />
          <label :for="mid">{{mid}}</label>
        </div>
      </div>

      <div class="form-group" v-if="playersData">
        <h3>Strikers</h3>
        <div v-for="(st,i) in playersData[3].st" :key="i">
          <input
            name="st"
            :id="st"
            type="radio"
            :value="st"
            v-model="selectedPlayers.st"
          />
          <label :for="st">{{st}}</label>
        </div>
      </div>-->

      <!-- <Position
        v-if="playersData"
        position="Goalkeepers"
        :playersData="playersData[0].gk"
        @input="selectedPlayers.gk = $event"
      ></Position>
      <Position
        v-if="playersData"
        position="Defenders"
        :playersData="playersData[1].def"
        @input="selectedPlayers.def = $event"
      ></Position>
      <Position
        v-if="playersData"
        position="Midfielders"
        :playersData="playersData[2].mid"
        @input="selectedPlayers.mid = $event"
      ></Position>
      <Position
        v-if="playersData"
        position="Strikers"
        :playersData="playersData[3].st"
        @input="selectedPlayers.st = $event"
      ></Position>

      <div class="my-team">
        <h3>Your team</h3>
        <ul>
          <li>GK: {{selectedPlayers.gk}}</li>
          <li>DEF: {{selectedPlayers.def}}</li>
          <li>MID: {{selectedPlayers.mid}}</li>
          <li>ST: {{selectedPlayers.st}}</li>
        </ul>
        <template v-if="$v.selectedPlayers.$error">
          <span
            class="error-msg"
            v-if="!$v.selectedPlayers.gk.required ||
                !$v.selectedPlayers.def.required ||
                !$v.selectedPlayers.mid.required ||
                !$v.selectedPlayers.st.required "
          >Team is not complete!</span>
        </template>
      </div>-->
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import firebase from "firebase/app";
import "firebase/auth";
import { makeNewUser } from "../../models/User";
import { DATA_URL } from "../../common";

export default {
  name: "Register",
  components: {},
  props: {},
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email,
      minLength: minLength(6)
    },
    name: {
      required,
    },
    password: {
      required,
      minLength: minLength(6)
    },
    rePassword: {
      sameAsPassword: sameAs("password")
    },
    teamName: {
      required
    }
  },
  data() {
    return {
      name:"",
      email: "",
      password: "",
      rePassword: "",
      teamName: "",
      age: "",
      location: "",
      ocupation: "",
      favTeam: "",
      motto: "",
      error: ""
    };
  },
  methods: {
    async registerHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        try {
          const {
            email,
            password,
            name,
            teamName,
            age,
            location,
            ocupation,
            favTeam,
            motto
          } = this;
          const fbUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);
          const uid = fbUser.user.uid;
          const newUser = makeNewUser(
            uid,
            email,
            name,
            teamName,
            age,
            location,
            ocupation,
            favTeam,
            motto
          );
          this.fetchUser(newUser);
        } catch (error) {
          this.error = error.message;
        }
      }
    },
    fetchUser(user) {
      return fetch(`${DATA_URL}users/${user.uid}.json`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(() => {
          console.log("Success:");
          //   this.success = true;
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$error-clr: #ff7175;
.login {
  background-color: #4e585e;
  color: white;
  border-radius: 5px;
  padding: 0 20px 20px 20px;
  width: 50%;
  margin: 20px auto 0 auto;
  position: relative;
  overflow: hidden;
  transition: all 0.5s;

  .error-msg {
    color: $error-clr;
  }
  p {
    width: 100%;
    font-weight: bold;
    font-size: 1.5rem;
    padding: 10px 0;
    text-align: center;
    border-bottom: 2px solid #c6c6c6;
  }
  .user-form {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    margin: 20px 0 0 0;
    *:not(:last-child) {
      margin-bottom: 1rem;
    }
    .form-group {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      select {
        padding: 0.5rem;
        transition: all 0.2s;
      }
      label {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }

      input {
        padding: 0.5rem;
        transition: all 0.2s;
        width: 50%;
        &:focus {
          border: 3px solid #924243;
        }
        &[type="radio"] {
          display: none;
        }
      }

      .section-header {
          margin: 20px 0 10px 0;
      }
    }
    button {
      font-size: 1.5rem;
      color: #4e585e;
      padding: 0.5rem;
      background-color: lightgray;
      border: 1px solid gray;
      border-radius: 3px;
      cursor: pointer;
      transition: all 0.3s;
      width: 40%;
      &:hover {
        background-color: #893f40;
        color: lightgray;
        border: none;
      }
    }
  }
}
</style>