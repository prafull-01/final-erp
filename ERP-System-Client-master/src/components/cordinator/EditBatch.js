import React, { useContext, useEffect, useState } from "react";
import BatchContext from "../../contex/batch/batchcontext";
import MainContext from "../../contex/main/maincontext";
import { useNavigate } from "react-router-dom";
import UserListContext from "../../contex/userlist/userlistcontext";
import AlertContext from "../../contex/alert/alertcontext";

const EditBatch = () => {
  const navigate = useNavigate();
  const context = useContext(BatchContext);
  const { selectedBatch, Students, setStudents, editbatch } = context;
  const context1 = useContext(MainContext);
  const { selectedRoles } = context1;
  const context2 = useContext(UserListContext);
  const { userlist, fetchuserlist } = context2;
  const context3 = useContext(AlertContext);
  const { setMenuVisible } = context3;
  const [toggleview, setToggleview] = useState("page");
  const [userId, setUserId] = useState("");
  const [inbatch, setInbatch] = useState({});

  // Check permission and redirect if necessary
  const checkPermission = () => {
    if (localStorage.getItem("usertype") === "cordinator") {
      if (!selectedRoles.studentcontrol) {
        navigate("/cordinator");
      }
    }
    if (!selectedBatch.batchcode) {
      navigate("/admin/batches");
    }
  };

  const onUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleEditStudents = () => {
    setToggleview("edit");
    fetchuserlist("student");
  };

  const handleback = () => {
    setToggleview("page");
  };

  const handlesubmit = async () => {
    const data = {
      academicyearcode: selectedBatch.academicyearcode,
      semestercode: selectedBatch.semestercode,
      schoolcode: selectedBatch.schoolcode,
      departmentcode: selectedBatch.departmentcode,
      batchcode: selectedBatch.batchcode,
      students: Students,
    };
    await editbatch(data);
    if (localStorage.getItem("usertype") === "cordinator") {
      navigate("/cordinator/batches");
    } else if (localStorage.getItem("usertype") === "admin") {
      navigate("/admin/batches");
    }
  };

  const filteredUserList = userlist.filter((user) => {
    return (
      user.systemid?.includes(userId) &&
      user.school?.includes(selectedBatch?.schoolcode) &&
      user.department?.includes(selectedBatch?.departmentcode)
    );
  });

  const handleCheckboxChange = (e, user) => {
    const { checked } = e.target;

    if (checked) {
      setStudents((prevStudents) => [
        ...prevStudents,
        {
          systemid: user.systemid,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      ]);
    } else {
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.systemid !== user.systemid)
      );
    }

    setInbatch((prevSelected) => ({
      ...prevSelected,
      [user.systemid]: checked,
    }));
  };

  useEffect(() => {
    checkPermission();
    setMenuVisible(false);
  }, []);

  useEffect(() => {
    // Initialize the checkbox states based on Students state
    const initialInbatch = Students.reduce((acc, student) => {
      acc[student.systemid] = true;
      return acc;
    }, {});
    setInbatch(initialInbatch);
  }, [Students]);

  return (
    <>
      {toggleview === "page" && (
        <>
          <div className="overflow-auto max-h-96">
            <table className="min-w-full bg-white border table-auto shadow-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">
                    Batch Information
                  </th>
                  <th className="py-2 px-4 border-b text-left"></th>
                </tr>
              </thead>
              <tbody>
                {selectedBatch ? (
                  <>
                    <tr>
                      <td className="py-2 px-4 border-b">
                        <strong>School:</strong>
                      </td>
                      <td className="py-2 px-4 border-b">
                        {selectedBatch.schoolcode}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">
                        <strong>Department:</strong>
                      </td>
                      <td className="py-2 px-4 border-b">
                        {selectedBatch.departmentcode}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">
                        <strong>Academic Year:</strong>
                      </td>
                      <td className="py-2 px-4 border-b">
                        {selectedBatch.academicyearcode}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">
                        <strong>Semester:</strong>
                      </td>
                      <td className="py-2 px-4 border-b">
                        {selectedBatch.semestercode}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">
                        <strong>Batch:</strong>
                      </td>
                      <td className="py-2 px-4 border-b">
                        {selectedBatch.batchname}
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan={2} className="py-2 px-4 text-center">
                      No batch selected.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="overflow-auto mt-10">
            <button
              className="flex justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleEditStudents}
            >
              Edit
            </button>
            <table className="min-w-full bg-white border table-auto">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">System ID</th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Phone</th>
                </tr>
              </thead>
              <tbody>
                {selectedBatch?.students?.length > 0 ? (
                  selectedBatch.students
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((student, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b">{student.name}</td>
                        <td className="py-2 px-4 border-b">
                          {student.systemid}
                        </td>
                        <td className="py-2 px-4 border-b">{student.email}</td>
                        <td className="py-2 px-4 border-b">{student.phone}</td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-2 px-4 text-center">
                      No students found in this batch.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {toggleview === "edit" && (
        <div>
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Search User Details</h1>

            <div className="flex items-center space-x-4 mb-4">
              <button
                className="flex justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleback}
              >
                Back
              </button>
              <input
                type="text"
                className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search User"
                value={userId}
                onChange={onUserIdChange}
              />
            </div>

            <div className="overflow-auto max-h-96">
              <table className="min-w-full bg-white border table-auto">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left"></th>
                    <th className="py-2 px-4 border-b text-left">Name</th>
                    <th className="py-2 px-4 border-b text-left">System ID</th>
                    <th className="py-2 px-4 border-b text-left">Email</th>
                    <th className="py-2 px-4 border-b text-left">Phone</th>
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
                      .sort((a, b) => {
                        // First sort by inbatch status
                        const inBatchA = !!inbatch[a.systemid];
                        const inBatchB = !!inbatch[b.systemid];
                        if (inBatchA === inBatchB) {
                          // If inbatch status is the same, sort by name
                          return a.name.localeCompare(b.name);
                        }
                        return inBatchA ? -1 : 1;
                      })
                      .map((user) => (
                        <tr key={user.systemid}>
                          <td className="py-2 px-4 border-b">
                            <input
                              type="checkbox"
                              id="inbatch"
                              checked={!!inbatch[user.systemid]}
                              onChange={(e) => handleCheckboxChange(e, user)}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                            />
                          </td>
                          <td className="py-2 px-4 border-b">{user.name}</td>
                          <td className="py-2 px-4 border-b">
                            {user.systemid}
                          </td>
                          <td className="py-2 px-4 border-b">{user.email}</td>
                          <td className="py-2 px-4 border-b">{user.phone}</td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
              <button
                className="flex justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handlesubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBatch;
