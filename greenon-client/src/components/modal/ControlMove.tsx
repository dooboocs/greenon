import React from "react";
import { ColBox } from "./ResponsiveModal";
import useStore from "../../stores";
import { Alert, Button, Snackbar } from "@mui/material";

const ControlMove = () => {
  const [open, setOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  const { device } = useStore();

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const handleClick = (key: string, value: any) => {
    setOpen(true);
    device.updateAllDevice(key, value);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <ColBox>
        공간 제균
        <div className="option-list">
          <Button
            variant="text"
            onClick={() => handleClick("space_sterilization", "1h")}
          >
            1시간
          </Button>
          <Button
            variant="text"
            onClick={() => handleClick("space_sterilization", "2h")}
          >
            2시간
          </Button>
          <Button
            variant="text"
            onClick={() => handleClick("space_sterilization", "sequence")}
          >
            연속
          </Button>
          <Button
            variant="text"
            onClick={() => handleClick("space_sterilization", "manual")}
          >
            수동
          </Button>
        </div>
      </ColBox>
      <ColBox>
        해충방제
        <div className="option-list">
          <Button onClick={() => handleClick("space_sterilization", "1h")}>
            1시간
          </Button>
          <Button onClick={() => handleClick("space_sterilization", "2h")}>
            2시간
          </Button>
          <Button
            onClick={() => handleClick("space_sterilization", "sequence")}
          >
            연속
          </Button>
          <Button onClick={() => handleClick("space_sterilization", "manual")}>
            수동
          </Button>
        </div>
      </ColBox>
      <Snackbar
        open={open}
        anchorOrigin={{
          vertical: isMobile ? "top" : "bottom",
          horizontal: isMobile ? "center" : "right",
        }}
      >
        <Alert severity="info">전체 디바이스에 성공적으로 반영되었습니다</Alert>
      </Snackbar>
    </>
  );
};

export default ControlMove;
