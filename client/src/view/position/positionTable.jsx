import React, { useContext } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import {  PositionsContext } from "../../context/positionContext";

function PositionTable() {
  const { Positions, handleModal, handleDelete, handleEdit } = useContext(
    PositionsContext
  );

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
        field: "state",
        sort: "asc",
        width: 70,
      },
      {
        label: "District",
        field: "district",
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
    rows: Positions.map((postion, index) => {
      let no = index + 1;
      postion["no"]= no;
      postion.action = (
        <div>
          {/* <button
            type="button"
            onClick={() => handleEdit(car)}
            className="btn btn-hover-none btn-sm mr-2"
          > */}
          <i
            className="fa fa-pencil text-primary mr-4"
            onClick={() => handleEdit(postion)}
            style={{ fontSize: 20, cursor: "pointer" }}
          ></i>
          {/* </button> */}
          {/* <button
            type="button"
            onClick={() => handleDelete(car._id)}
            className="btn btn-white btn-sm"
          > */}
          <i
            className="fa fa-trash text-danger"
            onClick={() => handleDelete(postion._id)}
            style={{ fontSize: 20, cursor: "pointer" }}
          ></i>
          {/* </button> */}
        </div>
      );
      return postion;
    }),
  };

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-6">
                <span className="h5">Postion Information</span>
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

export default PositionTable;
