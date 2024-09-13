import React, { useContext, useEffect, useState } from "react";
import RegisterContext from "../../contex/register/registercontext";
import MainContext from "../../contex/main/maincontext";
import AlertContext from "../../contex/alert/alertcontext";

const SampleCSVModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Sample CSV Format</h2>
        <p>systemid,name,email,phone,schoolcode,departmentcode</p>
        <p>12345,John Doe,johndoe@example.com,1234567890,SSET,CSE</p>
        <p>
          67890,Jane Smith,janesmith@example.com,0987654321,SSET,CSE
        </p>
        <p>
          11223,Jim Brown,jimbrown@example.com,1122334455,SSET,CSE
        </p>
        <p>
          44556,Emily White,emilywhite@example.com,1122334455,SSET,CSE
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const RegisterStudent = () => {
  const context1 = useContext(MainContext);
  const { schoollist, departmentslist, getschoollist, getdepartmentlist } =
    context1;
  const context = useContext(RegisterContext);
  const { register, registerbulkstudent } = context;
  const context2 = useContext(AlertContext);
  const { setMenuVisible } = context2;

  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");
  const [rdata, setRdata] = useState({
    systemid: "",
    name: "",
    email: "",
    phone: "",
    school: "",
    department: "",
    password: "1234",
    usertype: "student",
  });
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const onChange = (e) => {
    setRdata({
      ...rdata,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      handleFileUpload(file);
    } else {
      register(rdata);
      resetForm();
    }
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const students = parseCSV(content);
      registerbulkstudent(students);
      resetForm();
    };
    reader.readAsText(file);
  };

  const parseCSV = (content) => {
    const lines = content.split("\n");
    const headers = lines[0].split(",");
    const students = lines.slice(1).map((line) => {
      const values = line.split(",");
      const student = {};
      headers.forEach((header, index) => {
        student[header.trim()] = values[index]?.trim();
      });
      student.password = "1234";
      student.usertype = "student";
      return student;
    });
  
  
    return students;
  };

  const resetForm = () => {
    setRdata({
      systemid: "",
      name: "",
      email: "",
      phone: "",
      school: "",
      department: "",
      password: "1234",
      usertype: "student",
    });
    setSchool("");
    setDepartment("");
    setFile(null);
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
            Register a Student
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="systemid"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                System ID
              </label>
              <div className="mt-2">
                <input
                  id="systemid"
                  name="systemid"
                  type="text"
                  required
                  onChange={onChange}
                  value={rdata.systemid}
                  placeholder="Enter your System ID"
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name of Student
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
                Email of Student
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
                Phone of Student
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  required
                  onChange={onChange}
                  value={rdata.phone}
                  placeholder="Phone Number Of Student"
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
              <label
                htmlFor="file"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Upload Students (CSV)
              </label>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="ml-2 bg-blue-600 text-white px-2 py-1 rounded-md"
              >
                Sample Format
              </button>
              <div className="mt-2">
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept=".csv"
                  onChange={onFileChange}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              {!file && (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Register
                </button>
              )}
            </div>
          </form>
          {file && (
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Register Students in Bulk
            </button>
          )}
        </div>
      </div>
      <SampleCSVModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default RegisterStudent;
