import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PageTemplate } from '../components/base';
import { Button, TextInput } from '../components/common';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-top: 40px;

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
`;

const ProfileEdit = () => {
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  return user ? (
    <PageTemplate headerTitle="회원 정보 수정">
      <Box>
        <ProfileImage />
        <TextInput
          type="email"
          label="이메일"
          background="#f4f4f4"
          value={JSON.parse(user).email}
        />
        <TextInput
          type="text"
          label="이름"
          background="#f4f4f4"
          value={JSON.parse(user).name}
        />
        <TextInput
          type="text"
          label="연락처"
          background="#e5f2f8"
          value={JSON.parse(user).phone}
          right={<span style={{ fontSize: 14, color: '#007cba' }}>수정</span>}
        />
        <Button
          style={{ background: '#e5f2f8', color: '#007cba' }}
          onClick={() => navigate('/change_password')}
        >
          비밀번호 변경
        </Button>
      </Box>
    </PageTemplate>
  ) : (
    <p>loading...</p>
  );
};

export default ProfileEdit;
