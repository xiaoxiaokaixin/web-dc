<template>
    <div>
        <el-card class="box-card">
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <div id="main" style="width: 1000px;height:400px;padding:35px 0;"></div>
        </el-card>
    </div>
</template>

<script>

export default {
    data(){
        return{
            sjid:this.$route.params.sid,
            storeId:0,
            menu:[],
            sales:[],
            orderIinfo:[],
        }
    },
    methods:{
        // 统计图
        getxl(){
            var echarts = require('echarts');
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
            // 指定图表的配置项和数据
            this.$http.get('http://localhost:3000/sj/getSjStore?sjid='+this.sjid).then(result=>{
                this.storeId=result.body[0].sid;
                this.$http.get('http://localhost:3000/shop/getMenu?mid='+this.storeId).then(result=>{
                    var ms=result.body;
                    ms.forEach(item => {
                        this.menu.push(item.name)
                        //console.log(item.id);
                        this.$http.get('http://localhost:3000/orders/getStoreOrders?gid='+item.id).then(result=>{
                            var s=result.body;
                            //console.log(s);
                            var sale=0;
                            if(s.length<0){
                                sale=0;
                            }else{
                                s.forEach(x=>{
                                    //console.log(x)
                                    sale+=x.number;
                                }) 
                            }
                            this.sales.push(sale);
                            myChart.setOption({
                                title: {
                                    text: '销量统计图'
                                },
                                tooltip: {},
                                legend: {
                                    data:['销量']
                                },
                                xAxis: {
                                    data:this.menu,
                                    axisLabel: {  
                                        interval:0,  
                                        rotate:35 
                                    }  
                                },
                                yAxis: {
                                    minInterval: 1
                                },
                                series: [{
                                    name: '销量',
                                    type: 'line',
                                    data: this.sales,
                                    itemStyle: {   
                                        normal: {
                                            color: 'hotpink'
                                        }
                                    }
                                }]
                            });
                        })
                        
                    });
                })
            })
            
        }
    },
    mounted(){ 
        this.getxl();
    }
}
</script>

<style scoped>

</style>


