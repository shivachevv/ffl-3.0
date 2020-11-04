<template>
  <div class="teammate" @click="transferOutHandler(player)">
    <div class="player-shirt">
      <img :src="`http://ff-legends.com/team-kits/${shirt}.png`" alt />
    </div>
    <div class="player-stats-cont">
      <div class="name-cont">
        <span class="pos">{{ player.position }}</span>
        <span class="name">{{ player.name }}</span>
        <a href="#" class="player-stats">
          <img src="@/assets/images/user-page/computer.png" alt />
        </a>
      </div>
      <div class="pts">{{ transferStatus }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransfersTeammate",
  props: {
    player: {
      type: Object,
      required: true
    },
    transfersAvail: {
      type: Number,
      required: true
    },
    transferedOut: {
      type: Array,
      required: true
    },
    reset: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      shirt: this.player.shirt,
      tmpShirt: "",
      transferStatus: "Transfer OUT",
      statuses: ["Transfer Out", "Return to Squad"]
    };
  },
  computed: {
    limitReached() {
      return this.transferedOut.length >= this.transfersAvail;
    }
  },
  methods: {
    transferOutHandler(x) {
      const isAlreadyOut = this.transferedOut.includes(x);
      if (!this.limitReached && !isAlreadyOut) {
        this.tmpShirt = this.player.shirt;
        this.shirt = "tr-out";
        this.transferStatus = this.statuses[1];
        return this.$emit("makeTransferOut", x);
      }
      if (isAlreadyOut) {
        this.shirt = this.tmpShirt;
        this.tmpShirt = this.player.shirt;
        this.transferStatus = this.statuses[0];

        return this.$emit("makeTransferOut", `remove ${this.player.id}`);
      }
      if (this.limitReached) {
        return this.$emit("max", true);
      }
    }
  },
  watch: {
    reset(nv) {
      if (nv) {
        return (this.shirt = this.player.shirt);
      }
    },
    limitReached(nv) {
      return this.$emit("max", nv);
    },
    transferedOut(nv){
      if (nv.length === 0) {
         console.log('check');
         this.shirt = this.tmpShirt;
         this.tmpShirt = this.player.shirt;
         this.transferStatus = this.statuses[0];
       }
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

.teammate {
  transition: all 0.3s;
}
.teammate:hover {
  background-color: #ff00004d;
  border-radius: 5px;
  overflow: hidden;
}
.player-shirt {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.player-shirt img {
  width: 35%;
  padding: 0 0 5px 0;
  transition: all 0.3s;
  @media #{$mobile} {
    width: 65%;
  }
}

.player-stats-cont {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

.name-cont {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 20px;
}

.pos {
  display: inline-block;
  width: 20%;
  color: #f1f0f1;
  font-size: 0.8125rem;
  background-color: #103210;
  height: 20px;
  line-height: 20px;
  text-align: center;

  @media #{$mobile} {
    font-size: 0.7rem;
  }
}

.name {
  display: inline-block;
  color: #f1f0f1;
  font-size: 0.75rem;
  background: #103e10;
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
}

.player-stats {
  display: inline-block;
  width: 20%;
  height: 20px;
  background-color: #103e10;
  padding: 3px 3px 3px;

  @media #{$mobile} {
    display: none;
  }
}

.player-stats img {
  width: 18px;
}

.pts {
  background-color: #184d18;
  color: #f1f0f1;
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-size: 0.75rem;
  text-align: center;
  line-height: 20px;
}
.captain {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  font-size: 1rem;
  font-weight: bold;
  color: #3c474d;
  background: #d3d3d3;
  text-align: center;
  padding: 4px 7px;
  border-radius: 50px;
}
</style>