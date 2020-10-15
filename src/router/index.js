import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home/Home.vue";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import UserPage from "../components/UserPage/UserPage";
import Cup from "../components/Cup/Cup";
import GetAllPlayers from "../components/GetAllPlayers";

import AdminPanel from "../components/AdminPanel/AdminPanel";

import NotFound from "../components/common/NotFound";
import * as firebase from "firebase/app";
import "firebase/auth";

import getAllUsers from '../utils/getAllUsers'

Vue.use(VueRouter);

const routes = [{
  path: "/",
  name: "Home",
  component: Home
},
{
  path: '/login',
  name: 'login',
  component: Login,
  props: true,
  beforeEnter(to, from, next) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next('/')
      } else {
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
  beforeEnter(to, from, next) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next('/')
      } else {
        next()
      }
    });
  }
},
{
  path: '/team-details/:id',
  component: UserPage,
  props: true,
  name: "UserPage"
},
{
  path: '/transfers/:id',
  component: () =>
    import(/* webpackChunkName: "user-transfers" */ "../components/UserPage/UserTransfers/UserTransfers"),
  name: 'mytransfers',
  props: true,
  beforeEnter(to, from, next) {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const teamName = to.params.id
        const users = await getAllUsers()
        const teamId = Object.values(users).filter(u => {
          return u.userTeam === teamName
        })[0].uid
        if (teamId === user.uid) {
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
  path: '/admin',
  name: 'admin',
  component: AdminPanel,
},
{
  path: '/cup',
  name: 'cup',
  props: true,
  component: Cup,
  meta: { title: 'FFL CUP' },
  beforeEnter(to, from, next){
    document.title = to.meta.title
    next()
  }
},
{
  path: '*',
  name: 'not-found',
  component: NotFound
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