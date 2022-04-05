import { useState } from 'react';
import { Radio, Space } from 'antd';
import Chart from './chart.component';
import ColumnChart from './columnChart.component.js';
import PieChart from './pieChart.component';

const ChartWrapper = ({ doneTodos }) => {
  const [chart, setChart] = useState('stacked');

  const options = [
    { label: 'Stacked Bar', value: 'stacked' },
    { label: 'Column Chart', value: 'column' },
    { label: 'Pi Chart', value: 'pi' },
  ];

  const onChange = (e) => {
    console.log('Chart =', e.target.value);
    setChart(e.target.value);
  };

  return (
    <>
      {chart === 'pi' ? (
        <PieChart doneTodos={doneTodos} />
      ) : chart === 'column' ? (
        <ColumnChart doneTodos={doneTodos} />
      ) : (
        <Chart doneTodos={doneTodos} />
      )}

      <Space
        direction="horizontal"
        style={{ width: '100%', justifyContent: 'center' }}
      >
        <Radio.Group
          options={options}
          onChange={onChange}
          value={chart}
          optionType="button"
          buttonStyle="solid"
          size="large"
        />
      </Space>
    </>
  );
};

export default ChartWrapper;
