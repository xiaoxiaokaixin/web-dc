const express=require("express")
const router=express.Router()
const pool=require("../pool")

// 获取用户的购物车
router.get("/getCar",(req,res)=>{
    var uid=req.query.uid;
    var sql="SELECT * FROM car WHERE uid=?"
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })  
})

//获取指定id的商品，用于购物车
router.get("/getCarInfo",(req,res)=>{
    var id=req.query.id;
    var sql="SELECT * FROM menu WHERE id=?"
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })  
})

//加入购物车
router.get("/addCar",(req,res)=>{
    var uid=req.query.uid;
    var gid=req.query.gid;
    var sql="INSERT INTO car VALUES (NULL,?,?,1)"
    pool.query(sql,[uid,gid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({ok:1,msg:'addCar success'});
        }else{
            res.send({ok:0,msg:'addCar error'})
        }
    })  
})

//清空购物车
router.get("/deleteCar",(req,res)=>{
    var uid=req.query.uid;
    var sql="DELETE FROM  car  WHERE  uid=?"
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({ok:1,msg:'deleteCar success'});
        }else{
            res.send({ok:0,msg:'deleteCar error'})
        }
    })  
})

// 修改购物车数量
router.get("/updateNumber",(req,res)=>{
    var gid=req.query.gid;
    var number=req.query.number;
    var sql="UPDATE car SET number=? WHERE gid=?"
    pool.query(sql,[number,gid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({ok:1,msg:'updateNumber success'});
        }else{
            res.send({ok:0,msg:'updateNumber error'})
        }
    })  
})

// 购物车删除商品
router.get("/deleteOne",(req,res)=>{
    var gid=req.query.gid;
    var sql="DELETE FROM  car  WHERE  gid=?"
    pool.query(sql,[gid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({ok:1,msg:'deleteOne success'});
        }else{
            res.send({ok:0,msg:'deleteOne error'})
        }
    })  
})


module.exports=router;