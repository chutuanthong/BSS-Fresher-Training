import React, { useState } from "react";

const AddDevice = ({ devices, addDevice }) => {
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [power, setPower] = useState("");
  const [className, setClassName] = useState("mess--hidden");
  const [classIp, setClassIp] = useState("mess--hidden");
  const [classPower, setClassPower] = useState("mess--hidden");

  const nameChange = (event) => {
    setClassName("mess--hidden");
    setName(event.target.value);
  };
  const ipChange = (event) => {
    setClassIp("mess--hidden");
    setIp(event.target.value);
  };
  const powerChange = (event) => {
    setClassPower("mess--hidden");
    setPower(event.target.value);
  };

  const handlerSubmit = (event) => {
    if (name && ip && Number.parseInt(power)) {
      addDevice({
        id: devices.length,
        name: name,
        macAddress: "admin@natours.io",
        ip: ip,
        date: "02-03-2000",
        power: Number.parseInt(power),
      });

      const getApi = async () => {
        try {
          // POST request using fetch inside useEffect React hook
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name,
              macAddress: "admin@natours.io",
              ip: ip,
              date: "02-03-2000",
              power: Number.parseInt(power),
            }),
          };

          if (name && ip && Number.parseInt(power)) {
            await fetch(
              `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api/v1/devices/get-all`,
              requestOptions
            );

          }
        } catch (error) {
          console.log(error);
        }
      };

      getApi();
    } else {
      if (!name) {
        setClassName("mess--visible");
      }
      if (!ip) {
        setClassIp("mess--visible");
      }
      if (!Number.parseInt(power)) {
        setClassPower("mess--visible");
      }
    }
  };

  return (
    <div className="addDevice">
      <input
        className="addDevice--name"
        type="text"
        placeholder="Name"
        value={name}
        onChange={nameChange}
      />
      <div className={className}>
        <i className="fas fa-exclamation-circle" />
        <small>Name is not empty</small>
      </div>
      <input
        className="addDevice--ip"
        type="text"
        placeholder="IP"
        value={ip}
        onChange={ipChange}
      />
      <div className={classIp}>
        <i className="fas fa-exclamation-circle" />
        <small>Ip is not empty</small>
      </div>
      <input
        className="addDevice--power"
        type="text"
        placeholder="Power Consumtion"
        value={power}
        onChange={powerChange}
      />
      <div className={classPower}>
        <i className="fas fa-exclamation-circle" />
        <small>power is number</small>
      </div>
      <button className="chart__add" onClick={handlerSubmit}>
        Add device
      </button>
    </div>
  );
};

export default AddDevice;
