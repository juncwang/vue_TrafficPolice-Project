<template>
  <div @click="clickAmap" id="amap">
    <div ref="container" id="container"></div>
    <div v-if="isShowMarker" @click.stop="clickJJ" class="btn_jj"></div>
    <div v-if="isShowMarker" @click.stop="clickCan" class="btn_qx">取消</div>
    <div class="rightIcon"></div>
  </div>
</template>

<script>
import AMap from "AMap";

export default {
  name: "container",
  data() {
    return {
      isShowMarker: false,
      map: null,
      marker: null,
      amap: {
        id: "amap",
        center: [106.526073, 29.508301],
        resizeEnable: true,
        zoom: 14,
        features: ["road", "point"]
      }
    };
  },
  mounted() {
    let w = document.body.clientWidth;
    let h = document.body.clientHeight;
    this.$refs.container.style.height = h - w * 0.352785 + "px";
    // 加载地图
    this.map = new AMap.Map(this.amap.id, {
      center: this.amap.center,
      resizeEnable: this.amap.resizeEnable,
      zoom: this.amap.zoom
    });
    this.map.setFeatures(this.amap.features);

    if (this.$store.state.isNav) {
      console.log('driving')
      AMap.plugin("AMap.Driving", () => {
        var driving = new AMap.Driving({
          // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
          policy: AMap.DrivingPolicy.LEAST_TIME,
          map: this.map
        });

        var startLngLat = [106.53148, 29.500873];
        var endLngLat = [106.526073, 29.508301];

        driving.search(startLngLat, endLngLat, function(status, result) {
          // 未出错时，result即是对应的路线规划方案
        });
      });
    }
  },
  methods: {
    clickJJ() {
      this.$router.push("/navstart");
      this.map.destroy();
    },
    clickCan() {
      this.map.remove(this.marker);
      this.isShowMarker = false;
    },
    clickAmap() {
      if (!this.isShowMarker && !this.$store.state.isNav) {
        let content = `
      <div class="pol-add"></div>
      `;

        this.marker = new AMap.Marker({
          content: content,
          position: new AMap.LngLat(...this.amap.center),
          offset: new AMap.Pixel(-140, -210)
        });

        this.map.add(this.marker);
        this.isShowMarker = true;
      }
    }
  }
};
</script>

<style scoped>
#amap {
  width: 100%;
  height: 100%;
}

.btn_jj {
  width: 85px;
  height: 85px;
  background-image: url("../assets/btn_jj.png");
  background-size: 85px;
  position: absolute;
  bottom: 50px;
  left: 50%;
  margin-left: -43px;
  z-index: 99;
}

.btn_jj:active {
  opacity: 0.5;
}

.btn_qx {
  width: 66px;
  height: 66px;
  background-image: url("../assets/btn_BG.png");
  background-size: 66px;
  position: absolute;
  bottom: 60px;
  left: 50%;
  margin-left: -143px;
  z-index: 99;
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-size: 12px;
  font-weight: bold;
}

.btn_qx:active {
  opacity: 0.5;
}

.rightIcon {
  width: 53px;
  height: 160px;
  position: absolute;
  top: 50%;
  margin-top: -80px;
  right: 10px;
  background-image: url("../assets/right_icon.png");
  background-repeat: no-repeat;
  background-size: 53px 160px;
  z-index: 99;
}
</style>