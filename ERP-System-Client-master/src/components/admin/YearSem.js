import React, { useContext, useEffect, useState } from "react";
import MainContext from "../../contex/main/maincontext";
import AlertContext from "../../contex/alert/alertcontext";

const YearSem = () => {
  const context = useContext(MainContext);
  const { yearlist, semlist, getyearlist, getsemlist, addyearsem,setSemlist } = context;
  const context2 = useContext(AlertContext);
  const { setMenuVisible } = context2;
  const [toggle, setToggle] = useState("");
  const [year, setYear] = useState("");
  const [addyear, setAddyear] = useState("");
  const [add, setAdd] = useState("year");
  const [adddata, setAdddata] = useState({
    toadd: "year",
    yearname: "",
    yearcode: "",
    semname: "",
    semcode: "",
    yearcodesem: ""
  });

  const handleyear = async () => {
    setToggle("year");
    getyearlist();
  };

  const handlesem = async () => {
    setToggle("sem");
    setSemlist([])
  };

  const semsearch = async () => {
    await getsemlist(year);
  };

  const onyearChange = (e) => {
    const selectedYearCode = e.target.value;
    setYear(selectedYearCode);
  };
  const onaddyearChange = (e) => {
    const selectedYearCode = e.target.value;
    setAdddata((prevData) => ({
      ...prevData,
      yearcodesem: selectedYearCode,
    }));
    setAddyear(selectedYearCode);
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
    await addyearsem(adddata);
    setSemlist([])
    setAdddata({
      toadd: "year",
      yearname: "",
      yearcode: "",
      semname: "",
      semcode: "",
      yearcodesem: ""
    })
    setAdd("year")
    setAddyear("")

  };

  useEffect(() => {
    getyearlist();
    setMenuVisible(false);
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 mb-4">
        <button
          className="flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleyear}
        >
          Academic Year
        </button>
        <button
          className="flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handlesem}
        >
          Semester
        </button>
        <button
          type="button"
          className="flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add
        </button>
      </div>

      {toggle === "year" && (
        <div className="overflow-auto max-h-96">
          <table className="min-w-full bg-white border table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Academic Year</th>
                <th className="py-2 px-4 border-b text-left">Year Code</th>
              </tr>
            </thead>
            <tbody>
              {yearlist.map((year, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{year.academicyearname}</td>
                  <td className="py-2 px-4 border-b">{year.academicyearcode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {toggle === "sem" && (
        <div className="overflow-auto max-h-96">
          <div className="flex items-center space-x-4 mb-4">
            <select
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={onyearChange}
              value={year}
            >
              <option value="">Select Academic Year</option>
              {yearlist.map((year, index) => (
                <option key={index} value={year.academicyearcode}>
                  {year.academicyearname}
                </option>
              ))}
            </select>

            <button
              className="flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={semsearch}
            >
              Search
            </button>

           
          </div>

          <table className="min-w-full bg-white border table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Semester Name</th>
                <th className="py-2 px-4 border-b text-left">Semester Code</th>
              </tr>
            </thead>
            <tbody>
              {semlist.map((sem, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{sem.semestername}</td>
                  <td className="py-2 px-4 border-b">{sem.semestercode}</td>
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
                Add Year / Semester
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
                <option value="year">Academic Year</option>
                <option value="sem">Semester</option>
              </select>

              <form>
                {add === "year" && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="schoolname" className="form-label">
                        Academic Year Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="yearname"
                        name="yearname"
                        onChange={onChange}
                        value={adddata.yearname}
                        minLength={5}
                        required
                        placeholder="Academic Year Name"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="schoolcode" className="form-label">
                        Academic Year Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="yearcode"
                        name="yearcode"
                        onChange={onChange}
                        value={adddata.yearcode}
                        minLength={5}
                        required
                        placeholder="Academic Year Code"
                      />
                    </div>
                  </>
                )}

                {add === "sem" && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="depname" className="form-label">
                        Semester Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="semname"
                        name="semname"
                        onChange={onChange}
                        value={adddata.semname}
                        minLength={5}
                        required
                        placeholder="Semester Name"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="depcode" className="form-label">
                      Semester Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="semcode"
                        name="semcode"
                        onChange={onChange}
                        value={adddata.semcode}
                        minLength={5}
                        required
                        placeholder="Semester Code"
                      />
                    </div>
                    <div className="mb-3">
                      <select
                        className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={onaddyearChange}
                        value={addyear}
                      >
                        <option value="">Select Academic Year</option>
                        {yearlist.map((year, index) => (
                          <option key={index} value={year.academicyearcode}>
                            {year.academicyearname}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <div className="modal-footer">
                  <button
                    type="button"
                    className="flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
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

export default YearSem;
