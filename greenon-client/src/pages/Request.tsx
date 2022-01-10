import React from 'react';
import styled from 'styled-components';
import { PageTemplate } from '../components/base';
import {
  CheckInput,
  TextInput,
  PhotoInput,
  TextArea,
  Button,
} from '../components/common';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  @media (min-width: 768px) {
    width: 335px;
    margin: 0 auto;
    padding: 0;
    padding-top: 40px;
    padding-bottom: 40px;
  }
`;

const Request = () => {
  return (
    <PageTemplate headerTitle="문의하기">
      <Box>
        <TextInput type="text" label="성함" />
        <TextInput type="text" label="연락처" />
        <TextInput type="email" label="메일주소" />
        <TextInput type="text" label="제목" />
        <TextArea label="문의 내용" />
        <PhotoInput label="문의 내용" />
        <CheckInput title="개인정보 수집이용 동의" id="check1" />
        <Button title="다음" />
      </Box>
    </PageTemplate>
  );
};

export default Request;
