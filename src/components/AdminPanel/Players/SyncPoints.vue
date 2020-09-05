<template>
  <div class="sync-points-container" v-if="players && currentRound">
    <h1 class="section-header">Sync Player Points Section for round {{currentRound}}</h1>

    <vs-alert :active.sync="error" closable close-icon="close" color="danger">{{errorMsg}}</vs-alert>

    <h3 v-if="lastUpdate">Points last uploaded: {{lastUpdate}}</h3>
    <div class="sync-section">
      <img
        :src="require(`@/assets/images/adminpanel/${buttonEnablerFlags.upload ? 'check' : 'uncheck'}.png`)"
        alt="flag"
      />
      <form @submit.prevent="uploadDialog" class="download">
        <label>
          <span>League</span>
          <select name="league" v-model="form.league">
            <option value>All leagues</option>
            <option value="2">England-Premier-League</option>
            <option value="22">France-Ligue-1</option>
            <option value="3">Germany-Bundesliga</option>
            <option value="5">Italy-Serie-A</option>
            <option value="13">Netherlands-Eredivisie</option>
            <option value="21">Portugal-Liga-NOS</option>
            <option value="4">Spain-LaLiga</option>
            <option value="17">Turkey-Super-Lig</option>
          </select>
        </label>
        <label>
          <span>Date from:</span>
          <input name="from" type="date" v-model="form.from" required />
        </label>
        <label>
          <span>Date till:</span>
          <input name="till" type="date" v-model="form.to" required />
        </label>
        <label>
          <span>Format:</span>
          <select name="format" v-model="form.format">
            <option value="json">json</option>
            <option value="csv">csv</option>
          </select>
        </label>
        <label>
          <span>Target:</span>
          <input type="text" name="target" v-model="form.target" />
        </label>
        <vs-button color="#59A95D" button="submit" type="relief" size="normal">1. UPLOAD POINTS</vs-button>
      </form>
    </div>

    <div class="sync-section">
      <img
        :src="require(`@/assets/images/adminpanel/${buttonEnablerFlags.download ? 'check' : 'uncheck'}.png`)"
        alt="flag"
      />
      <vs-button
        color="#59A95D"
        type="relief"
        size="normal"
        @click="downloadDialog"
      >2. DOWNLOAD POINTS</vs-button>
    </div>

    <h3 v-if="lastSync">Points last synced: {{lastSync}}</h3>
    <div class="sync-section">
      <img
        :src="require(`@/assets/images/adminpanel/${buttonEnablerFlags.sync ? 'check' : 'uncheck'}.png`)"
        alt="flag"
      />
      <vs-button
        color="#59A95D"
        type="relief"
        size="normal"
        @click="syncDialog"
      >3. SYNC POINTS WITH PLAYERS</vs-button>
    </div>
  </div>
</template>

<script>
import { getPointsFromTool } from "../../../utils/getPointsFromTool";
import { getAllPlayersDataNormal } from "../../../utils/getAllPlayersData";
import syncPointsHelper from "../../../utils/syncPointsHelper";
import { getCurrentRound } from "../../../utils/getCurrentRound";
// import pointsCalculator from "../../../utils/pointsCalculator";
import { DATA_URL } from "../../../common";
// import { playersMapped } from "../../../common";

