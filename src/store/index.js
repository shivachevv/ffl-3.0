import Vue from "vue";
import Vuex from "vuex";
import players from './modules/players'
import leagues from './modules/leagues'
// import common from './modules/common'
// import allplayers from './modules/allplayers'
import currentRound from './modules/currentRound'
import users from './modules/users'
import standings from './modules/standings'
import transfers from './modules/transfers'
import cup from './modules/cup'
import h2h from './modules/h2h'
import loggedUser from './modules/loggedUser'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    players,
    leagues,
    // common,
    // allplayers,
    currentRound,
    users,
    standings,
    transfers,
    loggedUser,
    cup,
    h2h
  }
});
