import React,{useState,useEffect} from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import {Table} from "antd";


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Tables() {
const [teaInfoList, setTeaInfoList] = useState([]);
const [open, setOpen] = React.useState(false);

const [teaType,setTeaType] =useState('');
const [originPlace,setOriginPlace] = useState('');
const [manufactureDate,setManufactureDate] =useState('');
const [factoryName,setFactoryName] =useState('');


// num++;
//增加弹窗弹出
const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  //增加弹窗提交数据
  const handleSubmit =() =>{
      let teaInfo ={
        teaType:teaType,
        origin_place:originPlace,
        manufacture_date:manufactureDate,
        factoryName:factoryName
      }
      axios({
          method:"POST",
          url:'/addTeaInfo', 
          data:teaInfo,
          headers:{
            "Content-Type":"application/json"
          }
        }).then(res => {  
        if(res.data.status === 200){
            handleClose();
            getData();
            
        }else{
          alert(res.data.msg);
        }
    })
  }
//获取数据
 const getData = ()=> {
    axios({
          method:"POST",
          url:'/getAllTeaInfo',
          headers:{
            "Content-Type":"application/json"
          }
        }).then(res => {  
         if(res.data.status === 200){
           setTeaInfoList(res.data.msg);
      
         }
    })
  }
  //初始化获取数据
  useEffect(() => {
    getData();
 }, [])
  
 //table表动态获取数据
  const columns = [
      // {title: '茶叶编号', dataIndex: 'id', key: teaInfoList.id,width:"200px",align: 'center',height:"40px"},
      {title: '序列号', dataIndex: 'serial_number', key: teaInfoList.serial_number,width:"200px",align: 'center',height:"40px"},
      {title: '茶叶类型', dataIndex: 'tea_type', key: teaInfoList.tea_type,width:"200px",align: 'center',height:"40px"},
      {title: '源产地', dataIndex: 'origin_place', key: teaInfoList.origin_place,width:"200px",align: 'center',height:"40px"},
      {title: '生产时间', dataIndex: 'manufacture_date', key: teaInfoList.manufacture_date,width:"200px",align: 'center',height:"40px"},
      {title: '厂家名称', dataIndex: 'factoryname', key:teaInfoList.factoryname,width:"200px",align: 'center',height:"40px"},
      {title: '资产地址', dataIndex: 'asset_address', key:teaInfoList.asset_address,width:"200px",align: 'center',height:"40px"},
    
    ];

    // getTeaInfoInfo();
   
  return (
    <>
      <PageTitle title="茶叶信息" />
      {/* <script type="text/javascript">
       window.onload=function(){
      getData()
      }
    </script> */}
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget  > 
                <div style={{float:"right"}}>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                添加
                </Button>
              </div>
              <div style={{clear:"both"}}>
              <Table 
                columns={columns}
                dataSource={teaInfoList}
                pagination={false}
                rowKey={record => record.registered}
            />
            </div>
            {/* 弹框 */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">添加茶叶信息</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={teaType}
                  label="茶叶名称"
                  onChange={e => setTeaType(e.target.value)}
                  type="input"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="源产地"
                  value={originPlace}
                  onChange={e => setOriginPlace(e.target.value)}
                  type="input"
                  fullWidth
                />
                 <TextField
                    id="date"
                    type="date"
                    label="生产时间"
                    defaultValue={manufactureDate}
                    onChange={e => setManufactureDate(e.target.value)}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    fullWidth
                />
                 <TextField
                  margin="dense"
                  id="name"
                  label="厂家名称"
                  value={factoryName}
                  onChange={e => setFactoryName(e.target.value)}
                  type="input"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  取消
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  提交
                </Button>
              </DialogActions>
            </Dialog> 

          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
