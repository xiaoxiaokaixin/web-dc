SET NAMES UTF8;
DROP DATABASE IF EXISTS dc;
CREATE DATABASE dc CHARSET=UTF8;
USE dc;

/**用户表**/
CREATE TABLE dc_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  phone VARCHAR(16),
  address  VARCHAR(64)                
);
INSERT INTO dc_user VALUES
(NULL, '肖志慧', '123456', '15612607069', '河北工业大学廊坊分校'),
(NULL, '张东', '123456', '15931317396', '市医院'),
(NULL, '许成飞', '123456', '13501234569', '第七中学'),
(NULL, '崔丽颖', '123456', '13501234560','河北工业大学廊坊分校');

/****商家表****/
CREATE TABLE dc_sj(
  sid INT PRIMARY KEY AUTO_INCREMENT,
  sname VARCHAR(32),
  spwd VARCHAR(32),
  phone VARCHAR(16),
  wmphone VARCHAR(16)                
);
INSERT INTO dc_sj VALUES
(NULL,'李明', '123456', '15612607069','15612607069'),
(NULL,'李红', '123456', '15612345678','15612345678'),
(NULL,'张三', '123456', '15612345679','15612345679'),
(NULL,'王昆鹏', '123456', '15612345680','15612345680'),
(NULL,'李香巧', '123456', '15612345681','15612345681'),
(NULL,'刘明', '123456', '15612345682','15612345682'),
(NULL,'李峰', '123456', '15612345683','15612607070'),
(NULL,'张磊', '123456', '15612345684','15612607071'),
(NULL,'刘佳', '123456', '15612345685','15612607072'),
(NULL,'龙在天', '123456', '15612345686','15612607073'),
(NULL,'张三丰', '123456', '15612345687','15612607074'),
(NULL,'肖剑', '123456', '15612345688','15612607075'),
(NULL,'胡一刀', '123456', '15612345689','15612607076'),
(NULL,'吴宇', '123456', '15612345690','15612607077'),
(NULL,'王志伟', '123456', '15612345691','15612607078'),
(NULL,'武思情', '123456', '15612345724','15612607111');

/****店铺表****/
CREATE TABLE store(
  sid INT PRIMARY KEY AUTO_INCREMENT,
  sjid INT,
  type VARCHAR(32),
  sname VARCHAR(64),
  pic VARCHAR(128),
  address VARCHAR(64),
  psf INT,
  pstime INT,
  grade VARCHAR(32),
  FOREIGN KEY (sjid) REFERENCES dc_sj(sid)
);
INSERT INTO store VALUES
(NULL,1,'美食','二宽兰州牛肉拉面','http://127.0.0.1:3000/img/place/place1.jpg','廊坊市广阳区第七大道',1,32,'★★★★'),
(NULL,2,'快餐便当','满口香煲仔饭','http://127.0.0.1:3000/img/place/place2.jpg','廊坊市广阳区第五大道',2,30,'★★★★★'),
(NULL,3,'快餐便当','华莱士炸鸡汉堡','http://127.0.0.1:3000/img/place/place3.jpg','廊坊市广阳区第七大道',3,35,'★★★★'),
(NULL,4,'小吃夜宵','红伟忆家麻辣香锅','http://127.0.0.1:3000/img/place/place4.jpg','廊坊市广阳区第三大道',1,40,'★★★'),
(NULL,5,'小吃夜宵','超跑龙虾烧烤虾尾','http://127.0.0.1:3000/img/place/place5.jpg','廊坊市广阳区第四大道',4,30,'★★★★★'),
(NULL,6,'快餐便当','河间正宗驴肉火烧','http://127.0.0.1:3000/img/place/place6.jpg','廊坊市广阳区第三大道',5,25,'★★★★★'),
(NULL,7,'快餐便当','肯德基','http://127.0.0.1:3000/img/place/place7.jpg','廊坊市广阳区第七大道',3,40,'★★★★'),
(NULL,8,'美食','壹杯咖啡','http://127.0.0.1:3000/img/place/place8.jpg','廊坊市广阳区第六大道',2,30,'★★★'),
(NULL,9,'小吃夜宵','榆汐麻辣香锅','http://127.0.0.1:3000/img/place/place9.jpg','廊坊市广阳区第七大道',1,32,'★★★★★'),
(NULL,10,'美食','过桥米线','http://127.0.0.1:3000/img/place/place10.jpg','廊坊市广阳区第七大道',4,30,'★★★★★'),
(NULL,11,'快餐便当','麦当劳','http://127.0.0.1:3000/img/place/place11.jpg','廊坊市广阳区第七大道',5,35,'★★★'),
(NULL,12,'美食','万福园饺子','http://127.0.0.1:3000/img/place/place12.jpg','廊坊市广阳区第五大道',3,40,'★★★'),
(NULL,13,'快餐便当','金牌小份菜','http://127.0.0.1:3000/img/place/place13.jpg','廊坊市广阳区第七大道',1,42,'★★★★'),
(NULL,14,'快餐便当','六块八小份菜','http://127.0.0.1:3000/img/place/place14.jpg','廊坊市广阳区第五大道',2,30,'★★★★'),
(NULL,15,'美食','焖范·三汁焖饭','http://127.0.0.1:3000/img/place/place15.jpg','廊坊市广阳区第三大道',1,35,'★★★★★'),
(NULL,16,'小吃夜宵','一品粥','http://127.0.0.1:3000/img/place/place16.jpg','廊坊市广阳区第四大道',2,32,'★★★★');

