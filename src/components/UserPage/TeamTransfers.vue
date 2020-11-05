<template>
  <div class="sha transfers-left-cont">
    <h1 class="up">Team Transfers</h1>
    <div class="sub-cont">
      <div class="labels-cont">
        <div class="label">
          <span :class="{ smallerspan: transfersAvail === 2 }">{{
            transfersAvail
          }}</span>
          <h3 class="up">Transfers Left</h3>
        </div>
        <div class="label">
          <svg
            v-if="!isWCActive"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 3312 3312"
            shape-rendering="geometricPrecision"
            text-rendering="geometricPrecision"
            image-rendering="optimizeQuality"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path
              v-if="hasWildcard"
              class="check"
              d="M1656 0c457 0 871 185 1171 485s485 714 485 1171-185 871-485 1171-714 485-1171 485-871-185-1171-485S0 2113 0 1656 185 785 485 485 1199 0 1656 0zM931 1811c-35-32-38-87-6-122s87-38 122-6l362 328 850-890c33-35 88-36 122-3 35 33 36 88 3 122l-908 951c-32 34-86 36-121 5l-425-385zM2704 608c-268-268-639-434-1048-434S876 340 608 608s-434 639-434 1048 166 780 434 1048 639 434 1048 434 780-166 1048-434 434-639 434-1048-166-780-434-1048z"
              fill-rule="nonzero"
              stroke="black"
              stroke-width="20"
            />
            <path
              v-if="!hasWildcard && !isWCActive"
              class="uncheck"
              xmlns="http://www.w3.org/2000/svg"
              d="M1664 0c460 0 876 186 1177 487s487 717 487 1177-186 876-487 1177-717 487-1177 487-876-186-1177-487S0 2124 0 1664 186 788 487 487 1204 0 1664 0zm507 1012c35-35 92-35 128 0 35 35 35 92 0 128l-524 524 524 524c35 35 35 92 0 128-35 35-92 35-128 0l-524-524-524 524c-35 35-92 35-128 0-35-35-35-92 0-128l524-524-524-524c-35-35-35-92 0-128 35-35 92-35 128 0l524 524 524-524zm542-397c-268-268-639-435-1049-435S883 346 615 615c-268 268-435 639-435 1049s166 781 435 1049c268 268 639 435 1049 435s781-166 1049-435c268-268 435-639 435-1049s-166-781-435-1049z"
              fill-rule="nonzero"
            />
          </svg>
          <svg
            v-if="isWCActive"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 191.812 191.812"
            style="enable-background:new 0 0 191.812 191.812;"
            xml:space="preserve"
          >
            <g>
              <path
                style="fill:#FF6600;"
                d="M95.906,121.003c6.903,0,12.5-5.597,12.5-12.5V51.511c0-6.904-5.597-12.5-12.5-12.5
		s-12.5,5.596-12.5,12.5v56.993C83.406,115.407,89.003,121.003,95.906,121.003z"
              />
              <path
                style="fill:#FF6600;"
                d="M95.909,127.807c-3.29,0-6.521,1.33-8.841,3.66c-2.329,2.32-3.659,5.54-3.659,8.83
		s1.33,6.52,3.659,8.84c2.32,2.33,5.551,3.66,8.841,3.66s6.51-1.33,8.84-3.66c2.319-2.32,3.66-5.55,3.66-8.84s-1.341-6.51-3.66-8.83
		C102.419,129.137,99.199,127.807,95.909,127.807z"
              />
              <path
                style="fill:#FF6600;"
                d="M95.906,0C43.024,0,0,43.023,0,95.906s43.023,95.906,95.906,95.906s95.905-43.023,95.905-95.906
		S148.789,0,95.906,0z M95.906,176.812C51.294,176.812,15,140.518,15,95.906S51.294,15,95.906,15
		c44.611,0,80.905,36.294,80.905,80.906S140.518,176.812,95.906,176.812z"
              />
            </g>
          </svg>

          <h3 v-if="hasWildcard" class="up">Wildcard Available</h3>
          <h3 v-if="!hasWildcard && !isWCActive" class="up">
            Wildcard Not Available
          </h3>
          <h3 v-if="isWCActive" class="up">Wildcard Activated<br/>for this round</h3>
        </div>
      </div>
      <router-link :to="`/transfers/${user.userLogo}`">
        <vs-button color="#59A95D" type="relief" size="normal" button="button"
          >TRANSFERS CENTER</vs-button
        >
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: "TeamTransfers",
  props: {
    user: {
      type: Object,
      required: true
    },
    currentRound: {
      type: Number,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    // ...mapGetters(["standings", "WCandTripple"]),
    hasWildcard() {
      return !this.user.wildCards[1];
    },
    isWCActive() {
      return this.user.rounds[`r${this.currentRound}`].wildCard;
    },
    transfersAvail() {
      // const avail = Number(
      //   this.user.rounds[`r${this.currentRound}`].transfersAvail
      // );
      // const made = Number(
      //   this.user.rounds[`r${this.currentRound}`].transfersMade
      // );
      // return avail - made;

      const made = Number(
        this.user.rounds[`r${this.currentRound}`].transfersMade
      );
      const avail = Number(
        this.user.rounds[`r${this.currentRound}`].transfersAvail
      );
      const currentTransfersCount = this.isWCActive ? 3 - made : avail - made;
      return currentTransfersCount;
    }
  },
  methods: {},
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.transfers-left-cont {
  margin: 20px 0 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: lightgray;
  h1 {
    width: 100%;
    height: 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #9fa5a9;
    color: #3c474d;
    font-weight: bold;
    font-size: 1.125rem;
  }
  .sub-cont {
    width: 100%;
    margin: 10px 0 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 0;
    .labels-cont {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .label {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        span {
          margin: 10px;
          padding: 5px 10px;
          border: 2px solid #184d18;
          border-radius: 50px;
          font-weight: bold;
        }
        span.smallerspan {
          padding: 5px 9px;
        }
        svg {
          width: 30px;
          margin: 10px;
          path {
            stroke-width: 100px;
          }
          path.check {
            fill: #184d18;
            stroke: #184d18;
          }
          path.uncheck {
            fill: #8a4e50;
            stroke: #8a4e50;
          }
        }
        h3 {
          font-size: 1rem;
          font-weight: bold;
          color: #3c474d;
        }
      }
    }
    .button {
      padding: 10px 20px;
      background-color: #3c474d;
      color: lightgrey;
      font-size: 1rem;
      font-family: "Montserrat", sans-serif;
      text-decoration: none;
      border: none;
      border-radius: 7px;
      transition: all 0.3s;
      text-align: center;
      &:hover {
        background-color: #b8b8b8;
        color: #3c474d;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 3px 3px 10px -5px rgba(0, 0, 0, 0.43);
      }
    }
  }
}
</style>