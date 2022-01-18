import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ContentHeader } from "../components/base";
import {
  CheckInput,
  TextInput,
  PhotoInput,
  TextArea,
} from "../components/common";
import { apis } from "../lib/axios";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  @media (min-width: 768px) {
    width: 335px;
    margin: 0 auto;
    padding: 0;
    padding-top: 40px;
    padding-bottom: 40px;
  }
`;

const Request = () => {
  const [inputs, setInputs] = React.useState<any>({
    username: "",
    phone: "",
    email: "",
    title: "",
    content: "",
  });
  const [submit, setSubmit] = React.useState(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    let formData = new FormData();
    Object.keys(inputs).forEach((key) => {
      formData.append(key, inputs[key]);
    });
    apis.createRequest(formData).then((res) => {
      navigate(-1);
    });
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImage = (e: any) => {
    const img = e.target.files[0];
    setInputs((prev) => ({ ...prev, image: img }));
  };

  React.useEffect(() => {
    if (Object.values(inputs).every((i) => i !== "")) {
      setSubmit(true);
    }
  }, [inputs]);

  return (
    <>
      <ContentHeader title="문의하기" />
      <Box>
        <TextInput
          name="username"
          type="text"
          label="성함"
          onChange={onChange}
        />
        <TextInput
          name="phone"
          type="text"
          label="연락처"
          onChange={onChange}
        />
        <TextInput
          name="email"
          type="email"
          label="메일주소"
          onChange={onChange}
        />
        <TextInput name="title" type="text" label="제목" onChange={onChange} />
        <TextArea name="content" label="문의 내용" onChange={onChange} />
        <PhotoInput label="문의 내용" name="image" onChange={uploadImage} />
        <CheckInput title="개인정보 수집이용 동의" id="check1" />
        <Button
          variant="contained"
          size="large"
          style={{
            background: submit ? "#007cba" : "rgba(0, 0, 0, 0.12)",
            fontSize: 16,
            boxShadow: "none",
          }}
          disabled={!submit}
          onClick={onSubmit}
        >
          제출
        </Button>
      </Box>
    </>
  );
};

export default Request;
