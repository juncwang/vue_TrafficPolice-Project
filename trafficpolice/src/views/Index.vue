<template>
  <div id="index">
      <div id="container" tabindex="0"></div>
  </div>
</template>

<script>
import AMap from 'AMap'
export default {
  name: "index",
  data() {
    return {
      amap: {
        center: [106.510676, 29.502272],
        zoom: 14,
        mapStyle: "amap://styles/bd9a2bb3ce2b4a09082e357d1860d16b",
        features: ["road", "point"]
      }
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init: function () {
      let map = new AMap.Map('container', {
        center: [116.397428, 39.90923],
        resizeEnable: true,
        zoom: 10,
        lang: 'zh'
      })
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
      })
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