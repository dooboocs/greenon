import React, { useState } from "react";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { IDeviceData } from "../../stores/device";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const ButtonGroup = styled.div`
  display: flex;
  gap: 5px;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    width: 100%;
    gap: 10px;
  }
`;

const Button = styled.button<{ active?: boolean }>`
  flex-shrink: 0;
  cursor: pointer;
  border: none;
  padding: 10px;
  border-radius: 5px;
  background: ${({ active }) => (active ? "#007cba" : "#e5f2f8")};
  color: ${({ active }) => (active ? "#fff" : "#007cba")};
`;

const DeviceChart = ({ chartData }: { chartData: any }) => {
  const [active, setActive] = useState("bio_air_roll");

  const handleClick = (e: any) => {
    setActive(e.target.name);
  };

  let sortedData = chartData.sort(
    (a: IDeviceData, b: IDeviceData) =>
      moment(a.created_at) > moment(b.created_at)
  );

  const data: any = {
    labels: sortedData.map((data: IDeviceData) =>
      moment(data.created_at).format("HH:mm")
    ),
    datasets: [
      {
        data: sortedData.map((data: any) => data[active]),
        borderColor: "#007ba8",
        backgroundColor: "#fff",
      },
    ],
    fill: false,
  };

  return (
    <React.Fragment>
      <h5>누적데이터</h5>
      <ButtonGroup>
        <Button
          name="bio_air_roll"
          active={active === "bio_air_roll"}
          onClick={handleClick}
        >
          바이오에어로졸지수
        </Button>
        <Button
          name="air_quailty"
          active={active === "air_quailty"}
          onClick={handleClick}
        >
          공기질지수
        </Button>
        <Button
          name="food_poisoning"
          active={active === "food_poisoning"}
          onClick={handleClick}
        >
          식중독지수
        </Button>
        <Button
          name="find_dust"
          active={active === "find_dust"}
          onClick={handleClick}
        >
          미세먼지지수
        </Button>
      </ButtonGroup>
      <Line data={data} />
    </React.Fragment>
  );
};

export default DeviceChart;
