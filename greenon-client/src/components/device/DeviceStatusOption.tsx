import React from "react";
import styled from "styled-components";
import useStore from "../../stores";
import { Button as MuiButton } from "@mui/material";

interface Props {
  data: any;
  option_key: string;
  value: any;
  text: string;
}

const Button = styled(MuiButton)<{ active?: boolean }>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  font-size: 16px;
  border: none;
  background-color: ${({ active }) => (active ? "#007cba" : "inherit")} mpo !important;
  color: ${({ active }) => (active ? "#030303" : "#007cba")} !important;
`;

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
