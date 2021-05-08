import React from "react";
import { Container } from "reactstrap";
import DriverForm from "./driverForm";
import DriverTable from "./driverTable";
import DriverContextProvider from '../.././context/driverContext';

function Driver() {

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <DriverContextProvider>
            <DriverForm />
            <DriverTable />
          </DriverContextProvider>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Driver;
