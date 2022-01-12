import React from 'react';
import styled from 'styled-components';
import { PageTemplate } from '../components/base';
import { Article } from '../components/notice';

const ArticleList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Notice = () => {
  return (
    <PageTemplate headerTitle="공지사항">
      <ArticleList>
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
      </ArticleList>
    </PageTemplate>
  );
};

export default Notice;
