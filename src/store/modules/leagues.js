import getAllLeagues from "../../utils/getAllLeagues";


const state = {
    leagues: undefined,
};

const getters = {
    leagues: state => state.leagues,
};

const actions = {
    async fetchLeagues({
        commit
    }) {
        const leagues = await getAllLeagues()
        commit('setLeagues', leagues)
    },
};

const mutations = {
    setLeagues: (state, l) => {
        state.leagues = l
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};