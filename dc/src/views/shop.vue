<template>
    <div>
        <heade></heade>
        <div class="shop_nav">
            <div class="shop_content">
                <!-- 左侧 -->
                <div class="left">
                    <img style="width:95px;height:95px;border:4px solid rgba(255,255,255,.3);border-radius:50%;margin:20px 15px 0 0;vertical-align:middle;" :src="storeInfo.pic">
                    <div style="display:inline-block;vertical-align:middle;">
                        <h2>{{storeInfo.sname}}</h2>
                        <p style="margin-top:5px;">综合评价：<span style="color:red;">{{storeInfo.grade}}</span></p>
                    </div>
                </div>
                <!-- 右侧 -->
                <div class='right'>
                    <ul>
                        <li>起送价</li>
                        <li>{{storeInfo.qsj}}元</li>
                    </ul>
                    <ul>
                        <li>配送费</li>
                        <li>{{storeInfo.psf}}元</li>
                    </ul>
                    <ul>
                        <li>平均送达速度</li>
                        <li>{{storeInfo.pstime}}分钟</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="nav">
            <div style="width:1180px;height:58px;margin:0 auto;">
                <!-- 左侧筛选 -->
                <div class='shopnav_left'>
                    <a href="" class="check">所有商品</a>
                    <span>|</span>
                    <a @click="flag=false" style="cursor:pointer;">评价</a>
                    <span>|</span>
                    <a href="">商家资质</a>
                </div>
                <!-- 右侧搜索 -->
                <div class="shopnav_right">
                    <input type="text" placeholder="搜索美食...">
                    <img style="width:20px;height:20px;float:right;margin:6px 10px 6px 0;" src="../../public/img/place/search.png">
                </div>
            </div>
            
        </div>
        <div style="width:100%;min-width:1180px;background:#f7f7f7;">
           <div class="content clear">
               <!-- 左侧菜单 -->
               <div class="content_left" v-if="flag">
                   <!-- 筛选导航 -->
                   <div class="nav_show">
                       <template v-for="item in typeList">
                            <a @click="goTo('#'+item.type)" :key="item.id">{{item.type}}</a>
                       </template>
                   </div>
                    <div class="shoplist clear" v-for="item in typeList" :key="item.id">
                        <h3 :id="item.type" style="padding:20px 0 10px 15px;font-size:20px;color:#333">{{item.type}}</h3>
                        <div class="food_menu" v-for="it in list.filter(x=>x.type==item.type)" :key="it.id">
                            <img :src="it.pic" style="width:100px;height:100px;float:left;margin-right:14px;">
                            <div style="float:left;width:307px;margin-top:10px;">
                                <p style="font-size: 14px;font-weight:700;color:#333">{{it.name}}</p>
                                <p style="color:#999">月售{{it.onsale}}份</p>
                                <p style="margin-top:5px;position:relative;">
                                    <span style="color:#f74342;font-size: 14px;font-weight: 700;">￥{{it.price}}</span>
                                    <a class="car_btn" @click='addCar(it.id)'>加入购物车</a>
                                </p> 
                            </div>
                        </div>
                    </div>
                    
               </div>
               <!-- 右侧购物车 -->
               <div class="content_right" style="relative;" v-if="flag">
                   <div>
                       <h3 style="padding: 0 1em;line-height: 2.8em;background-color: #0089dc;color: #fff;border:1px solid #0089dc;">商家公告</h3>
                       <p style="padding: 10px 15px;line-height: 2;color: #333;font-size:14px;background:#fff;border-left:1px solid #eee;border-right:1px solid #eee;">本店优先配送饿了么外卖，外卖小哥狂奔在路上，实属不易，如有不足之处，请多多包含，客服电话10105757</p>
                       <p style="padding: 10px 15px;background-color: #f5f5f5;color:#333;font-size:14px;border: 1px solid #eee;border-bottom:none;">配送说明：配送费¥4</p>
                       <p><button style="width:100%;background:#fff;line-height: 3;text-align: center;font-size: 18px;color: #666;border: 1px solid #eee;outline:none;">举报商家</button></p>
                   </div>
                   <!-- 购物车 -->
                   <div class="car">
                       <p style="background-color: #fafafa;border-top: 2px solid #0089dc;">
                           <span>购物车</span>
                           <a style="color: #0089dc;cursor: pointer;" @click="deleteCar">[清空]</a>
                       </p>
                        <!-- 应该循环的 -->
                       <p style="background:#fafafa;" v-for='(item,i) in carList' :key="i">
                           <span style="display:inline-block;width:150px;">{{carInfo[i].name}}</span>
                           <span>
                               <button id="sub" @click="updateNumber(item.gid,item.number-1)">-</button>
                               <input type="text" id="num" v-model="item.number" @keyup.13="updateNumber(item.gid,item.number)">
                               <button id="add" @click="updateNumber(item.gid,item.number+1)">+</button>
                           </span>
                           <span style="float:right;color: #f17530;">￥{{carInfo[i].price*item.number}}</span>  
                       </p>
                       <p style="background-color: #51d862;color:#fff;border:none;">
                          <span style="">共￥{{sum}}元</span>
                          <span style="float:right;font-weight:700;cursor: pointer;cursor: pointer;" @click="dialogCardVisible=true">去结算></span>
                       </p>
                       <el-dialog :visible.sync="dialogCardVisible">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span style="color:#333;font-weight:700;font-size:16px;">订单详情</span>
                                    <el-button style="float: right; padding: 3px 0;font-size:12px;color:#666;" type="text" @click="dialogCardVisible=false">&gt;返回购物车</el-button>
                                </div>
                                <el-table :data="carInfo" style="width: 100%">
                                    <el-table-column prop="name" label="商品名称" width="212"></el-table-column>
                                    <el-table-column label="份数" width="158">
                                        <template slot-scope="scope">
                                            {{carList[scope.$index].number}} 
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="price" label="单价/元" width='90'></el-table-column>
                                </el-table>
                                <div class="clearfix">
                                    <span style="float:left;margin-top:13px;font-size:20px;color:#f74342;font-weight:700;">共￥{{sum}}元</span>
                                    <el-button type="danger" style="float:right;margin:10px 0;" @click="open">确认下单</el-button>
                                </div>
                            </el-card>
                        </el-dialog>
                   </div>
               </div>
                <!-- 循环评论 -->
                <div v-for="item in comment" :key="item.cid">
               <el-card shadow="hover" style="padding:20px 15px;width:885px;margin-top:20px;" v-if="!flag">
                    <div>
                        <span>用户名：{{item.uname}}</span>
                        <span style="float:right;font-size:12px;color:#aaa">{{item.time | time}}</span>
                    </div>
                    <div style="margin-top:10px;"></div>
                    <div class="clear">
                        <span style="float:left;color:#aaa">评分</span>
                        <el-rate v-model="item.grade" disabled style="float:left;"></el-rate>   
                    </div>
                    <div style="margin-top:10px;"></div>
                    <div style="line-height:25px;">
                        {{item.content}}
                    </div>
               </el-card>
                </div>
            </div> 
        </div>
        <foot></foot>
    </div>
