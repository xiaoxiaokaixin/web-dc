const express=require("express");
const router=express.Router();
const pool=require("../pool");
var formidable = require('formidable');
var fs = require("fs");

router.post("/",function(req,res,next){
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8' // 编码
    form.keepExtensions = true // 保留扩展名
    //设置文件上传存放地址
    form.uploadDir = "./public/img/shop";
    //执行里面的回调函数的时候，表单已经全部接收完毕了。
    form.parse(req, function(err, fields, files) {
        if (err) return next(err)
        //console.log("files:",files)  //这里能获取到图片的信息
        //console.log("fields:",fields) //这里能获取到传的参数的信息，如上面的message参数，可以通过fields。message来得到
        res.send({
            code: 1,
            message: 'upload success',
            path:files.file.path
        })
    })
})



module.exports=router;