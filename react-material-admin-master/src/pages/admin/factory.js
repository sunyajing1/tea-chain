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
  
// var factorystate = true

export default function Tables(props) {

const [factoryList, setfactoryList] = useState([]);
const [open, setOpen] = React.useState(false);
const [factoryname,setFactoryname] =useState('')
const [factorytype,setFactorytype] =useState('')
const [serialnumberstart,setSerialnumberstart] =useState('')
const [serialnumberend,setSerialnumberend] =useState('')
//增加弹窗弹出
const handleClickOpen = () => {
  setOpen(true);
};
//增加弹窗关闭
const handleClose = () => {
  setOpen(false);
};
//弹窗提交数据
const handleSubmit =() =>{
  let teaInfo ={
    factoryName:factoryname,
    factoryType:factorytype,
    serial_number_start:serialnumberstart,
    serial_number_end:serialnumberend
  }
  axios({
      method:"POST",
      url:'/addFactandSerial', 
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
        url:'/getAllFactory',
        headers:{
          "Content-Type":"application/json"
        }
      }).then(res => {  
         if(res.data.status === 200){
           setfactoryList(res.data.msg);
         }
    })
    
  }
 //初始化获取数据
  useEffect(() => {
    getData();
 }, [])
 //table表动态获取数据
  const columns = [
      {title: '厂家编号', dataIndex: 'id', key: factoryList.id,width:"200px",align: 'center',height:"40px"},
      {title: '厂家名称', dataIndex: 'factoryname', key: factoryList.factoryname,width:"200px",align: 'center',height:"40px"},
      {title: '厂家类型', dataIndex: 'factorytype', key: factoryList.factorytype,width:"200px",align: 'center',height:"40px"},
      {title: '序列号起始', dataIndex: 'serial_number_start', key: factoryList.serial_number_start,width:"200px",align: 'center',height:"40px"},
      {title: '序列号结束', dataIndex: 'serial_number_end', key: factoryList.serial_number_end,width:"200px",align: 'center',height:"40px"},
      {title: '钱包地址', dataIndex: 'walletaddress', key:factoryList.walletaddress,width:"200px",align: 'center',height:"40px"},
    
    ];
  return (
    <>
      <PageTitle  title="厂家信息" />
      <Grid container spacing={4}>
        <Grid item xs={12} >
          <Widget> 
              <div style={{float:"right"}}>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                添加
                </Button>
              </div>
              <div style={{clear:"both"}}>
              <Table 
                columns={columns}
                dataSource={factoryList}
                pagination={false}
                rowKey={record => record.registered}
            />
            </div>
            {/* 增加弹窗*/}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">添加厂家信息</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="厂家名称"
                  value={factoryname}
                  onChange={e => setFactoryname(e.target.value)}
                  type="input"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="厂家类型"
                  value={factorytype}
                  onChange={e => setFactorytype(e.target.value)}
                  type="input"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="序列号起始(数字)"
                  value={serialnumberstart}
                  onChange={e => setSerialnumberstart(e.target.value)}
                  type="input"
                  fullWidth
                />
                 <TextField
                  margin="dense"
                  id="name"
                  label="序列号结束(数字)"
                  value={serialnumberend}
                  onChange={e => setSerialnumberend(e.target.value)}
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
