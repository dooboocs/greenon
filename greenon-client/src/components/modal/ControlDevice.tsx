import React from "react";
import styled from "styled-components";
import useStore from "../../stores";
import { Alert, Button, Snackbar } from "@mui/material";

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
  const [open, setOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  const handleClick = (key: string, value: any) => {
    setOpen(true);
    device.updateAllDevice(key, value);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box>
      <Row>
        <p>전원</p>
        <div className="option-list">
          <Button onClick={() => handleClick("power", true)}>ON</Button>
          <Button onClick={() => handleClick("power", false)}>OFF</Button>
        </div>
      </Row>
      <Row>
        <p>모드 선택</p>
        <div className="option-list">
          <Button onClick={() => handleClick("mode", 1)}>제균</Button>
          <Button onClick={() => handleClick("mode", 2)}>해충</Button>
        </div>
      </Row>
      <Row>
        <p>모드 시간 선택</p>
        <div className="option-list">
          <Button onClick={() => handleClick("mode_time", "sequence")}>
            연속
          </Button>
          <Button onClick={() => handleClick("mode_time", "1")}>1</Button>
          <Button onClick={() => handleClick("mode_time", "2")}>2</Button>
        </div>
      </Row>
      <Row style={{ border: "none" }}>
        <p>동작 제어</p>
        <div className="option-list">
          <Button onClick={() => handleClick("motion_control", true)}>
            Start
          </Button>
          <Button onClick={() => handleClick("motion_control", false)}>
            Stop
          </Button>
        </div>
      </Row>
      <Snackbar
        open={open}
        anchorOrigin={{
          vertical: isMobile ? "top" : "bottom",
          horizontal: isMobile ? "center" : "right",
        }}
      >
        <Alert severity="info">전체 디바이스에 성공적으로 반영되었습니다</Alert>
      </Snackbar>
    </Box>
  );
};

export default ControlDevice;
