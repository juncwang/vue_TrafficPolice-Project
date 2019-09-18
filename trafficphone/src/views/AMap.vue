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
      startPos: [],
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
      // this.getPoint();
    }

    
  },
  methods: {
    // 实现获取浏览器当前位置并导航 -- 获取位置速度很慢
    getPoint() {
      let that = this;
      AMap.plugin("AMap.Geolocation", () => {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonPosition: "RB", //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
        });
        this.map.addControl(geolocation);
        geolocation.getCurrentPosition(function(status, result) {
          if (status == "complete") {
            // console.log(result)
            that.startPos = [];
            that.startPos.push(result.position.P);
            that.startPos.push(result.position.Q);

            let other = that

            console.log('hello')

            AMap.plugin("AMap.Driving", () => {
              var driving = new AMap.Driving({
                // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                policy: AMap.DrivingPolicy.LEAST_TIME,
                map: other.map
              });

              var startLngLat = [that.startPos[1], that.startPos[0]];
              var endLngLat = [106.526073, 29.508301];

              console.log(startLngLat)

              driving.search(startLngLat, endLngLat, function(status, result) {
                // 未出错时，result即是对应的路线规划方案
                console.log(status, result)
              });
            });
          } else {
          }
        });
      });
    },
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