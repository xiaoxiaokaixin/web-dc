<template>
    <div>
        <el-table :data="getNewArray(orderList,'uname')" max-height="500" border style="width: 100%">
            <el-table-column prop="uname" label="姓名">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column label="下单次数">
                <template slot-scope="scope">
                    {{getNewArray(orderList,'oid').filter(x=>x.uname==scope.row.uname).length}}
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
            orderList:[],
            orderInfo:[],
        }
    },
    methods:{
        getList(){
            this.$http.get('http://localhost:3000/sj/getSjStore?sjid='+this.sjid).then(result=>{
                this.storeId=result.body[0].sid;
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
                                            this.$set(b,'phone',result.body[0].phone);
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
                console.log(this.orderList);
                console.log(this.orderInfo);
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
    },
    mounted(){
        this.getList();
    }
}
</script>

<style scoped>

</style>


