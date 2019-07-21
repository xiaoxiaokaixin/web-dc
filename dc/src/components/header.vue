<template>
    <div>
        <div class="header">
            <div>
                <img style="float:left;height:60px;" src="../../public/img/place/logo.png" alt="">
                <ul class="list">
                    <li>
                        <a href="" @click="toPlace">首页</a>
                    </li>
                    <li><a href="" @click="toOrder">我的订单</a></li>
                    <li><a href="">加盟合作</a></li>
                    <li><a href="">我的客服</a></li>
                </ul>
                <div class="right">
                    <a href="">规则中心</a>
                    <a href="">手机应用</a>
                    <a href="">{{name}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            uid:'',
            name:''
        }
    },
    methods:{
        getName(){
            var uid=this.$route.params.uid;
            this.$http.get("getUser?uid="+uid).then(result=>{
                this.name=result.body[0].uname;
            })
            this.uid=uid;
        },
        toPlace(){
            this.$router.push("/place/"+this.uid);
        },
        toOrder(){
            this.$router.push("/order/"+this.uid);
        }
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
    *{
        font-family:PingFang SC,Lantinghei SC,Helvetica Neue,Microsoft Yahei,Hiragino Sans GB,Microsoft Sans Serif,WenQuanYi Micro Hei,sans;
    }
    div.header{
        width:100%;
        min-width:1180px;
        height:60px;
        background-color: #1e89e0;
    }
    div.header>div{
        width:1180px;
        height:60px;
        margin:0 auto;
    }
    ul.list{
        float: left;
        height:60px;
    }
    ul.list>li{
        float:left;
        height:60px;
    }
    ul.list>li>a{
        color:#fff;
        line-height: 60px;
        text-align: center;
        padding:0 40px;
    }
    div.right{
        float:right;
        height:60px;
    }
    div.right>a{
        color: #d2e7f9;
        font-size:14px;
        line-height: 60px;
        padding:0 30px;
    }
</style>


