import React from "react";
import { Container } from "reactstrap";
import CarForm from "./carForm";
import CarTable from "./carTable";
import CarContextProvider from "../.././context/carContext";

function Car() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <CarContextProvider>
            <CarForm />
            <CarTable />
          </CarContextProvider>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Car;
