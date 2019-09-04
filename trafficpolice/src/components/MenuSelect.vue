<template>
    <div id="menuSelect" :class="{menu_def: !isSelect, menu_act: isSelect}" @click="menuClick">
        <div v-if="isSelect" class="menuPol" @click="clickPol"></div>
        <div v-if="isSelect" class="menuLogout" @click="clickLogout"></div>
    </div>
</template>

<script>
export default {
    name: 'menuSelect',
    data(){
        return {
            isSelect: false
        }
    },
    methods: {
        menuClick(){
            this.isSelect = !this.isSelect
        },
        clickPol(){
            console.log('等待设计中 ... ...')
        },
        clickLogout() {
            this.$emit('Logout', 0)
            this.$message.success("已登出系统")
        }
    }
}
</script>

<style scoped>
#menuSelect {
    width: 196px;
    height: 73px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
}

.menu_def {
    background-image: url('../assets/menu_def.png');
}

.menu_act {
    background-image: url('../assets/menu_act.png');
}

#menuSelect div {
    width: 196px;
    height: 73px;
    position: absolute;
}

.menuPol {
    top: 93px;
    background-image: url('../assets/menuPol_def.png');
}

.menuPol:hover {
    background-image: url('../assets/menuPol_act.png');
}

.menuLogout {
    top: 186px;
    background-image: url('../assets/menuLogout_def.png');
}

.menuLogout:hover {
    background-image: url('../assets/menuLogout_act.png');
}
</style>

