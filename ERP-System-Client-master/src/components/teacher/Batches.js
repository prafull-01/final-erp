import React, { useState, useEffect, useContext } from "react";
import config from "../../config";
import AlertContext from "../../contex/alert/alertcontext";
import BatchContext from "../../contex/batch/batchcontext";
import UserListContext from "../../contex/userlist/userlistcontext";

const host = config.host;

const Batches = () => {
  const alertContext = useContext(AlertContext);
  const { setLoading, setMenuVisible } = alertContext;

  const batchContext = useContext(BatchContext);
  const { getbatchlist} = batchContext;
  const context2 = useContext(UserListContext);

  const [courses, setCourses] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [semester, setSemester] = useState("");
  const [semesters, setSemesters] = useState([]);
  const [toggleView, setToggleView] = useState(true);

  const handleViewStudents = async (batch) => {
    setToggleView(false);
    const json = await getbatchlist(
      "",
      batch.schoolcode,
      batch.departmentcode,
      batch.academicyearcode,
      batch.semestercode
    );
    for (const batch1 of json.batchlist){
        if (batch1.batchcode===batch.batchcode){
            setSelectedBatch(batch1)
            break;
        }
    }
  };

 

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const response = await fetch(`${host}/api/academic/teacherclasses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setLoading(false);
      setCourses(json.teacherclasses);
      setFilteredCourses(json.teacherclasses);

      const uniqueSemesters = [
        ...new Set(
          json.teacherclasses.map((course) => course.academicyearcode)
        ),
      ].sort();
      setSemesters(uniqueSemesters);

      if (uniqueSemesters?.length > 0) {
        setSemester(uniqueSemesters[uniqueSemesters?.length - 1]);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (semester) {
      setFilteredCourses(
        courses.filter((course) => course.academicyearcode === semester)
      );
    } else {
      setFilteredCourses(courses);
    }
    setMenuVisible(false);
  }, [semester, courses, setMenuVisible]);

  return (
    <>
      {toggleView ? (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Batches Allotted</h1>
          <div className="mb-4">
            <select
              id="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="block rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
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
                  <th className="py-2 px-4 border-b text-left">Semester Name</th>
                  <th className="py-2 px-4 border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-2 px-4 text-center">
                      No courses available.
                    </td>
                  </tr>
                ) : (
                  filteredCourses
                    .sort((a, b) => a.coursename.localeCompare(b.coursename))
                    .map((course) => (
                      <tr key={course._id}>
                        <td className="py-2 px-4 border-b">
                          {course.coursecode}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {course.coursename}
                        </td>
                        <td className="py-2 px-4 border-b">{course.batchname}</td>
                        <td className="py-2 px-4 border-b">{course.batchcode}</td>
                        <td className="py-2 px-4 border-b">
                          {course.semestercode}
                        </td>
                        <td className="py-2 px-4 border-b">
                          <button
                            className="flex justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => handleViewStudents(course)}
                          >
                            View Students
                          </button>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-auto max-h-96">
          <button
                className="flex justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={()=>setToggleView(true)}
              >
                Back
              </button>
          <table className="min-w-full bg-white border table-auto shadow-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">
                    Batch Information
                  </th>
                  <th className="py-2 px-4 border-b text-left"></th>
                </tr>
              </thead>
              <tbody>
                {selectedBatch ? (
                  <>
                    <tr>
                      <td className="py-2 px-4 border-b">
                        <strong>School:</strong>
                      </td>
                      <td className="py-2 px-4 border-b">
                        {selectedBatch.schoolcode}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">
                        <strong>Department:</strong>
                      </td>
                      <td className="py-2 px-4 border-b">
                        {selectedBatch.departmentcode}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">
                        <strong>Academic Year:</strong>
                      </td>
                      <td className="py-2 px-4 border-b">
                        {selectedBatch.academicyearcode}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">
                        <strong>Semester:</strong>
                      </td>
                      <td className="py-2 px-4 border-b">
                        {selectedBatch.semestercode}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">
                        <strong>Batch:</strong>
                      </td>
                      <td className="py-2 px-4 border-b">
                        {selectedBatch.batchname}
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan={2} className="py-2 px-4 text-center">
                      No batch selected.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="overflow-auto mt-10">
            <table className="min-w-full bg-white border table-auto">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">System ID</th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Phone</th>
                </tr>
              </thead>
              <tbody>
                {selectedBatch.students?.length > 0 ? (
                  selectedBatch.students?.sort((a, b) => a.name.localeCompare(b.name))
                  .map((student, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{student.name}</td>
                      <td className="py-2 px-4 border-b">
                        {student.systemid}
                      </td>
                      <td className="py-2 px-4 border-b">{student.email}</td>
                      <td className="py-2 px-4 border-b">{student.phone}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-2 px-4 text-center">
                      No students found in this batch.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Batches;
