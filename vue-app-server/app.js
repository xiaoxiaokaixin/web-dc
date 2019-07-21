const express=require("express");
const pool=require("./pool")
const bodyParser = require('body-parser');
const cors=require("cors")
const session = require('express-session');

const users=require('./routes/users.js');
const shop=require('./routes/shop.js');
const sj=require('./routes/sj.js');
const store=require('./routes/store.js');
const car=require('./routes/car.js');
const orders=require('./routes/order.js');
const wl=require('./routes/wl.js');
const comment=require('./routes/comment.js');
const upload=require('./routes/upload.js');


var app=express();
app.use(express.static(__dirname+"/public"))
app.use(cors({
    origin:["http://127.0.0.1:8080","http://localhost:8080"],
    credentials:true
}))
app.listen(3000);
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret: '128位随机字符串',
    resave: false,
    saveUninitialized: true,
  }))

//获取用户信息
app.get("/getUser",(req,res)=>{
    var uid=req.query.uid;
    var sql="SELECT uname,upwd,phone,address FROM dc_user WHERE uid=?"
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })  
})
//全部店铺
app.get("/getAll",(req,res)=>{
    var sql="SELECT * FROM store"
    pool.query(sql,[],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })  
})
//根据id获取店铺
app.get('/storeInfo',(req,res)=>{
    var sid=req.query.sid;
    var sql="SELECT * FROM store WHERE sid=?"
    pool.query(sql,[sid],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//店铺分类
app.get("/getStore",(req,res)=>{
    var type=req.query.type;
    var sql="SELECT * FROM store WHERE type=?"
    pool.query(sql,[type],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })  
})
//获取店铺信息分页显示
app.get("/getStorelist",(req,res)=>{
    var pno = req.query.pno;            
    var pageSize = req.query.pageSize; 
    var sql = "SELECT count(sid) as c FROM store";
    var obj = {};      //保存发送客户端数据
    var progress = 0;  //进度
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        var c = Math.ceil(result[0].c/pageSize);
        //console.log(c);
        obj.pageCount = c;
        progress+=20;
        if(progress==40){
            res.send(obj);
        }
        //console.log(c);
    });
    //查找当前页内容
    var sql = " SELECT *";
        sql += " FROM store";
        sql += " LIMIT ?,?";
    var offset = parseInt((pno-1)*pageSize);   
    //计算分页偏移量
    pageSize = parseInt(pageSize)
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err)throw err;
        //console.log(result);
        obj.data = result;
        progress+=20;
        if(progress==40){
            res.send(obj);
        }
    })
})

//用户模块
app.use("/users",users);
//店铺商品模块
app.use('/shop',shop);
//商家模块
app.use('/sj',sj);
//店铺信息模块
app.use('/store',store);
// 购物车模块
app.use('/car',car);
//订单模块
app.use('/orders',orders);
// 物流模块
app.use('/wl',wl);
// 评论模块
app.use('/comment',comment);
//上传文件模块
app.use('/upload',upload);

