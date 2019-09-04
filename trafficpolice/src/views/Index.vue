<template>
  <div id="index">
    <div id="container" tabindex="0"></div>
    <login v-if="statusPage[statusIndex] == 'login'" @loginFinal="loginFinal($event)"></login>
    <template v-else-if="statusPage[statusIndex] == 'features'">
      <weather :district="amap.area.district"></weather>
      <selectStatus></selectStatus>
      <menuSelect @Logout="Logout($event)"></menuSelect>
    </template>
  </div>
</template>

<script>
import AMap from "AMap";
import AMapUI from "AMapUI";
import Login from "../components/Login";
import Weather from "../components/Weather";
import SelectStatus from "../components/SelectStatus";
import MenuSelect from "../components/MenuSelect";
export default {
  name: "index",
  components: {
    login: Login,
    weather: Weather,
    selectStatus: SelectStatus,
    menuSelect: MenuSelect
  },
  data() {
    return {
      statusPage: ["login", "features"],
      statusIndex: 0,
      amap: {
        id: "container",
        center: [106.510676, 29.502272],
        resizeEnable: true,
        zoom: 14,
        lang: "zh",
        pitch: 45,
        viewMode: "3D",
        mapStyle: "amap://styles/bd9a2bb3ce2b4a09082e357d1860d16b",
        features: ["road", "point"],
        area: {
          district: "九龙坡区",
          fillOpacity: 0.1,
          fillColor: "#fff",
          strokeWeight: 5,
          strokeColor: "#fff"
        },
        rotSpeed: 0.05,
        bRot: true
      },
      map: null
    };
  },
  mounted() {
    this.initMap();
    if (this.$store.state.isLogin) {
      this.statusIndex = 1;
    } else {
      this.statusIndex = 0;
    }
  },
  methods: {
    loginFinal(statusIndex) {
      this.statusIndex = statusIndex;
      this.$store.commit("setLoginStatus", true);
    },
    Logout(statusIndex) {
      console.log(statusIndex);
      this.statusIndex = statusIndex;

      this.$store.commit("setLoginStatus", false);
    },
    initMap: function() {
      // 加载地图
      let map = new AMap.Map(this.amap.id, {
        center: this.amap.center,
        resizeEnable: this.amap.resizeEnable,
        zoom: this.amap.zoom,
        pitch: this.amap.pitch,
        viewMode: this.amap.viewMode
      });
      map.setMapStyle(this.amap.mapStyle);
      map.setFeatures(this.amap.features);

      // 在地图上为规定区域描边
      let district = null;
      let polygons = [];

      let opts = {
        subdistrict: 0, //获取边界不需要返回下级行政区
        extensions: "all", //返回行政区边界坐标组等具体信息
        level: "district" //查询行政级别为 市
      };
      district = new AMap.DistrictSearch(opts);
      district.search(this.amap.area.district, (status, result) => {
        map.remove(polygons); //清除上次结果
        polygons = [];
        var bounds = result.districtList[0].boundaries;
        if (bounds) {
          for (var i = 0, l = bounds.length; i < l; i++) {
            //生成行政区划polygon
            var polygon = new AMap.Polygon({
              strokeWeight: this.amap.area.strokeWeight,
              path: bounds[i],
              fillOpacity: this.amap.area.fillOpacity,
              fillColor: this.amap.area.fillColor,
              strokeColor: this.amap.area.strokeColor
            });
            polygons.push(polygon);
          }
        }
        map.add(polygons);
        // map.setFitView(polygons); //视口自适应
      });

      // 在地图上显示路况信息
      // AMapUI.loadUI(["control/BasicControl"], function(BasicControl) {
      //   var traffic = new BasicControl.Traffic({
      //     showButton: false,
      //     theme: "normal"
      //   });

      //   console.log(traffic)

      //   map.addControl(traffic);
      // });

      // 在地图上标注图标
      AMapUI.loadUI(["overlay/SimpleMarker"], function(SimpleMarker) {
        let lngLats = [106.510676, 29.502272];

        let marker = new SimpleMarker({
          iconLabel: "",
          //自定义图标地址
          iconStyle: "/images/icon_car.png",
          offset: new AMap.Pixel(-30, -62),
          map: map,
          position: lngLats,
          zIndex: 100
        });
        AMap.event.addListener(marker, "click", function() {
          console.log(lngLats);
        });
      });
      // AMapUI.loadUI(["overlay/SimpleInfoWindow"], function() {
      //   let lngLats = [106.510676, 29.502272]
      //   let marker = new AMap.Marker({
      //     map: map,
      //     zIndex: 9999999,
      //     iconStyle: '/images/icon_car.png',
      //     position: lngLats
      //   });

      //   AMap.event.addListener(marker, "click", function() {
      //     console.log(lngLats);
      //   });
      // });

      this.map = map;

      setInterval(() => {
        if (this.amap.bRot) {
          this.initMapRot(map);
        }
      }, 33);
    },
    initMapRot: function(map) {
      let yaw = map.getRotation() + this.amap.rotSpeed;
      if (yaw >= 360) yaw = 0;
      map.setRotation(yaw);
    },
    runtime: function() {}
  }
};
</script>

<style scoped>
#index,
#container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>