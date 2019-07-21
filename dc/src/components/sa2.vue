<template>
    <div>
        <el-table :data="tableData" max-height='450' style="width:100%" >
            <el-table-column label="商品名称" prop="name">
            </el-table-column>
            <el-table-column label="商品分类" prop="type">
            </el-table-column>
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <img :src="scope.row.pic" style="width:50px;">
                </template>
            </el-table-column>
            <el-table-column label="价格/元" prop="price">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="getGood(scope.row.id)">修改</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
            <el-form :model="good">
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="good.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" :label-width="formLabelWidth">
                    <el-input v-model="good.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片" :label-width="formLabelWidth">
                    <el-upload class="upload-demo" ref="upload" 
                    action="https://jsonplaceholder.typicode.com/posts/" 
                    :on-remove="handleRemove" :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="价格" :label-width="formLabelWidth">
                    <el-input v-model="good.price" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="qx1()">取 消</el-button>
                <el-button type="primary" @click="updateGood()">确 定</el-button>
            </div>
        </el-dialog>
        <div style="margin-top: 20px">
            <el-button @click="dialogFormVisible2 = true">添加新品</el-button>
        </div>
        <el-dialog title="添加商品" :visible.sync="dialogFormVisible2">
            <el-form ref="form" :model="form">
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="addName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" :label-width="formLabelWidth">
                    <el-input v-model="addType" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片" :label-width="formLabelWidth">
                    <el-upload class="upload-demo" ref="upload" action="" :on-change="onchange" :on-remove="handleRemove" :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="价格" :label-width="formLabelWidth">
                    <el-input v-model="addPrice" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="qx2()">取 消</el-button>
                <el-button type="primary" @click="addGood()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { watch } from 'fs';
export default {
    data(){
        return{
            mid:this.$route.params.sid,
            tableData: [],
            form:{
          　　　name: ''
        　　},
        　　 param:"",//表单要提交的参数
            dialogTableVisible: false,
            dialogFormVisible: false,
            dialogFormVisible2: false,
            good:{},
            addName:'',
            addType:'',
            addPrice:'',
            picName:'',
            formLabelWidth: '120px',
        }
    },
    methods:{
        //获取店铺商品
        getMenus(){
            this.$http.get('http://localhost:3000/shop/getMenu?mid='+this.mid).then(result=>{
                this.tableData=result.body;
                // console.log(this.tableData);
            }) 
        },
        handleRemove(file) {
            console.log(file);
        },
        //上传图片
        onchange(file) {
            console.log(file);
            //重新写一个表单上传的方法
            this.param = new FormData();
            this.param.append('file', file.raw, file.name);
        },
        //上传图片到服务器
        submitUpload() {
            var names = this.form.name;
            //下面append的东西就会到form表单数据的fields中；
            this.param.append('message', names);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            //然后通过下面的方式把内容来传到后台
            this.$http.post("http://localhost:3000/upload", this.param, config).then(function(result) {
                console.log(result);
                this.picName=result.data.path;
                console.log(this.picName);
            })
            this.$refs.upload.submit();
        },
        //删除商品
        handleDelete(id){
            this.$confirm('此操作将永久商品, 是否继续?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.$http.get('http://localhost:3000/shop/deleteMenu?gid='+id).then(result=>{
                    return true;
                })
                this.$router.go(0)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });   
        },
        //获取每行商品信息
        getGood(id){
            this.dialogFormVisible=true;
            //console.log(id);
            this.$http.get('http://localhost:3000/shop/getMenuInfo?id='+id).then(result=>{
                this.good=result.data[0];
            })
        },
        //修改商品信息
        updateGood(){
            this.dialogFormVisible = false
            var id=this.good.id;
            var name=this.good.name;
            var type=this.good.type;
            var price=this.good.price;
            this.$http.get('http://localhost:3000/shop/updateGood?name='+name+'&&type='+type+'&&price='+price+'&&id='+id).then(result=>{
                if(result.body.code==1){
                    this.$message({
                        type: 'success',
                        message: '您已成功修改此商品信息！'
                    });
                    this.$router.go(0)
                }else{
                    this.$message({
                        type: 'info',
                        message: '修改商品信息失败！'
                    });
                }
            })
        },
        //取消修改
        qx1(){
            this.dialogFormVisible = false;
            this.$message({
                type: 'info',
                message: '您已取消修改此商品信息！'
            });
        },
        //添加商品
        addGood(){
            this.dialogFormVisible2 = false;
            var name=this.addName;
            var type=this.addType;
            var price=this.addPrice;
            this.picName='http://localhost:3000'+this.picName.substring(6);
            this.$http.get('http://localhost:3000/shop/addGood?name='+name+'&&type='+type+'&&price='+price+'&&pic='+this.picName+'&&mid='+this.mid).then(result=>{
                if(result.body.code==1){
                    this.$message({
                        type: 'success',
                        message: '您已成功添加商品！'
                    });
                    this.$router.go(0)
                }else{
                    this.$message({
                        type: 'info',
                        message: '添加商品失败！'
                    });
                }
            })
        },
        //取消添加商品
        qx2(){
            this.dialogFormVisible2 = false;
            this.$message({
                type: 'info',
                message: '您已取消添加商品！'
            });
        },
    },
    
    mounted(){
        this.getMenus();
    },
}
</script>

<style scoped>

</style>


