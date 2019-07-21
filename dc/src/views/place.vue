<template>
    <div>
        <heade></heade>
        <div class="container">
            <!-- 搜索 -->
            <div class="search">
                <!-- 左侧位置显示 -->
                <div class="location">
                    <span>当前位置:</span>
                    <span>河北工业大学廊坊校区</span>
                    <span><a href="">[切换地址]</a></span>
                </div>
                <!-- 右侧搜索框 -->
                <div class="select">
                    <input type="text" placeholder="搜索商家，美食..." v-model="ssnr" @keyup.13="getType(ssnr)">
                    <img style="height:20px;vertical-align: middle;" src="../../public/img/place/search.png" @click="getType(ssnr)">
                </div>
            </div>
        <!-- 筛选导航 -->
            <div class="nav_show">
                <a class="xz">全部商家</a>
                <a @click="getType('美食')">美食</a>
                <a @click="getType('快餐便当')">快餐便当</a>
                <a @click="getType('特色菜系')">特色菜系</a>
                <a @click="getType('异国料理')">异国料理</a>
                <a @click="getType('小吃夜宵')">小吃夜宵</a>
                <a @click="getType('甜品饮品')">甜品饮品</a>
                <a @click="getType('果蔬生鲜')">果蔬生鲜</a>
                <a @click="getType('下午茶')">下午茶</a>
                <a @click="getType('夜宵')">夜宵</a>
            </div>    
            <!-- 店铺（从数据库循环）-->
            <div class="shop clear">
                <div class="box" v-for="item in list" :key="item.sid" @click="goShop(item.sid)">
                    <div style="float:left;padding:20px;">
                        <img style="height:70px;width:70px;" :src="item.pic">
                        <p style="text-align:center;color:#999">{{item.pstime}}分钟</p>
                    </div>
                    <div style="float:left;padding:20px;">
                        <p class="first">{{item.sname}}</p>
                        <p class="second">{{item.grade}}</p>
                        <p class="third">配送费￥{{item.psf}}</p>
                    </div>
                </div>             
            </div>
            <!-- 分页 -->
            <div class="fy clear">
                <ul>
                    <li><a @click="getLess">上一页</a></li>
                    <li><a @click="getMore">下一页</a></li>
                </ul>
            </div>
        </div>
        <foot></foot>
    </div>
</template>

<script>
import heade from '../components/header.vue'
import foot from '../components/footer.vue'
export default {
    data(){
        return{
            list:[],
            pageIndex:0,     //属性显示当前页数
            pageSize:20,       //页大小
            pageCount:3,      //总页数
            ssnr:'',
            uid:this.$route.params.uid,
        }
    },
    methods:{
        //店铺分类
        getType(type){
            if(type!=''){
                this.$http.get('http://localhost:3000/getStore?type='+type).then(result=>{
                    this.list=result.body;
                    //console.log(this.list);
                }) 
            }
        },
        //下一页
       getMore(){
           if(this.pageIndex<this.pageCount){
            	this.pageIndex++;
            }else{
            	return;
            }
			var url="http://localhost:3000/getStorelist";
			url+="?pno="+this.pageIndex+"&pageSize="+this.pageSize;
            this.$http.get(url).then(result=>{
            	this.list=result.body.data;
            	//console.log(this.list);
            })
       },
        //上一页
        getLess(){
            if(this.pageIndex>1 && this.pageIndex<=this.pageCount){
            	this.pageIndex--;
            }else{
            	return;
            }
			var url="http://localhost:3000/getStorelist";
			url+="?pno="+this.pageIndex+"&pageSize="+this.pageSize;
            this.$http.get(url).then(result=>{
            	this.list=result.body.data;
            	//console.log(this.list);
            })
        },
        //进入店铺
        goShop(sid) {
			this.$router.push("/shop/"+this.uid+'/'+sid);
		},
    },
    mounted(){
        this.getMore();
        this.getLess();
    },
    components:{
        heade,
        foot
    }
}
</script>

<style scoped>
    div.container{
        width:100%;
        min-width:1180px;
        background: #f7f7f7;
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
    .select{
        float: right;
        margin: 10px 0;
        width: 282px;
        height: 30px;
        border: 1px solid #ccc;
        background: #fff;
    }
    .select>input{
        width: 236px;
        border: 0;
        outline: 0;
        padding: 0 8px;
        margin: 4px 0;
        line-height: 24px;
        color: #333;
    }
    .select>img{
        cursor: pointer;
    }
    div.shop{
        width:1180px;
        border: 1px solid #e6e6e6;
        margin: 20px auto;
        background: #fff;
        border-bottom:none;
    }
    div.box{
        width:25%;
        background-color: #fff;
        border-bottom: 1px #f5f5f5 solid;
        height: 139px;
        float: left;
        font-size: 12px;
        cursor: pointer;
    }
    .clear::after{
        display: block;
        content: '';
        clear: both;
    }
    p.first{
        font-size: 16px;
        margin-bottom: 6px;
        font-weight: 600;
        color: #333;
    }
    p.second{
        color:yellow;
    }
    p.third{
        color: #999;
        margin-top: 3px;
    }
    div.fy{
        width:1180px;
        margin:0 auto;
    }
    div.fy ul{
        float:right;
    }
    div.fy ul>li{
        float:left;
        margin-right:20px;
        width:50px;
        text-align: center;
        background:#eee;
        border-radius: 3px;
        padding:5px;
    }
    div.fy ul>li a{
        color: #777;
        cursor: pointer;
    }
    #xz{
        color:#f9f9f9;
    }
    .nav_show{
        width: 1150px;
        height:73px;
        font-size:14px;
        padding: 10px 15px 5px;
        background-color: #fff;
        border: 1px solid #eee;
        margin: 0 auto;
    }
    .nav_show>a{
        display: inline-block;
        width:16%;
        margin: 5px;
        padding: 3px 10px;
        color: #666;
        border-radius: 2px;
        cursor: pointer;
    }
    .nav_show>a:hover{
        background: #eee;
    }
    .nav_show>a.xz{
        color:#fff;
        background: #0089dc;
    }
</style>


