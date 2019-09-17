<template>
  <div class="home">
    <div ref="header" class="header">
      <div ref="btnJx" class="btn_jx" @click="clickJx"></div>
      <div ref="btnNext" class="btn_Next" @click="clickList"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "home",
  mounted() {
    let w = document.body.clientWidth;
    let h = document.body.clientHeight;

    this.$refs.header.style.height = w * 0.352785 + "px";

    this.$refs.btnJx.style.width = w / 2 + "px";
    this.$refs.btnJx.style.height = (w / 2) * 0.352785 + "px";
    this.$refs.btnJx.style.marginLeft = -w / 2 / 2 + "px";

    this.$refs.btnNext.style.width = (w / 2) * 0.352785 + "px";
    this.$refs.btnNext.style.height = (w / 2) * 0.352785 + "px";

    // if(this.$store.isList)
    if (this.$store.state.isList) {
      this.$refs.btnNext.style.backgroundImage = 'url("/btn_listAct.png")';
    } else {
      this.$refs.btnNext.style.backgroundImage = 'url("/btn_listDef.png")';
    }
  },
  methods: {
    clickJx() {
      if (this.$store.state.isList) {
        this.$refs.btnNext.style.backgroundImage = 'url("/btn_listDef.png")';
        this.$store.commit("setList", false);
        this.$router.push("/amap");
      }
    },
    clickList() {
      if (!this.$store.state.isList) {
        this.$refs.btnNext.style.backgroundImage = 'url("/btn_listAct.png")';
        this.$store.commit("setList", true);
        this.$router.push("/listView");
      }
    }
  }
};
</script>

<style scoped>
#home {
  width: 100%;
  height: 100%;
}

.header {
  width: 100%;
  background-image: url("../assets/header_top.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  position: relative;
}

.btn_jx {
  position: absolute;
  left: 50%;
  bottom: 0;
}

.btn_Next {
  right: 0;
  bottom: 0;
  position: absolute;
  background-image: url("/btn_listDef.png");
  background-repeat: no-repeat;
  background-size: 39px 33px;
  background-position: 50% 65%;
}

.btn_Next:active {
  opacity: 0.5;
}
</style>
