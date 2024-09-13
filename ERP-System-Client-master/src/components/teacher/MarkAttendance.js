import React, { useState, useEffect, useContext } from "react";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../contex/alert/alertcontext";
import BatchContext from "../../contex/batch/batchcontext";
import UserListContext from "../../contex/userlist/userlistcontext";
import AttendanceContext from "../../contex/attendance/attendancecontext";

const host = config.host;

const MarkAttendance = () => {
  const navigate = useNavigate();
  const context1 = useContext(AttendanceContext);
  const { selectedClass, studentlist, updateAttendance } = context1;

  const [students, setStudents] = useState(studentlist);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (Object.keys(selectedClass).length === 0) {
      navigate("/teacher/timetable");
    }

    if (!selectedClass.markedAttendence) {
      setStudents((prevStudents) =>
        prevStudents.map((stud) =>
          stud.attendance === "" ? { ...stud, attendance: "A" } : stud
        )
      );
    }
  }, [selectedClass]);

  const handleAttendanceChange = (e, id) => {
    const newAttendance = e.target.checked ? "P" : "A";
    setStudents((prevStudents) =>
      prevStudents.map((stud) =>
        stud.systemid === id ? { ...stud, attendance: newAttendance } : stud
      )
    );
  };

  const handleSubmit = () => {
    setShowPopup(true);
  };

  const handleFinalSubmit = async () => {
    setShowPopup(false);
    await updateAttendance(students);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const countAttendance = () => {
    const totalA = students.filter((stud) => stud.attendance === "A").length;
    const totalP = students.filter((stud) => stud.attendance === "P").length;
    return { totalA, totalP };
  };

  const { totalA, totalP } = countAttendance();

  // Filter and sort students by name
  const filteredStudents = students
    .filter(
      (stud) =>
        stud.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stud.systemid.includes(searchQuery)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div>
          <button
            onClick={() => navigate("/teacher/timetable")}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Back
          </button>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="border p-4 mb-4 bg-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Mark Attendance for:</h2>
        <p className="mb-1">
          <strong>Course Code:</strong> {selectedClass.coursecode}
        </p>
        <p className="mb-1">
          <strong>Course Name:</strong> {selectedClass.coursename}
        </p>
      </div>
      <div className="border p-4 bg-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mb-2 md:mb-0">Student List</h2>
          <div className="flex justify-end w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by name or system ID"
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 border rounded w-full md:max-w-xs"
            />
          </div>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full bg-white border table-auto shadow-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">System ID</th>
                <th className="py-2 px-4 border-b text-left">Student Name</th>
                <th className="py-2 px-4 border-b text-left">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((stud, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{stud.systemid}</td>
                  <td className="py-2 px-4 border-b">{stud.name}</td>
                  <td className="py-2 px-4 border-b">
                    <label>
                      <div className="relative inline-block w-11 h-5">
                        <input
                          id={`switch-component-${stud.systemid}`}
                          type="checkbox"
                          className={`peer appearance-none w-11 h-5 rounded-full cursor-pointer transition-colors duration-300 ${
                            stud.attendance === "P"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                          checked={stud.attendance === "P"}
                          onChange={(e) =>
                            handleAttendanceChange(e, stud.systemid)
                          }
                        />
                        <label
                          htmlFor={`switch-component-${stud.systemid}`}
                          className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-green-500 cursor-pointer"
                        ></label>
                      </div>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-extrabold mb-6 text-gray-800">
              Attendance Summary
            </h2>
            <p className="flex justify-center text-lg mb-2 text-gray-700">
              <span className="font-semibold text-red-500">
                Total Absent (A): {totalA}
              </span>
            </p>
            <p className="flex justify-center text-lg mb-2 text-gray-700">
              <span className="font-semibold text-green-500">
                Total Present (P): {totalP}
              </span>
            </p>
            <p className="flex justify-center text-lg mb-4 text-gray-700">
              <span className="font-semibold">
                Total Students: {totalP + totalA}
              </span>
            </p>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleFinalSubmit}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkAttendance;
