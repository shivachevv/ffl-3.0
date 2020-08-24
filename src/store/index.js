import Vue from "vue";
import Vuex from "vuex";
import players from './modules/players'
import leagues from './modules/leagues'
import common from './modules/common'
import allplayers from './modules/allplayers'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    players,
    leagues,
    common,
    allplayers
  }
});
