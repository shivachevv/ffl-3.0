// import * as firebase from "firebase/app";
// import "firebase/auth";
// import leagues from "../../game data/leagues.json";
// import axios from "axios";
// import wildcardHelper from '../../utils/wildcardHelper';

// const URL_CAPTAINS = 'https://ffl-3-92418.firebaseio.com/userData.json';

const state = {
    // loggedUser: '',
    // menuLinks: [],
    // userInfoStats: '',
    // WCandTripple: []
};

const getters = {
    // menuLinks: state => state.menuLinks,
    // loggedUser: state => state.loggedUser,
    // loggedTeamPath: state => state.loggedTeamPath,
    // WCandTripple: state => state.WCandTripple
};

const actions = {
    // async fetchLoggedUser({
    //     dispatch,
    //     commit
    // }) {
    //     const user = await firebase.auth().onAuthStateChanged(user => {
    //         if (user) {
    //             let lg1 = leagues["pele"].teams.filter(x => x.email === user.email)[0]
    //             let lg2 = leagues["maradona"].teams.filter(x => x.email === user.email)[0]

    //             commit('setLoggedUser', {
    //                 fb: user,
    //                 info: lg1 ? lg1 : lg2
    //             })
    //             dispatch('fetchMenuLinks')
    //         }
    //     });
    //     console.log(user);
    // },
    // fetchMenuLinks({
    //     commit
    // }) {
    //     let tmp = [{
    //             title: "Home",
    //             path: "/",
    //             isMyTeam: false
    //         },
    //         {
    //             title: state.loggedUser ? "My Team" : "Login",
    //             path: state.loggedUser ? `/team-details/${state.loggedUser.info.teamName}` : "/login",
    //             logo: state.loggedUser ? state.loggedUser.info.teamLogo : '',
    //             isMyTeam: state.loggedUser ? true : false
    //         },
    //         {
    //             title: "Transfers",
    //             path: "/transfers",
    //             isMyTeam: false
    //         },
    //         {
    //             title: "Cup",
    //             path: "/cup",
    //             isMyTeam: false
    //         },
    //         {
    //             title: "Player Stats",
    //             path: "/player-stats",
    //             isMyTeam: false
    //         },
    //         {
    //             title: "Rules & Prizes",
    //             path: "/rules-prizes",
    //             isMyTeam: false
    //         },
    //         {
    //             title: "Stats",
    //             path: "/stats",
    //             isMyTeam: false
    //         }
    //     ]
    //     commit('setMenuLinks', tmp)
    // },
    // async fetchWCandTripple({
    //     commit
    // }) {
    //     const wild = await axios.get(URL_CAPTAINS)
    //         .then(data => {
    //             return wildcardHelper(data.data)
    //         })
    //     commit('setWCandTripple', wild)
    // }


};

const mutations = {
    // setLoggedUser: (state, u) => {
    //     state.loggedUser = u
    // },
    // setMenuLinks: (state, m) => {
    //     state.menuLinks = m
    // },
    // setWCandTripple: (state, w) => {
    //     state.WCandTripple = w
    // }

};

export default {
    state,
    getters,
    actions,
    mutations
};