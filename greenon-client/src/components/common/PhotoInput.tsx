import React from "react";
import styled from "styled-components";
import { InputTemplate } from ".";
import { ReactComponent as CameraIcon } from "../../static/icons/icon-camera.svg";

interface PhotoInputProps {
  label: string;
  name?: string;
  onChange: any;
}

const PhotoBox = styled.label`
  width: 120px;
  height: 120px;
  border-radius: 10px;
  background: rgb(229, 242, 248);
  border: 1px solid rgb(177, 202, 214);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const PhotoInput = ({ label, name, onChange }: PhotoInputProps) => {
  return (
    <InputTemplate label={label}>
      <input
        id="image-input"
        type="file"
        accept="image/jpg, image/png, image/jpeg"
        name={name}
        onChange={onChange}
        style={{ display: "none" }}
      />
      <PhotoBox htmlFor="image-input">
        <CameraIcon />
      </PhotoBox>
    </InputTemplate>
  );
};

export default PhotoInput;
