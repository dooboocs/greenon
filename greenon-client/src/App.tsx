import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import DeviceProvider from "./components/base/DeviceProvider";
import {
  MainContainer,
  ManageContainer,
  MyPageContainer,
  DeviceContainer,
} from "./containers";
import {
  ChangePassword,
  Company,
  FindEmail,
  FindPassword,
  Login,
  Notice,
  NoticeDetail,
  Products,
  ProfileEdit,
  Register,
  Register2,
  Request,
  Settings,
  Usage,
} from "./pages";
import { Agree1 } from "./pages/agree";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateOutlet />}>
            <Route
              path="/"
              element={
                <DeviceProvider>
                  <MainContainer />
                </DeviceProvider>
              }
            />
            <Route
              path="/devices/:device_id"
              element={
                <DeviceProvider>
                  <DeviceContainer />
                </DeviceProvider>
              }
            />
            <Route
              path="/manage"
              element={
                <DeviceProvider>
                  <ManageContainer />
                </DeviceProvider>
              }
            />
            <Route path="/mypage" element={<MyPageContainer />} />

            <Route path="/profile_edit" element={<ProfileEdit />} />
            <Route path="/change_password" element={<ChangePassword />} />
            <Route path="/company" element={<Company />} />
            <Route path="/products" element={<Products />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/notice/:notice_id" element={<NoticeDetail />} />
            <Route path="/usage" element={<Usage />} />
            <Route path="/request" element={<Request />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route element={<AuthOutlet />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register2" element={<Register2 />} />
            <Route path="/find_email" element={<FindEmail />} />
            <Route path="/find_password" element={<FindPassword />} />

            <Route path="register/agree1" element={<Agree1 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

const PrivateOutlet = () => {
  const user = localStorage.getItem("token");

  return user ? <Outlet /> : <Navigate to="/login" />;
};

const AuthOutlet = () => {
  const user = localStorage.getItem("token");

  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default App;
