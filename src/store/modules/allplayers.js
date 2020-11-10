// // import axios from "axios";
// // import allPlayersHelper from '../../utils/allPlayersHelper';

// const URL_ALL_PLAYERS = 'https://ffl-3-92418.firebaseio.com/allPlayersReady.json';

// const state = {
//     allPlayersData: '',
// };

// const getters = {
//     allPlayersData: state => state.allPlayersData,
// };

// const actions = {
//     async fetchAllPlayersData({
//         commit
//     }) {
//         // console.log('1st before GET RQ', new Date());
        
//         const players = await fetch(URL_ALL_PLAYERS).then(x => x.json())
        
//         // const result = await allPlayersHelper(players)

//         commit('setAllPlayersData', players)
//     }
// };

// const mutations = {
//     setAllPlayersData: (state, p) => {
//         state.allPlayersData = p
//     }
// };

// export default {
//     state,
//     getters,
//     actions,
//     mutations
// };