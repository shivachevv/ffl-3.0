import getNewStandings from "../../utils/getNewStandings";


const state = {
    standings: undefined,
};

const getters = {
    standings: state => state.standings,
};

const actions = {
    async fetchStandings({
        commit
    }) {
        const standings = await getNewStandings()

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