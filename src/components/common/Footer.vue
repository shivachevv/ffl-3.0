<template>
  <footer v-if="leagues && menuLinks && users">
    <div class="footer-logo">
      <img src="@/assets/images/footer/footer-logo.png" alt />
      <router-link class="up" to="/" target="blank">fantasy legends</router-link>
    </div>

    <div v-for="league in leagues" :key="league.id" :class="`footer-${league.name.toLowerCase()}`">
      <h2 class="up">{{league.name}} league</h2>
      <router-link
        v-for="team in league.teams"
        :key="team"
        :to="`/team-details/${users[team].userLogo}`"
      >{{users[team].userTeam}}</router-link>
    </div>

    <div class="footer-cat">
      <h2 class="up">Categories</h2>
      <router-link v-for="link in menuLinks" :key="link.title" :to="link.path">{{link.title}}</router-link>
    </div>

    <div class="footer-fb">
      <a
        class="up"
        href="https://www.facebook.com/groups/292412975320252"
        target="blank"
      >Follow the legends</a>
      <a href="https://www.facebook.com/groups/292412975320252" target="blank">
        <img src="@/assets/images/footer/fb.png" alt />
      </a>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Footer",
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["leagues", "menuLinks", "users"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/***************** FOOTER *******************/

footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #4e585e;
  margin: 20px 0 0 0;
  font-size: 0.75rem;
}

.footer-logo,
.footer-fb {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 50px 0 0;
}

.footer-logo a,
.footer-fb a {
  color: #ffffff;
  text-decoration: none;
  transition: all 0.2s;
  margin: 0 0 0 10px;
}

.footer-logo a:hover,
.footer-fb a:hover {
  text-decoration: underline;
}

.footer-logo img,
.footer-fb img {
  width: 44px;
}

.footer-pele,
.footer-maradona,
.footer-cat {
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-left: 1px solid #60666a;
  margin: 10px 0;
  padding: 10px 50px;
}

.footer-maradona,
.footer-cat {
  border-right: 1px solid #60666a;
}

.footer-pele h2,
.footer-maradona h2,
.footer-cat h2 {
  color: #ffffff;
  margin: 0 0 10px;
}

.footer-pele a,
.footer-maradona a,
.footer-cat a {
  color: #ffffff;
  text-decoration: none;
  margin: 5px 0;
  text-align: left;
  width: 100%;
}

.footer-pele a:hover,
.footer-maradona a:hover,
.footer-cat a:hover {
  text-decoration: underline;
}
</style>
