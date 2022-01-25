import React from "react";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ContentHeader } from "../components/base";
import { Button, TextInput } from "../components/common";
import useStore from "../stores";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding-top: 40px;
  padding: 20px;

  @media (min-width: 768px) {
    width: 335px;
    margin: 0 auto;
  }
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #d1d1d1;
  margin: 0 auto;
`;

const ProfileEdit = () => {
  const navigate = useNavigate();

  const { user } = useStore();

  return useObserver(() => (
    <>
      <ContentHeader title="회원 정보 수정" />
      <Box>
        <ProfileImage />
        <label>이메일</label>
        <TextInput
          type="email"
          style={{ background: "#f4f4f4" }}
          value={user.email}
        />
        <label>이름</label>
        <TextInput
          type="text"
          style={{ background: "#f4f4f4" }}
          value={user.name}
        />
        <label>연락처</label>
        <div style={{ width: "100%", position: "relative" }}>
          <TextInput
            type="text"
            style={{ background: "#e5f2f8" }}
            value={user.phone}
            disabled={false}
          />
          <input
            type="button"
            value="수정"
            style={{
              fontSize: 14,
              color: "#007cba",
              position: "absolute",
              top: 3,
              right: 3,
              bottom: 3,
              background: "none",
              border: "none",
            }}
          />
        </div>
        <Button
          style={{ background: "#e5f2f8", color: "#007cba" }}
          onClick={() => navigate("/change_password")}
        >
          비밀번호 변경
        </Button>
      </Box>
    </>
  ));
};

export default ProfileEdit;
