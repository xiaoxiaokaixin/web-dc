const express=require("express");
const router=express.Router();
const pool=require("../pool");

//修改店铺信息
// 修改头像


// 修改电话
router.get('/updateStorePhone',(req,res)=>{
  var obj=req.query;
  var sid=obj.sid;
  var phone=obj.phone;
  //验证
  if(!phone){
    res.send({code:0,msg:'phone required'});
    return;
  }
  //构建sql语句
  var sql='UPDATE dc_sj SET phone=? WHERE sid=?';
  //执行sql语句
  pool.query(sql,[phone,sid],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,mgs:'updatePhone success'});
    }else{
      res.send({code:0,mgs:'updatePhone error'});
    }
  })
});
// 修改店名
router.get('/updateStoreName',(req,res)=>{
  var obj=req.query;
  var sjid=obj.sjid;
  var sname=obj.sname;
  //验证
  if(!sname){
    res.send({code:0,msg:'sname required'});
    return;
  }
  //构建sql语句
  var sql='UPDATE store SET sname=? WHERE sjid=?';
  //执行sql语句
  pool.query(sql,[sname,sjid],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,mgs:'updateStoreName success'});
    }else{
      res.send({code:0,mgs:'updateStoreName error'});
    }
  })
});
// 修改地址
router.get('/updateAddress',(req,res)=>{
  var obj=req.query;
  var sjid=obj.sjid;
  var address=obj.address;
  //验证
  if(!address){
    res.send({code:0,msg:'address required'});
    return;
  }
  //构建sql语句
  var sql='UPDATE store SET address=? WHERE sjid=?';
  //执行sql语句
  pool.query(sql,[address,sjid],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,mgs:'updateAddress success'});
    }else{
      res.send({code:0,mgs:'updateAddress error'});
    }
  })
});
// 注销店铺





module.exports=router;