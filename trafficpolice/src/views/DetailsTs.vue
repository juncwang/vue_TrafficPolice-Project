<template>
  <div id="details">
    <div class="details-bg">
      <div class="showMaps">
        <div class="detailsVideo">
          <video ref="videoV" src="/video/move.mp4" class="videoV" loop muted></video>
          <div class="videoBG" hidden></div>
          <div @click="videoPlay" class="videoPlay"></div>
          <div @click="videoPause" class="videoPause"></div>
        </div>
        <div id="detailsMap"></div>
      </div>
      <div class="showData">
        <div class="selectType">
          <div class="dataUp">
            <div class="dataUpBg"></div>
            <div class="dataList">
              <div
                ref="datalist"
                v-for="(item, index) in datalist"
                :key="index"
                class="dataListChild"
                @click="clickDataList(index)"
              >{{item}}</div>
            </div>
          </div>
          <div class="showList">
            <div>
              拥堵原因预览 :
              <span class="noSelect" v-if="stringYD == ''">无预览 *</span>
              <span class="selectList">{{stringYD}}</span>
            </div>
          </div>
          <div class="serarch-input">
            <input type="text" placeholder="请选择或输入拥堵的原因" v-model="inputText" />
            <span @click="clickOK"></span>
          </div>
        </div>
        <div class="selectPol">
          <ul class="polList">
            <li>
              <div></div>
              <span></span>
            </li>
            <li>
              <div></div>
              <span></span>
            </li>
            <li>
              <div></div>
              <span></span>
            </li>
            <li>
              <div></div>
              <span></span>
            </li>
          </ul>
          <div class="closeBtn" @click="closeBtn"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AMap from "AMap";
import roadConfig from "../roadConfig";
export default {
  name: "detailsts",
  data() {
    return {
      isVideoPlay: false,
      inputText: "",
      clickNum: new Set(),
      inputStr: [],
      stringYD: "",
      markerCar: [],
      markerPol: [],
      datalist: [],
      num: -1,
      status: false,
      map: null,
      amap: {
        id: "detailsMap",
        center: [106.510676, 29.502272],
        resizeEnable: true,
        zoom: 13,
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
      }
    };
  },
  mounted() {
    this.amap.center = roadConfig.roadArray[this.$route.params.num].point;
    this.num = this.$route.params.num;
    this.status = this.$route.params.status;

    this.datalist = roadConfig.description;

    this.initMap();
  },
  methods: {
    videoPlay() {
      if (!this.isVideoPlay) {
        this.$refs.videoV.play();
        this.isVideoPlay = true;
      }
    },
    videoPause() {
      if (this.isVideoPlay) {
        this.$refs.videoV.pause();
        this.isVideoPlay = false;
      }
    },
    closeBtn() {
      this.$router.push("/index");
    },
    clickOK() {
      if (this.inputText != "") {
        this.inputStr.push(this.inputText);
        this.combinStr();
        this.inputText = "";
      }
    },
    clickDataList(index) {
      if (this.$refs.datalist[index].className == "dataListChild") {
        this.$refs.datalist[index].className = "dataListChildVisited";
        this.clickNum.add(index);
      } else {
        this.$refs.datalist[index].className = "dataListChild";
        this.clickNum.delete(index);
      }
      this.combinStr();
    },
    combinStr() {
      this.stringYD = "";
      this.clickNum.forEach(item => {
        this.stringYD += roadConfig.description[item] + "、";
      });
      this.inputStr.forEach(item => {
        this.stringYD += item + "、";
      });
    },
    initMap() {
      // 加载地图
      this.map = new AMap.Map(this.amap.id, {
        center: this.amap.center,
        resizeEnable: this.amap.resizeEnable,
        zoom: this.amap.zoom,
        pitch: this.amap.pitch,
        viewMode: this.amap.viewMode
      });
      this.map.setMapStyle(this.amap.mapStyle);
      this.map.setFeatures(this.amap.features);

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
        this.map.remove(polygons); //清除上次结果
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
        this.map.add(polygons);
        // this.map.setFitView(polygons); //视口自适应
      });

      this.map.remove(this.markerCar);
      this.map.remove(this.markerPol);

      this.getPol();

      let iconStyle = "";
      if (this.status == 3) {
        // 一般拥堵
        iconStyle = "/images/icon_car.png";
      } else {
        // 严重拥堵
        iconStyle = "/images/icon_car_act.png";
      }

      // 地图上标注 marker
      let marker = new AMap.Marker({
        position: new AMap.LngLat(...this.amap.center),
        offset: new AMap.Pixel(-30, -62),
        icon: iconStyle
        // title: roadConfig.roadArray[this.num].name
      });
      this.markerCar.push(marker);
      this.map.add(marker);

      setInterval(() => {
        if (this.amap.bRot) {
          let yaw = this.map.getRotation() + this.amap.rotSpeed;
          if (yaw >= 360) yaw = 0;
          this.map.setRotation(yaw);
        }
      }, 33);
    },
    getPol() {
      let len = roadConfig.roadArray.length;
      let randomArr = [];
      for (let i = 0; i < 3; i++) {
        let num = this.getRandomForArray(randomArr, len);
        let numChild = Math.floor(
          Math.random() * roadConfig.roadArray[num].camreaArray.length
        );
        this.addMarkerPol(
          roadConfig.roadArray[num].camreaArray[numChild].point,
          i
        );
        randomArr.push(num);
      }
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
    },
    addMarkerPol(center, num, isAdd = false) {
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

      this.markerPol.push(marker);
      this.map.add(marker);
    }
  }
};
</script>

