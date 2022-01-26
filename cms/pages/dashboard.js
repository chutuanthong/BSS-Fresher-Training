import React, { useEffect, useState } from "react";
import AddDevice from "../components/AddDevice";
import ChartDonut from "../components/ChartDonut";
import Menu from "../components/Menu";
import Nav from "../components/Nav";
import Table from "../components/Table";

const DashBoard = () => {
  const [devices, setDevices] = useState([]);
  const [displayMenu, setDisplayMenu] = useState("");

  const addDevice = (device) => {
    setDevices([...devices, device]);
  };

  useEffect(() => {
    const getApi = async () => {
      let a = await (
        await fetch(`${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api/v1/devices/get-all`)
      ).json();
      setDevices(a.data);
    };
    getApi();
  }, []);

  const handleClickHamburger = () => {
    console.log("handleClickHamburger", displayMenu);
    if (displayMenu === "inline") {
      setDisplayMenu("");
    } else {
      setDisplayMenu("inline");
    }
  };

  return (
    <>
      <Menu displayMenu={displayMenu} linkColor={0} />
      <div className="container">
        <Nav handleClickHamburger={handleClickHamburger} />
        <div>
          <section className="section" id="section--1">
            <div className="section--1--container ">
              <div className="section--1--table">
                <Table id="section1__table" devices={devices} />
              </div>
            </div>
            <div className="section--1--draw">
              <div className="draw__Chart">
                <ChartDonut devices={devices} />
              </div>
              <AddDevice devices={devices} addDevice={addDevice} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
