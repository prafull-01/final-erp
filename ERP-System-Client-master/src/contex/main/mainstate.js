import React, { useContext, useState } from "react";
import MainContext from "./maincontext";
import config from "../../config";
import AlertContext from "../alert/alertcontext";
const host = config.host;
const MainState = (props) => {
  const context = useContext(AlertContext);
  const { showAlert } = context;
  const [schoollist, setSchoollist] = useState([]);
  const [departmentslist, setDepartmentslist] = useState([]);
  const [roomlist, setRoomlist] = useState([]);
  const [yearlist, setYearlist] = useState([]);
  const [semlist, setSemlist] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({
    timetable: false,
    studentcontrol: false,
    batches: false,
    courses: false,
    classes: false,
  });

  const getschoollist = async () => {
    const response = await fetch(`${host}/api/master/getschoollist`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (json.msgtype) {
      setSchoollist(json.schoollist);
    }
    // showAlert(json);
    return json;
  };
  const getdepartmentlist = async (schoolcode) => {
    const response = await fetch(`${host}/api/master/getdepartmentlist`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ schoolcode: schoolcode }),
    });
    const json = await response.json();
    if (json.msgtype) {
      setDepartmentslist(json.departmentlist);
    }
    // showAlert(json);
    return json;
  };

  const getroomlist = async (schoolcode,departmentcode) => {
    const response = await fetch(`${host}/api/master/getroom`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ schoolname: schoolcode,departmentname:departmentcode }),
    });
    const json = await response.json();
    if (json.msgtype) {
      setRoomlist (json.roomlist);
    }
    // showAlert(json);
    return json;
  };

  const getyearlist = async () => {
    const response = await fetch(`${host}/api/master/getacademicyearlist`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (json.msgtype) {
      setYearlist(json.academicyearlist);
    }
    // showAlert(json);
    return json.academicyearlist;
  };
  const getsemlist = async (yearcode) => {
    const response = await fetch(`${host}/api/master/getsemesterlist`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ academicyearcode: yearcode }),
    });
    const json = await response.json();
    if (json.msgtype) {
      setSemlist(json.semesterlist);
    }
    // showAlert(json);
    return json;
  };


  const addschooldep = async (data) => {
    let body = [];
    let link = "";
    if (data.toadd === "school") {
      link = `${host}/api/master/createschool`;
      body = { schoolname: data.schoolname, schoolcode: data.schoolcode };
    } else if (data.toadd === "department") {
      link = `${host}/api/master/createdepartment`;
      body = {
        departmentname: data.depname,
        departmentcode: data.depcode,
        schoolcode: data.schoolcodedep,
      };
    } else {
      return showAlert({ msgtype: false, msg: "Internal Server Error" });
    }
    const response = await fetch(link, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    showAlert(json);
    return json;
  };


  const addroom = async (data) => {
      const link = `${host}/api/master/createroom`;
      const body = { schoolname: data.schoolname, departmentname: data.departmentname,room:data.roomname };
    
    const response = await fetch(link, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    showAlert(json);
    return json;
  };


  const addyearsem = async (data) => {
    let body = [];
    let link = "";
    if (data.toadd === "year") {
      link = `${host}/api/master/createacademicyear`;
      body = { academicyearname: data.yearname, academicyearcode: data.yearcode };
    } else if (data.toadd === "sem") {
      link = `${host}/api/master/createsemester`;
      body = {
        semestername: data.semname,
        semestercode: data.semcode,
        academicyearname: data.yearcodesem,
        academicyearcode: data.yearcodesem,
      };
    } else {
      return showAlert({ msgtype: false, msg: "Internal Server Error" });
    }
    const response = await fetch(link, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    showAlert(json);
    return json;
  };

  const switchrole = async (user) => {
    let reqbody = [];
    if (user.usertype === "cordinator") {
      reqbody = {
        usertype: "cordinator",
      };
    } else if (user.usertype === "teacher") {
      reqbody = {
        usertype: "teacher",
      };
    }
    const response = await fetch(`${host}/api/auth/switchuser`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify(reqbody),
    });
    const json = await response.json();
    if (json.msgtype) {
      localStorage.removeItem("token");
      localStorage.setItem("token", json.authtoken);
      localStorage.removeItem("usertype");
      localStorage.setItem("usertype", json.usertype);
    }
    showAlert(json);
    return json;
  };

  const setrole = async (data) => {
    console.log(data); 
    const response = await fetch(`${host}/api/users/editroles`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        empid: data.empid,
        timetable: data.timetable,
        studentcontrol: data.studentcontrol,
        batches: data.batches,
        courses: data.courses,
        classes: data.classes,
      }),
    });
    const json = await response.json();
    showAlert(json);
    return json;
  };


  const getrole = async (empid) => {
    const response = await fetch(`${host}/api/users/getroles`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({empid:empid,usertype:localStorage.getItem("usertype")}),
    });
    const json = await response.json();
    setSelectedRoles({
      timetable:json.roles.timetable,
      studentcontrol:json.roles.studentcontrol,
      batches: json.roles.batches,
      courses: json.roles.courses,
      classes: json.roles.classes,
    })
    return json;
  };



  return (
    <MainContext.Provider
      value={{
        schoollist,
        yearlist,
        departmentslist,
        semlist,
        getschoollist,
        getyearlist,
        getdepartmentlist,
        getsemlist,
        addschooldep,
        addyearsem,
        setDepartmentslist,
        setSemlist,
        switchrole,
        setrole,
        selectedRoles,
        setSelectedRoles,
        getrole,
        roomlist,
        setRoomlist,
        getroomlist,
        addroom
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainState;
