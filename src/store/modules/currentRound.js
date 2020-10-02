import { getCurrentRound } from "../../utils/getCurrentRound";


const state = {
    currentRound: undefined,
};

const getters = {
    currentRound: state => state.currentRound
};

const actions = {
    async fetchCurrentRound({
        commit
    }) {
        const round = await getCurrentRound()
        commit('setCurrentRound', round)
    }
};

const mutations = {
    setCurrentRound: (state, r) => {
        state.currentRound = r
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};