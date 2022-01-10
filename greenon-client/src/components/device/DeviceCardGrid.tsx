import React from "react";
import styled from "styled-components";
import { IDevice } from "../../stores/device";
import useStore from "../../stores";

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

const Button = styled.button`
  background-color: #e5f2f8;
  color: #007cba;
  width: 100%;
  text-align: center;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 10px;
  z-index: 999;
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

  function handleOpenModal(e: any) {
    e.preventDefault();
    modal.handleOpen(e.target.name);
    modal.setTargetDevice(device.id);
  }

  const {
    bio_air_roll,
    air_quailty,
    find_dust,
    food_poisoning,
    temperature,
    humedity,
  } = device.device_data[0];

  return (
    <Grid>
      <GridItem>
        <label>바이오에어로졸</label>
        <p>{bio_air_roll}</p>
      </GridItem>
      <GridItem>
        <label>공기질</label>
        <p>{air_quailty}</p>
      </GridItem>
      <GridItem>
        <label>미세먼지</label>
        <p>{find_dust}PM</p>
      </GridItem>
      <GridItem>
        <label>식중독지수</label>
        <p>{food_poisoning}</p>
      </GridItem>
      <GridItem>
        <label>온도</label>
        <p>{temperature}°C</p>
      </GridItem>
      <GridItem>
        <label>습도</label>
        <p>{humedity * 100}%</p>
      </GridItem>
      <GridItem>
        <label>전원</label>
        <Button
          name="controlPower"
          onClick={handleOpenModal}
          style={{
            background: !device.power ? "#ffe3e3" : "#e5f2f8",
            color: !device.power ? "#ff6b6b" : "#007cba",
          }}
        >
          {device.power ? "켜짐" : "꺼짐"}
        </Button>
      </GridItem>
      <GridItem>
        <label>모드</label>
        <Button name="controlMode" onClick={handleOpenModal}>
          {formatMode(device.mode)}
        </Button>
      </GridItem>
      <GridItem>
        <label>시간</label>
        <Button name="controlTime" onClick={handleOpenModal}>
          {device.mode_time === "seqeunce" ? "연속" : device.mode_time}
        </Button>
      </GridItem>
    </Grid>
  );
};

export default DeviceCardGrid;
