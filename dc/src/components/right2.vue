<template>
        <div class="main_right">
                    <h3>地址管理</h3>
                    <div class="base">
                        <p>{{uname}}</p>
                        <p>{{address}}</p>
                        <p>{{phone}}</p>
                        <span>新地址：</span><input type="text" v-model="newaddress" @keypress="updateAddress">
                        <button style="margin-left:5px;" @click="updateAddress">修改</button>
                    </div>
            </div>
</template>

<script>
export default {
    data(){
        return{
            uid:this.$route.params.uid, 
            uname:'',
            address:'',
            phone:'',
            newaddress:''
        }
    },
    methods:{
        updateAddress(){
            this.$http.get("users/updateAddress?address="+this.newaddress+'&&uid='+this.uid).then(result=>{
                // console.log('旧地址'+this.address)
                // console.log('新地址'+this.newaddress)
                if(result.body.code==1){
                    this.address=this.newaddress;
                    this.$alert('新地址修改成功',{
                        confirmButtonText: '确定',
                    });
                }else{
                    this.$alert('修改失败，请重新输入',{
                        confirmButtonText: '确定',
                    });
                }
            })
        }
    },
    mounted(){
        this.$http.get("getUser?uid="+this.uid).then(result=>{
            this.uname=result.body[0].uname;
            this.address=result.body[0].address;
            this.phone=result.body[0].phone;
        })
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


