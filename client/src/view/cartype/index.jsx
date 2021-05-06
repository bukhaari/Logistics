import React from "react";
import { Container } from "reactstrap";
import TypeForm from "./TypeForm";
import TypeTable from "./TypeTable";
import TypeContextProvider from "../.././context/TypeContext";
function Type() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <TypeContextProvider>
            <TypeForm />
            <TypeTable />
          </TypeContextProvider>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Type;
