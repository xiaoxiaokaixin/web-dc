<template>
    <div>
        <div class="main">
            <p class="title">门店信息</p>
            <div class="center">
                <div class="item">
                    <span class="label">姓名</span>
                    <input class="input" type="text" placeholder="请填写姓名" v-model="sjname">
                </div>
                <div class="item">
                    <span class="label">密码</span>
                    <input class="input" type="password" placeholder="请填写密码" v-model="spwd">
                </div>
                <div class="item">
                    <span class="label">电话</span>
                    <input class="input" type="text" placeholder="请填写电话" v-model="phone">
                </div>
                <div class="item">
                    <span class="label">门店名称</span>
                    <input class="input" type="text" placeholder="请输入门店名称" v-model="storename">
                </div>
                <div class="item">
                    <span class="label">门店分类</span>
                    <select name="mdfl" id="selId" class="mdfl" style="margin-right:15px;" v-model="type">
                        <!-- <option value="">店铺分类</option> -->
                        <option value="异国料理">异国料理</option>
                        <option value="面包蛋糕">面包蛋糕</option>
                        <option value="小吃宵夜">小吃宵夜</option>
                        <option value="特色菜系">特色菜系</option>
                        <option value="甜品饮品">甜品饮品</option>
                        <option value="快餐便当">快餐便当</option>
                    </select>
                </div>
                <div class="item">
                    <span class="label">详细地址</span>
                    <input class="input" type="text" placeholder="请输入详细地址" v-model="address">
                </div>
                <div class="item" style="text-align:center;">
                    <button class="btn" @click="sjRegisteStore">注册</button>
                    <router-link to="/sjlogin">
                        <button class="btn">登录</button>
                    </router-link>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            sjname:'',
            spwd:'',
            phone:'',
            storename:'',
            type:'异国料理',
            address:''           
        }
    },
    methods:{
        sjRegisteStore(){
            var sjname=this.sjname;
            var spwd=this.spwd;
            var phone=this.phone;
            this.$http.get("http://127.0.0.1:3000/sj/sjRegiste?sname="+sjname+"&spwd="+spwd+'&phone='+phone).then(result=>{
				if(result.data.ok==1){
                    this.$http.get("http://127.0.0.1:3000/sj/getSjId?sname="+sjname).then(result=>{
                        var sjid=result.body[0].sid;
                        var storename=this.storename;
                        var type=this.type;
                        var address=this.address;
                        this.$http.get("http://127.0.0.1:3000/sj/storeRegiste?sjid="+sjid+"&sname="+storename+"&type="+type+'&address='+address).then(result=>{
                            if(result.data.ok==1){
                                this.$alert('店铺注册成功，请登录进行店铺管理！',{
                                    confirmButtonText: '确定', 
                                });
                                this.$router.push("/sjlogin/");
                            }else if(result.data.ok==3){
                                this.$alert('店铺名已存在！',{
                                    confirmButtonText: '确定',
                                });
                            }else{
                                this.$alert('填写信息不能为空！',{
                                    confirmButtonText: '确定',
                                });
                            }
                        })
                        
                    })
                    
				}else if(result.data.ok==3){
                    this.$alert('商家名已被占用！',{
                        confirmButtonText: '确定',
                    });
				}else{
                    this.$alert('填写信息不能为空！',{
                        confirmButtonText: '确定',
                    });
                }
            })
        }
    },
    mounted(){
        
    },
    
}
</script>

<style scoped>
    div.main{
        width:990px;
        height:512px;
        margin:0 auto;
    }
    p.title{
        line-height: 110px;
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        color: #272727;
    }
    div.center{
        width:720px;
        margin:0 auto;
        margin-top:20px;
    }
    .center .item{
        width:720px;
        height:46px;
        margin-bottom:24px;
    }
    span.label{
        display: inline-block;
        width:120px;
        height:22px;
        font-size: 16px;
        line-height: 22px;
        color: #606266;
        padding: 12px 0;
        margin-right: 12px;
    }
    .input{
        border: 1px solid #dcdfe6;
        outline: none;
        width:500px;
        border-radius: 4px;
        padding: 0 15px;
        font-size: 14px;
        height: 38px;
        color:#333;
    }
    .input:focus{
        border: 1px solid #1989fa;
    }
    .btn{
        color: #fff;
        border:1px solid #1989fa;
        background-color: #1989fa;
        height: 36px;
        line-height: 36px;
        padding: 0 20px;
        border-radius: 4px;
        font-size: 14px;
        outline: none;
        cursor: pointer;
        text-align: center;
        margin:8px 15px 0 15px;

    }
    select.mdfl{
        width: 530px;
        height:38px;
        padding:0 15px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        outline: none;
        font-size: 14px;
        color: #333;
    }
</style>


