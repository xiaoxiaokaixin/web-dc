<template>
    <div>
        <el-table :data="getNewArray(orderList,'oid')" max-height="500" border style="width: 100%">
            <el-table-column label="下单时间" width="100">
                <template slot-scope="scope">
                    {{scope.row.time | time}}
                </template>
            </el-table-column>
            <el-table-column prop="uname" label="用户名称" width="90">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="170">
            </el-table-column>
            <el-table-column label="订单内容">
                <template slot-scope="scope">
                    <span v-for="(ite,index) in orderInfo.filter(x=>x.oid==scope.row.oid)" :key="index">{{ite.name}}*{{ite.number}},</span>
                </template>
            </el-table-column>
            <el-table-column label="支付金额（元）" width="120">
                <template slot-scope="scope">
                    <span>{{getSum(orderInfo.filter(x=>x.oid==scope.row.oid))}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="状态" width="110">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" :disabled="scope.row.type!='等待商家接单'" @click="handleEdit(scope.row.oid)">接单</el-button>
                    <el-button size="mini" type="success" :disabled="scope.row.type!='商家已接单'" @click="handleEdit2(scope.row.oid)">配送</el-button>
                    <el-button size="mini" type="warning" :disabled="scope.row.type!='已申请退货'" @click="handleEdit3(scope.row.oid)">退货</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            sjid:this.$route.params.sid,
            storeId:0,
            menus:[],
            orderList:[],
            orderInfo:[],
                
        }
    },
    methods: {
        // 获得本店订单
        getOrders(){
            this.$http.get('http://localhost:3000/sj/getSjStore?sjid='+this.sjid).then(result=>{
                this.storeId=result.body[0].sid;
                //console.log(this.storeId);
                this.$http.get('http://localhost:3000/shop/getMenu?mid='+this.storeId).then(result=>{
                    this.menus=result.body
                    //console.log(this.menus);
                    this.menus.forEach(item=>{
                        //console.log(item.id);
                        this.$http.get('http://localhost:3000/orders/getStoreOrders?gid='+item.id).then(result=>{
                            if(result.body.length==0){
                                return;
                            }
                            //console.log(result.body);
                            //this.orderInfo.push(result.body);
                            var rs=result.body;
                            rs.forEach(a=>{
                                //console.log(a);
                                this.$http.get('http://localhost:3000/orders/getOidOrder?oid='+a.oid).then(result=>{
                                    //console.log(result.body[0]);
                                    //var rs2=result.body;
                                    this.orderList.push(result.body[0]);
                                    this.orderList.forEach(b=>{
                                        //console.log(b.uid);
                                        this.$http.get('http://localhost:3000/getUser?uid='+b.uid).then(result=>{
                                            //console.log(result.body[0]);
                                            this.$set(b,'uname',result.body[0].uname);
                                            this.$set(b,'address',result.body[0].address);
                                        })
                                    })     
                                })
                                this.$http.get('http://localhost:3000/shop/getMenuInfo?id='+a.gid).then(result=>{
                                    //console.log(result.body[0]);
                                    this.$set(a,'name',result.body[0].name);
                                    this.$set(a,'price',result.body[0].price);
                                });
                                this.orderInfo.push(a);
                            })
                        })
                    })

                }) 
                //console.log(this.orderList);
                //console.log(this.orderInfo);
            })
            
        },
        //去重
        getNewArray(arr,key){
            const set=new Set();
            if(!arr || !key){
                return;
            }
            this.newArr = arr.filter(item => !set.has(item[key]) ? set.add(item[key]) : false);
            //console.log(this.newArr); 
            return this.newArr;
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
        // 接单
        handleEdit(oid) {
            this.$http.get('http://localhost:3000/orders/updateType?oid='+oid).then(result=>{
                console.log(result.data);
            })
            this.$router.go(0)
        },
        // 配送
        handleEdit2(oid) {
            this.$http.get('http://localhost:3000/orders/updateType2?oid='+oid).then(result=>{
                console.log(result.data);
            })
            this.$router.go(0)
        },
        //同意退货
        handleEdit3(oid) {
            this.$http.get('http://localhost:3000/orders/updateType3?oid='+oid).then(result=>{
                console.log(result.data);
            })
            this.$router.go(0)
        },

    },
    mounted(){
        this.getOrders()
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

<style>
    .el-table__header th{
        padding:5px 0 !important;
    }
    .el-table__body td{
        padding: 0 !important;
        height:35px !important;
    }
    
</style>