/****商品表****/
CREATE TABLE menu(
  id INT PRIMARY KEY AUTO_INCREMENT,
  mid INT,
  type VARCHAR(32),
  name VARCHAR(64),
  price Float(3,1),
  onsale Int DEFAULT 0,
  pic VARCHAR(128),
  FOREIGN KEY (mid) REFERENCES store(sid)
);
INSERT INTO menu VALUES
(NULL,1,'热销','二宽牛肉面',30,15,'http://localhost:3000/img/shop/store1m1.jpg'),
(NULL,1,'精品','宽拌牛肉大份',44,100,'http://localhost:3000/img/shop/store1m2.jpg'),
(NULL,1,'烧烤','双味烤肠',5,200,'http://localhost:3000/img/shop/store1m3.jpg'),
(NULL,1,'烧烤','烤骨肉相连',3,150,'http://localhost:3000/img/shop/store1m4.jpg'),
(NULL,1,'烧烤','烤土豆片',2,50,'http://localhost:3000/img/shop/store1m5.jpg'),
(NULL,1,'烧烤','碳烤鸡心',2,30,'http://localhost:3000/img/shop/store1m6.jpg'),
(NULL,1,'烧烤','烤青椒',2,20,'http://localhost:3000/img/shop/store1m7.jpg'),
(NULL,1,'碳烤套餐','碳烤单人餐',21,100,'http://localhost:3000/img/shop/store1m8.jpg'),
(NULL,1,'烧烤','烤面筋',2,15,'http://localhost:3000/img/shop/store1m9.jpg'),
(NULL,1,'碳烤套餐','碳烤双人餐',42,100,'http://localhost:3000/img/shop/store1m10.jpg'),
(NULL,1,'烧烤','羊肉串',3,200,'http://localhost:3000/img/shop/store1m11.jpg'),
(NULL,1,'热销','精品卤蛋',3,150,'http://localhost:3000/img/shop/store1m12.jpg'),
(NULL,1,'精品','宽拌牛肉',4,50,'http://localhost:3000/img/shop/store1m13.jpg'),
(NULL,1,'烧烤','烤大虾',4,100,'http://localhost:3000/img/shop/store1m14.jpg'),

(NULL,2,'热销','香米饭',2,15,'http://localhost:3000/img/shop/store2m1.jpg'),
(NULL,2,'满口香煲仔饭','火腿双蛋煲仔饭',22,100,'http://localhost:3000/img/shop/store2m2.jpg'),
(NULL,2,'炒饭，炒饼系列','素炒饼',19,200,'http://localhost:3000/img/shop/store2m3.jpg'),
(NULL,2,'小份菜系列','土豆烧豆角',11,150,'http://localhost:3000/img/shop/store2m4.jpg'),
(NULL,2,'小份菜系列','鱼香肉丝',13,50,'http://localhost:3000/img/shop/store2m5.jpg'),
(NULL,2,'满口香煲仔饭','烧茄子煲仔饭',2,30,'http://localhost:3000/img/shop/store2m6.jpg'),
(NULL,2,'热销','炸烤肠',2,20,'http://localhost:3000/img/shop/store2m7.jpg'),
(NULL,2,'饮料系列','芒果汁',6,100,'http://localhost:3000/img/shop/store2m8.jpg'),
(NULL,2,'乱炖系列','牛肉炖西红柿',48,15,'http://localhost:3000/img/shop/store2m9.jpg'),
(NULL,2,'乱炖系列','排骨炖酸菜',48,100,'http://localhost:3000/img/shop/store2m10.jpg'),
(NULL,2,'大份菜系列','杭椒小炒肉',35,200,'http://localhost:3000/img/shop/store2m11.jpg'),
(NULL,2,'大份菜系列','土豆牛肉',48,150,'http://localhost:3000/img/shop/store2m12.jpg'),
(NULL,2,'满口香煲仔饭',' 宫保鸡丁煲仔饭',23,50,'http://localhost:3000/img/shop/store2m13.jpg'),
(NULL,2,'饮料系列','酸梅汤',6,100,'http://localhost:3000/img/shop/store2m14.jpg');

/****订单表****/
CREATE TABLE orders(
  oid INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,
  time DATE,
  ispay VARCHAR(64),
  type VARCHAR(128),
  FOREIGN KEY (uid) REFERENCES dc_user(uid)    
);

/****订单商品表****/
CREATE TABLE order_details(
  id INT PRIMARY KEY AUTO_INCREMENT,
  oid INT,
  gid INT,
  number INT,
  FOREIGN KEY (oid) REFERENCES orders(oid), 
  FOREIGN KEY (gid) REFERENCES menu(id)      
);

/****购物车表****/
CREATE TABLE car(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,
  gid INT,
  number INT,
  FOREIGN KEY (uid) REFERENCES dc_user(uid),
  FOREIGN KEY (gid) REFERENCES menu(id)          
);

/****物流表****/
CREATE TABLE wl(
  wid INT PRIMARY KEY AUTO_INCREMENT,
  type VARCHAR(128),
  time VARCHAR(64) 
);
INSERT INTO wl VALUES
(NULL,'订单已提交，请等待商家确认','2019-06-05 17:00'),
(NULL,'商家已接单，商品准备中','2019-06-05 17:01'),
(NULL,'订单配送中，预计还有十分钟到达','2019-06-05 17:20'),
(NULL,'该订单已完成','2019-06-05 17:30'),
(NULL,'已申请退货，请等待商家处理','2019-06-05 17:30'),
(NULL,'退货成功，退款将退回您的支付账户，请耐心等待','2019-06-05 18:300');

/****评价表****/
CREATE TABLE comment(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,
  sid INT,
  grade INT,
  content VARCHAR(256),
  time DATE,
  FOREIGN KEY (uid) REFERENCES dc_user(uid),
  FOREIGN KEY (sid) REFERENCES store(sid)
);



