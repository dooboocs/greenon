import React from "react";
import styled from "styled-components";
import { ManageCard } from ".";
import { IDevice } from "../../stores/device";

const ManageGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(335px, 1fr));
  grid-gap: 20px;

  @media (min-width: 768px) {
  }
`;

const ManageGrid = ({ data }: { data: IDevice[] }) => {
  return (
    <ManageGridBox>
      {data &&
        data.map((dat: any, index: any) => (
          <ManageCard data={dat} key={index} />
        ))}
    </ManageGridBox>
  );
};

export default ManageGrid;
