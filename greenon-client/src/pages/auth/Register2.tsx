import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthPageTemplate, AuthDynamicModal } from "../../components/auth";
import { TextInput, SubmitButton } from "../../components/common";
import { apis } from "../../lib/axios";
import { Input, Button } from "../../components/common";
import Countdown from "react-countdown";

const RegisterForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
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

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const RightButton = styled(Button)`
  flex: 1;
  background: #e5f2f8;
  font-size: 14px;
  color: #007cba;
`;

const Register2 = () => {
  const [inputs, setInputs] = useState<any>({
    phone: "",
    verifyCode: "",
    email: "",
    password: "",
    password2: "",
  });
  const [timer, setTimer] = React.useState<string>("stop");
  const [verified, setVerified] = React.useState<boolean>(null);
  const [errors, setErrors] = useState({
    email: null,
  });
  let navigate = useNavigate();

  function onChange(e: any) {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  async function sendCode(e: any) {
    e.preventDefault();
    if (inputs.phone) {
      await apis.sendSMS(inputs.phone).then((res) => {
        if (res.status === 200) {
          setTimer("start");
        }
      });
    }
  }

  async function verify(e: any) {
    e.preventDefault();

    if (inputs.verifyCode) {
      try {
        const res = await apis.authSMS(inputs.phone, inputs.verifyCode);
        setVerified(true);
        setTimer("stop");
      } catch (error) {
        setVerified(false);
        setTimer("stop");
      }
    }
  }

  function onSubmit(e: any) {
    e.preventDefault();
    apis
      .register(inputs.email, inputs.password, inputs.phone)
      .then(async (res) => {
        if (res.status === 200) {
          await localStorage.setItem("token", res.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.error === "Already Exist") {
          setErrors((prev) => ({
            ...prev,
            email: "이미 해당 이메일로 가입된 계정이 있습니다.",
          }));
        }
        console.error(err);
      });
  }

  return (
    <AuthPageTemplate>
      <AuthDynamicModal headerTitle="회원가입">
        <RegisterForm>
          <label>
            휴대폰 인증{" "}
            <small style={{ marginLeft: 10 }}>
              회원가입을 위한 전화번호 인증이 필요합니다.
            </small>
          </label>
          <InputWrapper>
            <Input
              type="tel"
              name="phone"
              value={inputs.phone}
              onChange={onChange}
              style={{ flex: 2 }}
              maxLength={13}
            />
            <RightButton onClick={sendCode}>인증번호 전송</RightButton>
          </InputWrapper>
          <InputWrapper>
            <Input
              type="text"
              name="verifyCode"
              value={inputs.verifyCode}
              onChange={onChange}
              style={{ flex: 2 }}
            />
            <RightButton onClick={verify}>인증</RightButton>
          </InputWrapper>
          {timer === "timeout" ? (
            <figure>인증시간이 만료되었습니다</figure>
          ) : timer === "start" ? (
            <Countdown
              date={Date.now() + 179000}
              renderer={(props) => (
                <figure>
                  {props.minutes}:{props.seconds}
                </figure>
              )}
              onComplete={() => setTimer("timeout")}
            />
          ) : verified === false ? (
            <figure>인증번호가 일치하지 않습니다.</figure>
          ) : null}
          <label>이메일</label>
          <TextInput
            name="email"
            type="email"
            value={inputs.email}
            onChange={onChange}
          />
          {errors.email ? <figure>이미 가입된 계정입니다.</figure> : null}
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
                inputs.password === inputs.password2 &&
                verified
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
