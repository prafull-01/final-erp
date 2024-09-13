import React, { useContext, useEffect, useState } from "react";
import config from "../../config";
import { getWeek, startOfWeek, add, getYear, format, parse } from "date-fns";
import AlertContext from "../../contex/alert/alertcontext";
const host = config.host;

const Courseattendance = ({ selectedcourse, setShowCourseAttendance }) => {
  const context = useContext(AlertContext);
  const { setLoading, setMenuVisible,showAlert2 } = context;
  const [dates, setDates] = useState([]);
  const [holidays, setHolidays] = useState(["2024-09-01"]);
  const [attandance, setattandance] = useState({
    Monday1: "",
    Monday2: "",
    Monday3: "",
    Monday4: "",
    Monday5: "",
    Monday6: "",
    Monday7: "",
    Monday8: "",
    Monday9: "",
    Tuesday1: "",
    Tuesday2: "",
    Tuesday3: "",
    Tuesday4: "",
    Tuesday5: "",
    Tuesday6: "",
    Tuesday7: "",
    Tuesday8: "",
    Tuesday9: "",
    Wednesday1: "",
    Wednesday2: "",
    Wednesday3: "",
    Wednesday4: "",
    Wednesday5: "",
    Wednesday6: "",
    Wednesday7: "",
    Wednesday8: "",
    Wednesday9: "",
    Thursday1: "",
    Thursday2: "",
    Thursday3: "",
    Thursday4: "",
    Thursday5: "",
    Thursday6: "",
    Thursday7: "",
    Thursday8: "",
    Thursday9: "",
    Friday1: "",
    Friday2: "",
    Friday3: "",
    Friday4: "",
    Friday5: "",
    Friday6: "",
    Friday7: "",
    Friday8: "",
    Friday9: "",
    Saturday1: "",
    Saturday2: "",
    Saturday3: "",
    Saturday4: "",
    Saturday5: "",
    Saturday6: "",
    Saturday7: "",
    Saturday8: "",
    Saturday9: "",
  });

  const setinitials = async (currentDate) => {
    const year = getYear(currentDate);
    const weekNumber = getWeek(currentDate);
    const weekcode = `${year}-${weekNumber}`;

    const start = startOfWeek(currentDate, { weekStartsOn: 0 });

    // Calculate all dates of the week
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      weekDates.push(format(add(start, { days: i }), "yyyy-MM-dd"));
    }
    setDates(weekDates);
    // Fetch attandance with updated weekcode
    fetchattandance(selectedcourse, weekcode);
  };

  const getNextDate = (dateString) => {
    // Parse the date string to a Date object
    const date = parse(dateString, "yyyy-MM-dd", new Date());

    // Add one day to the date
    const nextDate = add(date, { days: 1 });

    // Convert the Date object to a string in the desired format
    return format(nextDate, "yyyy-MM-dd");
  };

  const getPrevDate = (dateString) => {
    // Parse the date string to a Date object
    const date = parse(dateString, "yyyy-MM-dd", new Date());

    // Subtract one day from the date
    const prevDate = add(date, { days: -1 });

    // Convert the Date object to a string in the desired format
    return format(prevDate, "yyyy-MM-dd");
  };

  const handlenextweek = () => {
    const nextdate = getNextDate(dates[6]);
    setinitials(nextdate);
  };

  const handleprevweek = () => {
    const prevdate = getPrevDate(dates[0]);
    setinitials(prevdate);
  };

  useEffect(() => {
    setMenuVisible(false);
    setinitials(new Date());
  }, []);

  const fetchattandance = async (selectedcourse, weekcode) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${host}/api/academic/studentcourseattendance`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            academicyearcode: selectedcourse.academicyearcode,
            semestercode: selectedcourse.semestercode,
            coursecode: selectedcourse.coursecode,
            systemid: localStorage.getItem("systemid"),
            weekcode: weekcode,
          }),
        }
      );
      const json = await response.json();
      if (json.msgtype) {
        let formattedAttendance ={};
        if(json.attendance.length>0){
          const weekAttendance = json.attendance[0].attendance;
           formattedAttendance = {
          Monday1: weekAttendance[0][0] || "",
          Monday2: weekAttendance[0][1] || "",
          Monday3: weekAttendance[0][2] || "",
          Monday4: weekAttendance[0][3] || "",
          Monday5: weekAttendance[0][4] || "",
          Monday6: weekAttendance[0][5] || "",
          Monday7: weekAttendance[0][6] || "",
          Monday8: weekAttendance[0][7] || "",
          Monday9: weekAttendance[0][8] || "",
          Tuesday1: weekAttendance[1][0] || "",
          Tuesday2: weekAttendance[1][1] || "",
          Tuesday3: weekAttendance[1][2] || "",
          Tuesday4: weekAttendance[1][3] || "",
          Tuesday5: weekAttendance[1][4] || "",
          Tuesday6: weekAttendance[1][5] || "",
          Tuesday7: weekAttendance[1][6] || "",
          Tuesday8: weekAttendance[1][7] || "",
          Tuesday9: weekAttendance[1][8] || "",
          Wednesday1: weekAttendance[2][0] || "",
          Wednesday2: weekAttendance[2][1] || "",
          Wednesday3: weekAttendance[2][2] || "",
          Wednesday4: weekAttendance[2][3] || "",
          Wednesday5: weekAttendance[2][4] || "",
          Wednesday6: weekAttendance[2][5] || "",
          Wednesday7: weekAttendance[2][6] || "",
          Wednesday8: weekAttendance[2][7] || "",
          Wednesday9: weekAttendance[2][8] || "",
          Thursday1: weekAttendance[3][0] || "",
          Thursday2: weekAttendance[3][1] || "",
          Thursday3: weekAttendance[3][2] || "",
          Thursday4: weekAttendance[3][3] || "",
          Thursday5: weekAttendance[3][4] || "",
          Thursday6: weekAttendance[3][5] || "",
          Thursday7: weekAttendance[3][6] || "",
          Thursday8: weekAttendance[3][7] || "",
          Thursday9: weekAttendance[3][8] || "",
          Friday1: weekAttendance[4][0] || "",
          Friday2: weekAttendance[4][1] || "",
          Friday3: weekAttendance[4][2] || "",
          Friday4: weekAttendance[4][3] || "",
          Friday5: weekAttendance[4][4] || "",
          Friday6: weekAttendance[4][5] || "",
          Friday7: weekAttendance[4][6] || "",
          Friday8: weekAttendance[4][7] || "",
          Friday9: weekAttendance[4][8] || "",
          Saturday1: weekAttendance[5][0] || "",
          Saturday2: weekAttendance[5][1] || "",
          Saturday3: weekAttendance[5][2] || "",
          Saturday4: weekAttendance[5][3] || "",
          Saturday5: weekAttendance[5][4] || "",
          Saturday6: weekAttendance[5][5] || "",
          Saturday7: weekAttendance[5][6] || "",
          Saturday8: weekAttendance[5][7] || "",
          Saturday9: weekAttendance[5][8] || "",
        };}
        else{
          formattedAttendance = {
            Monday1: "",
            Monday2: "",
            Monday3: "",
            Monday4: "",
            Monday5: "",
            Monday6: "",
            Monday7: "",
            Monday8: "",
            Monday9: "",
            Tuesday1: "",
            Tuesday2: "",
            Tuesday3: "",
            Tuesday4: "",
            Tuesday5: "",
            Tuesday6: "",
            Tuesday7: "",
            Tuesday8: "",
            Tuesday9: "",
            Wednesday1: "",
            Wednesday2: "",
            Wednesday3: "",
            Wednesday4: "",
            Wednesday5: "",
            Wednesday6: "",
            Wednesday7: "",
            Wednesday8: "",
            Wednesday9: "",
            Thursday1: "",
            Thursday2: "",
            Thursday3: "",
            Thursday4: "",
            Thursday5: "",
            Thursday6: "",
            Thursday7: "",
            Thursday8: "",
            Thursday9: "",
            Friday1: "",
            Friday2: "",
            Friday3: "",
            Friday4: "",
            Friday5: "",
            Friday6: "",
            Friday7: "",
            Friday8: "",
            Friday9: "",
            Saturday1: "",
            Saturday2: "",
            Saturday3: "",
            Saturday4: "",
            Saturday5: "",
            Saturday6: "",
            Saturday7: "",
            Saturday8: "",
            Saturday9: "",
          };
        }

        setattandance(formattedAttendance);
      } else {
        showAlert2(json)
      }
    } catch (error) {
      showAlert2({msgtype:false,msg: "Error fetching attendance"});
    } finally {
      setLoading(false);
    }
  };


  return (
    <><button
    className="flex justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
    onClick={() => setShowCourseAttendance(false)}
  >
    Back
  </button>
      
      <p className="text-xl font-bold mb-4">
        Attendance for {selectedcourse.coursename} <br />
        From: {dates[0]} to {dates[6]}{" "}
      </p><button
        onClick={handleprevweek}
        className="inline-block px-4 py-2 m-2 bg-gray-200 text-black rounded hover:bg-gray-300 hover:text-black transition duration-300 ease-in-out"
      >
        &laquo; Previous
      </button>
      <button
        onClick={handlenextweek}
        className="inline-block px-4 py-2 m-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 ease-in-out"
      >
        Next &raquo;
      </button>

      <div style={{ transform: "scale(0.8)", transformOrigin: "top left" }}>
        <table className="min-w-full border-2 border-black divide-y-2 divide-x-2 divide-black">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-black">
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                08:35:00 - 09:25:00
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                09:30:00 - 10:20:00
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                10:25:00 - 11:15:00
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                11:20:00 - 12:10:00
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                12:15:00 - 13:05:00
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                13:10:00 - 14:00:00
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                14:05:00 - 14:55:00
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                15:00:00 - 15:50:00
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                15:50:00 - 16:40:00
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y-2 divide-black">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r-2 border-black">
                Sunday ({dates[0]})
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap text-white font-bold text-center bg-custom-violet border-r-2 border-black bg-indigo-500 text-xl"
                colSpan="9"
              >
                Holiday
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r-2 border-black">
                Monday ({dates[1]})
              </td>
              {!holidays.includes(dates[1]) ? (
                <>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Monday1 && (
                      <div
                        className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                          attandance.Monday1 === "P"
                            ? "bg-green-500"
                            : attandance.Monday1 === "A"
                            ? "bg-red-500"
                            : "bg-gray-500"
                        }`}
                      >
                        <p className="font-bold text-white text-lg">
                          {attandance.Monday1 === "P" ? "P" : attandance.Monday1 === "A" ? "A" : "No Data"}
                        </p>
                      </div>
                    )}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Monday2 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Monday2 === "P"
                              ? "bg-green-500"
                              : attandance.Monday2 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Monday2 === "P"
                              ? "P"
                              : attandance.Monday2 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Monday3 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Monday3 === "P"
                              ? "bg-green-500"
                              : attandance.Monday3 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Monday3 === "P"
                              ? "P"
                              : attandance.Monday3 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                     }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Monday4 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Monday4 === "P"
                              ? "bg-green-500"
                              : attandance.Monday4 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Monday4 === "P"
                              ? "P"
                              : attandance.Monday4 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Monday5 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Monday5 === "P"
                              ? "bg-green-500"
                              : attandance.Monday5 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Monday5 === "P"
                              ? "P"
                              : attandance.Monday5 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Monday6 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Monday6 === "P"
                              ? "bg-green-500"
                              : attandance.Monday6 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Monday6 === "P"
                              ? "P"
                              : attandance.Monday6 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Monday7 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Monday7 === "P"
                              ? "bg-green-500"
                              : attandance.Monday7 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Monday7 === "P"
                              ? "P"
                              : attandance.Monday7 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Monday8 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Monday8 === "P"
                              ? "bg-green-500"
                              : attandance.Monday8 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Monday8 === "P"
                              ? "P"
                              : attandance.Monday8 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                     }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Monday9 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Monday9 === "P"
                              ? "bg-green-500"
                              : attandance.Monday9 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Monday9 === "P"
                              ? "P"
                              : attandance.Monday9 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                </>
              ) : (
                <td
                  className="px-6 py-4 whitespace-nowrap text-white font-bold text-center bg-custom-violet border-r-2 border-black bg-indigo-500 text-xl"
                  colSpan="9"
                >
                  Holiday
                </td>
              )}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r-2 border-black">
                Tuseday ({dates[2]})
              </td>
              {!holidays.includes(dates[2]) ? (
                <>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Tuesday1 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Tuesday1 === "P"
                              ? "bg-green-500"
                              : attandance.Tuesday1 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Tuesday1 === "P"
                              ? "P"
                              : attandance.Tuesday1 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Tuesday2 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Tuesday2 === "P"
                              ? "bg-green-500"
                              : attandance.Tuesday2 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Tuesday2 === "P"
                              ? "P"
                              : attandance.Tuesday2 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Tuesday3 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Tuesday3 === "P"
                              ? "bg-green-500"
                              : attandance.Tuesday3 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Tuesday3 === "P"
                              ? "P"
                              : attandance.Tuesday3 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Tuesday4 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Tuesday4 === "P"
                              ? "bg-green-500"
                              : attandance.Tuesday4 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Tuesday4 === "P"
                              ? "P"
                              : attandance.Tuesday4 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Tuesday5 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Tuesday5 === "P"
                              ? "bg-green-500"
                              : attandance.Tuesday5 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Tuesday5 === "P"
                              ? "P"
                              : attandance.Tuesday5 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Tuesday6 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Tuesday6 === "P"
                              ? "bg-green-500"
                              : attandance.Tuesday6 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Tuesday6 === "P"
                              ? "P"
                              : attandance.Tuesday6 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Tuesday7 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Tuesday7 === "P"
                              ? "bg-green-500"
                              : attandance.Tuesday7 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Tuesday7 === "P"
                              ? "P"
                              : attandance.Tuesday7 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Tuesday8 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Tuesday8 === "P"
                              ? "bg-green-500"
                              : attandance.Tuesday8 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Tuesday8 === "P"
                              ? "P"
                              : attandance.Tuesday8 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Tuesday9 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Tuesday9 === "P"
                              ? "bg-green-500"
                              : attandance.Tuesday9 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Tuesday9 === "P"
                              ? "P"
                              : attandance.Tuesday9 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                </>
              ) : (
                <td
                  className="px-6 py-4 whitespace-nowrap text-white font-bold text-center bg-custom-violet border-r-2 border-black bg-indigo-500 text-xl"
                  colSpan="9"
                >
                  Holiday
                </td>
              )}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r-2 border-black">
                Wednesday ({dates[3]})
              </td>
              {!holidays.includes(dates[3]) ? (
                <>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Wednesday1 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Wednesday1 === "P"
                              ? "bg-green-500"
                              : attandance.Wednesday1 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Wednesday1 === "P"
                              ? "P"
                              : attandance.Wednesday1 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Wednesday2 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Wednesday2 === "P"
                              ? "bg-green-500"
                              : attandance.Wednesday2 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Wednesday2 === "P"
                              ? "P"
                              : attandance.Wednesday2 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Wednesday3 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Wednesday3 === "P"
                              ? "bg-green-500"
                              : attandance.Wednesday3 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Wednesday3 === "P"
                              ? "P"
                              : attandance.Wednesday3 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Wednesday4 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Wednesday4 === "P"
                              ? "bg-green-500"
                              : attandance.Wednesday4 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Wednesday4 === "P"
                              ? "P"
                              : attandance.Wednesday4 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Wednesday5 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Wednesday5 === "P"
                              ? "bg-green-500"
                              : attandance.Wednesday5 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Wednesday5 === "P"
                              ? "P"
                              : attandance.Wednesday5 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Wednesday6 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Wednesday6 === "P"
                              ? "bg-green-500"
                              : attandance.Wednesday6 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Wednesday6 === "P"
                              ? "P"
                              : attandance.Wednesday6 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Wednesday7 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Wednesday7 === "P"
                              ? "bg-green-500"
                              : attandance.Wednesday7 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Wednesday7 === "P"
                              ? "P"
                              : attandance.Wednesday7 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Wednesday8 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Wednesday8 === "P"
                              ? "bg-green-500"
                              : attandance.Wednesday8 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Wednesday8 === "P"
                              ? "P"
                              : attandance.Wednesday8 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Wednesday9 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Wednesday9 === "P"
                              ? "bg-green-500"
                              : attandance.Wednesday9 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Wednesday9 === "P"
                              ? "P"
                              : attandance.Wednesday9 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                </>
              ) : (
                <td
                  className="px-6 py-4 whitespace-nowrap text-white font-bold text-center bg-custom-violet border-r-2 border-black bg-indigo-500 text-xl"
                  colSpan="9"
                >
                  Holiday
                </td>
              )}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r-2 border-black">
                Thursday ({dates[4]})
              </td>
              {!holidays.includes(dates[4]) ? (
                <>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Thursday1 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Thursday1 === "P"
                              ? "bg-green-500"
                              : attandance.Thursday1 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Thursday1 === "P"
                              ? "P"
                              : attandance.Thursday1 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                     }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Thursday2 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Thursday2 === "P"
                              ? "bg-green-500"
                              : attandance.Thursday2 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Thursday2 === "P"
                              ? "P"
                              : attandance.Thursday2 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Thursday3 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Thursday3 === "P"
                              ? "bg-green-500"
                              : attandance.Thursday3 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Thursday3 === "P"
                              ? "P"
                              : attandance.Thursday3 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Thursday4 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Thursday4 === "P"
                              ? "bg-green-500"
                              : attandance.Thursday4 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Thursday4 === "P"
                              ? "P"
                              : attandance.Thursday4 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Thursday5 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Thursday5 === "P"
                              ? "bg-green-500"
                              : attandance.Thursday5 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Thursday5 === "P"
                              ? "P"
                              : attandance.Thursday5 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Thursday6 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Thursday6 === "P"
                              ? "bg-green-500"
                              : attandance.Thursday6 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Thursday6 === "P"
                              ? "P"
                              : attandance.Thursday6 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                     }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Thursday7 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Thursday7 === "P"
                              ? "bg-green-500"
                              : attandance.Thursday7 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Thursday7 === "P"
                              ? "P"
                              : attandance.Thursday7 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                     }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Thursday8 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Thursday8 === "P"
                              ? "bg-green-500"
                              : attandance.Thursday8 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Thursday8 === "P"
                              ? "P"
                              : attandance.Thursday8 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Thursday9 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Thursday9 === "P"
                              ? "bg-green-500"
                              : attandance.Thursday9 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Thursday9 === "P"
                              ? "P"
                              : attandance.Thursday9 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                </>
              ) : (
                <td
                  className="px-6 py-4 whitespace-nowrap text-white font-bold text-center bg-custom-violet border-r-2 border-black bg-indigo-500 text-xl"
                  colSpan="9"
                >
                  Holiday
                </td>
              )}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r-2 border-black">
                Friday ({dates[5]})
              </td>
              {!holidays.includes(dates[5]) ? (
                <>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Friday1 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Friday1 === "P"
                              ? "bg-green-500"
                              : attandance.Friday1 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Friday1 === "P"
                              ? "P"
                              : attandance.Friday1 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                     }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Friday2 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Friday2 === "P"
                              ? "bg-green-500"
                              : attandance.Friday2 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Friday2 === "P"
                              ? "P"
                              : attandance.Friday2 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                     }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Friday3 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Friday3 === "P"
                              ? "bg-green-500"
                              : attandance.Friday3 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Friday3 === "P"
                              ? "P"
                              : attandance.Friday3 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Friday4 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Friday4 === "P"
                              ? "bg-green-500"
                              : attandance.Friday4 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Friday4 === "P"
                              ? "P"
                              : attandance.Friday4 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Friday5 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Friday5 === "P"
                              ? "bg-green-500"
                              : attandance.Friday5 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Friday5 === "P"
                              ? "P"
                              : attandance.Friday5 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Friday6 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Friday6 === "P"
                              ? "bg-green-500"
                              : attandance.Friday6 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Friday6 === "P"
                              ? "P"
                              : attandance.Friday6 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Friday7 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Friday7 === "P"
                              ? "bg-green-500"
                              : attandance.Friday7 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Friday7 === "P"
                              ? "P"
                              : attandance.Friday7 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Friday8 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Friday8 === "P"
                              ? "bg-green-500"
                              : attandance.Friday8 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Friday8 === "P"
                              ? "P"
                              : attandance.Friday8 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Friday9 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Friday9 === "P"
                              ? "bg-green-500"
                              : attandance.Friday9 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Friday9 === "P"
                              ? "P"
                              : attandance.Friday9 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                </>
              ) : (
                <td
                  className="px-6 py-4 whitespace-nowrap text-white font-bold text-center bg-custom-violet border-r-2 border-black bg-indigo-500 text-xl"
                  colSpan="9"
                >
                  Holiday
                </td>
              )}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r-2 border-black">
                Saturday ({dates[6]})
              </td>
              {!holidays.includes(dates[6]) ? (
                <>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Saturday1 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Saturday1 === "P"
                              ? "bg-green-500"
                              : attandance.Saturday1 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Saturday1 === "P"
                              ? "P"
                              : attandance.Saturday1 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Saturday2 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Saturday2 === "P"
                              ? "bg-green-500"
                              : attandance.Saturday2 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Saturday2 === "P"
                              ? "P"
                              : attandance.Saturday2 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Saturday3 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Saturday3 === "P"
                              ? "bg-green-500"
                              : attandance.Saturday3 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Saturday3 === "P"
                              ? "P"
                              : attandance.Saturday3 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Saturday4 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Saturday4 === "P"
                              ? "bg-green-500"
                              : attandance.Saturday4 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Saturday4 === "P"
                              ? "P"
                              : attandance.Saturday4 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Saturday5 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Saturday5 === "P"
                              ? "bg-green-500"
                              : attandance.Saturday5 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Saturday5 === "P"
                              ? "P"
                              : attandance.Saturday5 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                     }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Saturday6 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Saturday6 === "P"
                              ? "bg-green-500"
                              : attandance.Saturday6 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Saturday6 === "P"
                              ? "P"
                              : attandance.Saturday6 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Saturday7 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Saturday7 === "P"
                              ? "bg-green-500"
                              : attandance.Saturday7 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Saturday7 === "P"
                              ? "P"
                              : attandance.Saturday7 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Saturday8 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Saturday8 === "P"
                              ? "bg-green-500"
                              : attandance.Saturday8 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Saturday8 === "P"
                              ? "P"
                              : attandance.Saturday8 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {attandance.Saturday9 &&
                        <div
                          className={`m-1 w-12 h-12 rounded-full flex items-center justify-center ${
                            attandance.Saturday9 === "P"
                              ? "bg-green-500"
                              : attandance.Saturday9 === "A"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          <p className="font-bold text-white text-lg">
                            {attandance.Saturday9 === "P"
                              ? "P"
                              : attandance.Saturday9 === "A"
                              ? "A"
                              : "No Data"}
                          </p>
                        </div>
                      }
                  </td>
                </>
              ) : (
                <td
                  className="px-6 py-4 whitespace-nowrap text-white font-bold text-center bg-custom-violet border-r-2 border-black bg-indigo-500 text-xl"
                  colSpan="9"
                >
                  Holiday
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Courseattendance;
