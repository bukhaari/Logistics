import React from "react";
import { Container } from "reactstrap";
import CarForm from "./carForm";
import CarTable from "./carTable";
import ContractContextProvider from "../.././context/contractContext";

function Car() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <ContractContextProvider>
            <CarForm />
            <CarTable />
          </ContractContextProvider>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Car;