export default {
  name: "SyncPoints",
  components: {},
  data() {
    return {
      points: undefined,
      //   targetValue: "https://ffl-3-new.firebaseio.com/pointsSync/points.json",
      lastUpdate: "",
      lastSync: "",
      form: {
        league: "",
        from: "",
        to: "",
        format: "json",
        target: "https://ffl-3-new.firebaseio.com/pointsSync/points.json"
      },
      toolUrl: "https://whoscored.tailored.tools/results",
      proxyUrl: "https://cors-anywhere.herokuapp.com/",
      lastUpdateUrl: `${DATA_URL}pointsSync/lastUpdate.json`,
      lastSyncUrl: `${DATA_URL}pointsSync/lastSync.json`,
      isLeagueSelected: false,
      buttonEnablerFlags: {
        upload: false,
        download: false,
        sync: false
      },
      leaguesNames: {
        "2": "England-Premier-League",
        "22": "France-Ligue-1",
        "3": "Germany-Bundesliga",
        "5": "Italy-Serie-A",
        "13": "Netherlands-Eredivisie",
        "21": "Portugal-Liga-NOS",
        "4": "Spain-LaLiga",
        "17": "Turkey-Super-Lig"
      },
        currentRound: undefined,
      players: undefined,
      //   leagueSelected: "",
      //   teamSelected: "",
      //   playerSelected: "",
      //   roundSelected: "",
      //   showPopup: false,
      //   playerSelectedStats: {},
      //   success: false,
      error: false,
      errorMsg: ""
    };
  },
  methods: {
    uploadDialog() {
      const { league, from, to } = this.form;
      this.$vs.dialog({
        color: "success",
        title: "Upload points from tool!",
        text: `Are you sure you want to upload data for ${
          league ? this.leaguesNames[league] : "All leagues"
        } from ${from} to ${to}?`,
        accept: () => this.uploadHandler()
      });
    },
    downloadDialog() {
      if (this.buttonEnablerFlags.upload) {
        const { league, from, to } = this.form;
        this.$vs.dialog({
          color: "success",
          title: "Download data from Database!",
          text: `Are you sure you want to download data for ${
            league ? this.leaguesNames[league] : "All leagues"
          } from ${from} to ${to}?`,
          accept: () => this.downloadHandler()
        });
      } else {
        this.$vs.dialog({
          color: "warning",
          title: "Incorrect Download!",
          text: "Please upload data first!"
        });
      }
    },
    syncDialog() {
      if (this.buttonEnablerFlags.download) {
        const { league, from, to } = this.form;
        this.$vs.dialog({
          color: "success",
          title: `Sync points for ROUND ${this.currentRound}!`,
          text: `Are you sure you want to sync points for ${
            league ? this.leaguesNames[league] : "All leagues"
          } from ${from} to ${to}?`,
          accept: () => this.syncPointsHandler()
        });
      } else {
        this.$vs.dialog({
          color: "warning",
          title: "Incorrect Sync!",
          text: "Please upload data first and then download it!"
        });
      }
    },
    async uploadHandler() {
      this.$vs.loading();
      const { league, from, to, format, target } = this.form;
      const { proxyUrl, toolUrl } = this;
      await this.deletePreviousUpload();
      fetch(
        `${proxyUrl}${toolUrl}?league=${league}&from=${from}&till=${to}&format=${format}&target=${target}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        .then(res => res.json())
        .then(async () => {
          this.$vs.loading.close();
          this.lastUpdate = await this.uploadNewUpdateDate();
          this.isLeagueSelected = league ? true : false;
          this.buttonEnablerFlags.upload = true;
        })
        .catch(err => {
          console.log(err);
          this.error = true;
          this.errorMsg = err;
          this.$vs.loading.close();
        });
    },
    async deletePreviousUpload() {
      return await fetch(`${DATA_URL}pointsSync/points.json`, {
        method: "DELETE"
      });
    },
    async downloadHandler() {
      this.$vs.loading();
      try {
        this.points = await getPointsFromTool(this.isLeagueSelected);
        this.buttonEnablerFlags.download = true;
      } catch (err) {
        console.log(err);
        this.error = true;
        this.errorMsg = err;
      }
    },
    async syncPointsHandler() {
      this.$vs.loading();
      const payload = await syncPointsHelper(this.points, this.players);
      return fetch(`${DATA_URL}players.json`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(async () => {
          console.log("Success!");
          this.$vs.loading.close();
          this.lastSync = await this.uploadNewSyncDate();
          this.buttonEnablerFlags.sync = true;
        })
        .catch(err => {
          console.error("Error:", err);
          this.$vs.loading.close();
          this.error = true;
          this.errorMsg = err;
        });
    },
    async uploadNewUpdateDate() {
      const date = new Date();
      const response = await fetch(`${DATA_URL}pointsSync.json`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify({
          lastUpdate: date
        })
      });
      const result = await response.json();
      return result.lastUpdate;
    },
    async uploadNewSyncDate() {
      const date = new Date();
      const response = await fetch(`${DATA_URL}pointsSync.json`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify({
          lastSync: date
        })
      });
      const result = await response.json();
      return result.lastSync;
    },
    async getLastUpdate() {
      const response = await fetch(this.lastUpdateUrl);
      return await response.json();
    },
    async getLastSync() {
      const response = await fetch(this.lastSyncUrl);
      return await response.json();
    }
    // makeLeagueToImg(v) {
    //   return v
    //     .toLowerCase()
    //     .split(" ")
    //     .join("_");
    // },
    // selectLeagueHandler(l) {
    //   this.teamSelected = "";
    //   return (this.leagueSelected = l);
    // },
    // selectTeamHandler(t) {
    //   this.playerSelected = "";
    //   return (this.teamSelected = t);
    // },
    // mergeStats(_new, _old) {
    //   let result = {};
    //   Object.keys(_old).forEach(stat => {
    //     if (_new[stat]) {
    //       result[stat] = _new[stat];
    //     } else {
    //       result[stat] = _old[stat];
    //     }
    //   });
    //   return result;
    // },
    // selectPlayerRoundHandler(p, rnd, rndCount) {
    //   this.playerSelected = p;
    //   this.roundSelected = {
    //     round: rndCount,
    //     roundData: rnd
    //   };
    //   return (this.showPopup = true);
    // },
    // submitPlayerRoundStatsHandler() {
    //   const merged = this.mergeStats(
    //     this.playerSelectedStats,
    //     this.roundSelected.roundData.roundStats
    //   );
    //   const payload = {
    //     roundPts: this.selectedPlayerPts,
    //     roundStats: merged
    //   };
    //   return fetch(
    //     `${DATA_URL}players/${this.playerSelected.id}/points/r${this.roundSelected.round}.json`,
    //     {
    //       method: "PATCH",
    //       mode: "cors",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(payload)
    //     }
    //   )
    //     .then(response => response.json())
    //     .then(() => {
    //       // console.log("Success:", data);
    //       this.success = true;
    //     })
    //     .catch(error => {
    //       console.error("Error:", error);
    //       this.error = true;
    //       this.errorMsg = error;
    //     });
    // }
  },
  computed: {
    // selectedPlayerPts() {
    //   if (this.playerSelected && this.roundSelected) {
    //     const merged = this.mergeStats(
    //       this.playerSelectedStats,
    //       this.roundSelected.roundData.roundStats
    //     );
    //     const arr = Object.values(merged);
    //     return pointsCalculator(this.playerSelected.position, ...arr);
    //   } else {
    //     return "";
    //   }
    // }
  },
  watch: {
    points(nv) {
      if (nv) {
        this.$vs.loading.close();
      }
    },
    players(nv) {
      if (nv) {
        this.$vs.loading.close();
      }
    }
    // currentRound(nv) {
    //   if (nv && this.players) {
    //     this.$vs.loading.close();
    //   }
    // },
    // showPopup(nv) {
    //   if (!nv) {
    //     this.playerSelected = "";
    //     this.roundSelected = "";
    //     this.playerSelectedStats = {};
    //   }
    // },
    // success(nv) {
    //   if (nv === true) {
    //     setTimeout(() => {
    //       this.success = false;
    //     }, 2000);
    //   }
    // }
  },
  async created() {
    this.$vs.loading();
    this.players = await getAllPlayersDataNormal();
    const uploadDate = await this.getLastUpdate();
    this.lastUpdate = uploadDate ? uploadDate : "No Upload Date!";

    const syncDate = await this.getLastSync();
    this.lastSync = syncDate ? syncDate : "No Sync Date!";

    this.currentRound = await getCurrentRound();
  }
};
</script>

<style lang="scss">
.sync-points-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  con-vs-alert-danger {
    background-color: #e5000059;
    color: white;
    font-weight: bold;
    padding: 5px;
    width: 98%;
    margin: 10px 0 0 0;
  }

  h3 {
    width: 100%;
    font-size: 1.2rem;
    text-align: center;
    margin: 30px 0 0 0;
  }

  .sync-section {
    width: 97%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    margin: 20px 0 0 0;
    background-color: #afafaf;
    border-radius: 10px;
    padding: 10px;

    .download {
      //   padding: 32px;
      width: 50%;

      input[name="target"] {
        width: 100%;
      }

      label {
        display: flex;
        margin: 16px 0;
        justify-content: flex-start;
        align-items: center;

        span {
          flex: 0 0 100px;
        }

        select,
        input {
          border-radius: 4px;
          border: 1px solid #dcdcdc;
          padding: 0.3em;
          background: white;
          font-family: "PT Sans", sans-serif;
          font-size: large;
        }
      }
    }

    img {
      margin: 0 40px 0 25%;
      width: 50px;
    }
  }

  @media (max-width: 800px) {
    .download {
      padding: 16px;
    }
  }
}
</style>