import { useContext, useState } from "react";
import AttendanceContext from "./attendancecontext";
import config from "../../config";
import AlertContext from "../alert/alertcontext";
const host = config.host;

const AttendanceState = (props) => {
  const context = useContext(AlertContext);
  const { showAlert } = context;
    const [selectedClass, setSelectedClass] = useState({});
    const [studentlist, setStudentlist] = useState([]);
    const [weekcode, setweekcode] = useState([]);


    const markAttendance = async (data) => {
        const response = await fetch(`${host}/api/academic/takeattendance`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
              academicyearcode:data.academicyearcode,
              semestercode:data.semestercode,
              coursename:data.coursename,
              coursecode:data.coursecode,
              weekcode:weekcode,
              classcode:data.classcode,
              batchcode:data.batchcode,
              slot:data.slot,
            }),
        });
        const resData = await response.json();
        setStudentlist(resData.students);
    };
    const updateAttendance = async (studentlist) => {
        const response = await fetch(`${host}/api/academic/updateattendance`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
              academicyearcode:selectedClass.academicyearcode,
              semestercode:selectedClass.semestercode,
              coursecode:selectedClass.coursecode,
              weekcode:weekcode,
              classcode:selectedClass.classcode,
              slot:selectedClass.slot,
              studentlist
            }),
        });
        const resData = await response.json();
        showAlert(resData)
    };
  return (
    <AttendanceContext.Provider
      value={{
        selectedClass,
        setSelectedClass,
        studentlist,
        setStudentlist,
        markAttendance,
        updateAttendance,
        setweekcode,
      }}
    >
      {props.children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceState;
