import React from "react";
import { InputTemplate } from ".";

interface TextAreaInputProps {
  name?: string;
  label: string;
  onChange?: any;
}

const TextArea = ({ label, name, onChange }: TextAreaInputProps) => {
  return (
    <InputTemplate label={label}>
      <textarea
        style={{
          flex: 1,
          border: "1px solid #b1cad6",
          resize: "none",
          borderRadius: 10,
          padding: 15,
        }}
        rows={5}
        name={name}
        onChange={onChange}
      />
    </InputTemplate>
  );
};

export default TextArea;
