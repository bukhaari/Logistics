import React from "react";
import { Container } from "reactstrap";
import OwnerForm from "./ownerForm";
import OwnerTable from "./ownerTable";
import OwnerContextProvider from "../.././context/ownerContext";

function Owner() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <OwnerContextProvider>
            <OwnerForm />
            <OwnerTable />
          </OwnerContextProvider>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Owner;
