import * as firebase from "firebase/app";
import "firebase/auth";
import getAllUsers from '../../utils/getAllUsers'
// import leagues from "../../game data/leagues.json";
// import axios from "axios";
// import wildcardHelper from '../../utils/wildcardHelper';

// const URL_CAPTAINS = 'https://ffl-3-92418.firebaseio.com/userData.json';

const state = {
    loggedUser: '',
    menuLinks: [],
    // userInfoStats: '',
    // WCandTripple: []
};

const getters = {
    menuLinks: state => state.menuLinks,
    loggedUser: state => state.loggedUser,
    // loggedTeamPath: state => state.loggedTeamPath,
    // WCandTripple: state => state.WCandTripple
};

const actions = {
    fetchLoggedUser({
        dispatch,
        commit
    }) {
        firebase.auth().onAuthStateChanged(async user => {
            if (user) {
                const users = await getAllUsers()
                const userObject = users[user.uid]
                commit('setLoggedUser', userObject)
                dispatch('fetchMenuLinks')
            }
        });
    },
    fetchMenuLinks({
        commit
    }) {
        const { loggedUser } = state
        let tmp = [{
            title: "Home",
            path: "/",
            isMyTeam: false
        },
        {
            title: loggedUser ? "My Team" : "Login",
            path: loggedUser ? `/team-details/${loggedUser.userLogo}` : "/login",
            logo: loggedUser ? loggedUser.userLogo : '',
            isMyTeam: loggedUser ? true : false
        },
        {
            title: "Transfers",
            path: "/transfers",
            isMyTeam: false
        },
        {
            title: "Cup",
            path: "/cup",
            isMyTeam: false
        },
        {
            title: "Player Stats",
            path: "/player-stats",
            isMyTeam: false
        },
        {
            title: "Rules & Prizes",
            path: "/rules-prizes",
            isMyTeam: false
        },
        {
            title: "Stats",
            path: "/stats",
            isMyTeam: false
        }
        ]
        commit('setMenuLinks', tmp)
    },
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
    setLoggedUser: (state, u) => {
        state.loggedUser = u
    },
    setMenuLinks: (state, m) => {
        state.menuLinks = m
    },
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