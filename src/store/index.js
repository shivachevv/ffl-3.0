import Vue from "vue";
import Vuex from "vuex";
import players from './modules/players'
import leagues from './modules/leagues'
import common from './modules/common'
import allplayers from './modules/allplayers'
import currentRound from './modules/currentRound'
import users from './modules/users'
import standings from './modules/standings'
import transfers from './modules/transfers'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    players,
    leagues,
    common,
    allplayers,
    currentRound,
    users,
    standings,
    transfers
  }
});
