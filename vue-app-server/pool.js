const mysql=require("mysql");
var pool=mysql.createPool({//配置连接
    host:"127.0.0.1",//数据库地址
    port:3306,//端口号
    user:"root",
    password:"",
    database:"dc",
    connectionLimit:20//设置连接池的数量为20个
})
module.exports=pool;