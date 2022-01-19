import React from "react";
import useStore from "../../stores";
import { Button as MuiButton } from "@mui/material";

interface Props {
  data: any;
  option_key: string;
  value: any;
  text: string;
}

const DeviceStatusOption = ({ data, option_key, value, text }: Props) => {
  const { device } = useStore();

  return (
    <MuiButton
      className={`asd ${data[option_key] === value ? "active" : false}`}
      onClick={() => device.updateDevice(data.id, option_key, value)}
    >
      {text}
    </MuiButton>
  );
};

export default DeviceStatusOption;
