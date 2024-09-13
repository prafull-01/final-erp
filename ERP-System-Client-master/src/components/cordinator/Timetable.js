import React, { useState, useEffect, useContext } from "react";
import config from "../../config";
import MainContext from "../../contex/main/maincontext";
import { useNavigate } from "react-router-dom";
import EditTimetable from "./EditTimetable";
import AlertContext from "../../contex/alert/alertcontext";
import { getWeek, startOfWeek, add, getYear, format, parse } from "date-fns";

const host = config.host;

const Timetable = () => {
  const context2 = useContext(AlertContext);
  const { setMenuVisible, showAlert } = context2;
  const navigate = useNavigate();
  const context1 = useContext(MainContext);
  const { yearlist, getyearlist, getsemlist, selectedRoles, getroomlist, roomlist } =
    context1;

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSem, setSelectedSem] = useState("");
  const [weekCode, setWeekCode] = useState("");
  const [semList, setSemList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [classItem, setclassItem] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [togglepage, settogglepage] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [weekCodeModal, setWeekCodeModal] = useState("");
  const [copy, setCopy] = useState(false);
  const [modalYear, setModalYear] = useState("");
  const [weekcode1, setweekcode1] = useState("");
  const [modalSem, setModalSem] = useState("");
  const classrooms = [];
  useEffect(() => {
    getroomlist();
    getyearlist();
    setMenuVisible(false);
    checkPermission();
    initials();
  }, []);

  const checkPermission = () => {
    if (
      localStorage.getItem("usertype") === "cordinator" &&
      !selectedRoles.timetable
    ) {
      navigate("/cordinator");
    }
  };
const initials = () => {
    const date = new Date();
    const week = getWeek(date);
    const year = getYear(date);
    setweekcode1(`${year}-${week}`)
  };
  const onYearChange = async (e) => {
    const yearCode = e.target.value;
    setSelectedYear(yearCode);
    const json = await getsemlist(yearCode);
    setSemList(json.semesterlist);
  };

  const onSemChange = (e) => {
    setSelectedSem(e.target.value);
  };

  const onWeekCodeChange = (e) => {
    setWeekCode(e.target.value);
  };

  const fetchClassList = async (yearCode, semCode) => {
    const response = await fetch(`${host}/api/academic/cordinatortimetable`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        academicyearcode: yearCode,
        semestercode: semCode,
        weekcode: weekCode,
      }),
    });
    const data = await response.json();
    if (data.msgtype) {
      setClassList(data.timetable);
    }
  };

  const addweek = async (copy, weekcode, yearCode, semCode) => {
    const response = await fetch(`${host}/api/academic/generatetimetable`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        copy: copy,
        weekcode: weekcode,
        academicyearcode: yearCode,
        semestercode: semCode,
      }),
    });
    const data = await response.json();
    showAlert(data);
  };

  const handleSearch = () => {
    fetchClassList(selectedYear, selectedSem);
  };

  const handleEditClass = (classItem) => {
    for (const rooms of roomlist) {
      classrooms.push(rooms.room);
    }
    localStorage.setItem("classrooms", classrooms);
    setclassItem(classItem);
    settogglepage(true);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);
    setCopy(option === "copy");
  };

  const handleWeekCodeModalChange = (e) => {
    setWeekCodeModal(e.target.value);
  };

  const handleModalYearChange = async (e) => {
    const yearCode = e.target.value;
    setModalYear(yearCode);
    const json = await getsemlist(yearCode);
    setSemList(json.semesterlist);
  };

  const handleModalSemChange = (e) => {
    setModalSem(e.target.value);
  };

  const handleSubmit = () => {
    addweek(copy, weekCodeModal, modalYear, modalSem);
    setWeekCodeModal("");
    setSelectedOption("");
    setModalYear("");
    setModalSem("");
    setIsModalOpen(false);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClassList = classList.filter((classItem) =>
    classItem.classcode.includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {togglepage ? (
        <EditTimetable
          classItem={classItem}
          settogglepage={settogglepage}
          setClassList={setClassList}
        />
      ) : (
        <div className="p-4">
          <div className="flex justify-end mb-4">
            <button
              type="button"
              className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out"
              onClick={handleOpenModal}
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="year"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Year
              </label>
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

            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="semester"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Semester
              </label>
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

            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="weekCode"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Week Code (Current Week: {weekcode1})
              </label>
              <input
                type="text"
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={onWeekCodeChange}
                value={weekCode}
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold mb-4">Classes</h2>
            <div className="mb-4 flex justify-start">
              <input
                type="text"
                placeholder="Search by Class Code"
                className="block w-1/3 rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
            </div>
            <div className="overflow-auto max-h-96">
              <table className="min-w-full bg-white border table-auto">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Class Code</th>
                    <th className="py-2 px-4 border-b text-left">Week Code</th>
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClassList.map((classItem, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">
                        {classItem.classcode}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {classItem.weekcode}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          className="flex justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                          onClick={() => handleEditClass(classItem)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {isModalOpen && (
            <div
              className="modal fade show"
              style={{ display: "block" }}
              tabIndex="-1"
              role="dialog"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modal-title">
                      Add a new Week
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleCloseModal}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="weekOption" className="form-label">
                        Select Option
                      </label>
                      <select
                        className="form-control"
                        onChange={handleOptionChange}
                        value={selectedOption}
                      >
                        <option value="">Select an Option</option>
                        <option value="copy">Copy current week schedule</option>
                        <option value="fresh">Add a fresh Week</option>
                      </select>
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="weekCodeModal" className="form-label">
                        Week Code (Current Week: {weekcode1})
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleWeekCodeModalChange}
                        value={weekCodeModal}
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="modalYear" className="form-label">
                        Academic Year
                      </label>
                      <select
                        className="form-control"
                        onChange={handleModalYearChange}
                        value={modalYear}
                      >
                        <option value="">Select a Year</option>
                        {yearlist.map((year, index) => (
                          <option key={index} value={year.academicyearcode}>
                            {year.academicyearname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="modalSem" className="form-label">
                        Semester
                      </label>
                      <select
                        className="form-control"
                        onChange={handleModalSemChange}
                        value={modalSem}
                      >
                        <option value="">Select a Semester</option>
                        {semList.map((sem, index) => (
                          <option key={index} value={sem.semestercode}>
                            {sem.semestername}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Timetable;