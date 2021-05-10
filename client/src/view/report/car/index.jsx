import React from "react";
import { Container } from "reactstrap";
import CarTable from "./carTable";
import CarContextProvider from "../../../context/carContext";

function CarInfo() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <CarContextProvider>
            <CarTable />
          </CarContextProvider>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default CarInfo;