</template>

<script>
import heade from '../components/header.vue'
import foot from '../components/footer.vue'
import { constants } from 'crypto';
export default {
    data(){
        return{
            dialogCardVisible:false,
            list:[],
            uid:this.$route.params.uid,
            mid:this.$route.params.sid,
            typeList:[],
            storeInfo:{},
            pic:'',
            carList:[],
            carInfo:[],
            allCar:[],
            he:0,
            oid:'',
            flag:true,
            comment:[],
        }
    },
    methods:{
        // 分类筛选
        goTo(x){
            document.querySelector(x).scrollIntoView(true);
        },
        getMenu(){
            this.$http.get('http://localhost:3000/shop/getMenu?mid='+this.mid).then(result=>{
                this.list=result.body;
                const set=new Set();
                this.typeList = this.list.filter(item => !set.has(item.type) ? set.add(item.type) : false);  
            }) 
            return this.typeList;
        },
        // 获取进入的店铺信息
        getStore(){
            this.$http.get('http://localhost:3000/storeInfo?sid='+this.mid).then(result=>{
                this.storeInfo=result.body[0];
            }) 
        },
        //获取购物车
        getCar(){
            this.$http.get('http://localhost:3000/car/getCar?uid='+this.uid).then(result=>{
                this.carList=result.body;
                for(var i=0;i<this.carList.length;i++){
                    this.$http.get('http://localhost:3000/car/getCarInfo?id='+this.carList[i].gid).then(result=>{
                        this.carInfo.push(result.body[0]);
                    })
                }
                //console.log(this.carInfo);
                return this.carInfo;

            })
            
        },
        //加入购物车
       addCar(gid){
           this.$http.get('http://localhost:3000/car/addCar?uid='+this.uid+'&gid='+gid).then(result=>{
                console.log(gid);
            })
            this.$router.go(0)
       },
       //清空购物车
       deleteCar(){
           this.$http.get('http://localhost:3000/car/deleteCar?uid='+this.uid).then(result=>{
                console.log('ok');
            })
            this.$router.go(0)
       },
        //修改购物车商品数量
        updateNumber(gid,number){
            if(number<=0){
                this.deleteOne(gid);
            }
            this.$http.get('http://localhost:3000/car/updateNumber?gid='+gid+'&number='+number).then(result=>{
                console.log(gid,number);
            })
            this.$router.go(0)
        },
        // 购物车删除商品
        deleteOne(gid){
            this.$http.get('http://localhost:3000/car/deleteOne?gid='+gid).then(result=>{
                return true;
            })
            this.$router.go(0)
        },
        open() {
            this.$confirm('现在支付吗?', {
                confirmButtonText: '支付',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '支付成功，可去订单页查看!'
                });
                this.createOrder();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消支付'
                });
            });
        },
        // 创建订单
        createOrder(){
            var myDate=new Date();
            var year=myDate.getFullYear();
            var month=myDate.getMonth()+1;
            var day=myDate.getDate();
            var time=year+'-'+month+'-'+day;
            var ispay='已支付';
            // var oid=0;
            // 生成订单
            this.$http.get('http://localhost:3000/orders/createOrder?uid='+this.uid+'&time='+time+'&ispay='+ispay).then(result=>{
                //console.log(result);
                //查询订单oid
                this.$http.get('http://localhost:3000/orders/getOrderId?uid='+this.uid).then(result=>{
                    //console.log(result.body[0]['max(oid)']);
                    // 生成订单详情表
                    for(var i=0;i<this.carList.length;i++){
                        this.$http.get('http://localhost:3000/orders/createOrderDetails?oid='+result.body[0]['max(oid)']+'&gid='+this.carList[i].gid+'&number='+this.carList[i].number).then(result=>{
                            console.log(result.body);
                        }) 
                    }
                    
                })
            })
           
        },
        // 获得本店评论
        getComment(){
            this.$http.get('http://localhost:3000/comment/getStorecomment?sid='+this.mid).then(result=>{
                this.comment=result.data;
                this.comment.forEach(a=>{
                    // 获取用户名
                    this.$http.get('http://localhost:3000/getUser?uid='+a.uid).then(result=>{
                        this.$set(a,'uname',result.data[0].uname);
                    })
                })
            })
        }
    },
    mounted(){
        this.getStore();
        this.getMenu();
        this.getCar();
        this.getComment();
    },
    computed:{
        sum:function(){
            this.carList.forEach(n => {
                this.allCar.push({number:n.number})
            });
            this.carInfo.forEach((p,i) => {
                this.allCar[i].price=p.price;            
            });
            //console.log(this.allCar);
            this.allCar.forEach(item=>{
                this.he+=item.price*item.number;
            })
            return this.he;
        }

    },
    filters:{
        time(value){
            var arr='';
            arr=value.split('-');
            arr[2]=parseInt(arr[2].slice(0,2))+1;
            if(arr[2]<10){
                arr[2]='0'+arr[2];
            }else{
                arr[2]=''+arr[2];
            }
            value=arr.join('-');
            return value;
        }
        
    },
    components:{
        heade,
        foot
    }
}
</script>

