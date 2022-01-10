import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as AirPuriIcon } from "../../static/icons/icon-airpuri.svg";
import { IDevice } from "../../stores/device";

const ManageCardBox = styled(Link)`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 5px 10px 2px rgba(0, 124, 186, 0.2);
  padding: 20px;
  gap: 10px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #007cba;
`;

const CardBottom = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.div<{ background: string; color: string }>`
  flex: 1;
  border-radius: 10px;
  padding: 10px;
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  text-align: center;
  font-size: 14px;
`;

const ManageCard = ({ data }: { data: IDevice }) => {
  return (
    <ManageCardBox to={`/devices/${data.id}`}>
      <CardHeader>
        <h5>공장동 1동 출입문</h5>
        <InfoBox>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "right",
            }}
          >
            <small>AT-1535B</small>
            <small>공기청정제균기</small>
          </div>
          <AirPuriIcon />
        </InfoBox>
      </CardHeader>
      <CardBottom>
        <Button background="#e5f2f8" color="#007cba">
          정보 수정
        </Button>
        <Button background="#ffebf3" color="#ff0062">
          삭제
        </Button>
      </CardBottom>
    </ManageCardBox>
  );
};

export default ManageCard;
