const express=require("express");
const router=express.Router();
const pool=require("../pool");

//获取店铺所有商品
router.get("/getMenu",(req,res)=>{
    var mid=req.query.mid;
    var sql="SELECT * FROM menu WHERE mid=?"
    pool.query(sql,[mid],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })  
})

//删除指定商品
router.get("/deleteMenu",(req,res)=>{
    var gid=req.query.gid;
    var sql1='DELETE FROM order_details WHERE gid=?'
    pool.query(sql1,[gid],(err,result)=>{
        if(err) throw err;
        // res.send('deleteCar ok');
        var sql="DELETE FROM menu WHERE id=?"
        pool.query(sql,[gid],(err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                res.send({ok:1,msg:'deleteOne success'});
            }else{
                res.send({ok:0,msg:'deleteOne error'})
            }
        }) 
    }) 
     
})

//获取指定id的商品
router.get("/getMenuInfo",(req,res)=>{
    var id=req.query.id;
    var sql="SELECT * FROM menu WHERE id=?"
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })  
})

//修改指定商品信息
router.get("/updateGood",(req,res)=>{
    var id=req.query.id;
    var name=req.query.name;
    var type=req.query.type;
    var price=req.query.price;
    var sql="UPDATE menu SET name=?,type=?,price=? WHERE id=?"
    pool.query(sql,[name,type,price,id],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
          res.send({code:1,mgs:'updateGood success'});
        }else{
          res.send({code:0,mgs:'updateGood error'});
        }
    })
})

//添加商品
router.get("/addGood",(req,res)=>{
    var mid=req.query.mid;
    var name=req.query.name;
    var type=req.query.type;
    var price=req.query.price;
    var pic=req.query.pic;
    var sql="INSERT INTO menu (name,type,price,pic,mid) VALUES(?,?,?,?,?)"
    pool.query(sql,[name,type,price,pic,mid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
          res.send({code:1,mgs:'addGood success'});
        }else{
          res.send({code:0,mgs:'addGood error'});
        }
    })
})

//获取商品的店铺id
router.get("/getStoreId",(req,res)=>{
    var id=req.query.id;
    var sql="SELECT mid FROM menu WHERE id=?"
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })  
})

//通过店铺id获取店铺名称
router.get("/getStoreName",(req,res)=>{
    var sid=req.query.sid;
    var sql="SELECT sname FROM store WHERE sid=?"
    pool.query(sql,[sid],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })  
})



module.exports=router;