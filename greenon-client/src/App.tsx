import { runInAction } from "mobx";
import React from "react";
import { Cookies } from "react-cookie";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { MainLayout } from "./components/base";
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
import useStore from "./stores";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateOutlet />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<MainContainer />} />
              <Route path="/devices/:id" element={<DeviceContainer />} />
              <Route path="/manage" element={<ManageContainer />} />
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
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" />;
};

const AuthOutlet = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  if (token) {
    console.log(token);
    localStorage.setItem("token", token);
    cookies.remove("token");
  }

  const user = localStorage.getItem("token");

  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default App;
