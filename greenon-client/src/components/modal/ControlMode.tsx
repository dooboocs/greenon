import React from "react";
import { Button } from "@mui/material";
import useStore from "../../stores";
import { useObserver } from "mobx-react";
import { toJS } from "mobx";

const ControlMode = ({ device_id }: { device_id: string }) => {
  const { device } = useStore();

  const handleModeOne = () => {
    device.updateDevice(device_id, "mode", 1);
  };

  const handleModeTwo = () => {
    device.updateDevice(device_id, "mode", 2);
  };

  return useObserver(() => {
    const target = toJS(device.devices).filter(
      (device: any) => device.id === device_id
    )[0];
    const mode = target.mode;
    return (
      <>
        <Button
          style={{
            width: "100%",
            color: mode === 1 ? "#007cba" : "rgba(0,0,0,0.4)",
            borderBottom: "1px solid #f4f4f4",
          }}
          onClick={handleModeOne}
        >
          공간 제균
        </Button>
        <Button
          style={{
            width: "100%",
            color: mode === 2 ? "#007cba" : "rgba(0,0,0,0.4)",
          }}
          onClick={handleModeTwo}
        >
          해충 방제
        </Button>
      </>
    );
  });
};

export default ControlMode;
