<template>
    <div style="padding-top:80px;padding-bottom:30px;background:#f5f5f5;">
        <div class="login_box">
            <div style="height:50px;">
                <p style="text-align:center;margin-bottom:8px;color: #2d2f33;font-size: 18px;">商家登录</p>
                <p style="text-align:center;font-size:14px;margin-bottom:23px;color:#999;">为您量身定制的餐饮管理左右手</p>
            </div>
            <div class="form">
                <div>
                    <input type="text" placeholder="请输入手机号" v-model="phone"> 
                </div>
                <div style="margin:12px 0 8px;">
                    <input type="password" placeholder="请输入密码" v-model="spwd" @keyup.13='sjLogin'>
                </div>
                <button @click="sjLogin">登录</button>
            </div>
        </div>
        <div class="login_footer">
            <span>没有账号？</span>
            <a href="kaidian">去开店</a>
        </div>
        <div class="mobile">
            手机版下载
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            phone:"",
            spwd:""
        }
    },
     methods:{
        //登陆验证
        sjLogin(){
            var phone=this.phone;
			var spwd=this.spwd;
            this.$http.get("http://127.0.0.1:3000/sj/sjlogin?phone="+phone+"&spwd="+spwd).then(result=>{
				if(result.data.ok==1){
                    var sid=result.data.sid;
                    this.$router.push("/storeadmin/"+sid);
				}else{
                    this.$alert('用户名或密码错误，请重新输入！',{
                        confirmButtonText: '确定',
                    });
				}
            })
        }
    }   
}
</script>

<style scoped>
    div.login_box{
        margin: 0 auto;
        width: 300px;
        height:327px;
        padding:24px 40px;
        border-radius: 3px;
        background-color: #fff;
        box-shadow: 0 1px 4px 0 rgba(0,0,0,.06);
    }
    div.form{
        margin-top:60px;
    }
    div.form input{
        padding: 0 10px;
        width: 100%;
        font-size: 14px;
        line-height: 40px;
        border:1px solid #e7ebf5;
        border-radius: 3px;
        background-color: #fff;
        color:#333;
    }
    input::-webkit-input-placeholder{
        color:#aaa;
    }
    div.form button{
        border:none;
        width:100%;
        margin-top: 20px;
        padding: 0 16px;
        font-size: 16px;
        line-height: 43px;
        border-radius: 3px;
        background-color: #0091ea;
        color: #fff;
        outline: none;
        cursor: pointer;
    }
    div.form button:hover{
        background: #0071b7;
    }
    div.login_footer{
        width:380px;
        height:18px;
        margin: 0 auto;
        margin-top:20px;
        padding:23px 0;
        text-align: center;
        color: #878d99;
        font-size: 14px;
        border-radius: 3px;
        background-color: #fff;
        box-shadow: 0 1px 4px 0 rgba(0,0,0,.06);
    }
    div.login_footer>a{
        margin-left: 8px;
        color: #1989fa;
    }
    div.mobile{
        margin-top: 20px;
        color: #1989fa;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
    }
</style>


