// import { getAllLightPlayers } from '../../utils/getAllPlayersData'
// import { getAllLightPlayers, getAllPlayersDataNormal } from '../../utils/getAllPlayersData'
// import lightenPlayers from '../../utils/lightenPlayers'

import loadResource from "../../utils/resources/loadResource";




const state = {
    players: undefined,
};

const getters = {
    players: state => state.players,
};

const actions = {
    async fetchPlayers({
        commit
    }) {
        // let players = await getAllPlayersDataNormal()
        // let copy = JSON.parse(JSON.stringify(players))
        // const lighterPlayers = await lightenPlayers(copy)
        // copy = null
        // players = null
        const lightPlayers = await loadResource('lightPlayers')

        commit('setPlayers', lightPlayers)
    },
};

const mutations = {
    setPlayers: (state, p) => {
        state.players = p
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};