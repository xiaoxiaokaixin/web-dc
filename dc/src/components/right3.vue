<template>
        <div class="main_right">
                    <h3>近三个月订单</h3>
                    <div class="base">
                        <!-- 循环 -->
                        <table style="width:95%">
                            <tr>
                                <td>下单时间</td>
                                <td>店铺名称</td>
                                <td>购买商品</td>
                                <td>消费/元</td>
                                <td>订单状态</td>
                                <td>操作</td>
                            </tr>
                            <tr v-for="(item,i) in orderList" :key="i">
                                <td>{{item.time | time}}</td>
                                <td>
                                    <span v-for="x in getNewArray(orderInfo[i],'sname')" :key="x.id">
                                        {{x.sname}}, 
                                    </span>
                                </td>
                                <td>
                                    <span v-for="x in orderInfo[i]" :key="x.id">
                                        {{x.name}}*{{x.number}},
                                    </span>
                                </td>
                                <td>{{getSum(orderInfo[i])}}</td>
                                <td>{{item.type}}</td>
                                <td>
                                    <el-button size="mini" type="primary" plain  @click="ckwl(item.type)">物流</el-button>
                                    <el-button size="mini" type="success" plain @click="sh(item.oid)" :disabled="item.type=='已申请退货' || item.type=='退货成功' || item.type=='订单已完成'">收货</el-button>
                                    <el-button size="mini" type="warning" plain @click="th(item.oid)" :disabled="item.type=='已申请退货' || item.type=='退货成功' || item.type=='订单已完成'">退货</el-button>
                                    <el-button size="mini" type="danger" plain :disabled="item.type!='订单已完成'" @click="pj=true">评价</el-button>
                                    <el-dialog title="发布评价" :visible.sync="pj" style="text-align:left;">
                                        <div style="padding:0 50px;" class="clear">
                                            <el-rate
                                                v-model="grade"
                                                show-text>
                                            </el-rate>
                                            <div style="margin-top:15px;"></div>
                                            <el-input
                                                type="textarea"
                                                :rows="4"
                                                placeholder="请输入内容"
                                                v-model="content">
                                            </el-input>
                                            <div style="margin-top:15px;"></div>
                                            <el-button type="success" size="mini" style="float:right;" @click="yhpl(orderInfo[i][0].sid)">提交评价</el-button>
                                        </div>
                                    </el-dialog>
                                </td>
                            </tr>
                        </table>
                        <el-dialog title="订单跟踪" :visible.sync="wl">
                            <div class="block">
                                <el-timeline>
                                    <el-timeline-item
                                    v-for="(item, index) in wlInfo"
                                    :key="index"
                                    :type='item.color'
                                    :timestamp="item.time">
                                    {{item.type}}
                                    </el-timeline-item>
                                </el-timeline>
                            </div>
                        </el-dialog>
                        
                    </div>
            </div>
</template>

