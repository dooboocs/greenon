import React from "react";
import styled from "styled-components";
import { InputTemplate } from ".";

interface TextInputProps {
  type: string;
  label: string;
  background?: string;
  right?: React.ReactNode;
  onChange?: (e: any) => void;
  value?: any;
}

const InputBox = styled.div<{ background?: string }>`
  border-radius: 6px;
  border: ${({ background }) => (background ? "none" : "1px solid #b1cad6")};
  background: ${({ background }) => (background ? background : "#fff")};
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: none;
  padding: 15px;
  height: 100%;
  width: 100%;
  font-size: 16px;

  &:focus-visible {
    outline: none;
  }
`;

const TextInput: React.FC<TextInputProps> = ({
  type,
  label,
  background,
  right,
  onChange,
  value,
}) => {
  return (
    <InputTemplate label={label}>
      <InputBox background={background}>
        <Input type={type} onChange={onChange} value={value} />
        {right}
      </InputBox>
    </InputTemplate>
  );
};

export default TextInput;
