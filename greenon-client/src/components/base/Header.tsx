import { useObserver } from "mobx-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Logo from "../../static/images/logo-login.png";
import useStore from "../../stores";

const Box = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  color: #fff;
`;

const Space = styled.div<{ gap?: number }>`
  display: flex;
  align-items: center;
  gap: ${({ gap }) => (gap ? `${gap}px` : "40px")};
`;

const HeaderLogo = styled.img`
  display: block;
  height: 30px;
`;

const HeaderMenuList = styled.ul`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const HeaderMenuItem = styled(Link)``;

const Connection = () => {
  const { device } = useStore();

  return useObserver(() => (
    <Space gap={5}>
      <strong>{device.devices.length}</strong>
      <p>연결됨</p>
    </Space>
  ));
};

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Space>
        <HeaderLogo
          src={Logo}
          alt="logo-greenon"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <HeaderMenuList>
          <HeaderMenuItem to="/">장치 리스트</HeaderMenuItem>
          <HeaderMenuItem to="/manage">장치 제어</HeaderMenuItem>
          <HeaderMenuItem to="/mypage">마이페이지</HeaderMenuItem>
        </HeaderMenuList>
      </Space>
      <Connection />
    </Box>
  );
};

export default Header;
