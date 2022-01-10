import React from 'react';
import styled from 'styled-components';
import { InputTemplate } from '.';

interface PhotoInputProps {
  label: string;
}

const PhotoBox = styled.button`
  width: 120px;
  height: 120px;
  border-radius: 10px;
  background: #e5f2f8;
  border: 1px solid #b1cad6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PhotoInput = ({ label }: PhotoInputProps) => {
  return (
    <InputTemplate label={label}>
      <PhotoBox>Icon</PhotoBox>
    </InputTemplate>
  );
};

export default PhotoInput;
