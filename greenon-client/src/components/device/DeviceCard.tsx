import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DeviceInfo, DeviceCardGrid } from ".";
import { IDevice } from "../../stores/device";

const DeviceCardBox = styled(Link)`
  display: inline-flex;
  flex-direction: column;
  gap: 20px;
  background: #fff;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0px 5px 10px 2px rgba(0, 124, 186, 0.2);
`;

const Space = styled.div<{ gap: number }>`
  display: flex;
  gap: ${(props) => props.gap}px;
  align-items: center;

  label {
    color: #989898;
  }
`;

const DeviceCard = ({ device }: { device: IDevice }) => {
  return (
    <DeviceCardBox to={`/devices/${device.id}`}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          paddingLeft: 10,
        }}
      >
        <DeviceInfo
          title={device.title}
          name={device.name}
          type={device.device_type}
        />
        <Space gap={20}>
          <Space gap={10}>
            <label>수위</label>
            <p>{device.water_level}</p>
          </Space>
          <Space gap={10}>
            <label>약품</label>
            <p>{device.medicine}</p>
          </Space>
        </Space>
      </div>
      <DeviceCardGrid device={device} />
    </DeviceCardBox>
  );
};

export default DeviceCard;
