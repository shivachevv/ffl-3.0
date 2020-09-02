<template>
  <div>
    <div v-html="payload" v-if="!ready"></div>
    <div v-if="ready">
      <a href @click.prevent="getPlayers">GET PLAYERS</a>
      <a href @click.prevent="uploadPlayers">UPLOAD READY DATA</a>
      <table>
        <tbody>
          <tr v-for="(player,i) in result" :key="i">
            <td>{{player.team}}</td>
            <td>{{player.name}}</td>
            <td>{{player.pos}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import allPlayersHelper from "../utils/allPlayersHelper";

// 1ST: LOAD THE PAGE AND WAIT FOR ALL THE TEAMS TO BE LOADED AND CONTENT FROM THEM TAKEN
// 2ND COPY AND PASTE THE TABLE IN GOOGLE SHEETS
// 3RD FORMAT THE GOOGLE SHEET TO BE READY FOR SYNC
// 4TH CLICK THE "GET PLAYERS" BTN TO GET THE SYNCRONIZED PLAYER FROM FIREBASE
// 5TH CLICK THE UPLOAD READY DATA TO UPLOAD THE NEWLY UPDATED DATA TO FIREBASE

export default {
  name: "GetAllPlayers",
  data() {
    return {
      ready: false,
      payload: "",
      URL_UPLOAD: "https://ffl-3-92418.firebaseio.com/allPlayersReady.json",
      URL_ALL_PLAYERS: "https://ffl-3-92418.firebaseio.com/AllPlayerData.json",
      italy: [
        "https://www.transfermarkt.com/juventus-turin/startseite/verein/506/saison_id/2020",
        "https://www.transfermarkt.com/inter-mailand/startseite/verein/46/saison_id/2020",
        "https://www.transfermarkt.com/ssc-neapel/startseite/verein/6195/saison_id/2020",
        "https://www.transfermarkt.com/as-rom/startseite/verein/12/saison_id/2020",
        "https://www.transfermarkt.com/ac-mailand/startseite/verein/5/saison_id/2020",
        "https://www.transfermarkt.com/lazio-rom/startseite/verein/398/saison_id/2020",
        "https://www.transfermarkt.com/atalanta-bergamo/startseite/verein/800/saison_id/2020",
        "https://www.transfermarkt.com/ac-florenz/startseite/verein/430/saison_id/2020",
        "https://www.transfermarkt.com/fc-turin/startseite/verein/416/saison_id/2020",
        "https://www.transfermarkt.com/us-sassuolo/startseite/verein/6574/saison_id/2020",
        "https://www.transfermarkt.com/cagliari-calcio/startseite/verein/1390/saison_id/2020",
        "https://www.transfermarkt.com/fc-bologna/startseite/verein/1025/saison_id/2020",
        "https://www.transfermarkt.com/fc-parma/startseite/verein/130/saison_id/2020",
        "https://www.transfermarkt.com/uc-sampdoria/startseite/verein/1038/saison_id/2020",
        "https://www.transfermarkt.com/hellas-verona/startseite/verein/276/saison_id/2020",
        "https://www.transfermarkt.com/fc-genua-1893/startseite/verein/252/saison_id/2020",
        "https://www.transfermarkt.com/udinese-calcio/startseite/verein/410/saison_id/2020",
        "https://www.transfermarkt.com/benevento-calcio/startseite/verein/4171/saison_id/2020",
        "https://www.transfermarkt.com/fc-crotone/startseite/verein/4083?saison_id=2020",
        "https://www.transfermarkt.com/spezia-calcio/startseite/verein/3522/saison_id/2020"
      ],
      england: [
        "https://www.transfermarkt.com/manchester-city/startseite/verein/281/saison_id/2020",
        "https://www.transfermarkt.com/fc-liverpool/startseite/verein/31/saison_id/2020",
        "https://www.transfermarkt.com/fc-chelsea/startseite/verein/631/saison_id/2020",
        "https://www.transfermarkt.com/tottenham-hotspur/startseite/verein/148/saison_id/2020",
        "https://www.transfermarkt.com/manchester-united/startseite/verein/985/saison_id/2020",
        "https://www.transfermarkt.com/fc-arsenal/startseite/verein/11/saison_id/2020",
        "https://www.transfermarkt.com/leicester-city/startseite/verein/1003/saison_id/2020",
        "https://www.transfermarkt.com/fc-everton/startseite/verein/29/saison_id/2020",
        "https://www.transfermarkt.com/wolverhampton-wanderers/startseite/verein/543/saison_id/2020",
        "https://www.transfermarkt.com/west-ham-united/startseite/verein/379/saison_id/2020",
        "https://www.transfermarkt.com/fc-fulham/startseite/verein/931/saison_id/2020",
        "https://www.transfermarkt.com/newcastle-united/startseite/verein/762/saison_id/2020",
        "https://www.transfermarkt.com/aston-villa/startseite/verein/405/saison_id/2020",
        "https://www.transfermarkt.com/brighton-amp-hove-albion/startseite/verein/1237/saison_id/2020",
        "https://www.transfermarkt.com/leeds-united/startseite/verein/399/saison_id/2020",
        "https://www.transfermarkt.com/fc-southampton/startseite/verein/180/saison_id/2020",
        "https://www.transfermarkt.com/crystal-palace/startseite/verein/873/saison_id/2020",
        "https://www.transfermarkt.com/fc-burnley/startseite/verein/1132/saison_id/2020",
        "https://www.transfermarkt.com/west-bromwich-albion/startseite/verein/984/saison_id/2020",
        "https://www.transfermarkt.com/sheffield-united/startseite/verein/350/saison_id/2020"
      ],
      germany: [
        "https://www.transfermarkt.com/fc-bayern-munchen/startseite/verein/27/saison_id/2020",
        "https://www.transfermarkt.com/borussia-dortmund/startseite/verein/16/saison_id/2020",
        "https://www.transfermarkt.com/rasenballsport-leipzig/startseite/verein/23826/saison_id/2020",
        "https://www.transfermarkt.com/bayer-04-leverkusen/startseite/verein/15/saison_id/2020",
        "https://www.transfermarkt.com/borussia-monchengladbach/startseite/verein/18/saison_id/2020",
        "https://www.transfermarkt.com/tsg-1899-hoffenheim/startseite/verein/533/saison_id/2020",
        "https://www.transfermarkt.com/vfl-wolfsburg/startseite/verein/82/saison_id/2020",
        "https://www.transfermarkt.com/eintracht-frankfurt/startseite/verein/24/saison_id/2020",
        "https://www.transfermarkt.com/hertha-bsc/startseite/verein/44/saison_id/2020",
        "https://www.transfermarkt.com/fc-schalke-04/startseite/verein/33/saison_id/2020",
        "https://www.transfermarkt.com/sc-freiburg/startseite/verein/60/saison_id/2020",
        "https://www.transfermarkt.com/fc-augsburg/startseite/verein/167/saison_id/2020",
        "https://www.transfermarkt.com/1-fsv-mainz-05/startseite/verein/39/saison_id/2020",
        "https://www.transfermarkt.com/sv-werder-bremen/startseite/verein/86/saison_id/2020",
        "https://www.transfermarkt.com/1-fc-koln/startseite/verein/3/saison_id/2020",
        "https://www.transfermarkt.com/vfb-stuttgart/startseite/verein/79/saison_id/2020",
        "https://www.transfermarkt.com/1-fc-union-berlin/startseite/verein/89/saison_id/2020",
        "https://www.transfermarkt.com/arminia-bielefeld/startseite/verein/10/saison_id/2020"
      ],
      france: [
        "https://www.transfermarkt.com/fc-paris-saint-germain/startseite/verein/583/saison_id/2020",
        "https://www.transfermarkt.com/olympique-lyon/startseite/verein/1041/saison_id/2020",
        "https://www.transfermarkt.com/as-monaco/startseite/verein/162/saison_id/2020",
        "https://www.transfermarkt.com/osc-lille/startseite/verein/1082/saison_id/2020",
        "https://www.transfermarkt.com/olympique-marseille/startseite/verein/244/saison_id/2020",
        "https://www.transfermarkt.com/fc-stade-rennes/startseite/verein/273/saison_id/2020",
        "https://www.transfermarkt.com/ogc-nizza/startseite/verein/417/saison_id/2020",
        "https://www.transfermarkt.com/fc-girondins-bordeaux/startseite/verein/40/saison_id/2020",
        "https://www.transfermarkt.com/fc-nantes/startseite/verein/995/saison_id/2020",
        "https://www.transfermarkt.com/racing-strassburg/startseite/verein/667/saison_id/2020",
        "https://www.transfermarkt.com/as-saint-etienne/startseite/verein/618/saison_id/2020",
        "https://www.transfermarkt.com/hsc-montpellier/startseite/verein/969/saison_id/2020",
        "https://www.transfermarkt.com/sco-angers/startseite/verein/1420/saison_id/2020",
        "https://www.transfermarkt.com/stade-reims/startseite/verein/1421/saison_id/2020",
        "https://www.transfermarkt.com/rc-lens/startseite/verein/826/saison_id/2020",
        "https://www.transfermarkt.com/fc-metz/startseite/verein/347/saison_id/2020",
        "https://www.transfermarkt.com/fc-lorient/startseite/verein/1158/saison_id/2020",
        "https://www.transfermarkt.com/olympique-nimes/startseite/verein/1160/saison_id/2020",
        "https://www.transfermarkt.com/fco-dijon/startseite/verein/2969/saison_id/2020",
        "https://www.transfermarkt.com/stade-brest-29/startseite/verein/3911/saison_id/2020"
      ],
      netherlands: [
        "https://www.transfermarkt.com/ajax-amsterdam/startseite/verein/610/saison_id/2020",
        "https://www.transfermarkt.com/psv-eindhoven/startseite/verein/383/saison_id/2020",
        "https://www.transfermarkt.com/az-alkmaar/startseite/verein/1090/saison_id/2020",
        "https://www.transfermarkt.com/feyenoord-rotterdam/startseite/verein/234/saison_id/2020",
        "https://www.transfermarkt.com/fc-utrecht/startseite/verein/200/saison_id/2020",
        "https://www.transfermarkt.com/willem-ii-tilburg/startseite/verein/403/saison_id/2020",
        "https://www.transfermarkt.com/sc-heerenveen/startseite/verein/306/saison_id/2020",
        "https://www.transfermarkt.com/fc-groningen/startseite/verein/202/saison_id/2020",
        "https://www.transfermarkt.com/pec-zwolle/startseite/verein/1269/saison_id/2020",
        "https://www.transfermarkt.com/vitesse-arnheim/startseite/verein/499/saison_id/2020",
        "https://www.transfermarkt.com/heracles-almelo/startseite/verein/1304/saison_id/2020",
        "https://www.transfermarkt.com/sparta-rotterdam/startseite/verein/468/saison_id/2020",
        "https://www.transfermarkt.com/fortuna-sittard/startseite/verein/385/saison_id/2020",
        "https://www.transfermarkt.com/fc-emmen/startseite/verein/1283/saison_id/2020",
        "https://www.transfermarkt.com/ado-den-haag/startseite/verein/1268/saison_id/2020",
        "https://www.transfermarkt.com/vvv-venlo/startseite/verein/1426/saison_id/2020",
        "https://www.transfermarkt.com/fc-twente-enschede/startseite/verein/317/saison_id/2020",
        "https://www.transfermarkt.com/rkc-waalwijk/startseite/verein/235/saison_id/2020"
      ],
      spain: [
        "https://www.transfermarkt.com/real-madrid/startseite/verein/418/saison_id/2020",
        "https://www.transfermarkt.com/fc-barcelona/startseite/verein/131/saison_id/2020",
        "https://www.transfermarkt.com/atletico-madrid/startseite/verein/13/saison_id/2020",
        "https://www.transfermarkt.com/fc-valencia/startseite/verein/1049/saison_id/2020",
        "https://www.transfermarkt.com/real-sociedad-san-sebastian/startseite/verein/681/saison_id/2020",
        "https://www.transfermarkt.com/fc-sevilla/startseite/verein/368/saison_id/2020",
        "https://www.transfermarkt.com/real-betis-sevilla/startseite/verein/150/saison_id/2020",
        "https://www.transfermarkt.com/athletic-bilbao/startseite/verein/621/saison_id/2020",
        "https://www.transfermarkt.com/fc-villarreal/startseite/verein/1050/saison_id/2020",
        "https://www.transfermarkt.com/celta-vigo/startseite/verein/940/saison_id/2020",
        "https://www.transfermarkt.com/fc-getafe/startseite/verein/3709/saison_id/2020",
        "https://www.transfermarkt.com/cadiz-cf/startseite/verein/2687/saison_id/2020",
        "https://www.transfermarkt.com/deportivo-alaves/startseite/verein/1108/saison_id/2020",
        "https://www.transfermarkt.com/ud-levante/startseite/verein/3368/saison_id/2020",
        "https://www.transfermarkt.com/sd-huesca/startseite/verein/5358/saison_id/2020",
        "https://www.transfermarkt.com/real-valladolid/startseite/verein/366/saison_id/2020",
        "https://www.transfermarkt.com/ca-osasuna/startseite/verein/331/saison_id/2020",
        "https://www.transfermarkt.com/fc-granada/startseite/verein/16795/saison_id/2020",
        "https://www.transfermarkt.com/sd-eibar/startseite/verein/1533/saison_id/2020",
        "https://www.transfermarkt.com/fc-elche/startseite/verein/1531/saison_id/2020"
      ],
      portugal: [
        "https://www.transfermarkt.com/benfica-lissabon/startseite/verein/294/saison_id/2020",
        "https://www.transfermarkt.com/fc-porto/startseite/verein/720/saison_id/2020",
        "https://www.transfermarkt.com/sporting-lissabon/startseite/verein/336/saison_id/2020",
        "https://www.transfermarkt.com/sc-braga/startseite/verein/1075/saison_id/2020",
        "https://www.transfermarkt.com/vitoria-guimaraes-sc/startseite/verein/2420/saison_id/2020",
        "https://www.transfermarkt.com/fc-famalicao/startseite/verein/3329/saison_id/2020",
        "https://www.transfermarkt.com/rio-ave-fc/startseite/verein/2425/saison_id/2020",
        "https://www.transfermarkt.com/cd-nacional/startseite/verein/982/saison_id/2020",
        "https://www.transfermarkt.com/cs-maritimo/startseite/verein/1301/saison_id/2020",
        "https://www.transfermarkt.com/moreirense-fc/startseite/verein/979/saison_id/2020",
        "https://www.transfermarkt.com/cd-santa-clara/startseite/verein/2423/saison_id/2020",
        "https://www.transfermarkt.com/cf-belenenses-lissabon/startseite/verein/2457/saison_id/2020",
        "https://www.transfermarkt.com/cd-tondela/startseite/verein/7179/saison_id/2020",
        "https://www.transfermarkt.com/portimonense-sc/startseite/verein/7378/saison_id/2020",
        "https://www.transfermarkt.com/fc-pacos-de-ferreira/startseite/verein/2995/saison_id/2020",
        "https://www.transfermarkt.com/gil-vicente-fc/startseite/verein/2424/saison_id/2020",
        "https://www.transfermarkt.com/sc-farense/startseite/verein/4294/saison_id/2020",
        "https://www.transfermarkt.com/boavista-porto-fc/startseite/verein/2503/saison_id/2020"
      ],
      turkey: [
        "https://www.transfermarkt.com/trabzonspor/startseite/verein/449/saison_id/2020",
        "https://www.transfermarkt.com/fenerbahce-istanbul/startseite/verein/36/saison_id/2020",
        "https://www.transfermarkt.com/galatasaray-istanbul/startseite/verein/141/saison_id/2020",
        "https://www.transfermarkt.com/istanbul-buyuksehir-belediyespor/startseite/verein/6890/saison_id/2020",
        "https://www.transfermarkt.com/besiktas-istanbul/startseite/verein/114/saison_id/2020",
        "https://www.transfermarkt.com/sivasspor/startseite/verein/2381/saison_id/2020",
        "https://www.transfermarkt.com/alanyaspor/startseite/verein/11282/saison_id/2020",
        "https://www.transfermarkt.com/torku-konyaspor/startseite/verein/2293/saison_id/2020",
        "https://www.transfermarkt.com/gaziantep-buyuksehir-belediyespor/startseite/verein/2832/saison_id/2020",
        "https://www.transfermarkt.com/caykur-rizespor/startseite/verein/126/saison_id/2020",
        "https://www.transfermarkt.com/yeni-malatyaspor/startseite/verein/19789/saison_id/2020",
        "https://www.transfermarkt.com/medical-park-antalyaspor/startseite/verein/589/saison_id/2020",
        "https://www.transfermarkt.com/kasimpasa/startseite/verein/10484/saison_id/2020",
        "https://www.transfermarkt.com/genclerbirligi-ankara/startseite/verein/820/saison_id/2020",
        "https://www.transfermarkt.com/goztepe-izmir/startseite/verein/1467/saison_id/2020",
        "https://www.transfermarkt.com/hatayspor/startseite/verein/7775/saison_id/2020",
        "https://www.transfermarkt.com/tekden-denizlispor/startseite/verein/833/saison_id/2020",
        "https://www.transfermarkt.com/kayserispor/startseite/verein/3205/saison_id/2020",
        "https://www.transfermarkt.com/erzurum-buyuksehir-belediyespor/startseite/verein/39722/saison_id/2020",
        "https://www.transfermarkt.com/mke-ankaragucu/startseite/verein/868/saison_id/2020",
        "https://www.transfermarkt.com/localtime-fatih-karagumruk/startseite/verein/6646/saison_id/2020",
        "https://www.transfermarkt.com/localtime-fatih-karagumruk/startseite/verein/6646/saison_id/2020"
      ],
      result: []
    };
  },
  methods: {
    async getPlayers() {
      this.payload = await fetch(this.URL_ALL_PLAYERS)
        .then(x => x.json())
        .then(x => allPlayersHelper(x));
      console.log("READY");
      return;
    },
    uploadPlayers() {
     
      fetch(this.URL_UPLOAD, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        },
        body: JSON.stringify(this.payload)
      })
        .then(x => x.json())
        .then(() => {
          return console.log("UPLOAD IS READY");
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  updated() {
    const positions = Array.from(
      document.querySelectorAll(
        ".posrela .inline-table tbody tr:nth-child(2) td"
      )
    ).map(x => x.innerText);

    const players = Array.from(
      document.querySelectorAll(".posrela .spielprofil_tooltip")
    )
      .filter((x, i) => {
        return i % 2 === 1;
      })
      .map(x => x.innerText);
    const team = document
      .querySelector("#verein_head h1[itemprop=name]")
      .textContent.trim();

    let result = [];
    players.forEach((x, i) => {
      result[i] = {
        team,
        name: x,
        pos: positions[i]
      };
    });
    this.result.push(...result);
  },
  async created() {
    for (const link of this.england) {
      this.payload = await fetch(link).then(x => x.text());
    }
    for (const link of this.italy) {
      this.payload = await fetch(link).then(x => x.text());
    }
    for (const link of this.germany) {
      this.payload = await fetch(link).then(x => x.text());
    }
    for (const link of this.france) {
      this.payload = await fetch(link).then(x => x.text());
    }
    for (const link of this.netherlands) {
      this.payload = await fetch(link).then(x => x.text());
    }
    for (const link of this.spain) {
      this.payload = await fetch(link).then(x => x.text());
    }
    for (const link of this.portugal) {
      this.payload = await fetch(link).then(x => x.text());
    }
    for (const link of this.turkey) {
      this.payload = await fetch(link).then(x => x.text());
    }
    this.ready = true;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  display: inline-block;
  padding: 10px;
  font-weight: bold;
  background-color: darkcyan;
  color: white;
  margin: 10px;

  &:hover {
      background-color: darken($color: darkcyan, $amount: 5);
  }
}
</style>
