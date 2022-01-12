import { toJS } from "mobx";
import { useObserver } from "mobx-react";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PageTemplate } from "../components/base";
import { Division } from "../components/common";
import {
  DeviceChart,
  DeviceIndex,
  DeviceInfo,
  DeviceStatus,
} from "../components/device";
import { MainControlBar } from "../components/main";
import useStore from "../stores";
import { IDevice } from "../stores/device";

const Container = styled.div`
  width: 100%;
  padding: 20px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 20px;
    box-shadow: 0px 5px 10px 2px rgba(0, 124, 186, 0.2);
    border-radius: 20px;
  }
`;

const Left = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 350px;
  }
`;

const Right = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    min-width: calc(100% - 350px - 20px);
    justify-content: flex-end;
  }
`;

const DeviceContainer = () => {
  const { device } = useStore();
  const { device_id } = useParams();

  return useObserver(() => {
    const targetDevice: any = toJS(device.devices).filter(
      (device: IDevice) => device.id === device_id
    )[0];

    return targetDevice ? (
      <PageTemplate>
        <MainControlBar />
        <Container>
          <Box>
            <Left>
              <DeviceInfo
                title={targetDevice.title}
                name={targetDevice.name}
                type={targetDevice.device_type}
              />
              <DeviceIndex data={targetDevice.device_data[0]} />
              <Division />
              <DeviceStatus data={targetDevice} />
            </Left>
            <Right>
              <DeviceChart chartData={targetDevice.device_data} />
            </Right>
          </Box>
        </Container>
      </PageTemplate>
    ) : (
      <div>Loading...</div>
    );
  });
};

export default DeviceContainer;
