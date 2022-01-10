import React from "react";
import styled from "styled-components";
import useStore from "../../stores";

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

const Button = styled.button<{ active?: boolean }>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  font-size: 16px;
  border: none;
  font-weight: 400;
  background-color: ${({ active }) => (active ? "#007cba" : "inherit")};
  color: ${({ active, theme }) => (active ? "#fff" : "#007cba")};
`;

const ControlDeviceModal = () => {
  const { device, modal } = useStore();

  return (
    <Box>
      <Row>
        <p>전원</p>
        <div className="option-list">
          <Button
            active
            onClick={() =>
              device.updateDevice(modal.targetDeviceId, "power", "ON")
            }
          >
            ON
          </Button>
          <Button
            onClick={() =>
              device.updateDevice(modal.targetDeviceId, "power", "OFF")
            }
          >
            OFF
          </Button>
        </div>
      </Row>
      <Row>
        <p>모드 선택</p>
        <div className="option-list">
          <Button
            active
            onClick={() =>
              device.updateDevice(modal.targetDeviceId, "mode", "제균")
            }
          >
            제균
          </Button>
          <Button
            onClick={() =>
              device.updateDevice(modal.targetDeviceId, "mode", "해충")
            }
          >
            해충
          </Button>
        </div>
      </Row>
      <Row>
        <p>모드 시간 선택</p>
        <div className="option-list">
          <Button
            active
            onClick={() =>
              device.updateDevice(modal.targetDeviceId, "time", "연속")
            }
          >
            연속
          </Button>
          <Button
            onClick={() =>
              device.updateDevice(modal.targetDeviceId, "time", "1")
            }
          >
            1
          </Button>
          <Button
            onClick={() =>
              device.updateDevice(modal.targetDeviceId, "time", "2")
            }
          >
            2
          </Button>
        </div>
      </Row>
      <Row>
        <p>동작 제어</p>
        <div className="option-list">
          <Button
            active
            onClick={() =>
              device.updateDevice(
                modal.targetDeviceId,
                "motion_control",
                "Start"
              )
            }
          >
            Start
          </Button>
          <Button
            onClick={() =>
              device.updateDevice(
                modal.targetDeviceId,
                "motion_control",
                "Stop"
              )
            }
          >
            Stop
          </Button>
        </div>
      </Row>
    </Box>
  );
};

export default ControlDeviceModal;
