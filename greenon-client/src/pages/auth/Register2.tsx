import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthPageTemplate, AuthDynamicModal } from "../../components/auth";
import { TextInput, SubmitButton, TelInput } from "../../components/common";
import { apis } from "../../lib/axios";

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  label {
    font-size: 14px;
    margin-bottom: -10px;
  }

  small {
    font-size: 12px;
  }

  figure {
    font-size: 14px;
    color: red;
    margin: 0;
  }
`;

const Register2 = () => {
  const [inputs, setInputs] = useState<any>({
    phone: "",
    email: "",
    password: "",
    password2: "",
  });
  const [phoneCert, setPhoneCert] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({
    email: null,
    password: null,
  });
  let navigate = useNavigate();

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    apis
      .register(inputs.email, inputs.password)
      .then(async (res) => {
        if (res.status === 200) {
          console.log("success");
          await localStorage.setItem("token", res.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response.data.error === "Already Exist") {
          setErrors((prev) => ({
            ...prev,
            email: "이미 해당 이메일로 가입된 계정이 있습니다.",
          }));
        }
        console.error(err);
      });
  };

  return (
    <AuthPageTemplate>
      <AuthDynamicModal headerTitle="회원가입">
        <TelInput />
        <RegisterForm>
          <label>이메일</label>
          <TextInput
            name="email"
            type="email"
            value={inputs.email}
            onChange={onChange}
          />
          <label>새 비밀번호 입력</label>
          <TextInput
            name="password"
            type="password"
            value={inputs.password}
            onChange={onChange}
          />
          <label>새 비밀번호 확인</label>
          <TextInput name="password2" type="password" onChange={onChange} />
          <SubmitButton
            disabled={
              !(
                Object.values(inputs).every((val) => val) &&
                inputs.password === inputs.password2
              )
            }
            onClick={onSubmit}
          >
            다음
          </SubmitButton>
        </RegisterForm>
      </AuthDynamicModal>
    </AuthPageTemplate>
  );
};

export default Register2;
