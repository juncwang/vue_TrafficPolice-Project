<template>
    <div id="selectStatus">
        <div ref="selectColor" class="selectColor"></div>
        <div :class="{selectBtn: true, selectTraffic_act: isSelect, selectTraffic_def: !isSelect}" style="left: 0px;" @click="selectTra"></div>
        <div :class="{selectBtn: true, selectPolice_act: !isSelect, selectPolice_def: isSelect}" style="left: 230px;" @click="selectPol"></div>
    </div>
</template>

<script>
export default {
    name: 'selectStatus',
    data(){
        return {
            isSelect: true
        }
    },
    mounted(){
        this.selectTra()
    },
    methods: {
        selectTra(){
            this.$refs.selectColor.style.left = '0px'
            this.isSelect = true
        },
        selectPol(){
            this.$refs.selectColor.style.left = '230px'
            this.isSelect = false
        }
    }
}
</script>

<style scoped>
#selectStatus {
    position: absolute;
    width: 460px;
    height: 73px;
    background-image: url('../assets/Features_BGColor.png');
    bottom: 20px;
    left: 50%;
    margin-left: -230px;
    border-radius: 50px;
}

.selectColor {
    width: 230px;
    height: 73px;
    position: absolute;
    left: 0px;
    top: 0px;
    background-color: #16ce72;
    border-radius: 50px;
    transition: left 0.5s;
}

.selectBtn {
    width: 230px;
    height: 73px;
    background-repeat: no-repeat;
    background-size: 92px 29px;
    background-position: 50%;
    position: absolute;
    cursor: pointer;
}

.selectTraffic_def {
    background-image: url('../assets/Select_traffic_def.png');
}

.selectTraffic_act {
    background-image: url('../assets/Select_traffic_act.png');
}

.selectPolice_def {
    background-image: url('../assets/Select_Police_def.png');
}

.selectPolice_act {
    background-image: url('../assets/Select_Police_act.png');
}
</style>