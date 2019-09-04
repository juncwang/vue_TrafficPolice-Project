<template>
    <div id="weather">
        <div class="area" v-text="areaText"></div>
        <ul class="weatherList">
            <li>
                <div v-text="temperature"></div>
            </li>
            <li>
                <ul ref="temImg">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </li>
            <li>
                <div v-text="humidity"></div>
            </li>
            <li>
                <div v-text="wind"></div>
            </li>
            <li>
                <div v-text="weather"></div>
            </li>
        </ul>
    </div>
</template>

<script>
import AMap from 'AMap'
export default {
    name: 'weather',
    data(){
        return {
            areaText: '重庆市 | ' + this.district,
            temperature: '',
            humidity: '',
            wind: '',
            weather: '',
        }
    },
    props: ['district'],
    mounted(){
        AMap.plugin('AMap.Weather', () => {
            let weather = new AMap.Weather()
            weather.getLive(this.district, (err, data) => {
                if(!err){
                    // console.log(data)
                    this.temperature = data.temperature + '℃'
                    this.humidity = '湿度 ' + data.humidity + '%'
                    this.wind = data.windDirection + '风 ' + data.windPower + '级'
                    this.weather = data.weather
                    if(data.temperature > 35){
                        this.$refs.temImg.style.top = '0px'
                    }else if(data.temperature > 25){
                        this.$refs.temImg.style.top = '-73px'
                    }else if(data.temperature > 10){
                        this.$refs.temImg.style.top = '-146px'
                    }else{
                        this.$refs.temImg.style.top = '-219px'
                    }
                }
            })
            // weather.getForecast(this.district, (err, data) => {
            //     if(!err){
            //         console.log(data)
            //     }
            // })
        })
    }

}
</script>

<style scoped>
#weather {
    width: 1276px;
    height: 73px;
    /* overflow: hidden; */
    position: absolute;
    left: 50%;
    margin-left: -638px;
    top: 20px;
    background-image: url('../assets/Features_BGColor.png');
    border-radius: 50px;
    line-height: 73px;
    color: white;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
}

.weatherList {
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
}

.weatherList li {
    width: 146px;
    height: 73px;
    background-repeat: no-repeat;
    background-size: 73px;
    background-position: 0;
    position: relative;
}

.weatherList>li>div {
    padding-left: 54px;
    white-space: nowrap;
}

.weatherList>li:nth-child(1) {
    width: 110px;
    background-image: url('../assets/Weather_temperature.png');
}

.weatherList>li:nth-child(2) {
    width: 70px;
    overflow: hidden;
}

.weatherList>li:nth-child(3) {
    background-image: url('../assets/Weather_humidity.png');
}

.weatherList>li:nth-child(4) {
    background-image: url('../assets/Weather_wind.png');
}

.weatherList>li:nth-child(5) {
    background-image: url('../assets/Weather_weather.png');
}

.weatherList>li>ul {
    width: 100%;
    height: 292px;
    position: absolute;
    top: 0px;
    left: 0px;

    transition: top .5s;
}

.weatherList>li>ul>li {
    width: 100%;
    height: 73px;
    background-repeat: no-repeat;
    background-size: 70px 40px;
    background-position: 50%;
}

.weatherList>li>ul>li:nth-child(1){
    background-image: url('../assets/Weather_high.png');
}

.weatherList>li>ul>li:nth-child(2){
    background-image: url('../assets/Weather_hot.png');
}

.weatherList>li>ul>li:nth-child(3){
    background-image: url('../assets/Weather_comfortable.png');
}

.weatherList>li>ul>li:nth-child(4){
    background-image: url('../assets/Weather_cool.png');
}
</style>