<style scoped>
    h1, h2, h3, h4, h5, h6 {
        font-family: PingFang SC,Lantinghei SC,Helvetica Neue,Microsoft Yahei,Hiragino Sans GB,Microsoft Sans Serif,WenQuanYi Micro Hei,sans;
        font-weight: 400;
    }
    .shop_nav{
        width:100%;
        min-width: 1180px;
        height:140px;
        background: url(../../public/img/shop/shop_bg.jpg) no-repeat;
        background-size: cover;
    }
    .shop_content{
        width:1180px;
        height:140px;
        margin:0 auto;
    }
    .left{
        width:480px;
        height:140px;
        float:left;
        color: #fff;
        
    }
    .right{
        width:700px;
        height:140px;
        float:left;
        color:#fff;
    }
    .right>ul{
        float:left;
        margin: 40px 70px;
    }
    .right>ul>li{
        padding:5px 0;
    }
    .right>ul>li:first-child{
        font-size: 14px;
    }
    .right>ul>li:nth-child(2){
        font-size: 18px;
    }
    .nav{
        width:100%;
        min-width: 1180px;
        height:58px;
        background: white;
    }
    .shopnav_left{
        width:885px;
        height:58px;
        float:left;
    }
    .shopnav_left>a{
        color: #333;
        text-align: center;
        display: inline-block;
        width:112px;
        height:56px;
        line-height: 56px;
    }
    a.check{
        color:#0089dc;
    }
    .shopnav_left>span{
        font-size: 14px;
        color:#ccc;
        font-weight: lighter;
    }
    .shopnav_right{
        width:264px;
        height:30px;
        border: 1px solid #ccc;
        background: #fff;
        float:right;
        margin: 10px 0;
    }
    .shopnav_right>input{
        width: 200px;
        padding: 0 8px;
        margin: 4px 0;
        line-height: 24px;
        border: none;
        outline: none;
        background: #fff;
    }
    div.content{
        width:1180px;
        margin: 0 auto;
        padding-top: 20px;
    }
    .clear::after{
        display: block;
        content: '';
        clear: both;
    }
    .content_left{
        width:885px;
        float:left;
    }
    .content_right{
        width:278px;
        float:right;
    }
    .nav_show{
        width: 853px;
        height:73px;
        font-size:14px;
        padding: 10px 15px 5px;
        background-color: #fff;
        border: 1px solid #eee;
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
    div.food_menu{
        width:48%;
        background: #fff;
        float: left;
        margin-right: 1.77%;
        margin-bottom: 12px;
        font-size: 12px;
        border: 1px solid #eee;
        height: 102px;
    }
    
    div.food_menu p{
        padding:1px 0;
    }
    a.car_btn{
        position: absolute;
        right: 10px;
        bottom:0;
        text-align: center;
        color:#fff;
        background: #0089dc;
        width: 90px;
        height: 26px;
        line-height: 26px;
        border-radius: 20px;
        cursor:pointer;
    }
    div.car{
        position: absolute;
        width:278px;
        top:1000px;
        color:#666;
    }
    div.car>p{
        padding: 12px 10px;
        font-size: 14px;
        border-bottom: 1px solid #eee;
    }
    #sub,#add{
        width:18px;
        height:18px;
        border: 1px solid #ddd;
        background: #fff;
        outline: none;
        cursor: pointer;
    }
    #num{
        border: none;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        height: 16px;
        width: 30px;
        font-size: 12px;
        vertical-align: top;
        text-align: center;
        outline: 0;
    }

    .item {
        margin-bottom: 18px;
        font-size: 14px;
        color:#333;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 500px;
        margin:0 auto;
    }
    
</style>

<style>
    .el-card__header{
        padding:10px !important;
    }
    .el-card__body {
        padding:0  10px !important;
    }
    .el-table__header th{
        padding:5px 0 !important;
    }
    .el-table__body td{
        padding: 0 !important;
        height:35px !important;
    }
    .el-button{
        padding:10px !important;
    }
</style>


