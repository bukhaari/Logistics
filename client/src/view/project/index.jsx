import React from "react";
import { Container } from "reactstrap";
import ProjectForm from "./projectForm";
import ProjectTable from "./projectTable";
import ProjectContextProvider from "../.././context/projectContext";

function Project() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <ProjectContextProvider>
            <ProjectForm />
            <ProjectTable />
          </ProjectContextProvider>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Project;
