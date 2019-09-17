<template>
  <div id="final">
    <div ref="headtop" class="headtop"></div>
    <div ref="bgimage" class="bgimage">
      <p class="p1">已到达出警地点, 请反馈拥堵诱因</p>
      <p class="timep">{{time.h}} : {{time.m}} : {{time.s}}</p>

      <div class="lineText">
        <p>- 可多选 -</p>
      </div>
      <div class="list">
        <div
          class="listType1"
          ref="datalist"
          v-for="(item,index) in description"
          :key="index"
          @click="clickDataList(index)"
        >{{item}}</div>
      </div>
      <p>- 已选 -</p>
      <p class="selectList">* {{strText}} *</p>
      <div class="lineBottom">
        <p>
          - 拍照取证
          <span>*至少1张</span> -
        </p>
      </div>
      <div class="camrea"></div>
      <div class="bottomBtn">
        <div @click="clickBack"></div>
        <div @click="clickEnter"></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "final",
  data() {
    return {
      timeI: null,
      strSet: new Set(),
      strText: "",
      time: {
        h: 23,
        m: 59,
        s: 59
      },
      description: [
        "单车事故",
        "公共设施损坏",
        "大型活动",
        "多车事故",
        "道路损坏",
        "市政维护",
        "占道停车",
        "植被阻碍",
        "道路施工",
        "伤人事故",
        "医疗,火灾救援",
        "外事访问"
      ]
    };
  },
  mounted() {
    let w = document.body.clientWidth;
    let h = document.body.clientHeight;

    this.$refs.headtop.style.height = w * 0.236074 + "px";
    this.$refs.bgimage.style.height = h - w * 0.236074 + "px";

    this.runtimeFunc()
  },
  methods: {
    runtimeFunc() {
      this.timeI = setInterval(() => {
        this.time.s -= 1;
        if (this.time.s < 0) {
          this.time.s = 59;
          this.time.m -= 1;
        }
        if (this.time.m < 0) {
          this.time.m = 59;
          this.time.h -= 1;
          clearInterval(this.timeI);
        }
      }, 1000);
    },
    combinStr() {
      this.strText = "";
      this.strSet.forEach(item => {
        this.strText += this.description[item] + "、";
      });
    },
    clickDataList(index) {
      if (this.$refs.datalist[index].className == "listType1") {
        this.$refs.datalist[index].className = "listType2";
        this.strSet.add(index);
      } else {
        this.$refs.datalist[index].className = "listType1";
        this.strSet.delete(index);
      }
      this.combinStr();
    },
    clickBack() {
      clearInterval(this.timeI);
      this.$router.go(-1);
    },
    clickEnter() {
      clearInterval(this.timeI);
      this.$store.commit("setList", false);
      this.$router.push("/amap");
    }
  }
};
</script>

<style scoped>
#final {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.headtop {
  width: 100%;
  background-image: url("../assets/header_top_1.png");
  background-size: 100%;
  background-repeat: no-repeat;
}

p {
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 13px;
  color: #333;
}

.p1 {
}

.timep {
  padding: 10px 0 20px;
}

.bgimage {
  background-image: url("../assets/navbg.png");
  background-size: 100% 100%;
  padding: 20px;
}

.lineText {
  border-top: 1px solid #eee;
  padding: 10px 0 20px;
}

.list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  color: #fff;
  font-size: 10px;
}

.list div {
  text-align: center;
  border-radius: 12px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  margin-bottom: 20px;
}

.list div:active {
  background-color: #16ce72;
}

.selectList {
  padding: 20px 0 20px;
}

.lineBottom {
  border-top: 1px solid #eee;
  padding: 20px 0;
}

.lineBottom span {
  color: #ccc;
}

.camrea {
  width: 66px;
  height: 66px;
  background-image: url("../assets/camrea.png");
  margin: 0 auto;
}

.camrea:active {
  opacity: 0.5;
}

.bottomBtn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  width: 300px;
  bottom: 30px;
  left: 50%;
  margin-left: -150px;
}

.bottomBtn div:nth-child(1) {
  width: 66px;
  height: 66px;
  background-image: url("../assets/btn_fh.png");
}

.bottomBtn div:nth-child(2) {
  width: 85px;
  height: 85px;
  background-image: url("../assets/btn_fk.png");
}

.bottomBtn div:nth-child(3) {
  width: 66px;
  height: 66px;
}

.bottomBtn div:active {
  opacity: 0.5;
}

.listType1 {
  background-color: #333;
}

.listType2 {
  background-color: #16ce72;
}
</style>