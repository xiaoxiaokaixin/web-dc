<template>
        <div class="main_right">
                    <h3>修改资料</h3>
                    <div class="base">
                        <p>
                            <span>用户名</span>
                            <input type="text" v-model="uname">
                        </p>
                        <p>
                            <span>密码</span>
                            <input type="password" v-model="upwd">
                        </p>
                        <p>
                            <span>手机号</span>
                            <input type="text" v-model="phone">
                        </p>
                        <p>
                            <span>修改吗？</span>
                            <button style="margin-left:40px;" @click="qx">取消</button>
                            <button style="margin-left:10px;" @click="updatePer">确定</button>
                        </p>
                    </div>
            </div>
</template>

<script>
export default {
    data(){
        return{
            uid:this.$route.params.uid, 
            uname:"",
            upwd:"",
            phone:''
        }
    },
    methods:{
        updatePer(){
            this.$http.get("users/update?uname="+this.uname+'&&upwd='+this.upwd+'&&phone='+this.phone+'&&uid='+this.uid).then(result=>{
                console.log(result)
                if(result.body.code==1){
                    this.$alert('修改成功',{
                        confirmButtonText: '确定',
                    });
                }else{
                    this.$alert('修改失败，请重新输入',{
                        confirmButtonText: '确定',
                    });
                }
            })
        },
        qx(){
            this.$alert('您已取消修改',{
                confirmButtonText: '确定',
            });
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
    div.base>p{
        margin-bottom: 20px;
    }
    div.base>p>span{
        margin-right: 15px;
        width: 60px;
        text-align: right;
        vertical-align: middle;
        display: inline-block;
    }
</style>


