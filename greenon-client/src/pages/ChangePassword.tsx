import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ContentHeader } from "../components/base";
import { Button, Division, TextInput } from "../components/common";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 40px;

  @media (min-width: 768px) {
    width: 335px;
    margin: 0 auto;
  }
`;

const ChangePassword = () => {
  const navigate = useNavigate();
  return (
    <>
      <ContentHeader title="비밀번호 변경" />
      <Box>
        <label>기존 비밀번호 입력</label>
        <TextInput type="password" />
        <Division />
        <label>새 비밀번호 입력</label>
        <TextInput type="password" />
        <label>기새 비밀번호 확인</label>
        <TextInput type="password" />

        <Button onClick={() => navigate("/")}>확인</Button>
      </Box>
    </>
  );
};

export default ChangePassword;
