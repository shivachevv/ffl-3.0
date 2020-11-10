import getStandings from "../../utils/getStandings";


const state = {
    standings: undefined,
    newStandings: undefined,
};

const getters = {
    standings: state => state.standings,
    newStandings: state => state.newStandings
};

const actions = {
    async fetchStandings({
        commit
    }) {
        const standings = await getStandings()

        commit('setStandings', standings)
    },
    fetchNewStandings({
        commit
    }) {
        const standings = 'test'
        // const standings = await getNewStandings()
        // commit('setNewStandings', standings)
        commit('setNewStandings', standings)
    }
};

const mutations = {
    setStandings: (state, s) => {
        state.standings = s
    },
    setNewStandings: (state, s) => {
        state.newStandings = s
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};