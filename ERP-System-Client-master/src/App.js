import AdminHome from "./components/admin/AdminHome";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Studenthome from "./components/student/Studenthome";
import TeacherHome from "./components/teacher/TeacherHome";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AlertState from "./contex/alert/alertstate";
import RegisterState from "./contex/register/registerstate";
import UserListState from "./contex/userlist/userliststate";
import MainState from "./contex/main/mainstate";
import CordinatorHome from "./components/cordinator/CordinatorHome";
import BatchState from "./contex/batch/batchstate";
import Loader from "./components/loader";
import Reset from "./components/Reset";
import ClassesState from "./contex/classes/classesstate";
import AttendanceState from "./contex/attendance/attendancestate";

function App() {
  return (
    <div className="bg-slate-100 min-h-screen w-screen">
      <AlertState>
        <RegisterState>
          <UserListState>
            <MainState>
              <BatchState>
                <ClassesState>
                  <AttendanceState>
                    <Alert />
                    <Loader />
                    <Router>
                      <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/resetpassword" element={<Reset />} />
                        <Route path="/student/*" element={<Studenthome />} />
                        <Route path="/teacher/*" element={<TeacherHome />} />
                        <Route path="/cordinator/*" element={<CordinatorHome />} />
                        <Route path="/admin/*" element={<AdminHome />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                      </Routes>
                    </Router>
                  </AttendanceState>
                </ClassesState>
              </BatchState>
            </MainState>
          </UserListState>
        </RegisterState>
      </AlertState>
    </div>
  );
}

export default App;