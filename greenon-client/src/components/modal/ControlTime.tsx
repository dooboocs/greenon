import { Button } from "@mui/material";
import { toJS } from "mobx";
import { useObserver } from "mobx-react";
import React from "react";
import useStore from "../../stores";

const ControlTime = ({ device_id }: { device_id: string }) => {
  const { device } = useStore();

  return useObserver(() => {
    const target = toJS(device.devices).filter(
      (device: any) => device.id === device_id
    )[0];
    const time = target.mode_time;

    return (
      <>
        <Button
          style={{
            width: "100%",
            color: time === "1" ? "#007cba" : "rgba(0,0,0,0.4)",
            borderBottom: "1px solid #f4f4f4",
          }}
          onClick={() => device.updateDevice(device_id, "mode_time", "1")}
        >
          1시간
        </Button>
        <Button
          style={{
            width: "100%",
            color: time === "2" ? "#007cba" : "rgba(0,0,0,0.4)",
            borderBottom: "1px solid #f4f4f4",
          }}
          onClick={() => device.updateDevice(device_id, "mode_time", "2")}
        >
          2시간
        </Button>
        <Button
          style={{
            width: "100%",
            color: time === "sequence" ? "#007cba" : "rgba(0,0,0,0.4)",
            borderBottom: "1px solid #f4f4f4",
          }}
          onClick={() =>
            device.updateDevice(device_id, "mode_time", "sequence")
          }
        >
          연속
        </Button>
        <Button
          style={{
            width: "100% ",
            color: time === "manual" ? "#007cba" : "rgba(0,0,0,0.4)",
          }}
          onClick={() => device.updateDevice(device_id, "mode_time", "manual")}
        >
          수동
        </Button>
      </>
    );
  });
};

export default ControlTime;
