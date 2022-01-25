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

  label {
    font-size: 14px;
  }

  small {
    font-size: 12px;
    color: #8b8b8b;
  }

  figure {
    font-size: 14px;
    margin: 0;
  }
`;

const FormHeader = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
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
  const [inputs, setInputs] = React.useState({
    phone: "",
    verifyCode: "",
  });
  const [timer, setTimer] = React.useState<string>("stop");
  const [verified, setVerified] = React.useState<boolean>(false);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const sendCode = async (e: any) => {
    e.preventDefault();
    if (inputs.phone) {
      await apis.sendSMS(inputs.phone).then((res) => {
        if (res.status === 200) {
          setTimer("start");
        }
      });
    }
  };

  const verify = async (e: any) => {
    e.preventDefault();

    if (inputs.verifyCode) {
      await apis.authSMS(inputs.phone, inputs.verifyCode).then((res) => {
        if (res.status === 200) {
          setVerified(true);
        } else if (res.status === 401) {
          setVerified(false);
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
          value={inputs.verifyCode}
          onChange={onChange}
          style={{ flex: 2 }}
        />
        <RightButton onClick={verify}>인증</RightButton>
      </InputWrapper>
      {timer === "timeout" ? (
        <small>인증시간이 만료되었습니다</small>
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
      ) : null}
    </Form>
  );
};

export default TelInput;
