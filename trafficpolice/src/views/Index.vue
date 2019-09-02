<template>
  <div id="index">
    <div id="container" tabindex="0"></div>
    <login></login>
  </div>
</template>

<script>
import AMap from "AMap";
import Login from "../components/Login";
export default {
  name: "index",
  components: {
    'login': Login
  },
  data() {
    return {
      amap: {
        id: "container",
        center: [106.510676, 29.502272],
        resizeEnable: true,
        zoom: 16,
        lang: "zh",
        pitch: 45,
        viewMode: "3D",
        mapStyle: "amap://styles/bd9a2bb3ce2b4a09082e357d1860d16b",
        features: ["road", "point"],
        area: {
          district: "九龙坡区",
          fillOpacity: 0.4,
          fillColor: "#80d8ff",
          strokeWeight: 1,
          strokeColor: "#0091ea"
        },
        rotSpeed: 0.05,
        bRot: true
      }
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap: function() {
      let map = new AMap.Map(this.amap.id, {
        center: this.amap.center,
        resizeEnable: this.amap.resizeEnable,
        zoom: this.amap.zoom,
        pitch: this.amap.pitch,
        viewMode: this.amap.viewMode
      });
      map.setMapStyle(this.amap.mapStyle);
      map.setFeatures(this.amap.features);

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
        map.setFitView(polygons); //视口自适应
      });

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