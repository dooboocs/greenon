import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ArticleBox = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px;
  gap: 20px;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 20px;
`;

const BottomBox = styled.div`
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: #8b8b8b;
`;

const Thumbnail = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background: #e5f2f8;
  flex-shrink: 0;
`;

const Article = () => {
  return (
    <ArticleBox to="/notice/28">
      <LeftBox>
        <p>
          제목이 들어갑니다 제목이 들어갑니다 제목이 들어갑니다 피시버전은 한
          줄로 길게 들어갑니다
        </p>
        <BottomBox>
          <label>관리자</label>
          <label>2021.12.12</label>
          <label>조회 12</label>
        </BottomBox>
      </LeftBox>
      <Thumbnail />
    </ArticleBox>
  );
};

export default Article;
