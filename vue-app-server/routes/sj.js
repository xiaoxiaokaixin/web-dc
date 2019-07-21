const express=require("express");
const router=express.Router();
const pool=require("../pool");

//获取商家店铺信息
router.get("/getSjStore",(req,res)=>{
    var sjid=req.query.sjid;
    var sql="SELECT * FROM store WHERE sjid=?"
    pool.query(sql,[sjid],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })  
})

//商家登录后台
router.get("/sjlogin",(req,res)=>{
    var phone=req.query.phone;
    var spwd=req.query.spwd;
    var sql="select * from dc_sj where phone=? and spwd=?";
    pool.query(sql,[phone,spwd],(err,result)=>{
    if(err) throw(err);
    // res.send(result);
      if(result.length>0){
        // res.writeHead(200);       
        var sj=result[0]
        req.session["sid"]=sj["sid"];
        var sid=result[0].sid;
        var name=result[0].sname;
        res.write(JSON.stringify({
          ok:1,
          msg:"sj login success",
          sid:sid,
          name:name
        }))
        
      }else{
        res.write(JSON.stringify({
          ok:0,
          msg:"sj login fail！"
        }))
      }
    
    res.end();
  }
  )
})

//商家注册
router.get('/sjRegiste',(req,res)=>{
    var obj=req.query;
    var $sname=obj.sname;
    var $phone=obj.phone;
    var $spwd=obj.spwd;
    //验证姓名为空
    if($sname==''){
        res.send({ok:0,msg:'sname required'});
        return;
      }
    //验证密码为空
    if($spwd==''){
      res.send({ok:0,msg:'spwd required'});
      return;
    }
    //验证电话为空
    if($phone==''){
      res.send({ok:0,msg:'phone required'});
      return;
    }
    //验证姓名是否存在
    var sql1="select * from dc_sj where sname=?";
    pool.query(sql1,[$sname],(err,result)=>{
      if(err) throw(err);
        if(result.length>0){
          res.send({ok:3,msg:'sname exist'})
          return;
        }else{
          //以上验证都通过了，执行插入数据库操作
          var sql='INSERT INTO dc_sj (sname,spwd,phone) VALUES(?,?,?)';
          pool.query(sql,[$sname,$spwd,$phone],(err,result)=>{
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
//店铺注册
router.get('/storeRegiste',(req,res)=>{
  var obj=req.query;
  var $sname=obj.sname;
  var $type=obj.type;
  var $address=obj.address;
  var $sjid=obj.sjid;
  //验证店名为空
  if($sname==''){
      res.send({ok:0,msg:'sname required'});
      return;
    }
  //验证类型为空
  if($type==''){
    res.send({ok:0,msg:'type required'});
    return;
  }
  //验证地址为空
  if($address==''){
    res.send({ok:0,msg:'address required'});
    return;
  }
  //验证商家id为空
  if($sjid==''){
    res.send({ok:0,msg:'sjid required'});
    return;
  }
  //验证店名是否存在
  var sql1="select * from store where sname=?";
  pool.query(sql1,[$sname],(err,result)=>{
    if(err) throw(err);
      if(result.length>0){
        res.send({ok:3,msg:'sname exist'})
        return;
      }else{
        //以上验证都通过了，执行插入数据库操作
        var sql='INSERT INTO store (sjid,sname,type,address) VALUES(?,?,?,?)';
        pool.query(sql,[$sjid,$sname,$type,$address],(err,result)=>{
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

//获取商家id进行店铺注册
router.get("/getSjId",(req,res)=>{
  var sname=req.query.sname;
  var sql="SELECT * FROM dc_sj WHERE sname=?"
  pool.query(sql,[sname],(err,result)=>{
      if(err) throw err;
      res.send(result)
  })  
})


module.exports=router;