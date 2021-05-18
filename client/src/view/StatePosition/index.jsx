import React from "react";
import { Container } from "reactstrap";
import StateForm from "./stateForm";
import TypeTable from "./stateTable";
import StateContextProvider from "../.././context/statePositionContext";

function StatePosition() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <StateContextProvider>
            <StateForm />
            <TypeTable />
          </StateContextProvider>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default StatePosition;
