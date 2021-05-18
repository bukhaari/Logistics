import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { ProjectContext } from "../../context/projectContext";
import ProjectPosition from "./projectPositions";

function Project() {
  const { Projects, handleModal, hanleUpdateStatus, handleEdit } =
    useContext(ProjectContext);

  // // Modal functionality

  useEffect(() => {
    if (viewModal === false) {
      Positions.length = 0;
    }
  });
  const [Positions, setPositions] = useState([]);
  const handlePosition = (data) => {
    data.map((d) => {
      let isCheck = Positions.includes(d.state);
      if (isCheck === false) {
        // setPositions([...Positions, d.state]);
        Positions.push(d.state);
        // console.log(d);
      }
    });
  };

  const [viewModal, setModal] = useState(false);
  const handleModalPosition = () => {
    setModal(!viewModal);

    // if (viewModal === false) Positions.length = 0;
  };

  const TableData = {
    columns: [
      {
        label: "name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Required Car",
        field: "requiredCar",
        sort: "asc",
        width: 270,
      },
      {
        label: "Start Date",
        field: "startDate",
        sort: "asc",
        width: 270,
      },
      {
        label: "End Date",
        field: "endDate",
        sort: "asc",
        width: 270,
      },
      {
        label: "Positions",
        field: "position",
        sort: "asc",
        width: 270,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 270,
      },
    ],
    rows: Projects.map((project) => {
      project.startDate = new Date(project.startDate).toLocaleDateString();
      project.endDate = new Date(project.endDate).toLocaleDateString();

      project.position = (
        <h4
          onClick={() => {
            handlePosition(project.positions);
            handleModalPosition();
          }}
          style={{ cursor: "pointer" }}
          className="font-weight-bold text-primary "
        >
          ....
        </h4>
      );
      project.action = (
        <div className="d-flex">
          <i
            className="fa fa-pencil text-primary mr-4"
            onClick={() => handleEdit(project)}
            style={{ fontSize: 20, cursor: "pointer" }}
          ></i>
          <h5
            className="text-white p-1 rounded bg-danger"
            onClick={() => hanleUpdateStatus(project._id)}
            style={{ fontSize: 15, cursor: "pointer" }}
          >
            {project.status === "Unactive" ? "Actived" : "Deactived"}
          </h5>
        </div>
      );
      return project;
    }),
  };

  return (
    <Row>
      <ProjectPosition
        Positions={Positions}
        handleModal={handleModalPosition}
        viewModal={viewModal}
        // State={State}
        // setState={setState}
      />
      <Col xs={12}>
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-6">
                <span className="h5">Project Information</span>
              </div>
              <div className="text-right col-6">
                <button
                  onClick={handleModal}
                  type="button"
                  className="btn btn-primary"
                >
                  <i className="fa fa-plus font-size-15"> Add New</i>
                </button>
              </div>
            </div>
            <hr />
            <MDBDataTable responsive hover data={TableData} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default Project;
