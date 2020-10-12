<template>
  <div class="transfers-container">
    <div class="tr-cont">
      <span class="transfers-in" v-for="(t, i) in transferedIn" :key="i"
        >{{ t.name }} - {{t.position}}{{ i === transferedIn.length - 1 ? "" : ", " }}</span
      >
      <img
        class="green"
        :src="`http://ff-legends.com/team-kits/tr-green.png`"
        alt
      />
    </div>
    <div class="tr-cont">
      <span class="transfers-in" v-for="(t, i) in transferedOut" :key="i"
        >{{ t.name }} - {{t.position}}{{ i === transferedOut.length - 1 ? "" : ", " }}</span
      >
      <img
        class="red"
        :src="`http://ff-legends.com/team-kits/tr-red.png`"
        alt
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectedTransfers",
  props: {
    transferedOut: {
      type: Array,
      required: true
    },
    transferedIn: {
      type: Array,
      required: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.transfers-container {
  width: 100%;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .tr-cont {
    width: 50%;
    height: 100%;
    display: flex;
    padding: 0 0 0 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #91ca91;
    position: relative;
    &:last-child {
      justify-content: flex-end;
      padding: 0 10px 0 0;
      background-color: #b28a8b;
    }
    span {
      padding: 0 0 0 5px;
      font-weight: bold;
    }
    img.green {
      position: absolute;
      right: 10px;
    }
    img.red {
      position: absolute;
      left: 10px;
    }
  }
}
</style>