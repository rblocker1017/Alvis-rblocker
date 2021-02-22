import React, { useEffect } from 'react'
import { Chart } from "react-google-charts";
import { forceCenter } from 'd3';
export default function DiskGraph(props) {

  useEffect(() => {


  }, props.data);

  return (
    <div>

      <Chart
        width={'800px'}
        height={'600px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={props.data}
        options={{
          hAxis: {
            title: 'Sequence',
            maxValue: props.size,
            minValue: 0,
          },
          vAxis: {
            title: 'Request',
          },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  )
}
