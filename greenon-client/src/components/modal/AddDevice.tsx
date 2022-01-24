import React from "react";
import { TextInput, Button as BaseButton } from "../common";

const AddDevice = () => {
  const [error, setError] = React.useState(false);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      {error && (
        <>
          <p style={{ fontSize: 16, textAlign: "center" }}>
            Wifi의 접속을 통해 제품이
            <br />
            등록되어야 합니다.
            <br />
            아래의 설명자료를 확인하시고
            <br />
            다시 한번 진행해주시기 바랍니다
          </p>
          <BaseButton>WIFI 연동 메뉴얼</BaseButton>
        </>
      )}
      <p style={{ fontSize: 16, textAlign: "center" }}>
        신규제품을 등록하기 위해서는
        <br />
        WIFI에 제품을 연동한 후<br />
        진행해주셔야 합니다
      </p>
      <label>제품 번호</label>
      <TextInput type="text" />
      <BaseButton onClick={() => setError(true)}>확인</BaseButton>
    </div>
  );
};

export default AddDevice;
