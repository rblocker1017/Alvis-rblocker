import React, { useEffect } from 'react'
import { Chart } from "react-google-charts";
import { forceCenter } from 'd3';
export default function DiskGraph(props) {

  useEffect(() => {


  }, props.data);

  return (
    <div style={{height: "450px", width: "1370px", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Chart
<<<<<<< HEAD:src/componenets/layout/AlgorithmDisplay/DiskScheduling/DiskGraph.js
        height={'450px'}
        width={'800px'}
=======
        width={'800px'}
        height={'600px'}
>>>>>>> ffe38033454a704093dbbe0eaff2709294bdd3ea:src/pages/DiskGraph.js
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
