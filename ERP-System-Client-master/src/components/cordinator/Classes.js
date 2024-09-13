import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainContext from "../../contex/main/maincontext";
import AlertContext from "../../contex/alert/alertcontext";
import ClassesContext from "../../contex/classes/classescontext";
import BatchContext from "../../contex/batch/batchcontext";
import UserListContext from "../../contex/userlist/userlistcontext";

const Classes = () => {
  const navigate = useNavigate();
  const context = useContext(ClassesContext);
  const { classlist, getclasslist, addclass, setClasslist } = context;
  const context2 = useContext(AlertContext);
  const { setMenuVisible, getuserdata } = context2;
  const context3 = useContext(BatchContext);
  const { batchlist, getbatchlist, getcourselist, courselist } = context3;
  const context4 = useContext(UserListContext);
  const { userlist, fetchuserlist } = context4;

  const context1 = useContext(MainContext);
  const {
    yearlist,
    getyearlist,
    getsemlist,
    selectedRoles,
    schoollist,
    departmentslist,
    getschoollist,
    getdepartmentlist,
  } = context1;

  const [modalTeacher, setModalTeacher] = useState("");
  const [modalCourse, setModalCourse] = useState("");
  const [toggleadmin, setToggleadmin] = useState(true);
  const [toggleyear, setToggleyear] = useState(true);
  const [filteredTeacherList, setFilteredTeacherList] = useState([]);
  const [filteredCourseList, setFilteredCourseList] = useState([]);

  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");
  const [rdata, setRdata] = useState({
    school: "",
    department: "",
  });
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSem, setSelectedSem] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [semList, setSemList] = useState([]);

  useEffect(() => {
      const effect = async () => {
        await getschoollist();
        const yearlist = await getyearlist(); // Ensure getyearlist is awaited and yearlist is updated
        checkPermision();
        setSelectedYear(yearlist[yearlist.length - 1].academicyearcode); // Use the updated yearlist
        const json = await getsemlist(yearlist[yearlist.length - 1].academicyearcode);
        setSemList(json.semesterlist);
      };
      effect();
    }, []);

  useEffect(() => {
    if (localStorage.getItem("usertype") === "cordinator") {
      getclasslist();
      setSelectedYear(yearlist[yearlist.length - 1]);
      setToggleadmin(false);
    } else if (localStorage.getItem("usertype") === "admin") {
      setClasslist([]);
    }
    setMenuVisible(false);
    fetchuserlist("teacher");
    getcourselist("", school, department);
  }, []);
  const onYearChange = async (e) => {
    const yearCode = e.target.value;
    setSelectedYear(yearCode);
    const json = await getsemlist(yearCode);
    setSemList(json.semesterlist);
  };

  const onSemChange = async (e) => {
    const semCode = e.target.value;
    setSelectedSem(semCode);
    await getbatchlist("", school, department);
  };
  const onBatchChange = (e) => {
    const batchCode = e.target.value;
    setSelectedBatch(batchCode);
  };

  const checkPermision = () => {
    if (
      localStorage.getItem("usertype") === "cordinator" &&
      !selectedRoles.classes
    ) {
      return navigate("/cordinator");
    }
  };

  const handleAddBatch = async () => {
    const classname = `${modalTeacher}-${modalCourse}-${selectedYear}-${selectedSem}-${selectedBatch}`;
    const classcode = `${modalTeacher}-${modalCourse}-${selectedYear}-${selectedSem}-${selectedBatch}`;
    const data = {
      schoolcode: school,
      departmentcode: department,
      academicyearcode: selectedYear,
      semestercode: selectedSem,
      batchcode: selectedBatch,
      coursecode: modalCourse,
      teachercode: modalTeacher,
      classname: classname,
      classcode: classcode,
      batchname: selectedBatch,
      teachername: modalTeacher,
    };
    await addclass(data);

    setModalTeacher("");
    setModalCourse("");
    getclasslist(
      selectedBatch,
      rdata.school,
      rdata.department,
      selectedYear,
      selectedSem
    );
  };

  const onChangeModalTeacher = (e) => {
    setModalTeacher(e.target.value);
  };

  const onChangeModalCourse = (e) => {
    setModalCourse(e.target.value);
  };

  const onschoolChange = (e) => {
    const selectedSchool = e.target.value;
    setRdata((prevData) => ({
      ...prevData,
      school: selectedSchool,
    }));
    setSchool(selectedSchool);
    getdepartmentlist(selectedSchool);
  };

  const ondepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setRdata((prevData) => ({
      ...prevData,
      department: selectedDepartment,
    }));
    setDepartment(selectedDepartment);
  };

  const handlesubmit = () => {
    setToggleadmin(false);
    getcourselist("", school, department);
    // setSelectedYear(yearlist[yearlist.length - 1].academicyearcode);
  };
  const handlesubmit1 = async () => {
    getclasslist(
      selectedBatch,
      rdata.school,
      rdata.department,
      selectedYear,
      selectedSem
    );
    setToggleyear(false);
    if (localStorage.getItem("usertype") === "cordinator") {
      const data = await getuserdata();
      setSchool(data.user.school);
      setDepartment(data.user.department);
      setRdata({ school: data.user.school, department: data.user.department });
    }
    const filteredTeachers = userlist.filter(
      (teacher) =>
        school?.includes(teacher.school) &&
        department?.includes(teacher.department)
    );
    const filteredCourses = courselist.filter(
      (course) =>
        school?.includes(course.schoolcode) &&
        department?.includes(course.departmentcode)
    );
    if (localStorage.getItem("usertype") === "admin") {
      setFilteredCourseList(filteredCourses);
      setFilteredTeacherList(filteredTeachers);
    } else if (localStorage.getItem("usertype") === "cordinator") {
      setFilteredCourseList(courselist);
      setFilteredTeacherList(userlist);
    }
  };

  const filteredbatchlist = batchlist.filter((batch) => {
    return (
      batch.academicyearcode?.includes(selectedYear) &&
      batch.semestercode?.includes(selectedSem)
    );
  });

  return (
    <div className="p-4">
      {toggleadmin && (
        <>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <label
              htmlFor="school"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              School
            </label>
            <div className="mt-2">
              <select
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={onschoolChange}
                value={school}
              >
                <option value="">Select a School</option>
                {schoollist.map((school, index) => (
                  <option key={index} value={school.schoolcode}>
                    {school.schoolname}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <label
              htmlFor="department"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Department
            </label>
            <div className="mt-2">
              <select
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={ondepartmentChange}
                value={department}
              >
                <option value="">Select a Department</option>
                {departmentslist.map((department, index) => (
                  <option key={index} value={department.departmentcode}>
                    {department.departmentname}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <br />
            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handlesubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}

      {!toggleadmin && (
        <>
          {toggleyear && (
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <label
                htmlFor="year"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Year
              </label>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={onYearChange}
                  value={selectedYear}
                >
                  <option value="">Select a Year</option>
                  {yearlist.map((year, index) => (
                    <option key={index} value={year.academicyearcode}>
                      {year.academicyearname}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <br />
              <label
                htmlFor="semester"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Semester
              </label>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={onSemChange}
                  value={selectedSem}
                >
                  <option value="">Select a Semester</option>
                  {semList.map((sem, index) => (
                    <option key={index} value={sem.semestercode}>
                      {sem.semestername}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <br />
              <label
                htmlFor="semester"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Batch
              </label>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={onBatchChange}
                  value={selectedBatch}
                >
                  <option value="">Select a Batch</option>
                  {filteredbatchlist.map((sem, index) => (
                    <option key={index} value={sem.batchcode}>
                      {sem.batchname}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <br />
              <div>
                <button
                  type="button"
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={handlesubmit1}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
          {!toggleyear && (
            <>
              <div className="flex justify-between mb-4">
                <h1 className="text-xl font-bold">Classes</h1>
                <button
                  type="button"
                  className="flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                  data-bs-toggle="modal"
                  data-bs-target="#addBatchModal"
                >
                  Add New Class
                </button>
              </div>

              <div className="overflow-auto max-h-96">
                <table className="min-w-full bg-white border table-auto">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left">
                        Batch Name
                      </th>
                      <th className="py-2 px-4 border-b text-left">
                        Class Name
                      </th>
                      <th className="py-2 px-4 border-b text-left">
                        Teacher Name
                      </th>
                      <th className="py-2 px-4 border-b text-left">
                        Course Name
                      </th>
                      <th className="py-2 px-4 border-b text-left">
                        Academic Year
                      </th>
                      <th className="py-2 px-4 border-b text-left">Semester</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classlist.map((batch, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b">
                          {batch.batchname}
                        </td>
                        <td className="py-2 px-4 border-b">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: batch.classname,
                            }}
                          />
                        </td>
                        <td className="py-2 px-4 border-b">
                          {batch.teachername}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {batch.coursename}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {batch.academicyearcode}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {batch.semestercode}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {/* Add Batch Modal */}
          <div
            className="modal fade"
            id="addBatchModal"
            tabIndex="-1"
            aria-labelledby="addBatchModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addBatchModalLabel">
                    Add New Class
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="academicyear" className="form-label">
                        Teacher
                      </label>
                      <select
                        className="form-control"
                        id="academicyear"
                        name="academicyearcode"
                        onChange={onChangeModalTeacher}
                        value={modalTeacher}
                      >
                        <option value="">Select Teacher</option>
                        {filteredTeacherList.map((teacher, index) => (
                          <option key={index} value={teacher.empid}>
                            {teacher.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="semester" className="form-label">
                        Course
                      </label>
                      <select
                        className="form-control"
                        id="semester"
                        name="semestercode"
                        onChange={onChangeModalCourse}
                        value={modalCourse}
                      >
                        <option value="">Select Course</option>
                        {filteredCourseList.map((course, index) => (
                          <option key={index} value={course.coursecode}>
                            {course.coursename}
                          </option>
                        ))}
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="flex justify-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={handleAddBatch}
                    data-bs-dismiss="modal"
                  >
                    Add Class
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Classes;
