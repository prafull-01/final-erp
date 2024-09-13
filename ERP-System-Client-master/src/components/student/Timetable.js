import React, { useContext, useEffect, useState } from "react";
import config from "../../config";
import { getWeek, startOfWeek, add, getYear, format, parse } from "date-fns";
import AlertContext from "../../contex/alert/alertcontext";
const host = config.host;

const Timetable = () => {
  const context = useContext(AlertContext);
  const { setLoading, setMenuVisible } = context;
  const [dates, setDates] = useState([]);
  const [holidays, setHolidays] = useState([
   "2024-09-01",
  ]);
  const [timetable, settimetable] = useState({
    Monday1: [],
    Monday2: [],
    Monday3: [],
    Monday4: [],
    Monday5: [],
    Monday6: [],
    Monday7: [],
    Monday8: [],
    Monday9: [],
    Tuesday1: [],
    Tuesday2: [],
    Tuesday3: [],
    Tuesday4: [],
    Tuesday5: [],
    Tuesday6: [],
    Tuesday7: [],
    Tuesday8: [],
    Tuesday9: [],
    Wednesday1: [],
    Wednesday2: [],
    Wednesday3: [],
    Wednesday4: [],
    Wednesday5: [],
    Wednesday6: [],
    Wednesday7: [],
    Wednesday8: [],
    Wednesday9: [],
    Thursday1: [],
    Thursday2: [],
    Thursday3: [],
    Thursday4: [],
    Thursday5: [],
    Thursday6: [],
    Thursday7: [],
    Thursday8: [],
    Thursday9: [],
    Friday1: [],
    Friday2: [],
    Friday3: [],
    Friday4: [],
    Friday5: [],
    Friday6: [],
    Friday7: [],
    Friday8: [],
    Friday9: [],
    Saturday1: [],
    Saturday2: [],
    Saturday3: [],
    Saturday4: [],
    Saturday5: [],
    Saturday6: [],
    Saturday7: [],
    Saturday8: [],
    Saturday9: [],
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
    // Fetch timetable with updated weekcode
    fetchtimetable(weekcode);
  };

  const getNextDate = (dateString) => {
    // Parse the date string to a Date object
    const date = parse(dateString, "yyyy-MM-dd", new Date());

    // Add one day to the date
    const nextDate = add(date, { days: 1 });

    // Convert the Date object to a string in the desired format
    return nextDate.toString();
  };

  const getPrevDate = (dateString) => {
    // Parse the date string to a Date object
    const date = parse(dateString, "yyyy-MM-dd", new Date());

    // Add one day to the date
    const prevDate = add(date, { days: -1 });

    // Convert the Date object to a string in the desired format
    return prevDate.toString();
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


  const fetchtimetable = async (weekcode) => {
    setLoading(true);
    const response = await fetch(`${host}/api/academic/studenttimetable`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ weekcode: weekcode }),
    });
    const json = await response.json();
    settimetable(json.timetable);
    setLoading(false);
  };

  return (
    <>
        
      <p className="text-xl font-bold mb-4">
        From: {dates[0]} to {dates[6]}{" "}</p><button onClick={handleprevweek} className=" m-2 inline-block px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 hover:text-black transition duration-300 ease-in-out">
      &laquo; Previous
    </button>
        <button onClick={handlenextweek} className="m-2 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 ease-in-out">
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
                    {timetable.Monday1?.length > 0 &&
                      timetable.Monday1.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Monday2?.length > 0 &&
                      timetable.Monday2.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Monday3?.length > 0 &&
                      timetable.Monday3.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Monday4?.length > 0 &&
                      timetable.Monday4.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Monday5?.length > 0 &&
                      timetable.Monday5.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Monday6?.length > 0 &&
                      timetable.Monday6.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Monday7?.length > 0 &&
                      timetable.Monday7.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Monday8?.length > 0 &&
                      timetable.Monday8.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Monday9?.length > 0 &&
                      timetable.Monday9.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
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
                    {timetable.Tuesday1?.length > 0 &&
                      timetable.Tuesday1.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Tuesday2?.length > 0 &&
                      timetable.Tuesday2.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Tuesday3?.length > 0 &&
                      timetable.Tuesday3.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Tuesday4?.length > 0 &&
                      timetable.Tuesday4.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Tuesday5?.length > 0 &&
                      timetable.Tuesday5.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Tuesday6?.length > 0 &&
                      timetable.Tuesday6.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Tuesday7?.length > 0 &&
                      timetable.Tuesday7.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Tuesday8?.length > 0 &&
                      timetable.Tuesday8.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Tuesday9?.length > 0 &&
                      timetable.Tuesday9.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
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
                    {timetable.Wednesday1?.length > 0 &&
                      timetable.Wednesday1.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Wednesday2?.length > 0 &&
                      timetable.Wednesday2.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Wednesday3?.length > 0 &&
                      timetable.Wednesday3.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Wednesday4?.length > 0 &&
                      timetable.Wednesday4.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Wednesday5?.length > 0 &&
                      timetable.Wednesday5.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Wednesday6?.length > 0 &&
                      timetable.Wednesday6.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Wednesday7?.length > 0 &&
                      timetable.Wednesday7.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Wednesday8?.length > 0 &&
                      timetable.Wednesday8.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Wednesday9?.length > 0 &&
                      timetable.Wednesday9.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
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
                    {timetable.Thursday1?.length > 0 &&
                      timetable.Thursday1.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Thursday2?.length > 0 &&
                      timetable.Thursday2.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Thursday3?.length > 0 &&
                      timetable.Thursday3.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Thursday4?.length > 0 &&
                      timetable.Thursday4.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Thursday5?.length > 0 &&
                      timetable.Thursday5.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Thursday6?.length > 0 &&
                      timetable.Thursday6.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Thursday7?.length > 0 &&
                      timetable.Thursday7.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Thursday8?.length > 0 &&
                      timetable.Thursday8.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Thursday9?.length > 0 &&
                      timetable.Thursday9.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
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
                    {timetable.Friday1?.length > 0 &&
                      timetable.Friday1.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Friday2?.length > 0 &&
                      timetable.Friday2.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Friday3?.length > 0 &&
                      timetable.Friday3.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Friday4?.length > 0 &&
                      timetable.Friday4.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Friday5?.length > 0 &&
                      timetable.Friday5.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Friday6?.length > 0 &&
                      timetable.Friday6.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Friday7?.length > 0 &&
                      timetable.Friday7.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Friday8?.length > 0 &&
                      timetable.Friday8.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Friday9?.length > 0 &&
                      timetable.Friday9.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
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
                    {timetable.Saturday1?.length > 0 &&
                      timetable.Saturday1.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Saturday2?.length > 0 &&
                      timetable.Saturday2.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Saturday3?.length > 0 &&
                      timetable.Saturday3.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Saturday4?.length > 0 &&
                      timetable.Saturday4.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Saturday5?.length > 0 &&
                      timetable.Saturday5.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Saturday6?.length > 0 &&
                      timetable.Saturday6.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Saturday7?.length > 0 &&
                      timetable.Saturday7.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Saturday8?.length > 0 &&
                      timetable.Saturday8.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border-r-2 border-black overflow-hidden">
                    {timetable.Saturday9?.length > 0 &&
                      timetable.Saturday9.map((slot, index) => (
                        <div
                          key={index}
                          className="m-1 bg-indigo-500 p-3 rounded-lg flex flex-col items-center"
                        >
                          <p className="bg-blue-200 rounded-lg px-2 py-1 mb-2">
                            {slot.coursecode}-{slot.coursename}
                          </p>
                          <p className="bg-green-200 rounded-lg px-2 py-1 mb-2">
                            {slot.RoomNo}
                          </p>
                          <p className="bg-yellow-200 rounded-lg px-2 py-1">
                            {slot.teachername}
                          </p>
                        </div>
                      ))}
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

export default Timetable;
