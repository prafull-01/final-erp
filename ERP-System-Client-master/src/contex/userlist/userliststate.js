import React, { useContext, useState } from "react";
import UserListContext from "./userlistcontext";
import config from "../../config";
import AlertContext from "../alert/alertcontext";
const host = config.host;
const UserListState = (props) => {
  const context = useContext(AlertContext);
  const { showAlert } = context;
  const [userlist, setUserlist] = useState([]);

  const fetchuserlist = async (usertype) => {
    const response = await fetch(`${host}/api/users/userlist`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ usertype: usertype }),
    });
    const json = await response.json();
    setUserlist(json.userlist)
    // showAlert(json);
    return json
  };

  const masterlogin = async (user) => {
    let reqbody=[]
    if (user.usertype==="student"){
      reqbody={
        "systemid":user.systemid,
        "usertype":"student"
      }
    }
    else if (user.usertype==="teacher"){
      reqbody={
        "empid":user.empid,
        "usertype":"teacher"
      }
    }
    const response = await fetch(`${host}/api/auth/masterlogin`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify(reqbody),
    });
    const json = await response.json();
    if (json.msgtype) {
      localStorage.setItem("token1", localStorage.getItem("token"));
      localStorage.removeItem("token")
      localStorage.setItem("token", json.authtoken);
      localStorage.removeItem("usertype")
      localStorage.setItem("usertype", json.usertype);
      if(user.usertype==="student"){localStorage.setItem("systemid", user.systemid);}
    }
    showAlert(json);
    return json
    
  };

  return (
    <UserListContext.Provider
      value={{
        userlist,
        fetchuserlist,
        setUserlist,
        masterlogin,
      }}
    >
      {props.children}
    </UserListContext.Provider>
  );
};

export default UserListState;
