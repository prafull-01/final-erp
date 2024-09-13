import React, { useContext, useEffect, useState } from "react";
import AlertContext from "../contex/alert/alertcontext";

const Alert = () => {
  const { alert, hideAlert, alert2 } = useContext(AlertContext);
  const [isVisibleAlert1, setIsVisibleAlert1] = useState(false);
  const [isVisibleAlert2, setIsVisibleAlert2] = useState(false);

  const handleCloseAlert1 = () => {
    setIsVisibleAlert1(false);
    setTimeout(() => hideAlert(), 500);
  };

  const handleCloseAlert2 = () => {
    setIsVisibleAlert2(false);
    setTimeout(() => hideAlert(), 500);
  };

  useEffect(() => {
    if (alert.msg) {
      setIsVisibleAlert1(true);
    } else {
      setIsVisibleAlert1(false);
    }
  }, [alert.msg]);

  useEffect(() => {
    if (alert2.msg) {
      setIsVisibleAlert2(true);
    } else {
      setIsVisibleAlert2(false);
    }
  }, [alert2.msg]);

  return (
    <>
      {/* First Alert */}
      <div
        className={`fixed z-40 top-5 left-1/2 transform -translate-x-1/2 max-w-lg w-full ${
          isVisibleAlert1 ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
        style={{ pointerEvents: isVisibleAlert1 ? "auto" : "none" }}
      >
        {isVisibleAlert1 && (
          <div
            className={`flex justify-between items-center ${
              alert.success
                ? "bg-teal-100 border-teal-400 text-teal-700"
                : "bg-red-100 border-red-400 text-red-700"
            } px-4 py-3 rounded-lg shadow-lg`}
            role="alert"
          >
            <span className="block sm:inline pl-2">
              <strong className="font-bold">
                {alert.success ? "Success" : "Error"}:
              </strong>{" "}
              {alert.msg}
            </span>
            <button
              className={`ml-4 ${
                alert.success
                  ? "text-teal-700 hover:text-teal-900"
                  : "text-red-700 hover:text-red-900"
              } focus:outline-none`}
              onClick={handleCloseAlert1}
            >
              <svg
                className="fill-current h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Second Alert */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-transform duration-500 ease-out ${
          isVisibleAlert2 ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <div className="bg-white border rounded-lg shadow-lg max-w-sm p-4">
          <div className="flex justify-end p-2">
          </div>

          <div className="text-center">
            <svg
              className="w-20 h-20 text-red-600 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="text-xl font-bold text-gray-500 mt-5 mb-6">
              {alert2.msg}
            </h3>
            <button
              onClick={handleCloseAlert2}
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 border border-red-600 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center shadow-lg"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alert;
