import React, { useMemo } from "react";
import styled from "styled-components";
import { IDevice } from "../../stores/device";
import useStore from "../../stores";
import { Button as MuiButton } from "@mui/material";

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  label {
    color: #989898;
  }
`;

const Button = styled(MuiButton)<{ red?: string }>`
  width: 100%;
  background-color: ${(props) =>
    props.red === "true" ? "#f7f7f7" : "#e5f2f8"} !important;
  color: ${(props) =>
    props.red === "true" ? "#8b8b8b" : "#007cba"} !important;
  padding-top: 15px !important;
  padding-bottom: 15px !important;
  border-radius: 10px !important;
  box-shadow: none !important;
`;

const DeviceCardGrid = ({ device }: { device: IDevice }) => {
  const { modal } = useStore();

  function formatMode(mode: number) {
    switch (mode) {
      case 1:
        return "공간제균";
      case 2:
        return "해충방제";
    }
  }

  function formatModeTime(mode_time: string) {
    switch (mode_time) {
      case "1":
        return "1시간";
      case "2":
        return "2시간";
      case "sequence":
        return "연속";
      case "manual":
        return "수동";
    }
  }

  function handleOpenModal(e: any) {
    e.preventDefault();
    modal.handleOpen(e.target.name);
    modal.setTargetDevice(device.id);
  }

  const renderData = (key: string, subfix?: string) => {
    subfix = subfix ? subfix : "";
    return device.device_data[0]
      ? `${device.device_data[0][key]}${subfix}`
      : "-";
  };

  return (
    <Grid>
      <GridItem>
        <label>바이오에어로졸</label>
        <p>{renderData("bio_air_roll")}</p>
      </GridItem>
      <GridItem>
        <label>공기질</label>
        <p>{renderData("air_quailty")}</p>
      </GridItem>
      <GridItem>
        <label>미세먼지</label>
        <p>{renderData("find_dust", "PM")}</p>
      </GridItem>
      <GridItem>
        <label>식중독지수</label>
        <p>{renderData("food_poisoning")}</p>
      </GridItem>
      <GridItem>
        <label>온도</label>
        <p>{renderData("temperature", "°C")}</p>
      </GridItem>
      <GridItem>
        <label>습도</label>
        <p>{renderData("humedity", "%")}</p>
      </GridItem>
      <GridItem>
        <label>전원</label>
        <Button
          name="controlPower"
          onClick={handleOpenModal}
          red={device.power ? "false" : "true"}
        >
          {device.power ? "켜짐" : "꺼짐"}
        </Button>
      </GridItem>
      <GridItem>
        <label>모드</label>
        <Button
          name="controlMode"
          onClick={handleOpenModal}
          red={device.power ? "false" : "true"}
        >
          {formatMode(device.mode)}
        </Button>
      </GridItem>
      <GridItem>
        <label>시간</label>
        <Button
          name="controlTime"
          onClick={handleOpenModal}
          red={device.power ? "false" : "true"}
        >
          {formatModeTime(device.mode_time)}
        </Button>
      </GridItem>
    </Grid>
  );
};

export default DeviceCardGrid;
