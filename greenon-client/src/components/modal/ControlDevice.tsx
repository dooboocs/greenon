import React from "react";
import styled from "styled-components";
import useStore from "../../stores";
import { Button } from "@mui/material";

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #f4f4f4;

  p {
    flex: 1.5;
    font-size: 16px;
    color: #000;
  }

  .option-list {
    flex: 2.5;
    display: flex;
    gap: 10px;
  }
`;

const ControlDevice = () => {
  const { device } = useStore();

  return (
    <Box>
      <Row>
        <p>전원</p>
        <div className="option-list">
          <Button onClick={() => device.updateAllDevice("power", true)}>
            ON
          </Button>
          <Button onClick={() => device.updateAllDevice("power", false)}>
            OFF
          </Button>
        </div>
      </Row>
      <Row>
        <p>모드 선택</p>
        <div className="option-list">
          <Button onClick={() => device.updateAllDevice("mode", 1)}>
            제균
          </Button>
          <Button onClick={() => device.updateAllDevice("mode", 2)}>
            해충
          </Button>
        </div>
      </Row>
      <Row>
        <p>모드 시간 선택</p>
        <div className="option-list">
          <Button
            onClick={() => device.updateAllDevice("mode_time", "sequence")}
          >
            연속
          </Button>
          <Button onClick={() => device.updateAllDevice("mode_time", "1")}>
            1
          </Button>
          <Button onClick={() => device.updateAllDevice("mode_time", "2")}>
            2
          </Button>
        </div>
      </Row>
      <Row style={{ border: "none" }}>
        <p>동작 제어</p>
        <div className="option-list">
          <Button
            onClick={() => device.updateAllDevice("motion_control", true)}
          >
            Start
          </Button>
          <Button
            onClick={() => device.updateAllDevice("motion_control", false)}
          >
            Stop
          </Button>
        </div>
      </Row>
    </Box>
  );
};

export default ControlDevice;
