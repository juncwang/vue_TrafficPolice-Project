<template>
  <div id="polList">
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
  </div>
</template>

<script>
export default {
  name: "polList",
  data() {
    return {
      searchSelect: {
        isListAll: true,
        isListOne: false,
        isListStatus: false,
        isListNum: false
      }
    };
  },
  methods: {
    searchSelectAct(num) {
      switch (num) {
        case 0:
            this.searchSelect.isListAll = true
            this.searchSelect.isListOne = false
            this.searchSelect.isListStatus = false
            this.searchSelect.isListNum = false
          break;
        case 1:
            this.searchSelect.isListAll = false
            this.searchSelect.isListOne = true
            this.searchSelect.isListStatus = false
            this.searchSelect.isListNum = false
          break;
        case 2:
            this.searchSelect.isListAll = false
            this.searchSelect.isListOne = false
            this.searchSelect.isListStatus = true
            this.searchSelect.isListNum = false
          break;
        case 3:
            this.searchSelect.isListAll = false
            this.searchSelect.isListOne = false
            this.searchSelect.isListStatus = false
            this.searchSelect.isListNum = true
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

.search div {
  margin: 10px 0;
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
</style>