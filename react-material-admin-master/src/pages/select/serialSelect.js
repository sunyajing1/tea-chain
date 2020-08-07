import React,{useState} from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DirectionsIcon from '@material-ui/icons/Directions';

import {Grid,Typography} from "@material-ui/core";
import {getLogin} from "../../context/UserContext"
// logo
import logo from "./logo.svg";

const useStyles = makeStyles((theme) => ({
  loginbuttons: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  logotypeContainer: {
    backgroundColor: theme.palette.primary.main,
    width: "60%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    // [theme.breakpoints.down("md")]: {
    //   display: "none",
    // },
  },
  logotypeImage: {
    width: 165,
    marginBottom: theme.spacing(4),
  },
  logotypeText: {
    color: "white",
    fontWeight: 500,
    fontSize: 84,
    [theme.breakpoints.down("md")]: {
      fontSize: 48,
    },
  },
  createAccountButton: {
    height: 46,
    textTransform: "none",
  },
}));

// 页面渲染
export default function  Serial(props) {
    var [serialNumber, setSerialNumber] = useState("");
    const [open, setOpen] = React.useState(false);

    const [teaType,setTeaType] =useState('');
    const [originPlace,setOriginPlace] = useState('');
    const [manufactureDate,setManufactureDate] =useState('');
    const [factoryName,setFactoryName] =useState('');

  
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
      };
      
      const handleClose = () => {
        setOpen(false);
      };
      
      const handleSubmit =() =>{
            axios({
                  method:"POST",
                  url:'/getOneTeaInfo', 
                  data:{serialNumber:serialNumber},
                  headers:{
                    "Content-Type":"application/json"
                  }
                }).then(res => {  
                if(res.data.status === 200){
                    handleClickOpen()
                    setTeaType(res.data.msg[0].tea_type);
                    setOriginPlace(res.data.msg[0].origin_place);
                    setManufactureDate(res.data.msg[0].manufacture_date);
                    setSerialNumber(res.data.msg[0].serial_number);
                    setFactoryName(res.data.msg[0].factoryname);
                }
            })
          
      }
      window.onload=function(){
        handleSubmit();
      }

    return (
      <Grid container className={classes.container}>
        <div className={classes.logotypeContainer}>
          <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>茶叶溯源系统</Typography>

        <div style={{margin:"100px 10%"}}>
          <div className={classes.root}>
          <Paper component="form" className={classes.root}>
              <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder="请输入序列号"
                value={serialNumber}
                onChange={e => setSerialNumber(e.target.value)}
                inputProps={{ 'aria-label': '请输入序列号' }}
              />
              <Divider className={classes.divider} orientation="vertical" />
              <IconButton color="primary" onClick={handleSubmit} className={classes.iconButton} aria-label="directions">
                <DirectionsIcon />
              </IconButton>
            </Paper>
          </div>
          
          </div>
          <div  className={classes.loginbuttons} style={{margin:"100px 90%"}}>
            <br></br>
            <Button color="primary" style={{width:"180px"}} variant="contained" size="large" disableElevation
                  onClick={() => getLogin(props.history)}
                >
                  管理员登录
                </Button>
           </div>
      </div>
      <div >
        
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">茶叶信息</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="name"
                  value={teaType}
                  label="茶叶名称"
                  type="input"
                  disabled
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="源产地"
                  value={originPlace}
                  type="input"
                  disabled
                  fullWidth
                />
                 <TextField
                    margin="dense"
                    id="name"
                    type="input"
                    label="生产时间"
                    value={manufactureDate}
                    disabled
                    fullWidth
                />
                 <TextField
                  margin="dense"
                  id="name"
                  label="序列号"
                  value={serialNumber}
                  type="input"
                  disabled
                  fullWidth
                />
                 <TextField
                  margin="dense"
                  id="name"
                  label="厂家名称"
                  value={factoryName}
                  type="input"
                  disabled
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  确定
                </Button>
              </DialogActions>
            </Dialog> 
      
      </div>
      </Grid>
    )
}
    
