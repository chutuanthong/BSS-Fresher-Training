import React from "react";
import { Chart } from "react-google-charts";
import PropTypes from 'prop-types'

// ChartDonut.propTypes={
//   devices:PropTypes.object.isRequired,
// }

// ChartDonut.defaultProps={
//   devices:[]
// }


function ChartDonut (props) {
  const data = [["Task", "Hours per Day"]];

  function setData() {
    props.devices.map((device) => {
      const obj = [device.name, device.power];
      data.push(obj);
      return 0;
    });
    return data;
  }

  const options = {
    title: "Device Manager",
    pieHole: 0.4,
    is3D: false,
  };
  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="100%"
      data={setData()}
      options={options}
    />
  );
};
export default ChartDonut;
