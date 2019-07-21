const express=require("express");
const router=express.Router();
const pool=require("../pool");

// 获取店铺评论
router.get("/getStoreComment",(req,res)=>{
    var sid=req.query.sid;
    var sql="SELECT * FROM comment WHERE sid=?"
    pool.query(sql,[sid],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })  
})

//用户发表评论
router.get("/createComment",(req,res)=>{
    var uid=req.query.uid;
    var sid=req.query.sid;
    var grade=req.query.grade;
    var content=req.query.content;
    var time=req.query.time;
    var sql="INSERT INTO comment VALUES (NULL,?,?,?,?,?)"
    pool.query(sql,[uid,sid,grade,content,time],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({ok:1,msg:'createComment success'});
        }else{
            res.send({ok:0,msg:'createComment error'});
        }
    })  
})




module.exports=router;