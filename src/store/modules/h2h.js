import getAllH2HRounds from "../../utils/getAllH2HRounds";


const state = {
    h2h: undefined,
};

const getters = {
    h2h: state => state.h2h
};

const actions = {
    async fetchH2h({
        commit
    }) {
        const h2h = await getAllH2HRounds()
        commit('setH2h', h2h)
    }
};

const mutations = {
    setH2h: (state, h) => {
        state.h2h = h
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};