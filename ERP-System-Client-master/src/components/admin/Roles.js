import React, { forwardRef, useContext, useState } from "react";
import MainContext from "../../contex/main/maincontext";

const Roles = forwardRef(({ ruser }, ref) => {
  const context = useContext(MainContext);
  const { setrole, selectedRoles, setSelectedRoles } = context;
  const [showSubOptions, setShowSubOptions] = useState(false);

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setSelectedRoles((prevRoles) => ({
      ...prevRoles,
      [id]: checked,
    }));
    if (id === "studentcontrol") {
      setShowSubOptions(checked);
    }
  };

  const handleSubOptionChange = (e) => {
    const { id, checked } = e.target;
    setSelectedRoles((prevRoles) => ({
      ...prevRoles,
      [id]: checked,
    }));
  };

    const handleSubmit = async () => {
  
    const data = {
      empid: ruser.empid,
      timetable: selectedRoles.timetable,
      studentcontrol: selectedRoles.studentcontrol,
      batches: selectedRoles.batches,
      courses: selectedRoles.courses,
      classes: selectedRoles.classes,
    };
    await setrole(data);
  };

  return (
    <>
      <button
        type="button"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      />

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Define the Roles of "<b>{ruser.name}</b>"
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="timetable"
                  checked={selectedRoles.timetable}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="timetable">
                  Time table
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="studentcontrol"
                  checked={selectedRoles.studentcontrol}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="studentcontrol">
                  Student Control
                </label>
              </div>
              {showSubOptions && (
                <div className="ml-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="batches"
                      checked={selectedRoles.batches}
                      onChange={handleSubOptionChange}
                    />
                    <label className="form-check-label" htmlFor="subOption1">
                      Batches
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="courses"
                      checked={selectedRoles.courses}
                      onChange={handleSubOptionChange}
                    />
                    <label className="form-check-label" htmlFor="subOption2">
                      Courses
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="classes"
                      checked={selectedRoles.classes}
                      onChange={handleSubOptionChange}
                    />
                    <label className="form-check-label" htmlFor="subOption2">
                      Classes
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                type="button"
                className="flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                data-bs-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Roles;