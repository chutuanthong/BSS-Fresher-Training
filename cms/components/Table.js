import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'

// Table.propTypes={
//   devices:PropTypes.object.isRequired,
// }

// Table.defaultProps={
//   devices:[]
// }

function Table ({id,devices}){
  // const[devicesTable,setDevicesTable]=useState([]);

  // useEffect(() => {
  //     setDevicesTable(props.devices)
  // }, [devicesTable])

  const getTotal = () => {
    let total = 0;
    devices.map((device) => {
      total += device.power;
      return 0;
    });
    return total;
  };

  return (
    <table id={id}>
      <tbody>
        <tr className="tr-firstChild">
          <th>Devices</th>
          <th>Mac Address</th>
          <th>IP</th>
          <th>Created Date</th>
          <th>Power Consumtion(kw/H)</th>
        </tr>
        {devices.map((device) => (
          <tr key={device.id}>
            <td>{device.name}</td>
            <td>{device.macAddress}</td>
            <td>{device.ip}</td>
            <td>{device.date}</td>
            <td>{device.power}</td>
          </tr>
        ))}
        <tr>
          <td>Total</td>
          <td></td>
          <td></td>
          <td></td>
          <td>{getTotal()}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
