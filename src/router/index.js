import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home/Home.vue";


const Login = () => import("../components/Login/Login");
const Register = () => import("../components/Register/Register");
const UserPage = () => import("../components/UserPage/UserPage");
const Cup = () => import("../components/Cup/Cup");
const H2H = () => import("../components/H2H/H2H");
const Transfers = () => import("../components/Transfers/Transfers");
const RulesAndPrizes = () => import("../components/Rules/Rules");
const GetAllPlayers = () => import("../components/GetAllPlayers");
const tactics = () => import("../components/tactics");
const AllPlayersTable = () => import("../components/AllPlayersTable");
const AdminPanel = () => import("../components/AdminPanel/AdminPanel");
const Stats = () => import("../components/Stats/Stats");
const NotFound = () => import("../components/common/NotFound");
// import Login from "../components/Login/Login";
// import Register from "../components/Register/Register";
// import UserPage from "../components/UserPage/UserPage";
// import Cup from "../components/Cup/Cup";
// import H2H from "../components/H2H/H2H";
// import Transfers from "../components/Transfers/Transfers";
// import RulesAndPrizes from "../components/Rules/Rules";
// import GetAllPlayers from "../components/GetAllPlayers";
// import AdminPanel from "../components/AdminPanel/AdminPanel";
// import NotFound from "../components/common/NotFound";


import * as firebase from "firebase/app";
import "firebase/auth";

import getAllUsers from '../utils/getAllUsers'

Vue.use(VueRouter);

const routes = [{
  path: "/",
  name: "Home",
  component: Home,
  meta: { title: 'FFL: Home' },
  beforeEnter(to, from, next) {
    document.title = to.meta.title
    next()
  }
},
{
  path: '/login',
  name: 'login',
  component: Login,
  props: true,
  meta: { title: 'FFL: Login' },
  beforeEnter(to, from, next) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next('/')
      } else {
        document.title = to.meta.title
        next()
      }
    });
  }
},
{
  path: '/register',
  name: 'register',
  component: Register,
  props: true,
  meta: { title: 'FFL: Register' },
  beforeEnter(to, from, next) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next('/')
      } else {
        document.title = to.meta.title
        next()
      }
    });
  }
},
{
  path: '/team-details/:id',
  component: UserPage,
  props: true,
  name: "UserPage",
  beforeEnter(to, from, next) {
    document.title = 'My Team'
    next()
  }
},
{
  path: '/transfers/:id',
  component: () =>
    import(/* webpackChunkName: "user-transfers" */ "../components/UserPage/UserTransfers/UserTransfers"),
  name: 'mytransfers',
  props: true,
  meta: { title: 'FFL: Transfers Center ' },
  beforeEnter(to, from, next) {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const teamName = to.params.id
        const users = await getAllUsers()
        const teamId = Object.values(users).filter(u => {
          return u.userLogo === teamName
        })[0].uid
        if (teamId === user.uid) {
          document.title = to.meta.title + users[teamId].userTeam
          next()
        } else {
          next('/')
        }
      } else {
        next('/')
      }
    });
  }
},
{
  path: '/getallplayers',
  name: 'getallplayers',
  component: GetAllPlayers
},
{
  path: '/tactics',
  name: 'tactics',
  component: tactics
},
{
  path: '/allplayers',
  name: 'allplayers',
  component: AllPlayersTable
},
{
  path: '/admin',
  name: 'admin',
  meta: { title: 'FFL: Admin Panel' },
  component: AdminPanel,
  beforeEnter(to, from, next) {
    document.title = to.meta.title
    next()
  }
},
{
  path: '/cup',
  name: 'cup',
  props: true,
  component: Cup,
  meta: { title: 'FFL: Cup' },
  beforeEnter(to, from, next) {
    document.title = to.meta.title
    next()
  }
},
{
  path: '/h2h',
  name: 'h2h',
  props: true,
  component: H2H,
  meta: { title: 'FFL: H2H League' },
  beforeEnter(to, from, next) {
    document.title = to.meta.title
    next()
  }
},
{
  path: '/transfers',
  name: 'transfers',
  props: true,
  component: Transfers,
  meta: { title: 'FFL: Transfers' },
  beforeEnter(to, from, next) {
    document.title = to.meta.title
    next()
  }
},
{
  path: '/rules-prizes',
  name: 'rules-prizes',
  props: true,
  component: RulesAndPrizes,
  meta: { title: 'FFL: Rules and prizes' },
  beforeEnter(to, from, next) {
    document.title = to.meta.title
    next()
  }
},
{
  path: '/stats',
  name: 'stats',
  props: true,
  component: Stats,
  meta: { title: 'FFL: Stats' },
  beforeEnter(to, from, next) {
    document.title = to.meta.title
    next()
  }
},
{
  path: '*',
  name: 'not-found',
  meta: { title: 'FFL: Page not found' },
  component: NotFound,
  beforeEnter(to, from, next) {
    document.title = to.meta.title
    next()
  }
}
  // ,
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;