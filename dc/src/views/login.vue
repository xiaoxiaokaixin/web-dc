<template>
    <div>
        <div class="box">
            <div style="width:300px;text-align:center;">
                <img src="../../public/img/logo/logo2.png">
            </div>
            <div style="width:300px;height:280px;padding-top:15px;">
                <div>
                    <input type="text" placeholder="手机号" name="phone" v-model="phone">
                </div>
                <div>
                    <input type="password" placeholder="密码" name="upwd" v-model="upwd">
                </div>
                <p>
                    <span>选择注册或登录，表示已同意</span><a href="#" style="color: #2395ff;">《用户服务协议》</a>
                </p>
                <button id='registe' @click="registe">注册</button>
                <button id="login" @click="signin">登录</button>
            </div>
        </div>
        <foot></foot>
    </div>
</template>

<script>
import foot from '../components/footer.vue'
export default {
    data(){
        return{
            phone:"",
            upwd:""
        }
    },
    methods:{
        //登陆验证
        signin(){
            var phone=this.phone;
			var upwd=this.upwd;
            this.$http.get("http://127.0.0.1:3000/users/signin?phone="+phone+"&upwd="+upwd).then(result=>{
				if(result.data.ok==1){
                    var uid=result.data.uid;
                    this.$router.push("/place/"+uid);
				}else{
                    this.$alert('用户名或密码错误！',{
                        confirmButtonText: '确定',
                    });
				}
            })
        },
        //注册
        registe(){
            var phone=this.phone;
			var upwd=this.upwd;
            this.$http.get("http://127.0.0.1:3000/users/registe?phone="+phone+"&upwd="+upwd).then(result=>{
				if(result.data.ok==1){
                    this.$alert('注册成功，请登录！',{
                        confirmButtonText: '确定',
                    });
				}else if(result.data.ok==3){
                    this.$alert('该用户已存在！',{
                        confirmButtonText: '确定',
                    });
				}else{
                    this.$alert('用户名或密码不能为空！',{
                        confirmButtonText: '确定',
                    });
                }
            })
        }
    },
    components:{
        foot,
    }
}
</script>

<style scoped>
    div.box{
        width:300px;
        height:456px;
        margin:0 auto;
        padding-top:50px;
    }
    div.box input{
        width:288px;
        height:46px;
        font-size:14px;
        padding-left: 10px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 4px;
        color: #333;
        outline: none;
    }
    div.box input:focus{
        border: 1px solid #1b9dff;
    }
    div.box p{
        font-size: 14px;
        line-height: 20px;
        color: #999;
    }
    #login,#registe{
        height: 42px;
        width:140px;
        border: none;
        outline: none;
        cursor: pointer;
        margin-top: 30px;
        border-radius: 4px;
        background: #4cd96f;
        color: #fff;
        text-align: center;
        font-size: 16px;
        line-height: 42px;
    }
    #registe{
        margin-right:10px;
    }
    #login{
        margin-left:10px;
    }
    #login:hover{
        background: #4CD964;
    }
    #registe:hover{
        background: #4CD964;
    }
</style>


