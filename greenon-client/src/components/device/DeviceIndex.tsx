import React from "react";
import styled from "styled-components";
import { CircularProgress } from ".";
import { ReactComponent as Icon1 } from "../../static/icons/icon-1.svg";
import { ReactComponent as Icon2 } from "../../static/icons/icon-2.svg";
import { ReactComponent as Icon3 } from "../../static/icons/icon-3.svg";
import { IDeviceData } from "../../stores/device";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InlineRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const InlineCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeviceIndex = ({ data }: { data: IDeviceData }) => {
  return (
    <Box>
      <Row>
        <CircularProgress
          title="바이오에어로줄지수"
          progress={data.bio_air_roll}
          color="#007cba"
          text="좋음"
        />
        <CircularProgress
          title="공기질지수"
          progress={data.air_quailty}
          color="#00c4ff"
          text="나쁨"
        />
        <CircularProgress
          title="식중독 지수"
          progress={data.food_poisoning}
          color="#00baba"
          text="낮음"
        />
      </Row>
      <Row>
        <InlineRow>
          <Icon1 />
          <InlineCol>
            <label style={{ color: "#8b8b8b" }}>미세먼지</label>
            <p style={{ fontSize: 14 }}>{data.find_dust}PM</p>
          </InlineCol>
        </InlineRow>
        <InlineRow>
          <Icon2 />
          <InlineCol>
            <label style={{ color: "#8b8b8b" }}>온도</label>
            <p style={{ fontSize: 14 }}>{data.temperature}°C</p>
          </InlineCol>
        </InlineRow>
        <InlineRow>
          <Icon3 />
          <InlineCol>
            <label style={{ color: "#8b8b8b" }}>습도</label>
            <p style={{ fontSize: 14 }}>{data.humedity * 100}%</p>
          </InlineCol>
        </InlineRow>
      </Row>
    </Box>
  );
};

export default DeviceIndex;
