import React from "react";
import styled from "styled-components";
import useStore from "../../stores";

interface Props {
  data: any;
  option_key: string;
  value: any;
  text: string;
}

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
  background-color: ${({ active }) => (active ? "#007cba" : "inherit")};
  color: ${({ active, theme }) => (active ? "#fff" : "#007cba")};
`;

const DeviceStatusOption = ({ data, option_key, value, text }: Props) => {
  const { device } = useStore();

  return (
    <Button
      active={data[option_key] === value}
      onClick={() => device.updateDevice(data.id, option_key, value)}
    >
      {text}
    </Button>
  );
};

export default DeviceStatusOption;
