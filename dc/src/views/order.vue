<template>
    <div>
        <heade></heade>
        <div class="container">
            <div class="search">
                <!-- 面包屑导航 -->
                <div class="location">
                    <span>当前位置:</span>
                    <span>河北工业大学廊坊校区</span>
                    <span><a href="">[切换地址]</a></span>
                    <b style="margin:0 10px;color:#999">></b>
                    <span id="bh">修改资料</span>
                </div>
            </div>
            <!-- 中间 -->
            <div class="main clear">
                <!-- 左侧列表 -->
                <ul class="list">
                    <li>
                       <h2>个人中心</h2> 
                    </li>
                    <li>
                       <h2>我的资料</h2> 
                       <ul>
                           <li><a @click="change(1)" id="btn1">修改资料</a></li>
                           <li><a @click="change(2)" id="btn2">地址管理</a></li>
                       </ul>
                    </li>
                    <li>
                        <h2>我的订单</h2>
                        <ul>
                           <li><a @click="change(3)" id="btn3">近三个月订单</a></li>
                        </ul>
                    </li>
                    <li>
                       <h2>我的资产</h2> 
                       <ul>
                           <li><a>我的红包</a></li>
                           <li><a>账户余额</a></li>
                           <li><a>我的金币</a></li>
                       </ul>
                    </li>
                    <li>
                       <h2>我的收藏</h2> 
                    </li>
                </ul>
                <!-- 右侧组件 -->
                <per v-if="isShow===1"></per>
                <addr v-if="isShow===2"></addr> 
                <order v-if="isShow===3"></order>
            </div>
        </div>
        <foot></foot>
    </div>
</template>

<script>
import heade from '../components/header.vue'
import foot from '../components/footer.vue'
import per from '../components/right1.vue'
import addr from '../components/right2.vue'
import order from '../components/right3.vue'
export default {
    data(){
        return{
            isShow:1,
        }
    },
    methods:{
        change(i){
            this.isShow=i;
            document.getElementById('bh').innerHTML=document.getElementById('btn'+i).innerHTML;
            document.getElementById('btn'+i).style='color:#0089dc';
            if(i===1){
                document.getElementById('btn1').style='color:#0089dc';
                document.getElementById('btn2').style='color:#333';
                document.getElementById('btn3').style='color:#333';
            }
            if(i===2){
                document.getElementById('btn1').style='color:#333';
                document.getElementById('btn2').style='color:#0089dc';
                document.getElementById('btn3').style='color:#333';
            }
            if(i===3){
                document.getElementById('btn1').style='color:#333';
                document.getElementById('btn2').style='color:#333';
                document.getElementById('btn3').style='color:#0089dc';
            }
            }
    },
    components:{
        heade,
        foot,
        per,
        addr,
        order
    }
}
</script>

<style scoped>
    div.container{
        width:100%;
        min-width:1180px;
        background: #f7f7f7;
        padding-bottom:50px;
    }
    div.search{
        width:1180px;
        height:54px;
        margin:0 auto;
    }
    div.location{
        float:left;
    }
    .location>span{
        font-size: 12px;
        line-height: 54px;
    }
    .location>span:first-child {
        color: #999;
        margin-right: 6px;
    }
    .location>span:nth-child(2){
        color: #333;
        margin-right: 5px;
    }
    .location>span>a{
        color: #0089dc;
    }
    div.main{
        width:1180px;
        margin:0 auto;
    }
    ul.list{
        float:left;
        margin-top: 20px;
        width: 170px;
    }
    ul.list>li{
        margin-bottom: 32px;
    }
    ul.list>li>h2{
        margin-bottom: 8px;
        font-weight: 700;
        font-size: 18px;
        margin-left:30px;
    }
    ul.list>li>ul{
        padding-left: 30px;
    }
    ul.list>li>ul>li{
        padding:4px 0;
    }
    ul.list>li>ul>li>a{
        font-size: 14px;
        color: #333;
        cursor: pointer;
    }
    .clear::after{
        display: block;
        content: '';
        clear: both;
    }
    #btn1{
        color:#0089dc;
    }
</style>

