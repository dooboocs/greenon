import React, { Component } from "react";
import { AuthPageTemplate, AuthDynamicModal } from "../../components/auth";
import {
  Division,
  PageSwitch,
  SubmitButton,
  TelInput,
  TextInput,
} from "../../components/common";

export class FindPassword extends Component {
  render() {
    return (
      <AuthPageTemplate>
        <AuthDynamicModal headerTitle="이메일·비밀번호 찾기">
          <PageSwitch />
          <label>이메일</label>
          <TextInput type="email" />
          <TelInput />
          <Division />
          <label>새 비밀번호 입력</label>
          <TextInput type="password" />
          <label>새 비밀번호 확인</label>
          <TextInput type="password" />
          <SubmitButton>확인</SubmitButton>
        </AuthDynamicModal>
      </AuthPageTemplate>
    );
  }
}

export default FindPassword;
