import axios from 'axios'
import powHelper from "../../utils/powHelper";
import last5TransfersHelper from "../../utils/last5TransfersHelper";
import popupPlayerHelper from "../../utils/popupPlayerHelper";
import userPointsHelper from "../../utils/userPointsHelper";
import currentRndHelper from "../../utils/currentRndHelper";
import { getAllPlayersDataNormal } from '../../utils/getAllPlayersData'
import { getAllPlayersDataCathegorized } from '../../utils/getAllPlayersData'


const URL_PLAYERS = 'https://ffl-3-92418.firebaseio.com/playerPts.json';
const URL_PLAYERS_HISTORY = 'https://ffl-3-92418.firebaseio.com/playerHistory.json';
const URL_TRANSFERS_PELE = 'https://ffl-3-92418.firebaseio.com/playerTransfersPele.json';
const URL_TRANSFERS_MARADONA = 'https://ffl-3-92418.firebaseio.com/playerTransfersMaradona.json';
const URL_CAPTAINS = 'https://ffl-3-92418.firebaseio.com/userData.json';

const state = {
    players: undefined,
    playersCathegorized: undefined,
    pow: '',
    last5Transfers1: '',
    last5Transfers2: '',
    popupData: '',
    userPts: '',
    currentRnd: ''
};

const getters = {
    players: state => state.players,
    playersCathegorized: state => state.playersCathegorized,
    pow: state => state.pow,
    last5Transfers1: state => state.last5Transfers1,
    last5Transfers2: state => state.last5Transfers2,
    popupData: state => state.popupData,
    userPts: state => state.userPts,
    currentRnd: state => state.currentRnd
};

const actions = {
    async fetchPlayers({
        commit
    }) {
        const players = await getAllPlayersDataNormal()
        commit('setPlayers', players)
    },
    async fetchPlayersCathegorized({
        commit
    }) {
        const playersCathegorized = await getAllPlayersDataCathegorized()
        commit('setPlayersCathegorized', playersCathegorized)
    },
    async fetchUserPts({
        commit
    }, code) {
        const tmp = await axios.get(URL_PLAYERS)
            .then(data1 => {
                axios.get(URL_PLAYERS_HISTORY).then(
                    data2 => {
                        axios.get(URL_CAPTAINS).then(cpt => {
                            let pts = userPointsHelper(data1.data, data2.data, cpt.data, code)
                            commit('setUserPts', pts)
                        })
                    }
                )
            });
        console.log(tmp);
    },
    async fetchPow({
        commit
    }) {
        const tmp = await axios.get(URL_PLAYERS)
            .then(data => {
                return {
                    'pele': powHelper(data.data, 'pele'),
                    'maradona': powHelper(data.data, 'maradona')
                }
            });
        commit('setPow', tmp)
    },
    async fetchLast5Transfers1({
        commit
    }) {
        const tmp = await axios.get(URL_TRANSFERS_PELE)
            .then(data => {
                return last5TransfersHelper(data.data)
            });
        commit('setLast5Transfers1', tmp)
    },
    async fetchLast5Transfers2({
        commit
    }) {
        const tmp = await axios.get(URL_TRANSFERS_MARADONA)
            .then(data => {
                return last5TransfersHelper(data.data)
            });
        commit('setLast5Transfers2', tmp)
    },
    async fetchPopupData({
        commit
    }, p) {
        const tmp = await axios.get(URL_PLAYERS)
            .then(data => {
                return popupPlayerHelper(data.data, p)
            });
        commit('setPopupData', tmp)
    },
    async fetchCurrentRnd({
        commit
    }) {
        const tmp = await axios.get(URL_PLAYERS)
            .then(data => {
                return currentRndHelper(data.data)
            });
        commit('setCurrentRnd', tmp)
    },
};

const mutations = {
    setPlayers: (state, p) => {
        state.players = p
    },
    setPlayersCathegorized: (state, p) => {
        state.playersCathegorized = p
    },
    setCurrentRnd: (state, r) => {
        state.currentRnd = r
    },
    setUserPts: (state, p) => {
        state.userPts = p
    },
    setPow: (state, p) => {
        state.pow = p
    },
    setLast5Transfers1: (state, t) => {
        state.last5Transfers1 = t
    },
    setLast5Transfers2: (state, t) => {
        state.last5Transfers2 = t
    },
    setPopupData: (state, d) => {
        state.popupData = d
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};