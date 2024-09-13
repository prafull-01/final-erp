import React, { useState, useEffect, useContext } from 'react';
import config from "../../config";
import AlertContext from '../../contex/alert/alertcontext';
import Courseattendance from './Courseattendance';
const host = config.host;

const Attendance = () => {
  const context = useContext(AlertContext);
  const { setLoading, setMenuVisible } = context;
  const [courses, setCourses] = useState([]);
  const [filteredcourses, setFilteredCourses] = useState([]);
  const [semester, setSemester] = useState(''); 
  const [semesters, setSemesters] = useState([]);
  const [selectedcourse, setselectedcourse] = useState({
    academicyearcode: "",
    semestercode: "",
    coursecode: "",
  });
  const [showCourseAttendance, setShowCourseAttendance] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const response = await fetch(`${host}/api/academic/mycourses`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setLoading(false);
      setCourses(json.mycourses);
      setFilteredCourses(json.mycourses);

      const uniqueSemesters = [...new Set(json.mycourses.map(course => course.semestername))].sort();
      setSemesters(uniqueSemesters);

      if (uniqueSemesters.length > 0) {
        setSemester(uniqueSemesters[uniqueSemesters.length - 1]);
      }
    };
    fetchCourses();
  }, []);

  const handleviewattendance = async (course) => {
    setselectedcourse(course);
    setShowCourseAttendance(true);
  }

  useEffect(() => {
    if (semester) {
      setFilteredCourses(courses.filter(course => course.semestername === semester));
    } else {
      setFilteredCourses(courses);
    }
    setMenuVisible(false);
  }, [semester, courses]);

  return (
    <>
    {showCourseAttendance ? (<Courseattendance selectedcourse={selectedcourse} setShowCourseAttendance={setShowCourseAttendance} />)
      : (<div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Attendance</h1>
        <div className="mb-4">
          <select
            id="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="block rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {semesters.map((sem) => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full bg-white border table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Course Code</th>
                <th className="py-2 px-4 border-b text-left">Course Name</th>
                <th className="py-2 px-4 border-b text-left">Section Name</th>
                <th className="py-2 px-4 border-b text-left">Section Code</th>
                <th className="py-2 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-2 px-4 text-center">
                    No courses available.
                  </td>
                </tr>
              ) : (
                filteredcourses
                  .sort((a, b) => a.coursename.localeCompare(b.coursename))
                  .map((course, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{course.coursecode}</td>
                      <td className="py-2 px-4 border-b">{course.coursename}</td>
                      <td className="py-2 px-4 border-b">{course.batchname}</td>
                      <td className="py-2 px-4 border-b">{course.batchcode}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          className="flex justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                          onClick={() => handleviewattendance(course)}
                        >
                          View Attendance
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>)}
    </>
  );
};

export default Attendance;