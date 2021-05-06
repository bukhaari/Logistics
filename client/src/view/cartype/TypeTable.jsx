import React, { useContext } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { TypeContext } from "../../context/TypeContext";

function TypeTable() {
  const { Types, handleModal, handleDelete, handleEdit } = useContext(
    TypeContext
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
        label: "Type",
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
    rows: Types.map((types, index) => {
      let no = index + 1;
      types["no"]= no;
      types.action = (
        <div>
          <button
            type="button"
            onClick={() => handleEdit(types)}
            className="btn btn-white btn-sm  mr-2"
          >
            <i
              className="fa fa-pencil text-primary"
              style={{ fontSize: 20 }}
            ></i>
          </button>
          <button
            type="button"
            onClick={() => handleDelete(types._id)}
            className="btn btn-white btn-sm"
          >
            <i className="fa fa-trash text-danger" style={{ fontSize: 20 }}></i>
          </button>
        </div>
      );
      return types;
    }),
  };

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-6">
                <span className="h5">Type Information</span>
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

export default TypeTable;
