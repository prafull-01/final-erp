import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import StudentMenu from "./StudentMenu";
import NavBar from "../NavBar";
import ChangePassword from "../ChangePassword";
import Card from "../admin/Card";
import MyCourses from "./MyCourses";
import Timetable from "./Timetable";
import Attendance from "./attendance";

const Studenthome = () => {
  const location = useLocation();
  return (
    <>
      <NavBar />
      <div className="flex flex-row h-screen mt-5">
        <StudentMenu />

        <div className="flex-grow p-4 overflow-auto mr-2">
          {location.pathname === "/student" && (
            <div className="p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Card title="Timetable" link="timetable" />
                <Card title="My Courses" link="mycourses" />
                <Card title="Attendance" link="attendance" />
              </div>
            </div>
          )}
          <Routes>
            <Route exact path="changepassword" element={<ChangePassword />} />
            <Route exact path="mycourses" element={<MyCourses />} />
            <Route exact path="timetable" element={<Timetable />} />
            <Route exact path="attendance" element={<Attendance />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Studenthome;
