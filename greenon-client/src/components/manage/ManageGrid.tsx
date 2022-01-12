import React from "react";
import styled from "styled-components";
import { ManageCard } from ".";
import { IDevice } from "../../stores/device";

const ManageGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(335px, 0.25fr));
  grid-gap: 20px;
`;

const ManageGrid = ({ data }: { data: IDevice[] }) => {
  return (
    <ManageGridBox>
      {data &&
        data.map((device: IDevice) => (
          <ManageCard data={device} key={device.id} />
        ))}
    </ManageGridBox>
  );
};

export default ManageGrid;
