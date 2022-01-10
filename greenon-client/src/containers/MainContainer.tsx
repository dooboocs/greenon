import { useObserver } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { PageTemplate } from "../components/base";
import { Pagenation } from "../components/common";
import { MainControlBar, MainGrid } from "../components/main";
import useStore from "../stores";

const Box = styled.div`
  padding: 20px;
  padding-bottom: 90px;
`;

const MainContainer = () => {
  const { device } = useStore();

  return useObserver(() => {
    return device.devices ? (
      <PageTemplate>
        <MainControlBar />
        <Box>
          <MainGrid data={device.pageData} />
        </Box>
        <Pagenation />
      </PageTemplate>
    ) : (
      <div>Loading...</div>
    );
  });
};

export default MainContainer;
