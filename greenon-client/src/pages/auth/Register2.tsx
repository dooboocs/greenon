import React, { Component } from 'react';
import { AuthPageTemplate, AuthDynamicModal } from '../../components/auth';
import { TextInput, SubmitButton, TelInput } from '../../components/common';

export class Register2 extends Component {
  render() {
    return (
      <AuthPageTemplate>
        <AuthDynamicModal headerTitle="회원가입">
          <TelInput />
          <TextInput type="email" label="이메일" />
          <TextInput type="email" label="새 비밀번호 입력" />
          <TextInput type="email" label="새 비밀번호 확인" />
          <SubmitButton>다음</SubmitButton>
        </AuthDynamicModal>
      </AuthPageTemplate>
    );
  }
}

export default Register2;
