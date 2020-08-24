import leagues from "../../game data/leagues.json"
import standingsHelper from "../../utils/standingsHelper";
import towHelper from "../../utils/towHelper";
import axios from 'axios'

const URL = 'https://ffl-3-92418.firebaseio.com/userStandings.json';

const state = {
    leagues: leagues,
    standings: '',
    tow: ''
};

const getters = {
    leagues: state => state.leagues,
    standings: state => state.standings,
    tow: state => state.tow
};

const actions = {
    async fetchStandings({
        commit
    }) {
        const standings = await axios.get(URL)
            .then(data => {
                return standingsHelper(data.data);
            });
        commit('setStandings', standings)
    },
    async fetchTow({
        commit
    }) {
        const tmp = await axios.get(URL)
            .then(data => {
                return towHelper(data.data);
            });
            commit('setTow', tmp)
    },
};

const mutations = {
    setStandings: (state, s) => {
        state.standings = s
    },
    setTow: (state, t) => {
        state.tow = t
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};