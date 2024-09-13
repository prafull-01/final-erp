import React, { useContext, useEffect, useState } from "react";
import RegisterContext from "../../contex/register/registercontext";
import MainContext from "../../contex/main/maincontext";
import AlertContext from "../../contex/alert/alertcontext";

const RegisterTeacher = () => {
  const context1 = useContext(MainContext);
  const { schoollist, departmentslist, getschoollist, getdepartmentlist } = context1;
  const context = useContext(RegisterContext);
  const { register } = context;
  const context2 = useContext(AlertContext);
  const { setMenuVisible } = context2;

  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");
  const [rdata, setRdata] = useState({
    empid: "",
    name: "",
    email: "",
    phone: "",
    school: "",
    department: "",
    password: "1234",
    usertype: "teacher",
  });

  const onschoolChange = (e) => {
    const selectedSchool = e.target.value;
    setSchool(selectedSchool);
    setRdata((prevData) => ({
      ...prevData,
      school: selectedSchool,
    }));
    getdepartmentlist(selectedSchool);
  };

  const ondepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setDepartment(selectedDepartment);
    setRdata((prevData) => ({
      ...prevData,
      department: selectedDepartment,
    }));
  };

  const onChange = (e) => {
    setRdata({
      ...rdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(rdata);

    setRdata({
      empid: "",
      name: "",
      email: "",
      phone: "",
      school: "",
      department: "",
      password: "1234",
      usertype: "teacher",
    });
    setSchool("");
    setDepartment("");
  };

  useEffect(() => {
    getschoollist();
    setMenuVisible(false);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register a Teacher
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="empid"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Employee ID
              </label>
              <div className="mt-2">
                <input
                  id="empid"
                  name="empid"
                  type="text"
                  required
                  onChange={onChange}
                  value={rdata.empid}
                  placeholder="Enter your Employee ID"
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  onChange={onChange}
                  value={rdata.name}
                  placeholder="Name"
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={onChange}
                  value={rdata.email}
                  placeholder="Email"
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  required
                  onChange={onChange}
                  value={rdata.phone}
                  placeholder="Phone Number"
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="school"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                School
              </label>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Department
              </label>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterTeacher;