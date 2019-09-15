<template>
    <div id="poldetailed">
        <div class="close" @click="closePolDetailed"></div>
    </div>
</template>

<script>
export default {
    methods: {
        closePolDetailed() {
            this.$emit("closePolDetailed")
        }
    }
}
</script>

<style scoped>
#poldetailed {
    width: 489px;
    height: 711px;
    position:absolute;
    top: 50%;
    margin-top: -356px;
    background-image: url('../assets/PolDetailed.png');
    left: 20px;
}

.close {
    width: 45px;
    height: 45px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
}
</style>