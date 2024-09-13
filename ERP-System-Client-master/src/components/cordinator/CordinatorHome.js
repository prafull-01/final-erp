import React, { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "../NavBar";
import CordinatorMenu from "./CordinatorMenu";
import Batches from "./Batches";
import EditBatch from "./EditBatch";
import Courses from "./Courses";
import Classes from "./Classes";
import Card from "../admin/Card"; // Import the Card component
import MainContext from "../../contex/main/maincontext";
import Timetable from "./Timetable";

const CordinatorHome = () => {
  const context = useContext(MainContext);
  const { selectedRoles } = context;
  const location = useLocation();

  return (
    <>
      <NavBar />
      <div className="flex flex-row h-screen mt-5">
        <CordinatorMenu />
        <div className="flex-grow p-4 overflow-auto">
          {location.pathname === "/cordinator" && (
            <div className="p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedRoles.timetable && (
                  <Card
                    title="Timetable"
                    description="Manage batches"
                    link="timetable"
                  />
                )}
                {selectedRoles.batches && (
                  <Card
                    title="Batches"
                    description="Manage batches"
                    link="batches"
                  />
                )}
                {selectedRoles.courses && (
                  <Card
                    title="Courses"
                    description="Manage courses"
                    link="courses"
                  />
                )}
                {selectedRoles.classes && (
                  <Card
                    title="Classes"
                    description="Manage classes"
                    link="classes"
                  />
                )}
                {/* Add more cards as needed */}
              </div>
            </div>
          )}
          <Routes>
            <Route exact path="batches" element={<Batches />} />
            <Route exact path="courses" element={<Courses />} />
            <Route exact path="classes" element={<Classes />} />
            <Route exact path="timetable" element={<Timetable />} />
            <Route path="/batches/editstudents" element={<EditBatch />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default CordinatorHome;
