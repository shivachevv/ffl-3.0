import getStats from "../../utils/getStats";


const state = {
    stats: undefined,
};

const getters = {
    stats: state => state.stats
};

const actions = {
    async fetchStats({
        commit
    }) {
        const stats = await getStats()
        commit('setStats', stats)
    }
};

const mutations = {
    setStats: (state, s) => {
        state.stats = s
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};