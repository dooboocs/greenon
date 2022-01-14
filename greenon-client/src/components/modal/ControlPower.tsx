import React from "react";
import { Button } from "@mui/material";
import useStore from "../../stores";
import { useObserver } from "mobx-react";
import { toJS } from "mobx";

const ControlPower = ({ device_id }: { device_id: string }) => {
  const { device } = useStore();

  const handlePowerOn = () => {
    device.updateDevice(device_id, "power", true);
  };

  const handlePowerOff = () => {
    device.updateDevice(device_id, "power", false);
  };

  return useObserver(() => {
    const target = toJS(device.devices).filter(
      (device: any) => device.id === device_id
    )[0];
    const power = target.power;

    return (
      <>
        <Button
          variant="text"
          style={{
            width: "100%",
            color: power ? "#007cba" : "rgba(0,0,0,0.4)",
            borderBottom: "1px solid #f4f4f4",
          }}
          onClick={handlePowerOn}
        >
          ON
        </Button>
        <Button
          variant="text"
          style={{
            width: "100%",
            color: !power ? "#007cba" : "rgba(0,0,0,0.4)",
          }}
          onClick={handlePowerOff}
        >
          OFF
        </Button>
      </>
    );
  });
};

export default ControlPower;
