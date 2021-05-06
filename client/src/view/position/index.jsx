import React from "react";
import { Container } from "reactstrap";
import PositionForm from "./positionForm";
import PositionTable from "./positionTable";
import PositionContextProvider from "../.././context/positionContext";
function Position() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <PositionContextProvider>
            <PositionForm />
            <PositionTable />
          </PositionContextProvider>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Position;
