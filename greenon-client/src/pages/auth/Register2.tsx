import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthPageTemplate, AuthDynamicModal } from "../../components/auth";
import { TextInput, SubmitButton, TelInput } from "../../components/common";
import { apis } from "../../lib/axios";

const Register2 = () => {
  const [inputs, setInputs] = useState<any>({
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState<any>({
    email: null,
    password: null,
  });
  let navigate = useNavigate();

  const onChangeInput = (e: any) => {
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
        <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <TextInput
            name="email"
            type="email"
            label="이메일"
            onChange={onChangeInput}
            error={errors.email}
          />
          <TextInput
            name="password"
            type="password"
            label="새 비밀번호 입력"
            onChange={onChangeInput}
          />
          <TextInput
            name="password2"
            type="password"
            label="새 비밀번호 확인"
            onChange={onChangeInput}
            error={
              inputs.password !== inputs.password2
                ? "비밀번호가 일치하지 않습니다."
                : null
            }
          />
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
        </form>
      </AuthDynamicModal>
    </AuthPageTemplate>
  );
};

export default Register2;
