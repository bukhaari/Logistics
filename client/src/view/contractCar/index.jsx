import React from "react";
import { Container } from "reactstrap";
import ContractCarForm from "./contractCarForm";
import ContractCarTable from "./ContractCarTable";
import ContractContextProvider from "../.././context/contractContext";

function Car() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <ContractContextProvider>
            <ContractCarForm />
            <ContractCarTable />
          </ContractContextProvider>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Car;
