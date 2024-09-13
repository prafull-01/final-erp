import { useContext } from "react";
import RegisterContext from "./registercontext";
import config from "../../config";
import AlertContext from "../alert/alertcontext";
const host = config.host;
const RegisterState = (props) => {
  const context = useContext(AlertContext);
  const { showAlert, showAlert2 } = context;

  //function to call registor api and show alert

  const register = async (rdata) => {
    let jsonbody = [];
    if (rdata.usertype === "admin") {
      jsonbody = {
        name: rdata.name,
        email: rdata.email,
        phone: rdata.phone,
        password: rdata.password,
        usertype: "admin",
      };
    }
    if (rdata.usertype === "student") {
      jsonbody = {
        systemid: rdata.systemid,
        name: rdata.name,
        email: rdata.email,
        phone: rdata.phone,
        school: rdata.school,
        department: rdata.department,
        password: rdata.password,
        usertype: "student",
      };
    }
    if (rdata.usertype === "teacher") {
      jsonbody = {
        empid: rdata.empid,
        name: rdata.name,
        email: rdata.email,
        phone: rdata.phone,
        school: rdata.school,
        department: rdata.department,
        password: rdata.password,
        usertype: "teacher",
      };
    }
    if (rdata.usertype === "cordinator") {
      jsonbody = {
        empid: rdata.empid,
        name: rdata.name,
        email: rdata.email,
        phone: rdata.phone,
        school: rdata.school,
        department: rdata.department,
        usertype: "cordinator",
      };
    }
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify(jsonbody),
    });
    const json = await response.json();
    showAlert(json);
  };

  const changepassword = async (cdata) => {
    const response = await fetch(`${host}/api/auth/changepassword`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify(cdata),
    });
    const json = await response.json();
    showAlert(json);
    return json;
  };

  const registerbulkstudent = async (students) => {
    // Validation function to check the required format
    const isValidFormat = (student) => {
      const requiredFields = [
        "systemid",
        "name",
        "email",
        "phone",
        "schoolcode",
        "departmentcode",
      ];
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format for international phone numbers

      // Check if the student object is empty
      if (Object.keys(student).length === 0) {
        return false;
      }

      return requiredFields.every((field) => {
        if (
          !student.hasOwnProperty(field) ||
          student[field] === undefined ||
          student[field] === ""
        ) {
          return false;
        }
        if (
          typeof student[field] !== "string" ||
          student[field].trim() === ""
        ) {
          return false;
        }
        if (field === "email" && !emailRegex.test(student[field])) {
          return false;
        }
        if (field === "phone" && !phoneRegex.test(student[field])) {
          return false;
        }
        return true;
      });
    };
 
    if (students[students.length - 1].systemid === "") {
      students.pop();
    }

    const allValid = students.every(isValidFormat);

    if (!allValid) {
      showAlert2({
        msgtype: false,
        msg: "Invalid data format. Please ensure all fields are filled correctly.",
      });
      return;
    }

    try {
      // Proceed with the API call if validation passes
      const response = await fetch(`${host}/api/auth/createbulkstudent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ students: students }),
      });

      const json = await response.json();
      showAlert(json);
    } catch (error) {
      showAlert2({
        msgtype: false,
        msg: "An error occurred while registering students. Please try again later.",
      });
    }
  };

  return (
    <RegisterContext.Provider
      value={{
        register,
        changepassword,
        registerbulkstudent,
      }}
    >
      {props.children}
    </RegisterContext.Provider>
  );
};

export default RegisterState;
