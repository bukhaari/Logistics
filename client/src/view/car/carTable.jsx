import React, { useContext } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { CarContext } from "../../context/carContext";

function CarTable() {
  const { Cars, handleModal, handleDelete, handleEdit } = useContext(
    CarContext
  );

  const TableData = {
    date: new Date(),
    columns: [
      {
        label: "Type",
        field: "carType",
        sort: "asc",
        width: 150,
      },
      {
        label: "Driver",
        field: "driver",
        sort: "asc",
        width: 270,
      },
      {
        label: "Owner",
        field: "owner",
        sort: "asc",
        width: 270,
      },
      {
        label: "Plate",
        field: "plate",
        sort: "asc",
        width: 270,
      },
      {
        label: "State",
        field: "state",
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
    rows: Cars.map((car) => {
      car.date = new Date(car.date).toLocaleDateString();
      // if(car.date === "Invalid Date") car.date = "No date"
      car.action = (
        <div>
          <button
            type="button"
            onClick={() => handleEdit(car)}
            className="btn btn-white btn-sm mr-2"
          >
            <i
              className="fa fa-pencil text-primary"
              style={{ fontSize: 20 }}
            ></i>
          </button>
          <button
            type="button"
            onClick={() => handleDelete(car._id)}
            className="btn btn-white btn-sm"
          >
            <i className="fa fa-trash text-danger" style={{ fontSize: 20 }}></i>
          </button>
        </div>
      );
      return car.status !== "UnActive"? car:{};
    }),
  };

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-6">
                <span className="h5">Cars Information</span>
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

export default CarTable;
