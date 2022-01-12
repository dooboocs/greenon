import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthPageTemplate } from "../../components/auth";
import { Button, TextInput } from "../../components/common";
import { apis } from "../../lib/axios";
import Logo from "../../static/images/logo-login.png";

interface InputProps {
  email: string;
  password: string;
}

const ErrorMessage = styled.p<{ show?: boolean }>`
  display: ${({ show }) => (show ? "block" : "none")};
  color: red;
  font-size: 12px;
`;

const Login = () => {
  let [input, setInput] = React.useState<InputProps>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  let navigate = useNavigate();

  async function login(e: any) {
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
      apis
        .login(input.email, input.password)
        .then(async (res) => {
          if (res.status === 200) {
            await localStorage.setItem("token", res.data.token);
            navigate("/");
          }
        })
        .catch((err) => {
          setErrorMessage(err.response.data.error);
        });
    } else {
      setErrorMessage("이메일 또는 비밀번호를 입력해주세요");
    }
  }

  function onChangeInput(e: any) {
    const { type, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [type]: value,
    }));
  }

  return (
    <AuthPageTemplate>
      <Container>
        <img src={Logo} alt="greenon" />
        <Modal>
          <ModalInner>
            <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <TextInput
                type="email"
                label="이메일"
                onChange={onChangeInput}
                value={input.email}
              />
              <TextInput
                type="password"
                label="비밀번호"
                onChange={onChangeInput}
                value={input.password}
              />
              <ErrorMessage show={errorMessage !== ""}>
                {errorMessage}
              </ErrorMessage>
              <Button onClick={login}>로그인</Button>
            </form>
            <HorizontalBox>
              <Link to="/find_email">이메일·비밀번호 찾기</Link>
              <Link to="/register">회원가입</Link>
            </HorizontalBox>
            <Button style={{ background: "#ffe812", color: "#000" }}>
              카카오톡으로 시작하기
            </Button>
            <Button style={{ background: "#000", color: "#fff" }}>
              애플로 시작하기
            </Button>
          </ModalInner>
        </Modal>
      </Container>
    </AuthPageTemplate>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 100px;
  padding: 0px 20px 20px 20px;

  @media (min-width: 540px) {
    padding: 0;
  }
`;

const Modal = styled.div`
  width: 100%;
  max-width: 500px;
  background: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-radius: 20px;
  padding: 20px;

  @media (min-width: 540px) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding-top: 60px;
    padding-bottom: 100px;
  }
`;

const ModalInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 540px) {
    width: 295px;
    margin: 0 auto;
  }
`;

const HorizontalBox = styled.div`
  display: flex;
  justify-content: space-between;
  color: #007cba;
`;

export default Login;
