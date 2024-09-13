import React, { useContext, useState } from "react";
import config from "../../config";
import AlertContext from "../../contex/alert/alertcontext";
const host = config.host;

const EditTimetable = ({ classItem, settogglepage, setClassList }) => {
  const context2 = useContext(AlertContext);
  const { showAlert, showAlert2 } = context2;
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const classrooms = localStorage.getItem("classrooms").split(",");
  const slotsPerDay = 9;
  const [slots, setSlots] = useState(
    Array.from({ length: days.length * slotsPerDay }, (_, index) => {
      const dayIndex = Math.floor(index / slotsPerDay);
      const slotIndex = index % slotsPerDay + 1;
      const day = days[dayIndex];
      const slotKey = `${day}${slotIndex}`;
      return {
        checked: classItem?.schedule?.[slotKey] || false,
        classroom: classItem?.roomno?.[slotKey] || "",
      };
    })
  );

  const handleCheckboxChange = (index) => {
    const newSlots = [...slots];
    newSlots[index].checked = !newSlots[index].checked;
    if (!newSlots[index].checked) {
      newSlots[index].classroom = "";
    }
    setSlots(newSlots);
  };

  const handleDropdownChange = (index, value) => {
    const newSlots = [...slots];
    newSlots[index].classroom = value;
    setSlots(newSlots);
  };

  const handleDeselectAll = (e) => {
    e.preventDefault();
    const newSlots = slots.map(slot => ({
      checked: false,
      classroom: ""
    }));
    setSlots(newSlots);
  };

  const handleSubmit = async () => {
    const roomno = {};
    const schedule = {};

    for (let index = 0; index < slots.length; index++) {
      const slot = slots[index];
      const dayIndex = Math.floor(index / slotsPerDay);
      const slotIndex = index % slotsPerDay + 1;
      const day = days[dayIndex];
      const slotKey = `${day}${slotIndex}`;

      if (slot.checked && !slot.classroom) {
        showAlert2({ msg: `Select Room for ${slotKey}` });
        return;
      }

      roomno[slotKey] = slot.classroom;
      schedule[slotKey] = slot.checked;
    }

    const response = await fetch(`${host}/api/academic/edittimetable`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        weekcode: classItem.weekcode,
        classcode: classItem.classcode,
        schedule: schedule,
        roomno: roomno,
      }),
    });
    const data = await response.json();
    if (data.msgtype) {
      showAlert(data);
      setClassList((prevClassList) =>
        prevClassList.map((item) =>
          item.classcode === classItem.classcode ? { ...item, schedule, roomno } : item
        )
      );
    } else {
      showAlert2(data);
    }
  };

  return (
    <>
      {classItem ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">{classItem.classcode}</h1>
          <div className="flex justify-between my-2">
            <button
              onClick={() => settogglepage(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Go Back
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
          <form>
            <div className="overflow-auto my-2">
              <table className="min-w-full bg-white border table-auto">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">
                      <button
                        onClick={handleDeselectAll}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Deselect All
                      </button>
                    </th>
                    <th className="py-2 px-4 border-b text-left">Slot</th>
                    <th className="py-2 px-4 border-b text-left">Classroom</th>
                  </tr>
                </thead>
                <tbody>
                  {days.map((day, dayIndex) =>
                    Array.from({ length: slotsPerDay }).map((_, slotIndex) => {
                      const index = dayIndex * slotsPerDay + slotIndex;
                      return (
                        <tr
                          key={index}
                          className={!slots[index].checked ? "text-gray-400" : ""}
                        >
                          <td className="py-2 px-4 border-b">
                            <input
                              type="checkbox"
                              checked={slots[index].checked}
                              onChange={() => handleCheckboxChange(index)}
                              className="form-checkbox h-5 w-5 text-blue-600"
                            />
                          </td>
                          <td className="py-2 px-4 border-b">
                            {day}{slotIndex + 1}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <select
                              value={slots[index].classroom}
                              onChange={(e) =>
                                handleDropdownChange(index, e.target.value)
                              }
                              disabled={!slots[index].checked}
                              className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-200"
                            >
                              <option value="">Select Classroom</option>
                              {classrooms.map((classroom, index) => (
                                <option key={index} value={classroom}>
                                  {classroom}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      ) : (
        <div>No class is selected</div>
      )}
    </>
  );
};

export default EditTimetable;