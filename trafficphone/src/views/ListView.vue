<template>
    <div ref="listView" id="listView">
        <img src="../assets/list_bg.png" alt="">
        <div @click="clickFinal" class="btnGoFinal"></div>
    </div>
</template>

<script>
export default {
    name: 'listView',
    mounted() {
        let w = document.body.clientWidth
        let h = document.body.clientHeight
        this.$refs.listView.style.height = (h - w * 0.352785) + 'px'
    },
    methods: {
        clickFinal(){
            this.$router.push('/final')
        }
    }
}
</script>

<style scoped>
#listView {
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;
}

#listView img {
    margin-top: 40px;
    width: 80%;
}

.btnGoFinal {
    width: 100%;
    height: 130px;
    position: absolute;
    left: 0;
    top: 30px;
    cursor: pointer;
}
</style>