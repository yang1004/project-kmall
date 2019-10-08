<template>
    <div class="Login">
        <van-field 
            v-model="username" 
            required 
            clearable 
            label="用户名" 
            placeholder="请输入用户名"
            :error-message="errUserMsg"
            @blur="handleUsername()"
        />
        <van-field 
            v-model="password" 
            type="password" 
            label="密码" 
            placeholder="请输入密码" 
            :error-message="errPassMsg"
            @blur="handlePassword()"
            required 
        />
        <van-button type="primary" size="large" @click="handleLogin()">登录</van-button>
    </div>
</template>
<script>
    import Vue from 'vue';
    import { Field,Button,Toast } from 'vant';
    Vue
    .use(Field)
    .use(Button)
    .use(Toast);
    import {GET_LOGIN} from './store/types.js'
    export default {
        name: 'Login',
        data(){
            return {
                username:'',
                password:'',
                errUserMsg:'',
                errPassMsg:'',
            }
        },
        methods:{
            handleLogin(){
                if(this.errUserMsg || this.errPassMsg){//验证不通过不发送请求
                    return
                }
                if(!this.username || !this.password){//没输入直接提交不发送请求
                    return
                }
                // console.log(this.username,this.password)
                var data = {
                    username:this.username,
                    password:this.password
                }
                this.$store.dispatch(GET_LOGIN,data)
                .then(()=>{
                    if(this.$store.state.login.username){
                        // 本地存储
                        localStorage.setItem('username',this.username)
                        Toast.success('登录成功');
                        this.$router.push({ path:'/'})
                    }
                })
            },
            handleUsername(){
                var username = this.username.trim()
                var reg = /^[a-z][a-z0-9_]{2,5}$/
                //校验
                //用户名不能为空
                if(!username){
                    this.errUserMsg = '用户名不能为空'
                    return 
                }
                //用户名校验
                if(!reg.test(username)){
                    this.errUserMsg = '用户名格式不正确'
                    return 
                }
                this.errUserMsg = ''
            },
            handlePassword(){
                var password = this.password.trim()
                var reg = /^\w{3,6}$/
                //密码不能为空
                if(!password){
                    this.errPassMsg = '密码不能为空'
                    return 
                }
                //密码校验
                if(!reg.test(password)){
                    this.errPassMsg = '密码格式不正确'
                    return 
                }
                this.errPassMsg = ''
            }
        }
    }
</script>
<style scoped>
</style>