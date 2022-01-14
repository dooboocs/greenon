import React from "react";
import { Button } from "@mui/material";
import { ColBox } from "./ResponsiveModal";

const ControlMove = () => {
  return (
    <>
      <ColBox>
        공간 제균
        <div className="option-list">
          <Button variant="text">1시간</Button>
          <Button variant="text">2시간</Button>
          <Button variant="text">연속</Button>
          <Button variant="text">수동</Button>
        </div>
      </ColBox>
      <ColBox>
        해충방제
        <div className="option-list">
          <Button>1시간</Button>
          <Button>2시간</Button>
          <Button>연속</Button>
          <Button>수동</Button>
        </div>
      </ColBox>
    </>
  );
};

export default ControlMove;
