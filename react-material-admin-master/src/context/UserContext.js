import React from "react";
import axios  from '../libs/api';
// import getfactory from '../pages/admin/factory';
// import getTeaInfo from '../pages/factory/teaInfo'


var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser,getLogin, signOut,signInUser };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
     let formData = {
            "loginName":login,
            "loginPwd":password
          };
          axios({
            method:"POST",
            url:'/login', 
            data:formData,
            headers:{
              "Content-Type":"application/json"
            }
          })
      .then(res =>{
        console.log(res.data)
        if (res.data.status === 200) {
          // setTimeout(() => {
            localStorage.setItem('id_token',login)
            setError(null)
            setIsLoading(false)
            dispatch({ type: 'LOGIN_SUCCESS' })
            history.push('/app/admin/factory')
          // }, 2000);
            console.log("登录成功")
        }else if (res.data.status === 10096) {
          alert("用户名或密码错误");
            console.log("用户名或密码错误")
        }
        
      });
  } else {
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}

function signInUser(dispatch, login, password, history, setIsLoading, setError) {
  if (!!login && !!password) {
    let forms = {
       "userName":login,
       "userPwd":password
    };
    axios({
      method:'POST',
      url:'/signIn',
      data:forms,
      headers:{"Content-Type":"application/json"}
    }).then(res =>{
      
      console.log(res.data); 
      if(res.data.status === 200){
        //alert("注册成功");
        setError(null)
        setIsLoading(false)
        dispatch({ type: "SIGN_OUT_SUCCESS" });
        history.push("/login")
      }else{
        // alert("注册失败");
      }
    })

  }else{
    setError(true);
    setIsLoading(false);
  }
}

function getLogin(history){

  history.push("/login");
 
}

