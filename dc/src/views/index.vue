<template>
    <div class="main">
        <!-- 蓝色背景 -->
        <div class="main_top">
            <!-- 导航 -->
            <div class="nav">
                <div class="right">
                    <a href="login">注册</a>
                    <span style="margin:0 15px;">|</span>
                    <a href="login">登录</a>
                    <a href="kaidian" class="btn">我要开店</a>
                </div>
            </div>
            <!-- 商标和搜索框 -->
            <div class="content">
                <!-- 商标 -->
                <div class="logo">
                    <img src="../../public/img/index/logo.png">
                </div>
                <!-- 搜索框 -->
                <div style="width:670px;margin:0 auto;margin-top:50px;height:56px;position:relative;">
                    <div class="map_navbar">
                        <a href="">廊坊<span style="color:#bbb;font-size:28px;margin-left:20px;">|</span></a>
                        <input type="text" placeholder="请输入你的收货地址（写字楼，小区，街道或者学校）" class="search" @keyup.13="pleaseLogin">
                    </div>
                    <button class="but" @click="pleaseLogin">搜索</button>
                </div>
            </div>
        </div>
        <foot></foot>
    </div>
</template>

<script>
import foot from '../components/footer.vue'
export default {
    data(){
        return{
        }
    },
    components:{
        foot,
    },
    methods:{
        pleaseLogin(){
            this.$alert('请先登录',{
                confirmButtonText: '确定',
            });
            this.$router.push("/login/");
        }
    }
}
</script>

<style scoped>
    div.main_top{
        width:100%;
        min-width: 1180px;
        height:500px;
        background-color: #008de1;
    }
    div.nav{
        width:1180px;
        height:48px;
        margin: 0 auto;
        padding-top:25px;
    }
    div.right{
        float:right;
        height:48px;
        line-height: 48px;
        color:#fff;
    }
    div.right a{
        color:#fff;
        font-size:14px;
    }
    a.btn{
        background-color: #5db423;
        font-size:12px !important;
        padding:7px 14px;
        border: none;
        border-radius: 2px;
        outline: 0;
        cursor: pointer;
        line-height: 1;
        text-align: center;
        margin-left:25px;
    }
    .main_top .content{
        width:1180px;
        height:191px;
        margin:135px auto;
        position: relative;
    }
    .logo{
        width:1180px;
        height:83px;
    }
    .map_navbar{
        width:590px;
        height:56px;
    }
    .map_navbar a{
        font-size: 20px;
        color:#333;
        background-color: #fff;
        text-align: center;
        display: block;
        width:100px;
        height: 56px;
        line-height: 50px;
        float:left;
        padding-left:20px;
    }
    .search{
        height:56px;
        width:413px;
        border:none;
        outline: 0;
        font-size: 16px;
        padding-left: 5px;
    }
    .but{
        color: #fff;
        background: #f74342;
        border: none;
        cursor: pointer;
        border-radius: 2px;
        width: 128px;
        line-height: 56px;
        font-size: 20px;
        position:absolute;
        right:-5px;
        top:0px;
    }
    .but:hover{
        background: #E62625;
    }
    div.logo{
        text-align:center;
    }
    div.logo img{
        height:83px;
    }
    
</style>

