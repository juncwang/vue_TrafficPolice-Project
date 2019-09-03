<template>
    <div id="menuSelect" :class="{menu_def: !isSelect, menu_act: isSelect}" @click="menuClick">

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
}

.menu_def {
    background-image: url('../assets/menu_def.png');
}

.menu_act {
    background-image: url('../assets/menu_act.png');
}
</style>