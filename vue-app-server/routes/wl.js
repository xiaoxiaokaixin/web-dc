const express=require("express")
const router=express.Router()
const pool=require("../pool")

//物流状态
router.get("/selectWl1",(req,res)=>{
    var sql1="SELECT * FROM wl LIMIT ?"
    pool.query(sql1,[1],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })  
})
router.get("/selectWl2",(req,res)=>{
    var sql1="SELECT * FROM wl LIMIT ?"
    pool.query(sql1,[2],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })  
})
router.get("/selectWl3",(req,res)=>{
    var sql1="SELECT * FROM wl LIMIT ?"
    pool.query(sql1,[3],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })  
})
router.get("/selectWl4",(req,res)=>{
    var sql1="SELECT * FROM wl LIMIT ?"
    pool.query(sql1,[4],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })  
})
router.get("/selectWl5",(req,res)=>{
    var sql1="SELECT * FROM wl WHERE wid !=4 and wid !=6"
    pool.query(sql1,[4],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })  
})
router.get("/selectWl6",(req,res)=>{
    var sql1="SELECT * FROM wl WHERE wid !=4 and wid !=5"
    pool.query(sql1,[4],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })  
})







module.exports=router;