import React, { useContext, useState, useRef, useEffect } from "react";
import UserListContext from "../../contex/userlist/userlistcontext";
import { Link, useNavigate } from "react-router-dom";
import RegisterContext from "../../contex/register/registercontext";
import Roles from "./Roles";
import MainContext from "../../contex/main/maincontext";
import AlertContext from "../../contex/alert/alertcontext";

const UserList = () => {
  const navigate = useNavigate();
  const context = useContext(UserListContext);
  const { userlist, fetchuserlist, setUserlist, masterlogin } = context;
  const context1 = useContext(RegisterContext);
  const { register } = context1;
  const context2 = useContext(MainContext);
  const { getrole } = context2;
  const context3 = useContext(AlertContext);
  const { setMenuVisible } = context3;
  const [usertype, setUsertype] = useState("");
  const [userId, setUserId] = useState("");
  const [ruser, setRuser] = useState([]);

  const rolesButtonRef = useRef(null);

  const onmakecordinator = async (user) => {
    const cordinatorData = {
      empid: user.empid,
      name: user.name,
      email: user.email,
      phone: user.phone,
      school: user.school,
      department: user.department,
      usertype: "cordinator",
    };
    await register(cordinatorData);
  };

  const onUsertypeChange = (e) => {
    setUsertype(e.target.value);
    setUserlist([]);
  };

  const onUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchuserlist(usertype, userId);
  };

  const handleclick = async (user) => {
    await getrole(user.empid);
  };

  const filteredUserList = userlist.filter((user) => {
    if (usertype === "teacher" && user.empid) {
      return user.empid.includes(userId);
    }
    if (usertype === "student" && user.systemid) {
      return user.systemid.includes(userId);
    }
    if (usertype === "admin" && user.email) {
      return user.email.includes(userId);
    }
    if (usertype === "cordinator" && user.empid) {
      return user.empid.includes(userId);
    }
    return false;
  });

  const handleMasterLogin = async (user) => {
    const json = await masterlogin(user);
    if (json.usertype === "student") {
      navigate("/student");
    }
    if (json.usertype === "teacher") {
      navigate("/teacher");
    }
  };

  const openRolesModal = (user) => {
    setRuser(user);
    if (rolesButtonRef.current) {
      rolesButtonRef.current.click();
      handleclick(user);
    }
  };
  useEffect(() => {
    setMenuVisible(false);
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search User Details</h1>

      <div className="flex items-center space-x-4 mb-4">
        <select
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={onUsertypeChange}
          value={usertype}
        >
          <option value="">Select</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="cordinator">Coordinator</option>
          <option value="admin">Admin</option>
        </select>
        <button
          className="flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleSearch}
        >
          Search
        </button>
        <input
          type="text"
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded focus:outline-none "
          placeholder="Search User"
          value={userId}
          onChange={onUserIdChange}
        />
        <Link
          to="/admin/registeradmin"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Admin
        </Link>
        <Link
          to="/admin/registerstudent"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Student
        </Link>
        <Link
          to="/admin/registerteacher"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Teacher
        </Link>
      </div>

      <div className="overflow-auto max-h-96">
        <table className="min-w-full bg-white border table-auto">
          <thead>
            <tr>
              {usertype === "teacher" || usertype === "cordinator" ? (
                <th className="py-2 px-4 border-b text-left">Employee Id</th>
              ) : usertype === "student" ? (
                <th className="py-2 px-4 border-b text-left">System Id</th>
              ) : (
                <th className="py-2 px-4 border-b text-left">Email</th>
              )}
              <th className="py-2 px-4 border-b text-left">Name</th>
              {!(usertype === "admin") && (
                <th className="py-2 px-4 border-b text-left">School</th>
              )}
              {!(usertype === "admin") && (
                <th className="py-2 px-4 border-b text-left">Department</th>
              )}
              <th className="py-2 px-4 border-b text-left">Phone</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUserList.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-2 px-4 text-center">
                  No matching user found.
                </td>
              </tr>
            ) : (
              filteredUserList
              .sort((a, b) => a.name.localeCompare(b.name)).map((user) => (
                <tr key={user.email}>
                  {usertype === "teacher" || usertype === "cordinator" ? (
                    <td className="py-2 px-4 border-b">{user.empid}</td>
                  ) : usertype === "student" ? (
                    <td className="py-2 px-4 border-b">{user.systemid}</td>
                  ) : (
                    <td className="py-2 px-4 border-b">{user.email}</td>
                  )}
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  {!(usertype === "admin") && (
                    <td className="py-2 px-4 border-b">{user.school}</td>
                  )}
                  {!(usertype === "admin") && (
                    <td className="py-2 px-4 border-b">{user.department}</td>
                  )}
                  <td className="py-2 px-4 border-b">{user.phone}</td>
                  <td className="py-2 px-4 border-b">
                    {(usertype === "teacher" || usertype === "student") && (
                      <button
                        className="flex justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => handleMasterLogin(user)}
                      >
                        Login
                      </button>
                    )}
                    {usertype === "teacher" && (
                      <button
                        className="flex justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => onmakecordinator(user)}
                      >
                        Make Coordinator
                      </button>
                    )}
                    {usertype === "cordinator" && (
                      <button
                        className="flex justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => openRolesModal(user)}
                      >
                        Roles
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Place the Roles component here and pass the ref */}
      <Roles ref={rolesButtonRef} ruser={ruser} />
    </div>
  );
};

export default UserList;
