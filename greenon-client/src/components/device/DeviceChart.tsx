import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

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
  background: ${({ active }) => (active ? '#007cba' : '#e5f2f8')};
  color: ${({ active }) => (active ? '#fff' : '#007cba')};
`;

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const DeviceChart = () => {
  const [active, setActive] = useState(0);

  const data: any = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: '#007ba8',
        backgroundColor: '#fff',
      },
    ],
  };

  return (
    <React.Fragment>
      <h5>누적데이터</h5>
      <ButtonGroup>
        <Button active={active === 0} onClick={() => setActive(0)}>
          바이오에어로졸지수
        </Button>
        <Button active={active === 1} onClick={() => setActive(1)}>
          공기질지수
        </Button>
        <Button active={active === 2} onClick={() => setActive(2)}>
          식중독지수
        </Button>
        <Button active={active === 3} onClick={() => setActive(3)}>
          미세먼지지수
        </Button>
      </ButtonGroup>
      <Line data={data} />
    </React.Fragment>
  );
};

export default DeviceChart;
