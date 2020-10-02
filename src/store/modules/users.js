import getAllUsers from "../../utils/getAllUsers";


const state = {
    users: undefined,
};

const getters = {
    users: state => state.users
};

const actions = {
    async fetchUsers({
        commit
    }) {
        const users = await getAllUsers()
        commit('setUsers', users)
    }
};

const mutations = {
    setUsers: (state, u) => {
        state.users = u
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};