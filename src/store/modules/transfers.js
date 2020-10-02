import getAllTransfers from "../../utils/getAllTransfers";


const state = {
    transfers: undefined,
};

const getters = {
    transfers: state => state.transfers
};

const actions = {
    async fetchTransfers({
        commit
    }) {
        const transfers = await getAllTransfers()
        commit('setTransfers', transfers)
    }
};

const mutations = {
    setTransfers: (state, t) => {
        state.transfers = t
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};