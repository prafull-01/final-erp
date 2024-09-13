import React, { useContext, useState } from "react";
import ClassesContext from "./classescontext";
import config from "../../config";
import AlertContext from "../alert/alertcontext";
const host = config.host;
const ClassesState = (props) => {
  const context = useContext(AlertContext);
  const { showAlert } = context;
  const [classlist, setClasslist] = useState([]);

  const getclasslist = async (batchcode, school, department,selectedYear,selectedSem) => {
    const body = {
        batchcode: batchcode,
        schoolcode: school,
        departmentcode: department,
        academicyearcode: selectedYear,
        semestercode: selectedSem,
      };
  
    const response = await fetch(`${host}/api/academic/getclasslist`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify(body),
    });
    const json = await response.json();
    if (json.msgtype) {
      setClasslist(json.classlist);
    }
    return json;
  };

  const addclass = async (data) => {
    let body = [];
    if (localStorage.getItem("usertype") === "cordinator") {
      body = {
        coursename: data.coursename,
        coursecode: data.coursecode,
        schoolcode: data.schoolcode,
        departmentcode: data.departmentcode,
        academicyearcode: data.academicyearcode,
        academicyearname: data.academicyearcode,
        semestercode: data.semestercode,
        semestername: data.semestercode,
        batchname: data.batchname,
        batchcode: data.batchcode,
        classname: data.classname,
        classcode: data.classcode,
        teachercode: data.teachercode,
        teachername: data.teachername,
        usertype:localStorage.getItem("usertype"),
      };
    } else if (localStorage.getItem("usertype") === "admin") {
      body = {
        coursename: data.coursename,
        coursecode: data.coursecode,
        schoolcode: data.schoolcode,
        departmentcode: data.departmentcode,
        academicyearcode: data.academicyearcode,
        academicyearname: data.academicyearcode,
        semestercode: data.semestercode,
        semestername: data.semestercode,
        batchname: data.batchname,
        batchcode: data.batchcode,
        classname: data.classname,
        classcode: data.classcode,
        teachercode: data.teachercode,
        teachername: data.teachername,
        usertype:localStorage.getItem("usertype"),
      };
    }
    const response = await fetch(`${host}/api/academic/createclass`, {
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

  return (
    <ClassesContext.Provider
      value={{
        classlist,
        getclasslist,
        addclass,
        setClasslist,
      }}
    >
      {props.children}
    </ClassesContext.Provider>
  );
};

export default ClassesState;