<style scoped>
#details {
  width: 100%;
  height: 100%;
  background-image: url("/images/details.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.details-bg {
  width: 1650px;
  height: 867px;
  background-image: url("../assets/details_bg.png");
}

.showMaps {
  width: 1630px;
  height: 420px;
  margin: 10px auto;
}

.detailsVideo {
  float: left;
  box-sizing: border-box;
  position: relative;
  width: 815px;
  height: 420px;
}

.videoV {
  position: absolute;
  top: 0px;
  left: 0px;
  background-image: url("/images/video_BG.jpg");
  width: 815px;
  height: 420px;
}

.videoBG {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 815px;
  height: 420px;
  background-color: skyblue;
}

.videoPlay {
  position: absolute;
  right: 20px;
  bottom: 0;
  width: 43px;
  height: 43px;
  background-image: url("../assets/videoPlay.png");
}

.videoPlay:active {
  opacity: 0.5;
}

.videoPause {
  position: absolute;
  right: 63px;
  bottom: 0;
  width: 43px;
  height: 43px;
  background-image: url("../assets/videoPause.png");
}

.videoPause:active {
  opacity: 0.5;
}

#detailsMap {
  float: left;
  box-sizing: border-box;
  background-color: #aaa;
  width: 815px;
  height: 420px;
}

.showData {
  width: 1630px;
  height: 420px;
  margin: 10px auto;
  display: flex;
}

.selectType {
  box-sizing: border-box;
  position: relative;
  width: 815px;
  height: 420px;
}

.dataUp {
  box-sizing: border-box;
  padding-top: 20px;
  width: 620px;
  height: 207px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.dataUpBg {
  width: 38px;
  height: 207px;
  background-image: url("../assets/dataUpBg.png");
}

.dataList {
  width: 562px;
  height: 207px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
}

.dataListChild {
  background-color: #545454;
  border-radius: 50px;
  margin: 5px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: white;
  font-size: 12px;
  cursor: pointer;
}

.dataListChild:active {
  color: #333;
  background-color: #19ff8c;
}

.dataListChildVisited {
  border-radius: 50px;
  margin: 5px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  color: #000;
  font-weight: bold;
  background-color: #19ff8c;
}

.showList {
  width: 400px;
  height: 70px;
  margin: 20px auto 10px;
  color: white;
  font-size: 12px;
  word-break: break-all;
}

.showList > div {
  width: 400px;
  height: 70px;
  display: table-cell;
  vertical-align: bottom;
}

.noSelect {
  color: red;
}

.selectList {
  color: #19ff8c;
}

.serarch-input {
  box-sizing: border-box;
  border: 1px solid #444;
  border-radius: 50px;
  width: 390px;
  height: 42px;
  padding: 5px;
  margin: 0 auto;
}

.serarch-input input {
  box-sizing: border-box;
  width: 310px;
  height: 28px;
  border-radius: 50px;
  border: 0;
  padding: 15px 20px;
  outline: none;
}

.serarch-input span {
  display: block;
  float: right;
  width: 64px;
  height: 28px;
  background-image: url("../assets/serarch-ok.png");
  background-repeat: no-repeat;
  background-size: 28px;
  background-position: 50%;
}

.serarch-input span:active {
  opacity: 0.5;
}

.selectPol {
  box-sizing: border-box;
  position: relative;
  width: 815px;
  height: 420px;
}

.polList {
  width: 815px;
  height: 280px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 50px 20px;
}

.polList li {
  width: 380px;
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
}

.polList li div {
  width: 299px;
  height: 70px;
  background-repeat: no-repeat;
}

.polList li:nth-child(1) div {
  background-image: url("../assets/pol_1.png");
}
.polList li:nth-child(2) div {
  background-image: url("../assets/pol_2.png");
}
.polList li:nth-child(3) div {
  background-image: url("../assets/pol_3.png");
}
.polList li:nth-child(4) div {
  background-image: url("../assets/pol_4.png");
}

.polList li span {
  display: block;
  width: 81px;
  height: 70px;
  background-image: url("../assets/goPol.png");
  background-repeat: no-repeat;
  background-size: 30px 56px;
  background-position: 50% 0;
  cursor: pointer;
}

.polList li span:active {
  opacity: 0.5;
}

.closeBtn {
  float: right;
  margin-right: 40px;
  position: relative;
  top: -20px;
  width: 230px;
  height: 73px;
  background-image: url("../assets/closeBtn.png");
  cursor: pointer;
}

.closeBtn:active {
  opacity: 0.5;
}
</style>