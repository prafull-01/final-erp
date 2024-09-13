import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertContext from "../contex/alert/alertcontext";
import MainContext from "../contex/main/maincontext";

const NavBar = () => {
  const context = useContext(AlertContext);
  const { getuserdata, usertype, UserName, toggleMenuVisibility, iscordinator } = context;
  const context2 = useContext(MainContext);
  const { switchrole } = context2;
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const handleLogout = () => {
    if (localStorage.getItem("token1")) {
      const token1 = localStorage.getItem("token1");
      localStorage.clear();
      localStorage.setItem("token", token1);
      localStorage.setItem("usertype", "admin");
      navigate("/admin/users");
    } else {
      localStorage.clear();
      navigate("/login");
    }
  };
   const onswitchrole = async () => {
    if (usertype==="teacher"){const user = {
      usertype: "cordinator",
    };
    const json = await switchrole(user);
    if (json.msgtype) {
      localStorage.removeItem("usertype");
      localStorage.setItem("usertype", "cordinator");
      navigate("/cordinator");
    }}
    if (usertype==="cordinator"){const user = {
      usertype: "teacher",
    };
    const json = await switchrole(user);
    if (json.msgtype) {
      localStorage.removeItem("usertype");
      localStorage.setItem("usertype", "teacher");
      navigate("/teacher");
    }}
  };
  const getdata = async () => {
    const json = await getuserdata();
    if (!json.msgtype) {
      handleLogout();
      navigate("/login");
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white z-30 fixed-top">
        <div className="container-fluid">
          <span
            className="fixed top-0 left-0 block bg-neutral-600 h-[55px] w-[60px] my-0 mr-[20px] text-[26px] text-white text-center leading-[55px] cursor-pointer"
            onClick={toggleMenuVisibility}
          >
            ☰
          </span>

          <div
            className="relative navbar-brand ml-[60px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Hello, {UserName}(
            {usertype === "admin" && <>Admin</>}
            {usertype === "student" && <>Student</>}
            {usertype === "teacher" && <>Teacher</>}
            {usertype === "cordinator" && <>Cordinator</>})

            <div className={`absolute bg-white border border-gray-300 mt-2 flex flex-col rounded-lg shadow-lg transition-max-height duration-500 ease-out overflow-hidden ${isHovered ? 'max-h-40 p-4' : 'max-h-0 p-0 border-0'}`}>
              {/* <Link to="" className="text-blue-600 hover:text-blue-800 hover:underline mb-2">Profile</Link> */}
              {usertype==="cordinator" && <button className="text-green-600 hover:text-green-800 hover:underline" onClick={onswitchrole}>
              Switch Role to Teacher</button>}
              {(usertype==="teacher" && iscordinator) && <button className="text-green-600 hover:text-green-800 hover:underline" onClick={onswitchrole}>
              Switch Role to Cordinator</button>}
              <button className="text-red-600 hover:text-red-800 hover:underline" onClick={handleLogout}>
              Logout</button>
            </div>
          </div>
          <div className="navbar-collapse" id="navbarSupportedContent"></div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;