import React, { useContext, useState, useEffect } from "react";
import MainContext from "../../contex/main/maincontext";
import AlertContext from "../../contex/alert/alertcontext";

const Room = () => {
  const context = useContext(MainContext);
  const {
    schoollist,
    departmentslist,
    roomlist,
    getschoollist,
    getdepartmentlist,
    getroomlist,
    addroom
  } = context;
  const context2 = useContext(AlertContext);
  const { setMenuVisible } = context2;

  const [toggleadmin, setToggleadmin] = useState(true);
  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");
  const [roomData, setRoomData] = useState({
    roomname: "",
    schoolname: "",
    departmentname: "",
  });
  const [rdata, setRdata] = useState({
    school: "",
    department: "",
  });

  useEffect(() => {
    getschoollist();
    setMenuVisible(false);
  }, []);

  const onSchoolChange = (e) => {
    const selectedSchool = e.target.value;
    setRdata((prevData) => ({
      ...prevData,
      school: selectedSchool,
    }));
    setSchool(selectedSchool);
    getdepartmentlist(selectedSchool);
  };

  const onDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setRdata((prevData) => ({
      ...prevData,
      department: selectedDepartment,
    }));
    setDepartment(selectedDepartment);
  };

  const onInputChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleAddRoom = async () => {
    await addroom(roomData);
    setRoomData({
      roomname: "",
      schoolname: rdata.school,
      departmentname: rdata.department,
    });
    getroomlist(rdata.school, rdata.department);
  };

  const handleSubmit = () => {
    getroomlist(rdata.school, rdata.department);
    setRoomData({
      schoolname: rdata.school,
      departmentname: rdata.department,
    });
    setToggleadmin(false);
  };

  const filteredRoomList = roomlist.filter((room) => {
    return (
      room.schoolname?.includes(rdata.school) &&
      room.departmentname?.includes(rdata.department)
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
                onChange={onSchoolChange}
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
                  onChange={onDepartmentChange}
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
            </div>

            <br />
            <br />
            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}

      {!toggleadmin && (
        <>
          <div className="flex justify-between mb-4">
            <h1 className="text-xl font-bold">Rooms</h1>
            <button
              type="button"
              className="flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
              data-bs-toggle="modal"
              data-bs-target="#addRoomModal"
            >
              Add New Room
            </button>
          </div>

          <div className="overflow-auto max-h-96">
            <table className="min-w-full bg-white border table-auto">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Room Name</th>
                  <th className="py-2 px-4 border-b text-left">School</th>
                  <th className="py-2 px-4 border-b text-left">Department</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoomList
                  .sort((a, b) => a.room.localeCompare(b.room))
                  .map((room, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{room.room}</td>
                      <td className="py-2 px-4 border-b">{room.schoolname}</td>
                      <td className="py-2 px-4 border-b">{room.departmentname}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Add Room Modal */}
          <div
            className="modal fade"
            id="addRoomModal"
            tabIndex="-1"
            aria-labelledby="addRoomModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addRoomModalLabel">
                    Add New Room
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
                      <label htmlFor="roomname" className="form-label">
                        Room Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="roomname"
                        name="roomname"
                        onChange={onInputChange}
                        value={roomData.roomname}
                        required
                      />
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
                    onClick={handleAddRoom}
                    data-bs-dismiss="modal"
                  >
                    Add Room
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

export default Room;