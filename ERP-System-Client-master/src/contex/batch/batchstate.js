import React, { useContext, useState } from "react";
import BatchContext from "./batchcontext";
import config from "../../config";
import AlertContext from "../alert/alertcontext";
const host = config.host;
const BatchState = (props) => {
  const context = useContext(AlertContext);
  const { showAlert } = context;
  const [batchlist, setBatchlist] = useState([]);
  const [courselist, setCourselist] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState({
    academicyearcode: "",
    batchcode: "",
    batchname: "",
    departmentcode: "",
    schoolcode: "",
    semestercode: "",
    students: [],
  });
  const [Students, setStudents] = useState(selectedBatch.students);

  const getbatchlist = async (batchcode, school, department) => {
    let body = [];
    if (localStorage.getItem("usertype") === "cordinator") {
      body = {batchcode};
    } else if (localStorage.getItem("usertype") === "admin") {
      body = {
        batchcode: batchcode,
        schoolcode: school,
        departmentcode: department,
      };
    }
    const response = await fetch(`${host}/api/academic/getbatchlist`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify(body),
    });
    const json = await response.json();
    if (json.msgtype) {
      setBatchlist(json.batchlist);
    }
    return json;
  };


  const getcourselist = async (coursecode, school, department) => {
    let body = [];
    if (localStorage.getItem("usertype") === "cordinator") {
      body = {coursecode};
    } else if (localStorage.getItem("usertype") === "admin") {
      body = {
        coursecode: coursecode,
        schoolcode: school,
        departmentcode: department,
      };
    }
    const response = await fetch(`${host}/api/academic/getcourselist`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify(body),
    });
    const json = await response.json();
    if (json.msgtype) {
      setCourselist(json.courselist);
    }
    return json;
  };

  const addbatch = async (data) => {
    let body = [];
    if (localStorage.getItem("usertype") === "cordinator") {
      body = {
        academicyearname: data.academicyearname,
        academicyearcode: data.academicyearcode,
        semestername: data.semestername,
        semestercode: data.semestercode,
        batchname: data.batchname,
        batchcode: data.batchcode,
        schoolcode: data.schoolcode,
        departmentcode: data.departmentcode,
        usertype:localStorage.getItem("usertype"),
      };
    } else if (localStorage.getItem("usertype") === "admin") {
      body = {
        academicyearname: data.academicyearname,
        academicyearcode: data.academicyearcode,
        semestername: data.semestername,
        semestercode: data.semestercode,
        batchname: data.batchname,
        batchcode: data.batchcode,
        schoolcode: data.schoolcode,
        departmentcode: data.departmentcode,
        usertype:localStorage.getItem("usertype"),
      };
    }
    const response = await fetch(`${host}/api/academic/createbatch`, {
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


  const addcourse = async (data) => {
    let body = [];
    if (localStorage.getItem("usertype") === "cordinator") {
      body = {
        coursename: data.coursename,
        coursecode: data.coursecode,
        usertype:localStorage.getItem("usertype"),
      };
    } else if (localStorage.getItem("usertype") === "admin") {
      body = {
        coursename: data.coursename,
        coursecode: data.coursecode,
        schoolcode: data.schoolcode,
        departmentcode: data.departmentcode,
        usertype:localStorage.getItem("usertype"),
      };
    }
    const response = await fetch(`${host}/api/academic/createcourse`, {
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

  const editbatch = async (data) => {
    const response = await fetch(`${host}/api/academic/editbatchlist`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify(data),
    });
    const json = await response.json();
    showAlert(json);
    return json;
  };

  return (
    <BatchContext.Provider
      value={{
        batchlist,
        getbatchlist,
        addbatch,
        selectedBatch,
        setSelectedBatch,
        setBatchlist,
        Students,
        setStudents,
        editbatch,
        addcourse,
        getcourselist,
        courselist,
        setCourselist,
      }}
    >
      {props.children}
    </BatchContext.Provider>
  );
};

export default BatchState;
