import React from "react";
import { useObserver } from "mobx-react";
import styled from "styled-components";
import { Pagenation } from "../components/common";
import { MainControlBar, MainGrid } from "../components/main";
import useStore from "../stores";
import Loading from "../components/base/Loading";

const Box = styled.div`
  padding: 20px;
  padding-bottom: 90px;
`;

const MainContainer = () => {
  const { app, device } = useStore();

  return useObserver(() => (
    <>
      <MainControlBar />
      <Box>
        <MainGrid data={device.pageData} />
      </Box>
      <Loading isLoading={app.updateLoading} />
      <Pagenation />
    </>
  ));
};

export default MainContainer;
