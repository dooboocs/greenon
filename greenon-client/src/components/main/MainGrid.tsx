import React from "react";
import styled from "styled-components";
import { IDevice } from "../../stores/device";
import { DeviceCard } from "../device";

const Grid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(335px, 1fr));
`;

const MainGrid = ({ data }: { data: IDevice[] }) => {
  return (
    <Grid>
      {data &&
        data.map((dat: IDevice) => <DeviceCard device={dat} key={dat.id} />)}
    </Grid>
  );
};

export default MainGrid;
