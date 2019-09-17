<template>
    <div id="navstart">
        <div ref="fontcontent" class="fontcontent"><p>确认接警并开始导航?</p></div>
        <ul>
            <li @click="clickFH"></li>
            <li @click="clickStart">确定</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'navstart',
    mounted(){
        let w = document.body.clientWidth
        let h = document.body.clientHeight

        this.$refs.fontcontent.style.height = (h - w * 0.352785) + 'px'

    },
    methods: {
        clickStart(){
            this.$store.commit("setNav", true)
            this.$router.push('/amap')
        },
        clickFH(){
            this.$store.commit("setNav", false)
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
#navstart {
    width: 100%;
    position: relative;
}

.fontcontent {
    width: 100%;
    background-image: url('../assets/navbg.png');
    background-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: #333;
}

#navstart ul {
    position: absolute;
    width: 180px;
    height: 85px;
    bottom: 50px;
    left: 50%;
    margin-left: -90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#navstart ul li:nth-child(1){
    width: 66px;
    height: 66px;
    background-image: url('../assets/btn_fh.png');
}

#navstart ul li:nth-child(2){
    width: 85px;
    height: 85px;
    background-image: url('../assets/btn_qd.png');
    line-height: 80px;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 13px;
}

#navstart ul li:active {
    opacity: .5;
}
</style>