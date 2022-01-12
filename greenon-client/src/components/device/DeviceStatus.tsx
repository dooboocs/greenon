import React from "react";
import styled from "styled-components";
import { DeviceStatusOption } from ".";
import { IDevice } from "../../stores/device";

const Box = styled.div<{ align: "row" | "column" }>`
  display: flex;
  flex-direction: ${(props) => props.align};
  align-items: ${(props) => (props.align === "row" ? "center" : "flex-start")};
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #f4f4f4;

  label {
    flex: ${(props) => (props.align === "row" ? 1.5 : 1)};
    font-size: 16px;
    color: #000;
    margin-bottom: ${(props) => (props.align === "row" ? 0 : "10px")};
  }

  .option-list {
    width: 100%;
    flex: ${(props) => (props.align === "row" ? 2.5 : 1)};
    display: flex;
  }
`;

const DeviceStatus = ({ data }: { data: IDevice }) => {
  return (
    <div>
      <Box align="row">
        <label>전원</label>
        <div className="option-list">
          <DeviceStatusOption
            data={data}
            option_key="power"
            value={true}
            text="ON"
          />
          <DeviceStatusOption
            data={data}
            option_key="power"
            value={false}
            text="OFF"
          />
        </div>
      </Box>
      <Box align="row">
        <label>모드 선택</label>
        <div className="option-list">
          <DeviceStatusOption
            data={data}
            option_key="mode"
            value={1}
            text="제균"
          />
          <DeviceStatusOption
            data={data}
            option_key="mode"
            value={2}
            text="해충"
          />
        </div>
      </Box>
      <Box align="row">
        <label>모드 시간 선택</label>
        <div className="option-list">
          <DeviceStatusOption
            data={data}
            option_key="mode_time"
            value="sequence"
            text="연속"
          />
          <DeviceStatusOption
            data={data}
            option_key="mode_time"
            value="1"
            text="1"
          />
          <DeviceStatusOption
            data={data}
            option_key="mode_time"
            value="2"
            text="2"
          />
        </div>
      </Box>
      <Box align="row">
        <label>동작 제어</label>
        <div className="option-list">
          <DeviceStatusOption
            data={data}
            option_key="motion_control"
            value={true}
            text="Start"
          />
          <DeviceStatusOption
            data={data}
            option_key="motion_control"
            value={false}
            text="Stop"
          />
        </div>
      </Box>
      <Box align="column">
        <label>공간 제균</label>
        <div className="option-list">
          <DeviceStatusOption
            data={data}
            option_key="space_sterilization"
            value="1h"
            text="1시간"
          />
          <DeviceStatusOption
            data={data}
            option_key="space_sterilization"
            value="2h"
            text="2시간"
          />
          <DeviceStatusOption
            data={data}
            option_key="space_sterilization"
            value="seqeunce"
            text="연속"
          />
          <DeviceStatusOption
            data={data}
            option_key="space_sterilization"
            value="manual"
            text="수동"
          />
        </div>
      </Box>
      <Box align="column">
        <label>해충방제</label>
        <div className="option-list">
          <DeviceStatusOption
            data={data}
            option_key="pest_control"
            value="1h"
            text="1시간"
          />
          <DeviceStatusOption
            data={data}
            option_key="pest_control"
            value="2h"
            text="2시간"
          />
          <DeviceStatusOption
            data={data}
            option_key="pest_control"
            value="seqeunce"
            text="연속"
          />
          <DeviceStatusOption
            data={data}
            option_key="pest_control"
            value="manual"
            text="수동"
          />
        </div>
      </Box>
    </div>
  );
};

export default DeviceStatus;
