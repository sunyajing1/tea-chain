var express = require('express');
var router = express.Router();
let db = require('../model/db'); 
var url = require('url');
const { use } = require('.');


var bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


//登录
router.post('/login', async (req, res) => {
  let loginName = req.body.loginName;
  let loginPwd = req.body.loginPwd;
  let select_user = 'SELECT * FROM tea_user WHERE login_name="'+loginName+'"';
  let user_obj = await db.select(select_user)
  if(user_obj.length ==1){
    if(loginPwd== user_obj[0].login_pwd){
      res.send({"msg":"登录成功","status":200,"role":user_obj[0].login_role});
    }else{
      res.send({"status":10096,"msg":"密码错误"});
    }
  }else{
    res.send({"status":10096,"msg":"登录名不存在"});
  }
});

// 注册
router.post('/signIn', async (req, res) => {
  let loginName = req.body.userName;
  let loginPwd = req.body.userPwd;
    let insert_user = 'INSERT INTO tea_user(login_name,login_pwd,login_role) values("'+loginName+'","'+loginPwd+'","1")';
    let user_obj = await db.insert(insert_user)
    if (user_obj.insertId != ''){
      res.send({"msg":"注册成功","status":200})
    }else{
      res.send({"msg":"注册失败","status":10096})
    }
  // }
})

// 获取全部厂家信息
router.post('/getAllFactory', async (req, res) => {
  let select_factory = 'SELECT f.id,f.factoryname,f.factorytype,s.serial_number_start,s.serial_number_end FROM tea_factory f left join tea_serial_number s on f.factoryname = s.factory_name order by f.id '
  let selfactory_obj = await db.select(select_factory)
  if (selfactory_obj.length >0){
    res.send({"msg":selfactory_obj,"status":200})
  }else{
    res.send({"msg":"查询失败","status":10096})
  }
})

// 获取全部茶叶信息
router.post('/getAllTeaInfo', async (req, res) => {
  let select_teaInfo = 'SELECT i.tea_type,i.id,i.origin_place,i.manufacture_date,i.serial_number,f.factoryname,i.asset_address FROM tea_info i INNER JOIN tea_factory f ON i.factory_id = f.id'
  let selteainfo_obj = await db.select(select_teaInfo)
  if (selteainfo_obj.length >0){
    res.send({"msg":selteainfo_obj,"status":200})
  }else{
    res.send({"msg":"查询失败","status":10096})
  }
})

// 通过序列号查询茶叶信息
router.post('/getOneTeaInfo', async (req, res) => {
  let serial_number= req.body.serialNumber;
  let select_teaInfo = 'SELECT t.id,t.tea_type,t.serial_number,t.manufacture_date,t.origin_place,f.factoryname,t.asset_address FROM tea_info t inner join tea_factory f on t.factory_id=f.id WHERE t.serial_number="'+serial_number+'"'
  let selteainfo_obj = await db.select(select_teaInfo)
  if (selteainfo_obj.length >0){
    res.send({"msg":selteainfo_obj,"status":200})
  }else{
    res.send({"msg":"查询失败","status":10096})
  }
})

// 添加厂家、序列号
router.post('/addFactandSerial', async (req, res) => {
  let factoryname = req.body.factoryName;
  let factorytype = req.body.factoryType;
  let factorycode = req.body.factoryName;
  let serial_number_start = req.body.serial_number_start;
  let serial_number_end = req.body.serial_number_end;
  let insert_factory = 'INSERT INTO tea_factory(factoryname,factorytype,factorycode) values("'+factoryname+'","'+factorytype+'","'+factorycode+'")';
  let insert_serial = 'INSERT INTO tea_serial_number(serial_number_start,serial_number_end,factory_name) values('+serial_number_start+','+serial_number_end+',"'+factoryname+'")';
  let select_factory ='SELECT * FROM tea_factory WHERE factoryname="'+factoryname+'"'
  let selfactory_obj = await db.select(select_factory)
  if (selfactory_obj.length){
    res.send({"msg":"厂家已存在!","status":10096})
  }else{
    let insfact_obj = await db.select(insert_factory)
    let insserial_obj = await db.select(insert_serial)
    if (insfact_obj.insertId != '' && insserial_obj.insertId != ''){
      res.send({"msg":'添加成功',"status":200})
    }else{
      res.send({"msg":"添加失败","status":10096})
    }
  }
})

// 添加茶叶
router.post('/addTeaInfo', async (req, res) => {
  let factoryname = req.body.factoryName;
  let tea_type = req.body.teaType;
  let manufacture_date = req.body.manufacture_date;
  let origin_place = req.body.origin_place;
  
  let select_factory ='SELECT t.*,f.serial_number_start,f.serial_number_end FROM tea_factory t inner join tea_serial_number f on t.factoryname=f.factory_name WHERE t.factoryname="'+factoryname+'"'
  let selfactory_obj = await db.select(select_factory)
  if (selfactory_obj.length){
    let serial_number_start =selfactory_obj[0].serial_number_start
    let serial_number_end = selfactory_obj[0].serial_number_end
    let factory_id = selfactory_obj[0].id
    let select_tea = 'SELECT * FROM tea_info WHERE serial_number=(SELECT max(serial_number) FROM tea_info WHERE factory_id="'+factory_id+'")'
    let seltea_obj = await db.select(select_tea)
    if ((seltea_obj.length ==0) || (seltea_obj[0].serial_number < serial_number_end)){
      if (seltea_obj.length ==0){
        var serial_number = serial_number_start
      }else{
        var serial_number = seltea_obj[0].serial_number+1
      }
      let insert_tea = 'INSERT INTO tea_info(tea_type,manufacture_date,origin_place,factory_id,serial_number) VALUES ("'+tea_type+'","'+manufacture_date+'","'+origin_place+'","'+factory_id+'","'+serial_number+'")'
      let instea_obj = await db.insert(insert_tea)
      if (instea_obj.insertId != ''){
        res.send({"msg":'添加成功',"status":200})
      }else{
        res.send({"msg":"添加失败","status":10096})
      }
    }else{
      res.send({"msg":"没有可用的序列号","status":10096})
    }
  }else{
    res.send({"msg":"厂家不存在","status":10096})
  }  
})
module.exports = router;