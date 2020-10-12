<template>
  <div class="transfers-container">
    <h2>Transfers submitted for round {{ currentRound }}</h2>
    <div class="tr-cont" v-for="(t, i) in roundTransfers" :key="i">
      <span>{{ t.position }}</span>
      <span>{{ players[t.transferIn].name }}</span>
      <span>{{ players[t.transferIn].club }}</span>
      <span>{{ players[t.transferOut].name }}</span>
      <span>{{ players[t.transferOut].club }}</span>
      <span
        :class="{
          pending: t.status === 'pending',
          confirmed: t.status === 'confirmed',
          cancelled: t.status === 'cancelled'
        }"
        >{{ t.status }}</span
      >

      <!-- <img
        class="green"
        :src="`http://ff-legends.com/team-kits/tr-green.png`"
        alt
      /> -->
    </div>
    <!-- <div class="tr-cont">
      <span class="transfers-in" v-for="(t, i) in transferedOut" :key="i"
        >{{ t.name }} - {{t.position}}{{ i === transferedOut.length - 1 ? "" : ", " }}</span
      >
      <img
        class="red"
        :src="`http://ff-legends.com/team-kits/tr-red.png`"
        alt
      />
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "RoundTransfersSoFar",
  props: {
    loggedUser: {
      type: Object,
      required: true
    },
    currentRound: {
      type: Number,
      required: true
    },
    players: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["transfers"]),
    roundTransfers() {
      if (this.transfers && this.loggedUser && this.currentRound) {
        return this.transfers[`r${this.currentRound}`][this.loggedUser.uid];
      } else {
        return undefined;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.transfers-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 5px 0;
  background-color: #bebebe;

  h2 {
    font-weight: bold;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #3c474d;
    padding: 5px 0;
    margin: 0 0 5px 0;
    background-color: #59a95d;
  }

  .tr-cont {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0 0 0 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    // background-color: #9fa5a9;
    position: relative;

    span {
      padding: 7px;
      font-weight: bold;
      text-align: center;

      &:nth-child(1) {
        width: 10%;
      }
      &:nth-child(2) {
        width: 20%;
        border-bottom: 3px solid green;
        margin: 0 0 0 5px;
      }
      &:nth-child(3) {
        width: 20%;
        border-bottom: 3px solid green;
        margin: 0 5px 0 0;
      }
      &:nth-child(4) {
        width: 20%;
        border-bottom: 3px solid #c84c50;
        margin: 0 0 0 5px;
      }
      &:nth-child(5) {
        width: 20%;
        border-bottom: 3px solid #c84c50;
        margin: 0 5px 0 0;
      }
      &:nth-child(6) {
        width: 10%;
      }
    }

    .pending {
      background-color: #828a8d;
    }
    .confirmed {
      background-color: #91ca91;
    }
    .cancelled {
      background-color: #793638;
      color: white;
    }
  }
}
</style>