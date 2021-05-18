import React, { useContext } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { OwnerContext } from "./../../context/ownerContext";

function Owner() {
  const { Owners, handleModal, handleEdit } = useContext(OwnerContext);

  const TableData = {
    columns: [
      {
        label: "full Name",
        field: "fullName",
        sort: "asc",
        width: 150,
      },
      {
        label: "Phone",
        field: "tellphone",
        sort: "asc",
        width: 270,
      },
      {
        label: "Address",
        field: "address",
        sort: "asc",
        width: 270,
      },
      {
        label: "Date",
        field: "date",
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
    rows: Owners.map((owner) => {
      owner.date = new Date(owner.date).toLocaleDateString();
      if (owner.date === "Invalid Date") owner.date = "No date";
      owner.action = (
        <div>
          <i
            className="fa fa-pencil text-primary mr-4"
            onClick={() => handleEdit(owner)}
            style={{ fontSize: 20, cursor: "pointer" }}
          ></i>
        </div>
      );
      return owner;
    }),
  };

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-6">
                <span className="h5">Owner Information</span>
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

export default Owner;
