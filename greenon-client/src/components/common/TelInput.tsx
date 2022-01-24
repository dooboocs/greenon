import React from "react";
import Countdown from "react-countdown";
import styled from "styled-components";
import { Input, Button } from ".";
import { apis } from "../../lib/axios";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormHeader = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;

  label {
    font-size: 14px;
  }

  small {
    font-size: 12px;
    color: #8b8b8b;
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

const TelInput = () => {
  const [phone, setPhone] = React.useState("");
  const [verifyCode, setVerifyCode] = React.useState("");
  const [timer, setTimer] = React.useState<string>("stop");
  const [success, setSuccess] = React.useState(false);

  const onClick = async (e: any) => {
    e.preventDefault();
    if (phone) {
      let regPhone = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g;
      if (!regPhone.test(phone)) {
        alert("올바르지 않은 휴대폰 번호입니다");
        setPhone("");
      }
      // await apis.sendSMS(phone).then((res) => {
      //   if (res.status === 200) {
      //     setTimer(true);
      //   }
      // });
      setTimer("start");
    }
  };

  const onAuth = async (e: any) => {
    e.preventDefault();

    if (verifyCode) {
      await apis.authSMS(phone, verifyCode).then((res) => {
        if (res.status === 200) {
          setSuccess(true);
        } else if (res.status === 401) {
          setSuccess(false);
        }
      });
    }
  };

  return (
    <Form id="tel-form">
      <FormHeader>
        <label>휴대폰 인증</label>
        <small>회원가입을 위한 전화번호 인증이 필요합니다.</small>
      </FormHeader>
      <InputWrapper>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ flex: 2 }}
          maxLength={13}
        />
        <RightButton onClick={onClick}>인증번호 전송</RightButton>
      </InputWrapper>
      <InputWrapper>
        <Input
          type="text"
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.target.value)}
          style={{ flex: 2 }}
        />
        <RightButton onClick={onAuth}>인증</RightButton>
      </InputWrapper>
      {timer === "timeout" ? (
        <small>인증시간이 만료되었습니다</small>
      ) : timer === "start" ? (
        <Countdown
          date={Date.now() + 179000}
          renderer={(props) => (
            <small>
              {props.minutes}:{props.seconds}
            </small>
          )}
          onComplete={() => setTimer("timeout")}
        />
      ) : null}
    </Form>
  );
};

export default TelInput;
