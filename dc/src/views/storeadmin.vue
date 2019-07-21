<template>
    <div>
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="3"><div>哆集外卖·后台管理</div></el-col>
                    <el-col :span="3" :offset='18'><div>{{storeName}}</div></el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu default-active="2">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                <span>店铺管理</span>
                            </template>
                            <el-menu-item-group>
                                <router-link :to="'/storeadmin/store/'+sid">
                                    <el-menu-item index="1-1">
                                        店铺信息管理
                                    </el-menu-item>
                                </router-link> 
                                <router-link :to="'/storeadmin/products/'+sid">
                                    <el-menu-item index="1-2">
                                        餐品信息管理
                                    </el-menu-item>
                                </router-link>
                            </el-menu-item-group>
                        </el-submenu>
                        <router-link :to="'/storeadmin/dingdans/'+sid">
                            <el-menu-item index="2">
                                <i class="el-icon-tickets"></i>
                                <span slot="title">订单</span>
                            </el-menu-item>
                        </router-link>
                        <router-link :to="'/storeadmin/customer/'+sid">
                        <el-menu-item index="3">
                            <i class="el-icon-view"></i>
                            <span slot="title">顾客</span>
                        </el-menu-item>
                        </router-link>       
                        <router-link :to="'/storeadmin/sales/'+sid">     
                            <el-menu-item index="4">
                                <i class="el-icon-edit"></i>
                                <span slot="title">销量统计</span>
                            </el-menu-item>
                        </router-link> 
                        <router-link to="/storeadmin/help">     
                        <el-menu-item index="5">
                            <i class="el-icon-star-on"></i>
                            <span slot="title">帮助</span>
                        </el-menu-item>
                        </router-link>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
      return {
            sid:this.$route.params.sid,
            storeName:''
      }
    },
    methods: {
        getName(){  
            var sjid=this.sid;
            this.$http.get("http://127.0.0.1:3000/sj/getSjStore?sjid="+sjid).then(result=>{
                this.storeName=result.body[0].sname;
            })
        },
    },
    created(){
        this.getName();  
        },
    mounted(){
        this.getName();
    }
}
</script>

<style scoped>
    .el-header{
        background-color: #409EFF;
        color: #fff;
        text-align: center;
        line-height: 60px;
    }
    .el-aside {
        background-color:#fff;
        color: #333;
        min-height: 550px;
    }
    .el-main {
        color: #333;
        text-align: center;
        background: #f5f5f5;
    }
    .el-menu{
        min-height: 550px;
    }
    .clear::after{
        display: block;
        content: '';
        clear: both;
    }

</style>
