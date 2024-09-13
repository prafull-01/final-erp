import { useState } from "react";
import AlertContext from "./alertcontext";
import config from "../../config";
const host = config.host;
let iscordinator = false;

const AlertState = (props) => {
  const [alert2, setAlert2] = useState("");
  const [UserName, setUserName] = useState("");
  const [usertype, setusertype] = useState("");
  const [empid, setEmpid] = useState("");
  const [alert, setAlert] = useState([{ success: true, msg: "" }]);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const toggleMenuVisibility = () => {
    setMenuVisible(!isMenuVisible);
  };
  const showAlert2 = (json) => {
    setAlert2(json);
  };

  const hideAlert = () => {
    setAlert2("");
  };

  const showAlert = (json) => {
    setAlert({
      success: json.msgtype,
      msg: json.msg,
    });
    setTimeout(() => {
      setAlert({ success: true, msg: "" });
    }, 2000);
  };
  const getuserdata = async () => {
    if (usertype === "") {
      setLoading(true);
    }
    const response = await fetch(`${host}/api/auth/getuserdata`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({
        usertype: localStorage.getItem("usertype"),
      }),
    });
    const json = await response.json();
    if (json.msgtype) {
      setUserName(json?.user?.name);
      setusertype(json?.user?.usertype);
      if (!(json?.user?.usertype === "admin")) {
        localStorage.setItem("school", json?.user?.school);
        localStorage.setItem("department", json?.user?.department);
      }
      iscordinator = json.iscordinator;
      if (
        json?.user?.usertype === "teacher" ||
        json?.user?.usertype === "cordinator"
      ) {
        setEmpid(json?.user?.empid);
      }
    }
    setLoading(false);
    return json;
  };

  return (
    <AlertContext.Provider
      value={{
        alert,
        showAlert,
        getuserdata,
        UserName,
        empid,
        usertype,
        iscordinator,
        toggleMenuVisibility,
        isMenuVisible,
        setMenuVisible,
        alert2,
        showAlert2,
        hideAlert,
        setLoading,
        isLoading,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
