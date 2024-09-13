import React, { useContext, useEffect, useState } from "react";
import config from "../config";
import { Link, useNavigate } from "react-router-dom";
import AlertContext from "../contex/alert/alertcontext";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const host = config.host;

const Login = () => {
  const context = useContext(AlertContext);
  const { showAlert, setLoading } = context;
  const navigate = useNavigate();
  const [ldata, setLdata] = useState({
    systemid: "",
    password: "",
    usertype: "student",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    setLdata({ ...ldata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemid: ldata.systemid,
        password: ldata.password,
        usertype: ldata.usertype,
      }),
    });

    const json = await response.json();
    setLoading(false);
    showAlert(json);
    if (json.msgtype) {
      //save the token on local storage and redirect
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("usertype", json.usertype);
      if(ldata.usertype==="student"){localStorage.setItem("systemid", ldata.systemid)};
      if (!json.istemppassword) {
        if (json.usertype === "admin") {
          navigate("/admin");
        } else if (json.usertype === "student") {
          navigate("/student");
        } else if (json.usertype === "teacher") {
          navigate("/teacher");
        } else if (json.usertype === "cordinator") {
          navigate("/cordinator");
        }
      } else if (json.istemppassword) {
        if (json.usertype === "admin") {
          navigate("/admin/changepassword");
        } else if (json.usertype === "student") {
          navigate("/student/changepassword");
        } else if (json.usertype === "teacher") {
          navigate("/teacher/changepassword");
        } else if (json.usertype === "cordinator") {
          navigate("/cordinator");
        }
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("usertype") === "admin") {
      navigate("/admin");
    }
    if (localStorage.getItem("usertype") === "student") {
      navigate("/student");
    }
    if (localStorage.getItem("usertype") === "teacher") {
      navigate("/teacher");
    }
    if (localStorage.getItem("usertype") === "cordinator") {
      navigate("/cordinator");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to System
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="systemid" className="sr-only">
                {ldata.usertype === "student" && "System ID"}
                {ldata.usertype === "teacher" && "Employee ID"}
                {ldata.usertype === "admin" && "Admin Email ID"}
              </label>
              <input
                id="systemid"
                name="systemid"
                type="text"
                required
                onChange={onChange}
                placeholder={
                  ldata.usertype === "student"
                    ? "Enter your System ID"
                    : ldata.usertype === "teacher"
                    ? "Enter your Employee ID"
                    : "Enter your Admin Email ID"
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                onChange={onChange}
                placeholder="Enter your Password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer z-20"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/resetpassword"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="usertype"
                value="student"
                onChange={onChange}
                defaultChecked
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Student
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="usertype"
                value="teacher"
                onChange={onChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Teacher
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="usertype"
                value="admin"
                onChange={onChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                Admin
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
