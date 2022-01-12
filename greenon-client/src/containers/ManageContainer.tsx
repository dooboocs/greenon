import React from "react";
import styled from "styled-components";
import { PageTemplate } from "../components/base";
import { ManageGrid } from "../components/manage";
import { AddIcon } from "../components/icons";

import { Pagenation } from "../components/common";
import useStore from "../stores";
import { useObserver } from "mobx-react";

const Box = styled.div`
  padding: 20px;
  padding-bottom: 90px;
`;

const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 1024px) {
    background: #fff;
    box-shadow: 0px 5px 10px 2px rgba(0, 124, 186, 0.2);
    border-radius: 20px;
    padding: 20px;
  }
`;

const AddButton = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e5f2f8;
  color: #007ba8;
  border: none;
  border-radius: 10px;
  position: relative;

  svg {
    position: absolute;
    left: 10px;
  }
`;

const ManageContainer = () => {
  const { device, modal } = useStore();

  return useObserver(() => (
    <PageTemplate>
      <Box>
        <GridWrapper>
          <AddButton onClick={() => modal.handleOpen("addDevice")}>
            <AddIcon />
            <p>신규 제품 추가</p>
            <div />
          </AddButton>
          <ManageGrid data={device.pageData} />
        </GridWrapper>
      </Box>
      <Pagenation />
    </PageTemplate>
  ));
};

export default ManageContainer;
