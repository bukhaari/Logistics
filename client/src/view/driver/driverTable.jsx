import React, { useContext } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { DriverContext } from "../../context/driverContext";

function Owner() {
  const { Drivers, handleModal, handleDelete, handleEdit } = useContext(
    DriverContext
  );

  const TableData = {
    columns: [
      {
        label: "full Name",
        field: "fullName",
        sort: "asc",
        width: 150,
      },
      {
        label: "Phone Number",
        field: "tellPhone",
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
    rows: Drivers.map((driver) => {
      driver.date = new Date(driver.date).toLocaleDateString();
      // if(driver.date === "Invalid Date") driver.date = "No date"
      driver.action = (
        <div>
          {/* <button
            type="button"
            onClick={() => handleEdit(car)}
            className="btn btn-hover-none btn-sm mr-2"
          > */}
          <i
            className="fa fa-pencil text-primary mr-4"
            onClick={() => handleEdit(driver)}
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
            onClick={() => handleDelete(driver._id)}
            style={{ fontSize: 20, cursor: "pointer" }}
          ></i>
          {/* </button> */}
        </div>
      );
      return driver;
    }),
  };

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-6">
                <span className="h5">Drivers Information</span>
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
