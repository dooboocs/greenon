import React from "react";
import MobileLogo from "../../static/images/logo-header.png";
import { ReactComponent as LocationIcon } from "../../static/icons/icon-pin.svg";
import { ReactComponent as SunnyIcon } from "../../static/icons/icon-weather-sunny.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useStore from "../../stores";
import { useObserver } from "mobx-react";

const MobileHeaderBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  color: #fff;
`;

const FlexBox = styled.div<{ align?: string }>`
  flex: 1;
  align-items: center;
  text-align: ${({ align }) => (align ? align : "left")};

  p {
    font-size: 14px;
  }
`;

const Space = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
`;

export const Location = () => {
  const { etc } = useStore();

  return useObserver(() => (
    <Space>
      <LocationIcon />
      <p>{etc.location}</p>
    </Space>
  ));
};

export const Weather = () => {
  const { etc } = useStore();

  return (
    <Space>
      <SunnyIcon />
      <p>{etc.weather}</p>
    </Space>
  );
};

const MobileHeader = () => {
  const navigate = useNavigate();

  return (
    <MobileHeaderBox>
      <FlexBox>
        <img
          src={MobileLogo}
          alt="logo-greenon"
          style={{ display: "block", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </FlexBox>
      <FlexBox align="center">
        <Location />
      </FlexBox>
      <FlexBox align="right">
        <Weather />
      </FlexBox>
    </MobileHeaderBox>
  );
};

export default MobileHeader;
