<template>
  <div id="polList">
    <div v-if="num > -1" class="selectPol">
      <div ref="polHead" class="polHead"></div>
      <div class="polName">
        <div>一支队</div>
        <div ref="polName" v-text="polName"></div>
      </div>
      <div v-if="isAct" ref="description" class="description" v-html="selecthtml"></div>
      <div v-if="isAct" class="req"></div>
    </div>
    <div class="search">
      <div class="serarch-title">搜索巡警</div>
      <div class="serarch-input">
        <input type="text" placeholder="输入警号 | 姓名" />
        <span></span>
      </div>
      <div class="serarch-list">
        <div></div>
        <ul>
          <li @click="searchSelectAct(0)" :class="{searchSelect: searchSelect.isListAll}">全部</li>
          <li @click="searchSelectAct(1)" :class="{searchSelect: searchSelect.isListOne}">支队</li>
          <li @click="searchSelectAct(2)" :class="{searchSelect: searchSelect.isListStatus}">状态</li>
          <li @click="searchSelectAct(3)" :class="{searchSelect: searchSelect.isListNum}">处置量</li>
        </ul>
      </div>
    </div>
    <div class="list">
      <ul>
        <li></li>
        <li></li>
      </ul>
      <ul>
        <li></li>
        <li></li>
      </ul>
      <ul>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
import roadConfig from "../roadConfig";
export default {
  name: "polList",
  data() {
    return {
      searchSelect: {
        isListAll: true,
        isListOne: false,
        isListStatus: false,
        isListNum: false
      },
      num: -1,
      isAct: false,
      polName: "",
      description: [],
      selecthtml: ""
    };
  },
  updated() {
    if (this.num > -1) {
      this.$refs.polHead.style.backgroundImage =
        "url(" + roadConfig.polName[this.num].path + ")";
    }

    this.polName = roadConfig.polName[this.num].name;
    this.selecthtml = `
    <b>${this.description[this.num][0]}</b><b>${
      this.description[this.num][1]
    }</b><b>${this.description[this.num][2]}</b><b>${
      this.description[this.num][3]
    }</b>
    `;
  },
  methods: {
    searchSelectAct(num) {
      switch (num) {
        case 0:
          this.searchSelect.isListAll = true;
          this.searchSelect.isListOne = false;
          this.searchSelect.isListStatus = false;
          this.searchSelect.isListNum = false;
          break;
        case 1:
          this.searchSelect.isListAll = false;
          this.searchSelect.isListOne = true;
          this.searchSelect.isListStatus = false;
          this.searchSelect.isListNum = false;
          break;
        case 2:
          this.searchSelect.isListAll = false;
          this.searchSelect.isListOne = false;
          this.searchSelect.isListStatus = true;
          this.searchSelect.isListNum = false;
          break;
        case 3:
          this.searchSelect.isListAll = false;
          this.searchSelect.isListOne = false;
          this.searchSelect.isListStatus = false;
          this.searchSelect.isListNum = true;
          break;
      }
    }
  }
};
</script>

<style scoped>
#polList {
  position: absolute;
  width: 376px;
  height: 551px;
  left: 20px;
  top: 50%;
  margin-top: -306px;
  background-image: url("../assets/polList_BG.png");
  color: white;
  padding: 30px;
}

.selectPol {
  width: 100%;
  height: 64px;
  position: relative;
  margin: 20px 0 40px;
  font-size: 12px;
}

.polHead {
  width: 64px;
  height: 64px;
  border-radius: 50px;
  float: left;
  background-image: url("/images/pol_z.png");
}

.polName {
  float: left;
  line-height: 24px;
  padding: 7px 0px;
  margin-left: 10px;
}

.description {
  float: right;
  width: 240px;
  padding: 7px 0px;
  line-height: 24px;
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.description > b {
  display: block;
  width: 120px;
  font-weight: bold;
  color: #19ff8c;
  text-align: right;
}

.req {
  width: 126px;
  height: 46px;
  background-image: url("/images/req.png");
  position: absolute;
  top: -70px;
}

.search div {
  margin: 20px 0;
}

.serarch-input {
  box-sizing: border-box;
  border: 1px solid #444;
  border-radius: 50px;
  width: 100%;
  height: 42px;
  padding: 5px;
}

.serarch-input input {
  box-sizing: border-box;
  width: 290px;
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
  background-image: url("../assets/serach-icon.png");
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: 50%;
}

.serarch-list {
  display: flex;
  justify-content: space-between;
}

.serarch-list div {
  margin: 0;
  width: 51px;
  height: 20px;
  background-image: url("../assets/serach-select.png");
}

.serarch-list ul {
  width: 200px;
  height: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 100;
}

.serarch-list ul li {
  line-height: 20px;
  cursor: pointer;
}

.searchSelect {
  color: #19ff8c;
  font-weight: bold;
}

.list {
  width: 100%;
  margin: 50px 0;
}

.list ul {
  margin: 30px 0;
  width: 100%;
  height: 68px;
  display: flex;
  justify-content: flex-start;
}

.list ul li:nth-child(2) {
  width: 30px;
  height: 54px;
  background-image: url("../assets/list_message.png");
  margin-left: 40px;
  cursor: pointer;
}

.list ul li:nth-child(2):active {
  opacity: 0.5;
}

.list ul:nth-child(1) li:nth-child(1) {
  width: 297px;
  height: 62px;
  background-image: url("../assets/list_image_1.png");
}

.list ul:nth-child(2) li:nth-child(1) {
  width: 297px;
  height: 62px;
  background-image: url("../assets/list_image_2.png");
}

.list ul:nth-child(3) li:nth-child(1) {
  width: 297px;
  height: 62px;
  background-image: url("../assets/list_image_3.png");
}
</style>