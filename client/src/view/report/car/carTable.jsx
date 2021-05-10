import React, { useContext, useState } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { CarContext } from "../../../context/carContext";
import { Link } from "react-router-dom";
import OwneModal from "../owner/ownerForm";

function CarTable() {
  const { Cars } = useContext(CarContext);
  // // Modal functionality
  const [viewModal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!viewModal);
  };

  const [ModalData, setModalData] = useState({
    fullName: "",
    tellphone: "",
    date: "",
  });

  const TableData = {
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
        field: "ownerName",
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
        label: "Plate",
        field: "plate",
        sort: "asc",
        width: 270,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 270,
      },
      {
        label: "Reject",
        field: "reject",
        sort: "asc",
        width: 270,
      },
      {
        label: "Success",
        field: "success",
        sort: "asc",
        width: 270,
      },
      {
        label: "Date",
        field: "date",
        sort: "asc",
        width: 270,
      },
    ],
    rows: Cars.map((car) => {
      car.date = new Date(car.date).toLocaleDateString();

      car.reject = (
        <div className="text-center">
          <h1 style={{ fontSize: 13 }} className="badge text-white bg-danger">
            {car.rejectContract}
          </h1>
        </div>
      );
      car.success = (
        <div className="text-center">
          <h1 style={{ fontSize: 13 }} className="badge text-white bg-primary">
            {car.successContract}
          </h1>
        </div>
      );

      if (car.status === "UnActive")
        car.status = (
          <h1 style={{ fontSize: 13 }} className="badge text-white bg-danger">
            {car.status}
          </h1>
        );

      if (car.status === "Active")
        car.status = (
          <h1 style={{ fontSize: 13 }} className="badge text-white bg-primary">
            {car.status}
          </h1>
        );

      if (car.state === "Poor")
        car.state = (
          <h1
            style={{ fontSize: 15 }}
            className="h1 badge text-dark bg-warning"
          >
            {car.state}
          </h1>
        );

      if (car.state === "Very Poor")
        car.state = (
          <h1
            style={{ fontSize: 13 }}
            className="h1 badge text-white bg-danger"
          >
            {car.state}
          </h1>
        );

      if (car.state === "Excellent")
        car.state = (
          <h1
            style={{ fontSize: 13 }}
            className="h1 badge text-white bg-primary"
          >
            {car.state}
          </h1>
        );

      if (car.state === "Very Good")
        car.state = (
          <h1
            style={{ fontSize: 13 }}
            className="h1 badge text-white bg-info"
          >
            {car.state}
          </h1>
        );

      if (car.state === "Good")
        car.state = (
          <h1
            style={{ fontSize: 13 }}
            className="h1 badge text-white bg-dark"
          >
            {car.state}
          </h1>
        );

      car.ownerName = (
        <span
          style={{ cursor: "pointer" }}
          className="text-primary"
          onClick={() => {
            handleModal();
            setModalData(car.Allowner);
          }}
        >
          {car.owner.slice(0, -3)}.....
        </span>
      );
      return car;
    }),
  };
  return (
    <Row>
      <OwneModal
        AllOwner={ModalData}
        handleModal={handleModal}
        viewModal={viewModal}
      />
      <Col xs={12}>
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-6">
                <span className="h5">Cars Report</span>
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
