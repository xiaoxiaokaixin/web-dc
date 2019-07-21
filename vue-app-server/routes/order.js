const express=require("express")
const router=express.Router()
const pool=require("../pool")

//创建订单
router.get("/createOrder",(req,res)=>{
    var uid=req.query.uid;
    var time=req.query.time;
    var ispay=req.query.ispay;
    var sql1="INSERT INTO orders VALUES (NULL,?,?,?,'等待商家接单')"
    pool.query(sql1,[uid,time,ispay],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({ok:1,msg:'createOrder success'});
        }else{
            res.send({ok:0,msg:'createOrder error'});
        }
    })  
})

// 获取订单oid
router.get("/getOrderId",(req,res)=>{
    var uid=req.query.uid;
    var sql="SELECT max(oid) FROM orders WHERE uid=?"
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })  
})

//创建订单详情表
router.get("/createOrderDetails",(req,res)=>{
    var gid=req.query.gid;
    var number=req.query.number;
    var oid=req.query.oid;
    var sql1="INSERT INTO order_details VALUES (NULL,?,?,?)"
    pool.query(sql1,[oid,gid,number,],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({ok:1,msg:'createOrderDetails success'});
        }else{
            res.send({ok:0,msg:'createOrderDetails error'})
        }
    })  
})

//查询指定oid的订单
router.get("/getOrderDetails",(req,res)=>{
    var oid=req.query.oid;
    var sql="SELECT * FROM order_details WHERE oid=?"
    pool.query(sql,[oid],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })  
})

// 查询某用户的所有订单
router.get("/getAllOrders",(req,res)=>{
    var uid=req.query.uid;
    var sql="SELECT * FROM orders WHERE uid=?"
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })  
})

//查询指定gid的订单
router.get("/getStoreOrders",(req,res)=>{
    var gid=req.query.gid;
    var sql="SELECT * FROM order_details WHERE gid=?"
    pool.query(sql,[gid],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })  
})

//获取指定oid的订单
router.get("/getOidOrder",(req,res)=>{
    var oid=req.query.oid;
    var sql="SELECT * FROM orders WHERE oid=?"
    pool.query(sql,[oid],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })  
})

//商家接单
router.get("/updateType",(req,res)=>{
    var oid=req.query.oid;
    var sql="UPDATE orders set type='商家已接单' WHERE oid=?"
    pool.query(sql,[oid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,mgs:'update address success'});
        }else{
            res.send({code:0,mgs:'update address error'});
        }
    })  
})

//商家配送
router.get("/updateType2",(req,res)=>{
    var oid=req.query.oid;
    var sql="UPDATE orders set type='正在配送中' WHERE oid=?"
    pool.query(sql,[oid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,mgs:'update2 address success'});
        }else{
            res.send({code:0,mgs:'update2 address error'});
        }
    })  
})

//商家同意退货
router.get("/updateType3",(req,res)=>{
    var oid=req.query.oid;
    var sql="UPDATE orders set type='退货成功' WHERE oid=?"
    pool.query(sql,[oid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,mgs:'update2 address success'});
        }else{
            res.send({code:0,mgs:'update2 address error'});
        }
    })  
})

//用户收货
router.get("/updateType4",(req,res)=>{
    var oid=req.query.oid;
    var sql="UPDATE orders set type='订单已完成' WHERE oid=?"
    pool.query(sql,[oid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,mgs:'update3 address success'});
        }else{
            res.send({code:0,mgs:'update3 address error'});
        }
    })  
})

// 用户申请退货
router.get("/updateType5",(req,res)=>{
    var oid=req.query.oid;
    var sql="UPDATE orders set type='已申请退货' WHERE oid=?"
    pool.query(sql,[oid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,mgs:'update4 address success'});
        }else{
            res.send({code:0,mgs:'update4 address error'});
        }
    })  
})


module.exports=router;