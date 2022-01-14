import React from "react";
import styled from "styled-components";
import { PageTemplate } from "../components/base";
import { Article } from "../components/notice";
import { apis } from "../lib/axios";

const ArticleList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Notice = () => {
  const [notices, setNotices] = React.useState([]);

  React.useEffect(() => {
    apis.getNotices().then((res) => {
      setNotices(res.data);
    });
  }, []);

  return (
    <PageTemplate headerTitle="공지사항">
      <ArticleList>
        {notices.map((notice) => (
          <Article key={notice.id} data={notice} />
        ))}
      </ArticleList>
    </PageTemplate>
  );
};

export default Notice;
