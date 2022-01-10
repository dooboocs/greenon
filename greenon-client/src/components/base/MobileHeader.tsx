import React from 'react';

import MobileLogo from '../../static/images/logo-header.png';
import { ReactComponent as LocationIcon } from '../../static/icons/icon-pin.svg';
import { ReactComponent as SunnyIcon } from '../../static/icons/icon-weather-sunny.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  text-align: ${({ align }) => (align ? align : 'left')};
`;

const Space = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
`;

const Location = () => {
  return (
    <Space>
      <LocationIcon />
      <p>서울 강남구</p>
    </Space>
  );
};

const Weather = () => {
  return (
    <Space>
      <SunnyIcon />
      <p>맑음</p>
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
          style={{ display: 'block', cursor: 'pointer' }}
          onClick={() => navigate('/')}
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
