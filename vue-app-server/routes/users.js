const express=require("express");
const router=express.Router();
const pool=require("../pool");

// 用户登录
router.get("/signin",(req,res)=>{
    var phone=req.query.phone;
    var upwd=req.query.upwd;
    var sql="select * from dc_user where phone=? and upwd=?";
    pool.query(sql,[phone,upwd],(err,result)=>{
    if(err) throw(err);
    // res.send(result);
      if(result.length>0){
        // res.writeHead(200);       
        var user=result[0]
        req.session["uid"]=user["uid"];
        var uid=result[0].uid;
        var name=result[0].uname;
        res.write(JSON.stringify({
          ok:1,
          msg:"user login success",
          uid:uid,
          name:name
        }))
        
      }else{
        res.write(JSON.stringify({
          ok:0,
          msg:"user login fail！"
        }))
      }
    
    res.end();
  }
  )
})

  //用户注册
  router.get('/registe',(req,res)=>{
    var obj=req.query;
    var $upwd=obj.upwd;
    var $phone=obj.phone;
    //验证密码为空
    if($upwd==''){
      res.send({ok:0,msg:'upwd required'});
      return;
    }
    //验证电话为空
    if($phone==''){
      res.send({ok:0,msg:'phone required'});
      return;
    }
    //验证电话是否存在
    var sql1="select * from dc_user where phone=?";
    pool.query(sql1,[$phone],(err,result)=>{
      if(err) throw(err);
        if(result.length>0){
          res.send({ok:3,msg:'phone exist'})
          return;
        }else{
          //以上验证都通过了，执行插入数据库操作
          var sql='INSERT INTO dc_user (upwd,phone) VALUES(?,?)';
          pool.query(sql,[$upwd,$phone],(err,result)=>{
            if(err) throw err;
            //如何判断插入成功————affectedRows
          if(result.affectedRows>0){
            res.send({ok:1,msg:'registe success'});
          }else{
            res.send({ok:0,msg:'registe error'})
          }
          res.end();
          });
        }
    }
    )
  })

  //修改用户信息
  router.get('/update',(req,res)=>{
    var obj=req.query;
    var $uid=obj.uid;
    var $user_name=obj.uname;
    var $upwd=obj.upwd;
    var $phone=obj.phone;
    //验证
    if(!$user_name){
      res.send({code:0,msg:'user_name required'});
      return;
    }
    if(!$upwd){
      res.send({code:0,msg:'upwd required'});
      return;
    } 
    if(!$phone){
      res.send({code:0,msg:'phone required'});
      return;
    } 
    //构建sql语句
    var sql='UPDATE dc_user SET uname=?,upwd=?,phone=? WHERE uid=?';
    //执行sql语句
    pool.query(sql,[$user_name,$upwd,$phone,$uid],(err,result)=>{
      if(err) throw err;
      if(result.affectedRows>0){
        res.send({code:1,mgs:'update success',uname:$user_name,upwd:$upwd,phone:$phone});
      }else{
        res.send({code:0,mgs:'update error'});
      }
    });
  });

  //修改个人地址
  router.get('/updateAddress',(req,res)=>{
    var obj=req.query;
    var $uid=obj.uid;
    var $address=obj.address;
    //验证
    if(!$address){
      res.send({code:0,msg:'address required'});
      return;
    }
    //构建sql语句
    var sql='UPDATE dc_user SET address=? WHERE uid=?';
    //执行sql语句
    pool.query(sql,[$address,$uid],(err,result)=>{
      if(err) throw err;
      if(result.affectedRows>0){
        res.send({code:1,mgs:'update address success'});
      }else{
        res.send({code:0,mgs:'update address error'});
      }
    });
  });

module.exports=router;