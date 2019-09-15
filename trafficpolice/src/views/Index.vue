<template>
  <div id="index">
    <div id="container" tabindex="0"></div>
    <login v-if="statusPage[statusIndex] == 'login'" @loginFinal="loginFinal($event)"></login>
    <template v-else-if="statusPage[statusIndex] == 'features'">
      <weather :district="amap.area.district"></weather>
      <selectStatus @setStatus="setStatus($event)"></selectStatus>
      <menuSelect @Logout="Logout($event)" @openPolDetailed="openPolDetailed"></menuSelect>
      <polList ref="polListVal" v-show="!isStatus"></polList>
      <polDetailed v-if="isclosePolDetailed" @closePolDetailed="closePolDetailed"></polDetailed>
    </template>
  </div>
</template>

<script>
import AMap from "AMap";
// import AMapUI from "AMapUI";
import Login from "../components/Login";
import Weather from "../components/Weather";
import SelectStatus from "../components/SelectStatus";
import MenuSelect from "../components/MenuSelect";
import PolList from "../components/PolList";
import PolDetailed from "../components/PolDetailed";

import roadConfig from "../roadConfig";

export default {
  name: "index",
  components: {
    login: Login,
    weather: Weather,
    selectStatus: SelectStatus,
    menuSelect: MenuSelect,
    polList: PolList,
    polDetailed: PolDetailed
  },
  data() {
    return {
      isclosePolDetailed: false,
      description: [],
      polListVal: null,
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
        mapStyle: process.env.VUE_APP_MAPSTYLE,
        features: ["road", "point"],
        area: {
          district: "九龙坡区",
          fillOpacity: 0.1,
          fillColor: "#000",
          strokeWeight: 5,
          strokeColor: "#000"
        },
        rotSpeed: 0.05,
        bRot: true
      },
      map: null,
      isStatus: true,
      updataTime: 60000,
      timeObject: null,
      rotTime: null,
      markerCar: [],
      markerPol: []
    };
  },
  mounted() {
    this.initMap();

    if (this.$store.state.isLogin) {
      this.statusIndex = 1;
    } else {
      this.statusIndex = 0;
    }

    console.log(this.$refs.polListVal);
    this.polListVal = this.$refs.polListVal;
  },
  methods: {
    openPolDetailed() {
      this.isStatus = true
      this.isclosePolDetailed = true;
    },
    closePolDetailed() {
      this.isclosePolDetailed = false;
    },
    setStatus(status) {
      this.closePolDetailed()
      this.isStatus = status;
      clearInterval(this.timeObject);
      this.map.remove(this.markerCar);
      this.map.remove(this.markerPol);
      this.runtime();
      if (this.isStatus) {
        this.getTraffic();
      } else {
        this.$refs.polListVal.num = -1;
        this.$refs.polListVal.isAct = false;
        this.getPol();
      }
    },
    loginFinal(statusIndex) {
      this.statusIndex = statusIndex;
      this.$store.commit("setLoginStatus", true);
      this.runtime();
    },
    Logout(statusIndex) {
      this.statusIndex = statusIndex;
      this.$store.commit("setLoginStatus", false);
      this.map.remove(this.markerCar);
      this.map.remove(this.markerPol);
      clearInterval(this.timeObject);
    },
    addMarkerCar: function(center, status, num) {
      let iconStyle = "";
      if (status == 3) {
        // 一般拥堵
        iconStyle = "/images/icon_car.png";
      } else {
        // 严重拥堵
        iconStyle = "/images/icon_car_act.png";
      }

      // 地图上标注 marker
      let marker = new AMap.Marker({
        position: new AMap.LngLat(...center),
        offset: new AMap.Pixel(-30, -62),
        icon: iconStyle,
        title: roadConfig.roadArray[num].name
      });

      ((num, status) => {
        AMap.event.addListener(marker, "click", () => {
          // this.map.destroy()
          // this.map.remove(this.markerCar);
          // this.map.remove(this.markerPol);
          clearInterval(this.timeObject);
          clearInterval(this.rotTime);
          this.map.destroy();
          this.$router.push("/detailsts/" + num + "/" + status);
        });
      })(num, status);

      this.markerCar.push(marker);
      this.map.add(marker);

      // 在地图上标注图标
      // AMapUI.loadUI(["overlay/SimpleMarker"], SimpleMarker => {
      //   let lngLats = center;

      //   let marker = new SimpleMarker({
      //     iconLabel: "",
      //     //自定义图标地址
      //     iconStyle: iconStyle,
      //     offset: new AMap.Pixel(-30, -62),
      //     map: this.map,
      //     position: lngLats,
      //     zIndex: 100
      //   });
      //   AMap.event.addListener(marker, "click", function() {
      //     console.log(name);
      //   });
      //   this.markerCar.push(marker);
      // });
    },
    addMarkerPol(center, num, isAdd = false) {
      // 在地图上标注图标
      // AMapUI.loadUI(["overlay/SimpleMarker"], SimpleMarker => {
      //   let lngLats = center;

      //   let marker = new SimpleMarker({
      //     iconLabel: "",
      //     //自定义图标地址
      //     iconStyle: "/images/icon_pol.png",
      //     offset: new AMap.Pixel(-30, -62),
      //     map: this.map,
      //     position: lngLats,
      //     zIndex: 100
      //   });
      //   AMap.event.addListener(marker, "click", function() {
      //     console.log(name);
      //   });
      //   this.markerPol.push(marker);
      // });
      // 地图上标注 marker
      let content = "";

      if (isAdd) {
        content = '<div class="pol-add"></div>';
      }

      let marker = new AMap.Marker({
        content: content,
        position: new AMap.LngLat(...center),
        offset: new AMap.Pixel(-30, -62),
        icon: "/images/icon_pol.png",
        title: name
      });

      let polListVal = this.$refs.polListVal;

      (function(polListVal, num, isAdd) {
        AMap.event.addListener(marker, "click", function() {
          polListVal.num = num;
          polListVal.isAct = isAdd;
        });
      })(polListVal, num, isAdd);

      this.markerPol.push(marker);
      this.map.add(marker);
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

      this.rotTime = setInterval(() => {
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
    runtime() {
      this.timeObject = setInterval(() => {
        if (this.isStatus) {
          this.getTraffic();
        } else {
          this.getPol();
        }
      }, this.updataTime);
    },
    getTraffic() {
      let len = roadConfig.roadArray.length;
      // 清除锚点
      // 删除锚点
      this.map.remove(this.markerCar);
      this.map.remove(this.markerPol);
      for (let i = 0; i < len; i++) {
        (i => {
          let url =
            "https://restapi.amap.com/v3/traffic/status/road?name=" +
            roadConfig.roadArray[i].name +
            "&city=重庆市&key=" +
            process.env.VUE_APP_ROADID;
          this.$axios
            .get(url)
            .then(res => {
              if (res.data.status == "0") {
                console.log(roadConfig.roadArray[i].name);
              } else {
                if (
                  res.data.trafficinfo.evaluation.status == "3" ||
                  res.data.trafficinfo.evaluation.status == "4"
                ) {
                  this.addMarkerCar(
                    roadConfig.roadArray[i].point,
                    res.data.trafficinfo.evaluation.status,
                    i
                  );
                }
              }
            })
            .catch(err => {
              console.log("调用高德交通态势失败 : " + err);
            });
        })(i);
      }
    },
    getPol() {
      let len = roadConfig.roadArray.length;
      let randomArr = [];
      // 清除锚点
      // 删除锚点
      this.map.remove(this.markerCar);
      this.map.remove(this.markerPol);
      for (let i = 0; i < 10; i++) {
        let num = this.getRandomForArray(randomArr, len);
        let numChild = Math.floor(
          Math.random() * roadConfig.roadArray[num].camreaArray.length
        );
        if (i < 8) {
          this.addMarkerPol(
            roadConfig.roadArray[num].camreaArray[numChild].point,
            i
          );
        } else {
          this.addMarkerPol(
            roadConfig.roadArray[num].camreaArray[numChild].point,
            i,
            true
          );
        }
        randomArr.push(num);

        let desTmp = [];
        for (let j = 0; j < 4; j++) {
          desTmp.push(roadConfig.description[i + j]);
        }
        this.description.push(desTmp);
      }
      this.$refs.polListVal.description = this.description;
    },
    getRandomForArray(randomArr, len) {
      let isLoop = false;
      let num = 0;
      do {
        num = Math.floor(Math.random() * len);
        let arrLen = randomArr.length;
        for (let i = 0; i < arrLen; i++) {
          if (randomArr[i] == num) {
            isLoop = true;
            break;
          } else {
            isLoop = false;
          }
        }
      } while (isLoop);
      console.log(num);
      return num;
    }
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