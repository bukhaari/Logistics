import React, { useContext } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { ContractContext } from "../../context/contractContext";

function CarTable() {
  const { Contracts, handleModal, hanleUpdateStatus, handleEdit } =
    useContext(ContractContext);

  const TableData = {
    columns: [
      {
        label: "Project Name",
        field: "projectName",
        sort: "asc",
        width: 150,
      },
      {
        label: "Car Plate",
        field: "carPlate",
        sort: "asc",
        width: 270,
      },
      {
        label: "Contract Type",
        field: "contractType",
        sort: "asc",
        width: 270,
      },
      {
        label: "Daily Money",
        field: "dailyMoney",
        sort: "asc",
        width: 270,
      },
      {
        label: "Adrress",
        field: "adrress",
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
        label: "Action",
        field: "action",
        sort: "asc",
        width: 270,
      },
    ],
    rows: Contracts.map((contract) => {
      contract.startDate = new Date(contract.startDate).toLocaleDateString();
      contract.endDate = new Date(contract.endDate).toLocaleDateString();
      contract.adrress = `${contract.position.district}, ${contract.position.state}`;
      contract.action = (
        <div className="d-flex">
          <i
            className="fa fa-pencil text-primary mr-4"
            onClick={() => handleEdit(contract)}
            style={{ fontSize: 20, cursor: "pointer" }}
          ></i>
          <h5
            className="text-white p-1 rounded bg-danger"
            onClick={() => hanleUpdateStatus(contract._id)}
            style={{ fontSize: 15, cursor: "pointer" }}
          >
            {contract.status === "Unactive" ? "Actived" : "Deactived"}
          </h5>
        </div>
      );
      return contract;
    }),
  };

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-6">
                <span className="h5">Cars Contract Information</span>
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
