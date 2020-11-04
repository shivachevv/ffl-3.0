  <template>
  <div class="login sha">
    <p></p>
    <h2 class="error-msg" v-if="error">{{error}}</h2>
    <p class="login-heading">Login</p>

    <form @submit.prevent="loginHandler">
      <template v-if="$v.email.$error">
          <span class="error-msg" v-if="!$v.email.required">Email is required!</span>
          <span class="error-msg" v-else-if="!$v.email.email">Email is not valid!</span>
        </template>
      <input type="email" placeholder="E-Mail" v-model="email" />
      <template v-if="$v.password.$error">
          <span class="error-msg" v-if="!$v.password.required">Password is required!</span>
          <span class="error-msg" v-else-if="!$v.password.minLength">Password should be minimum 6 characters!</span>
        </template>
      <input type="password" placeholder="Password" v-model="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "Login",
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(3)
    }
  },
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    ...mapActions(["fetchLoggedUser", "fetchMenuLinks"]),

    loginHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.fetchLoggedUser();
          this.$forceUpdate();
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../common/breakpoints.scss";

$error-clr: #ff7175;

.login {
  margin: 20px 0 0 0;
  background-color: #4e585e;
  color: white;
  border-radius: 5px;
  padding: 1.5rem;
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  transition: all 0.5s;
  @media #{$mobile} {
    width: 90%;
  }
  .login-heading {
    margin: 0 0 10px 0;
    font-size: 1.5rem;
  }
  .error-msg {
    color: $error-clr;
    margin: 0 0 10px 0;
  }
  .container-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    img {
      width: 2rem;
      height: 2rem;
    }
  }
  form {
    display: flex;
    flex-flow: column;
    *:not(:last-child) {
      margin-bottom: 1rem;
    }
    input {
      padding: 0.5rem;
      transition: all 0.2s;
      &:focus {
        border: 3px solid #924243;
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
      &:hover {
        background-color: #893f40;
        color: lightgray;
        border: none;
      }
    }
  }
}
</style>
