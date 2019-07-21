<template>
    <div>
        <el-card>
            <div slot="header">
                <span>店铺信息管理</span>
            </div>
            <div style="text-align:left;border-bottom:1px solid #eee;padding-bottom:20px;" class="clear">
                <span style="float:left;margin:50px 300px 0 100px;">修改头像</span>
                <el-upload id="tx" 
                action="https://jsonplaceholder.typicode.com/posts/" 
                :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div style="text-align:left;border-bottom:1px solid #eee;">
                <span style="display:inline-block;margin:20px 300px 20px 100px;">修改电话</span>
                <input type="text" v-model="phone">
                <el-button type="danger" style="margin-left:50px;" @click="updatePhone">确认</el-button>
            </div>
            <div style="text-align:left;border-bottom:1px solid #eee;">
                <span style="display:inline-block;margin:20px 300px 20px 100px;">修改店名</span>
                <input type="text" v-model="sname">
                <el-button type="danger" style="margin-left:50px;" @click="updateName">确认</el-button>
            </div>
            <div style="text-align:left;border-bottom:1px solid #eee;">
                <span style="display:inline-block;margin:20px 300px 20px 100px;">修改地址</span>
                <input type="text" v-model="address">
                <el-button type="danger" style="margin-left:50px;" @click="updateAddress">确认</el-button>
            </div>
            <div style="text-align:left;border-bottom:1px solid #eee;">
                <span style="display:inline-block;margin:20px 300px 20px 100px;">永远注销该店铺</span>
                <el-button type="warning" style="margin-left:150px;">确认</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
            sjid:this.$route.params.sid,
            phone:'',
            sname:'',
            address:'',
            successUrl:'',
            imageUrl:''
        }
    },
    methods:{

        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        //修改电话
        updatePhone(){
            this.$http.get("http://127.0.0.1:3000/store/updateStorePhone?phone="+this.phone+'&sid='+this.sjid).then(result=>{
                //console.log(result)
                if(result.body.code==1){
                    this.$alert('电话修改成功',{
                        confirmButtonText: '确定',
                    });
                }else{
                    this.$alert('电话修改失败，请重新输入',{
                        confirmButtonText: '确定',
                    });
                }
            })
        },
        // 修改店名
        updateName(){
            this.$http.get("http://127.0.0.1:3000/store/updateStoreName?sname="+this.sname+'&sjid='+this.sjid).then(result=>{
                //console.log(result)
                if(result.body.code==1){
                    this.$alert('店铺名修改成功',{
                        confirmButtonText: '确定',
                    });
                }else{
                    this.$alert('店铺名修改失败，请重新输入',{
                        confirmButtonText: '确定',
                    });
                }
            })
        },
        // 修改地址
        updateAddress(){
            this.$http.get("http://127.0.0.1:3000/store/updateAddress?address="+this.address+'&sjid='+this.sjid).then(result=>{
                //console.log(result)
                if(result.body.code==1){
                    this.$alert('地址修改成功',{
                        confirmButtonText: '确定',
                    });
                }else{
                    this.$alert('地址修改失败，请重新输入',{
                        confirmButtonText: '确定',
                    });
                }
            })
        },
        // 修改头像
        
        // 注销店铺
        
    }
}
</script>

<style scoped>
    #tx{
    border:1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width:120px;
    }
    #tx:hover{
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height:120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
    .el-cord span{
        font-weight: bolder;
    }
</style>