<script>
export default {
    data(){
        return{
            uid:this.$route.params.uid,
            orderList:[],
            orderInfo:[],
            wl: false,
            wlInfo:[],
            pj:false,
            grade:0,
            content:''
            
        }
    },
    methods:{
        // 查询所有订单
        getAllOrders(){
            this.$http.get('http://localhost:3000/orders/getAllOrders?uid='+this.uid).then(result=>{
                this.orderList=result.body;
                //console.log(this.orderList);
                //查询所有订单详情信息
                this.orderList.forEach(item=>{
                    //console.log(item.oid);
                    this.$http.get('http://localhost:3000/orders/getOrderDetails?oid='+item.oid).then(result=>{     
                        var rs=result.body;
                        //console.log(rs);
                        rs.forEach(a=>{
                            //console.log(a.gid);
                            this.$http.get('http://localhost:3000/shop/getMenuInfo?id='+a.gid).then(result=>{
                                //console.log(result.body[0]);
                                this.$set(a,'name',result.body[0].name);
                                this.$set(a,'price',result.body[0].price);
                            });
                            this.$http.get('http://localhost:3000/shop/getStoreId?id='+a.gid).then(result=>{
                                var mid=result.body[0].mid;
                                this.$http.get('http://localhost:3000/shop/getStoreName?sid='+mid).then(result=>{
                                    var sname=result.body[0].sname;
                                    this.$set(a,'sname',sname);
                                    this.$set(a,'sid',mid);
                                })
                            })

                        })
                        this.orderInfo.push(rs);
                    })
                    
                })
                //console.log(this.orderInfo);
                return this.orderInfo;
            })
        },
        //计算总价
        getSum(arr){
            var sum=0;
            if(!arr){
                return;
            }
            arr.forEach(item=>{
                sum+= item.number*item.price;
            })
            return sum;
            
        },
        //去重(用来取店名)
        getNewArray(arr,key){
            const set=new Set();
            if(!arr || !key){
                return;
            }
            this.newArr = arr.filter(item => !set.has(item[key]) ? set.add(item[key]) : false);
            //console.log(this.newArr); 
            return this.newArr;
        },
        // 收货
        sh(oid) {
            this.$http.get('http://localhost:3000/orders/updateType4?oid='+oid).then(result=>{
                console.log(result.data);
            })
            this.$router.go(0)
        },
        //退货
        th(oid){
            this.$http.get('http://localhost:3000/orders/updateType5?oid='+oid).then(result=>{
                console.log(result.data);
            })
            this.$router.go(0)
        },
        //查看物流
        ckwl(tp){
            this.wl=true;
            if(tp=='等待商家接单'){
                this.$http.get('http://localhost:3000/wl/selectWl1').then(result=>{
                    this.wlInfo=result.data;
                    this.wlInfo[this.wlInfo.length-1].color='primary';
                })
            }
            if(tp=='商家已接单'){
                this.$http.get('http://localhost:3000/wl/selectWl2').then(result=>{
                    this.wlInfo=result.data;
                    this.wlInfo[this.wlInfo.length-1].color='primary';
                })
            }
            if(tp=='正在配送中'){
                this.$http.get('http://localhost:3000/wl/selectWl3').then(result=>{
                    this.wlInfo=result.data;
                    this.wlInfo[this.wlInfo.length-1].color='primary';
                })
            }
            if(tp=='订单已完成'){
                this.$http.get('http://localhost:3000/wl/selectWl4').then(result=>{
                    this.wlInfo=result.data;
                    this.wlInfo[this.wlInfo.length-1].color='primary';
                })
            }
            if(tp=='已申请退货'){
                this.$http.get('http://localhost:3000/wl/selectWl5').then(result=>{
                    this.wlInfo=result.data;
                    this.wlInfo[this.wlInfo.length-1].color='primary';
                })
            }
            if(tp=='退货成功'){
                this.$http.get('http://localhost:3000/wl/selectWl6').then(result=>{
                    this.wlInfo=result.data;
                    this.wlInfo[this.wlInfo.length-1].color='primary';
                })
            }
        },
        //用户评论
        yhpl(sid){
            var myDate=new Date();
            var year=myDate.getFullYear();
            var month=myDate.getMonth()+1;
            var day=myDate.getDate();
            var time=year+'-'+month+'-'+day;
            this.$http.get('http://localhost:3000/comment/createComment?uid='+this.uid+'&sid='+sid+'&grade='+this.grade+'&content='+this.content+'&time='+time).then(result=>{
                console.log(result.body);
            })
            this.$message({
                message: '您已成功发表评论',
                type: 'success'
            });
        }
    },
    mounted(){
        this.getAllOrders();
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
        
    }
}
</script>

<style scoped>
    div.main_right{
        width:972px;
        border: 1px solid #eee;
        background-color: #fff;
        min-height: 600px;
        padding: 20px 18px;
        float:left;
    }
    .clear::after{
        display: block;
        content: '';
        clear: both;
    }
    div.main_right>h3{
        border-bottom: 2px solid #f4f4f4;
        padding: 0 20px 11px;
        font-size: 18px;
        font-weight: 700;
    }
    div.base{
        margin-top: 39px;
        margin-left: 42px;
        font-size:14px;
        color:#333;
    }
    table{
        border-collapse:collapse; 
    }
    table td{
        border:1px solid #ddd;
        height:1cm;
        color:#aaa;
        text-align: center;
    }
</style>

<style>
    div.block{
        padding-left:150px !important;
    }
</style>


