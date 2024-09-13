import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertContext from "../../contex/alert/alertcontext";

const AdminMenu = () => {
  const context = useContext(AlertContext);
  const { isMenuVisible,setMenuVisible } = context;
  const navigate = useNavigate();
  const location = useLocation();
  const [isDashboardExpanded, setDashboardExpanded] = useState(false);
  const [isRegisterExpanded, setRegisterExpanded] = useState(false);
  const [isAccountExpanded, setAccountExpanded] = useState(false);

  const toggleDashboard = () => {
    setDashboardExpanded(!isDashboardExpanded);
    setAccountExpanded(false);
    setRegisterExpanded(false);
  };
  const toggleRegister = () => {
    setRegisterExpanded(!isRegisterExpanded);
    setDashboardExpanded(false);
    setAccountExpanded(false);
  };
  const toggleAccount = () => {
    setAccountExpanded(!isAccountExpanded);
    setRegisterExpanded(false);
    setDashboardExpanded(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login"); 
  };

  useEffect(() => {
    if (!(localStorage.getItem("usertype") === "admin")) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {isMenuVisible && 
        <div className="relative flex w-full max-w-[20rem] flex-col rounded-none bg-white p-4 text-gray-700 shadow-lg overflow-auto h-full min-h-[calc(100vh-2rem)] box-border min-w-[20rem] max-h-full">
         
          
          <div className="p-4 mb-4">
            <h5 className="text-2xl font-semibold text-blue-gray-900">
              ERP-System
            </h5>
          </div>
          <nav className="flex flex-col gap-1">
            <div className="relative">
              {/* <div
                role="button"
                onClick={toggleDashboard}
                className="flex items-center justify-between w-full p-3 rounded-lg bg-blue-gray-50 hover:bg-blue-gray-100 focus:bg-blue-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mr-3 text-blue-gray-700"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-lg font-medium text-blue-gray-900">
                    Time Table & Attendance
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className={`w-5 h-5 transition-transform ${
                    isDashboardExpanded ? "rotate-180" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  ></path>
                </svg>
              </div>
              {isDashboardExpanded && (
                <div className="mt-2 pl-6">
                  <Link
                    to="/"
                    className="block p-2 rounded-lg hover:bg-blue-gray-100"
                  >
                    Time Table
                  </Link>
                  <Link
                    to="/"
                    className="block p-2 rounded-lg hover:bg-blue-gray-100"
                  >
                    Attendance
                  </Link>
                </div>
              )} */}
            </div>
            <div className="relative">
              <div
                role="button"
                onClick={toggleRegister}
                className="flex items-center justify-between w-full p-3 rounded-lg bg-blue-gray-50 hover:bg-blue-gray-100 focus:bg-blue-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mr-3 text-blue-gray-700"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-lg font-medium text-blue-gray-900">
                    Master
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className={`w-5 h-5 transition-transform ${
                    isRegisterExpanded ? "rotate-180" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  ></path>
                </svg>
              </div>
              {isRegisterExpanded && (
                <div className="mt-2 pl-6">
                <Link
                  to="/admin/users"
                  className={`block p-2 rounded-lg hover:bg-blue-gray-100 ${location.pathname === "/admin/users" ? "bg-blue-200" : ""}`}
                >
                  Users
                </Link>
                <Link
                  to="/admin/schooldep"
                  className={`block p-2 rounded-lg hover:bg-blue-gray-100 ${location.pathname === "/admin/schooldep" ? "bg-blue-200" : ""}`}
                >
                  School & Department
                </Link>
                <Link
                  to="/admin/yearsem"
                  className={`block p-2 rounded-lg hover:bg-blue-gray-100 ${location.pathname === "/admin/yearsem" ? "bg-blue-200" : ""}`}
                >
                  Academic Year & Semester
                </Link>
                <Link
                  to="/admin/rooms"
                  className={`block p-2 rounded-lg hover:bg-blue-gray-100 ${location.pathname === "/admin/rooms" ? "bg-blue-200" : ""}`}
                >
                  Rooms
                </Link>
                <Link
                  to="/admin/batches"
                  className={`block p-2 rounded-lg hover:bg-blue-gray-100 ${location.pathname === "/admin/batches" ? "bg-blue-200" : ""}`}
                >
                  Batches
                </Link>
                <Link
                  to="/admin/courses"
                  className={`block p-2 rounded-lg hover:bg-blue-gray-100 ${location.pathname === "/admin/courses" ? "bg-blue-200" : ""}`}
                >
                  Courses
                </Link>
                <Link
                  to="/admin/classes"
                  className={`block p-2 rounded-lg hover:bg-blue-gray-100 ${location.pathname === "/admin/classes" ? "bg-blue-200" : ""}`}
                >
                  Classes
                </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <div
                role="button"
                onClick={toggleAccount}
                className="flex items-center justify-between w-full p-3 rounded-lg bg-blue-gray-50 hover:bg-blue-gray-100 focus:bg-blue-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mr-3 text-blue-gray-700"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-lg font-medium text-blue-gray-900">
                    Account Settings
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className={`w-5 h-5 transition-transform ${
                    isAccountExpanded ? "rotate-180" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  ></path>
                </svg>
              </div>
              {isAccountExpanded && (
                <div className="mt-2 pl-6">
                  {/* <Link
                    to="/"
                    className="block p-2 rounded-lg hover:bg-blue-gray-100"
                  >
                    Profile
                  </Link> */}
                  <Link
                    to="/admin/changepassword"
                    className={`block p-2 rounded-lg hover:bg-blue-gray-100 ${location.pathname === "/admin/changepassword" ? "bg-blue-200" : ""}`}
                  >
                    Change Password
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left p-2 rounded-lg hover:bg-red-50 text-red-700 hover:text-red-900"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>}
    </>
  );
};

export default AdminMenu;
