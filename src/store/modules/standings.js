import getStandings from "../../utils/getStandings";


const state = {
    standings: undefined,
};

const getters = {
    standings: state => state.standings
};

const actions = {
    async fetchStandings({
        commit
    }) {
        const standings = await getStandings()

        commit('setStandings', standings)
    }
};

const mutations = {
    setStandings: (state, s) => {
        state.standings = s
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};