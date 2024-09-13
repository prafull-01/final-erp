import React, { useContext, useEffect, useState } from "react";
import MainContext from "../../contex/main/maincontext";
import AlertContext from "../../contex/alert/alertcontext";

const SchoolDep = () => {
  const context = useContext(MainContext);
  const { schoollist, departmentslist, getschoollist, getdepartmentlist, addschooldep,setDepartmentslist } = context;
  const context2 = useContext(AlertContext);
  const {setMenuVisible } = context2;
  const [toggle, setToggle] = useState("");
  const [school, setSchool] = useState("");
  const [addschool, setAddschool] = useState("");
  const [add, setAdd] = useState("school");
  const [adddata, setAdddata] = useState({
    toadd: "school",
    schoolname: "",
    schoolcode: "",
    depname: "",
    depcode: "",
    schoolcodedep: ""
  });

  const handleschool = async () => {
    setToggle("school");
    getschoollist();
  };

  const handledep = async () => {
    setToggle("department");
    setDepartmentslist([])
  };

  const departmentsearch = async () => {
    await getdepartmentlist(school);
  };

  const onschoolChange = (e) => {
    const selectedSchoolCode = e.target.value;
    setSchool(selectedSchoolCode);
  };
  const onaddschoolChange = (e) => {
    const selectedSchoolCode = e.target.value;
    setAdddata((prevData) => ({
      ...prevData,
      schoolcodedep: selectedSchoolCode,
    }));
    setAddschool(selectedSchoolCode);
  };

  const onaddChange = (e) => {
    const toadd = e.target.value;
    setAdddata((prevData) => ({
      ...prevData,
      toadd: toadd,
    }));
    setAdd(toadd);
  };

  const onChange = (e) => {
    setAdddata((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    await addschooldep(adddata);
    setDepartmentslist([])
    setAdddata({
      toadd: "school",
      schoolname: "",
      schoolcode: "",
      depname: "",
      depcode: "",
      schoolcodedep: ""
    })
    setAdd("school")
    setAddschool("")

  };

  useEffect(() => {
    getschoollist();
    setMenuVisible(false);
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 mb-4">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleschool}
        >
          Schools
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handledep}
        >
          Departments
        </button>
        <button
          type="button"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add
        </button>
      </div>

      {toggle === "school" && (
        <div className="overflow-auto max-h-96">
          <table className="min-w-full bg-white border table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">School Name</th>
                <th className="py-2 px-4 border-b text-left">School Code</th>
              </tr>
            </thead>
            <tbody>
              {schoollist.map((school, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{school.schoolname}</td>
                  <td className="py-2 px-4 border-b">{school.schoolcode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {toggle === "department" && (
        <div className="overflow-auto max-h-96">
          <div className="flex items-center space-x-4 mb-4">
            <select
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={departmentsearch}
            >
              Search
            </button>

            <input
              type="text"
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search Department"
            />
          </div>

          <table className="min-w-full bg-white border table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Department Name</th>
                <th className="py-2 px-4 border-b text-left">Department Code</th>
              </tr>
            </thead>
            <tbody>
              {departmentslist.map((department, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{department.departmentname}</td>
                  <td className="py-2 px-4 border-b">{department.departmentcode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
                Add School / Department
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <select
                className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={onaddChange}
                value={add}
              >
                <option value="school">School</option>
                <option value="department">Department</option>
              </select>

              <form>
                {add === "school" && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="schoolname" className="form-label">
                        School Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="schoolname"
                        name="schoolname"
                        onChange={onChange}
                        value={adddata.schoolname}
                        minLength={5}
                        required
                        placeholder="School Name"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="schoolcode" className="form-label">
                        School Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="schoolcode"
                        name="schoolcode"
                        onChange={onChange}
                        value={adddata.schoolcode}
                        minLength={5}
                        required
                        placeholder="School Code"
                      />
                    </div>
                  </>
                )}

                {add === "department" && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="depname" className="form-label">
                        Department Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="depname"
                        name="depname"
                        onChange={onChange}
                        value={adddata.depname}
                        minLength={5}
                        required
                        placeholder="Department Name"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="depcode" className="form-label">
                        Department Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="depcode"
                        name="depcode"
                        onChange={onChange}
                        value={adddata.depcode}
                        minLength={5}
                        required
                        placeholder="Department Code"
                      />
                    </div>
                    <div className="mb-3">
                      <select
                        className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={onaddschoolChange}
                        value={addschool}
                      >
                        <option value="">Select a School</option>
                        {schoollist.map((school, index) => (
                          <option key={index} value={school.schoolcode}>
                            {school.schoolname}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDep;
