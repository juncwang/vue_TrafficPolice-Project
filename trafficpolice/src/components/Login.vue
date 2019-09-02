<template>
    <div id="login">
        <div class="login_BG">
            <div class="login_Title"></div>
            <div ref="codeDiv" class="login_Input" @click="onCode">
                <img ref="codeIcon" src="../assets/login_Code.png" width="40" height="40" />
                <input ref="code" type="text" @focus="focusCode" @blur="blurCode" @input="changeBtn" v-model="codeText" />
            </div>
            <div ref="passDiv" class="login_Input" @click="onPass">
                <img ref="passIcon" src="../assets/login_Pass.png" width="40" height="40" />
                <input ref="pass" type="password" @focus="focusPass" @blur="blurPass" @input="changeBtn" v-model="passText"/>
            </div>
            <div ref="loginBtn" :class="{login_btn: true, login_def: !isAct, login_act: isAct}" @click="onBtn"></div>
            <div class="login_text">重庆市九龙坡区公安局信息中心版</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data(){
        return {
            showSpeed: 350,
            codeText: '',
            passText: '',
            isAct: false
        }
    },
    methods: {
        onCode() {
            this.$refs.code.focus()
            this.$refs.codeDiv.style.borderColor = '#19FF8C'
        },
        focusCode() {
            this.$refs.codeIcon.style.left = '50px'
            this.$refs.code.style.textAlign = 'left'
            setTimeout(() => {
                this.$refs.code.placeholder='输入警号'
            }, this.showSpeed);
        },
        blurCode(){
            this.$refs.codeDiv.style.borderColor = '#a7a7a7'
            if(this.codeText == ''){
                this.$refs.code.placeholder=''
                this.$refs.codeIcon.style.left = '50%'
            }else{
                this.$refs.code.style.textAlign = 'center'
            }
        },
        onPass() {
            this.$refs.pass.focus()
            this.$refs.passDiv.style.borderColor = '#19FF8C'
        },
        focusPass() {
            this.$refs.passIcon.style.left = '50px'
            this.$refs.pass.style.textAlign = 'left'
            setTimeout(() => {
                this.$refs.pass.placeholder='输入密码'
            }, this.showSpeed);
            
        },
        blurPass(){
            this.$refs.passDiv.style.borderColor = '#a7a7a7'
            if(this.passText == ''){
                this.$refs.pass.placeholder=''
                this.$refs.passIcon.style.left = '50%'
            }else{
                this.$refs.pass.style.textAlign = 'center'
            }
        },
        changeBtn(){
            if(this.codeText != '' && this.passText != ''){
                this.isAct = true
            }else{
                this.isAct = false
            }
        },
        onBtn() {
            console.log('onBtn')
        }
    }
}
</script>

<style scoped>
#login {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login_BG {
    width: 1052px;
    height: 846px;
    background-image: url('../assets/login_BG.png');
}

.login_Title {
    width: 275px;
    height: 35px;
    background-image: url('../assets/login_Title.png');
    margin: 200px auto 50px;
}

.login_Input {
    width: 540px;
    height: 100px;
    position: relative;
    border-bottom: 1px solid #a7a7a7;
    margin: 50px auto;
    cursor: pointer;
}

.login_Input img {
    position: absolute;
    z-index: 10;
    left: 50%;
    margin-left: -20px;
    top: 50%;
    margin-top: -20px;

    transition: left 1s;
}

.login_Input input {
    position: absolute;
    z-index: 1;
    width: 300px;
    height: 50px;
    left: 50%;
    margin-left: -150px;
    top: 50%;
    margin-top: -25px;
    color: #4a4a4a;
    font-size: 1.5em;
    letter-spacing: 0.5em;
    border: 0;
    outline: none;
    cursor: pointer;
}

.login_btn {
    width: 152px;
    height: 152px;
    margin: 80px auto;
}

.login_act {
    background-image: url('../assets/login_Act.png');
}

.login_def {
    background-image: url('../assets/login_Def.png');
}

.login_text {
    color: white;
    width: 500px;
    margin: -30px auto;
    text-align: center;
    letter-spacing: 1em;
}

*::-webkit-input-placeholder {
    color: #a7a7a7;
    text-align: center;
}

*:-moz-placeholder {
    color: #a7a7a7;
    text-align: center;
}

*:-ms-input-placeholder {
    /* IE10+ */
    color: #a7a7a7;
    text-align: center;
}
</style>