import React from 'react';
import { InputTemplate } from '.';

interface TextAreaInputProps {
  label: string;
}

const TextArea = ({ label }: TextAreaInputProps) => {
  return (
    <InputTemplate label={label}>
      <textarea
        style={{
          flex: 1,
          border: '1px solid #b1cad6',
          resize: 'none',
          borderRadius: 10,
          padding: 15,
        }}
        rows={5}
      />
    </InputTemplate>
  );
};

export default TextArea;
