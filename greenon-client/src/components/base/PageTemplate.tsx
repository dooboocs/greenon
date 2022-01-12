import React from "react";
import styled from "styled-components";
import {
  BottomTab,
  ContentHeader,
  Footer,
  Header,
  MobileHeader,
  Sider,
} from ".";
import ResponsiveModal from "../modal/ResponsiveModal";

interface PageTemplateProps {
  headerTitle?: string;
}

const PageTemplateBox = styled.div`
  width: 100%;
  min-width: 375px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #007cba;
  overflow: hidden;
`;

const MainBox = styled.div`
  width: 100%;
  display: flex;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: #fff;
  border-bottom: 1px solid #e5f2f8;
  flex-grow: 1;
  overflow: hidden;
`;

const ContentBox = styled.div`
  flex-grow: 1;
  position: relative;
`;

const PageTemplate: React.FC<PageTemplateProps> = ({
  headerTitle,
  children,
}) => {
  const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);

  function getWindowSize() {
    setInnerWidth(window.innerWidth);
  }

  React.useEffect(() => {
    window.addEventListener("resize", getWindowSize);
    return () => window.removeEventListener("resize", getWindowSize);
  }, []);

  return (
    <PageTemplateBox>
      {innerWidth < 1024 ? <MobileHeader /> : <Header />}
      <MainBox>
        <ContentBox>
          {headerTitle ? <ContentHeader title={headerTitle} /> : false}
          {children}
        </ContentBox>
        <Sider />
      </MainBox>
      <Footer />
      <BottomTab />
      <ResponsiveModal />
    </PageTemplateBox>
  );
};

export default PageTemplate;
