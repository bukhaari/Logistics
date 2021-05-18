import React, { useContext } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { StateContext } from "../../context/statePositionContext";

function StateTable() {
  const { States, handleModal, handleEdit } = useContext(StateContext);

  const TableData = {
    columns: [
      {
        label: "No",
        field: "no",
        sort: "asc",
        width: 70,
      },
      {
        label: "State",
        field: "name",
        sort: "asc",
        width: 70,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 70,
      },
    ],
    rows: States.map((state, index) => {
      let no = index + 1;
      state["no"] = no;
      state.action = (
        <div>
          <i
            className="fa fa-pencil text-primary mr-4"
            onClick={() => handleEdit(state)}
            style={{ fontSize: 20, cursor: "pointer" }}
          ></i>
        </div>
      );
      return state;
    }),
  };

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-6">
                <span className="h5">State Position Information</span>
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

export default StateTable;
