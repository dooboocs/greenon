import React from "react";
import styled from "styled-components";
import { ReactComponent as PinIcon } from "../../static/icons/icon-pin-2.svg";
import useStore from "../../stores";

const SiderBox = styled.div`
  width: 300px;
  flex-shrink: 0;
  display: none;
  flex-direction: column;
  gap: 20px;
  border-left: 1px solid #e5f2f8;
  align-items: center;
  padding: 20px;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  background-color: #f2fbff;
`;

const Space = styled.div`
  display: flex;
  gap: 5px;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5f2f8;
  font-size: 14px;
  background: none;
`;

const Sider = () => {
  const { modal } = useStore();

  const { etc } = useStore();

  return (
    <SiderBox>
      <Box>
        <label>현재 위치</label>
        <Space>
          <PinIcon />
          <p style={{ fontSize: 14, color: "#007ba8" }}>{etc.location}</p>
        </Space>
      </Box>
      <Box>
        <label>날씨 미세먼지</label>
        <Space>
          <p style={{ fontSize: 14, color: "#007ba8" }}>맑음</p>
          <p style={{ fontSize: 14, color: "#007ba8" }}>2.5PM</p>
        </Space>
      </Box>
      <ButtonGroup>
        <Button
          style={{ color: "#007ba8" }}
          onClick={() => modal.handleOpen("addDevice")}
        >
          제품 추가
        </Button>
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: 10,
          }}
        >
          <Button
            style={{ flex: 1 }}
            onClick={() => modal.handleOpen("controlDevice")}
          >
            전체 제어
          </Button>
          <Button
            style={{ flex: 1 }}
            onClick={() => modal.handleOpen("controlMove")}
          >
            동작 제어
          </Button>
        </div>
      </ButtonGroup>
    </SiderBox>
  );
};

export default Sider;
