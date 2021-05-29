import React, { useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { ContractContext } from "../../context/contractContext";

function CarForm() {
  // All method and Arrays came to customer folder in index as Context Api
  const {
    Projects,
    Cars,
    newContract,
    viewModal,
    handleModal,
    handleChange,
    handleAdd,
    handleUpdate,
    Positions,
  } = useContext(ContractContext);

  const Type = ["", "Go", "Go and Back", "Daily"];

  // Object Desture
  const {
    dailyMoney,
    contractType,
    signName,
    signNumber,
    projectId,
    carId,
    positionId,
  } = newContract;

  // isComplate variable cheching object Empty if empty the modal doesn't close and not Add new customer or Update
  const handleSubmit = (e) => {
    e.persist();

    //cheching object is empty, if is empty will valid input or validation.
    const isComplate = Object.values(newContract).every((val) => val !== "");
    if (isComplate) {
      newContract._id ? handleUpdate() : handleAdd();
      handleModal();
    }
  };
  const ButtonText = newContract._id ? "Update" : "Save";

  return (
    <Modal isOpen={viewModal} toggle={handleModal} backdrop="static" size="lg">
      <ModalHeader toggle={handleModal}>Contract</ModalHeader>
      <ModalBody>
        <AvForm onSubmit={handleSubmit} className="needs-validation">
          <Row>
            <Col md="6">
              <FormGroup>
                <Label htmlFor="validationProjectId">Project</Label>
                <AvField
                  type="select"
                  name="projectId"
                  value={projectId}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Please Select Project"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationProjectId"
                  helpMessage={projectId === "" ? "Select Project" : ""}
                >
                  <option></option>
                  {Projects.map((data) => {
                    return (
                      <option key={data._id} value={data._id}>
                        {data.name}
                      </option>
                    );
                  })}
                </AvField>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label htmlFor="validationCarId">Car</Label>
                <AvField
                  type="select"
                  name="carId"
                  value={carId}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Please Select car"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationOwnerId"
                  helpMessage={carId === "" ? "Select Car" : ""}
                >
                  <option></option>
                  {Cars.map((data) => {
                    return (
                      <option key={data._id} value={data._id}>
                        {`Plate:${data.plate},  Owner:${data.owner.fullName}`}
                      </option>
                    );
                  })}
                </AvField>
              </FormGroup>
            </Col>

            <Col md="6">
              <FormGroup>
                <Label htmlFor="validationpositionId">Positions</Label>
                <AvField
                  type="select"
                  name="positionId"
                  value={positionId}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Please Select Positions"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationpositionId"
                  helpMessage={positionId === "" ? "Select Positions" : ""}
                >
                  <option></option>
                  {Positions
                    ? Positions.map((data) => {
                        return (
                          <option key={data.value} value={data.value}>
                            {`${data.label}`}
                          </option>
                        );
                      })
                    : ""}
                </AvField>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label htmlFor="validationDailyMoney">Daily Money</Label>
                <AvField
                  placeholder="Enter Daily Money"
                  type="number"
                  name="dailyMoney"
                  value={dailyMoney}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Please Enter Daily Money"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationDailyMoney"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label htmlFor="validationSignatureNumber">
                  Signature Number
                </Label>
                <AvField
                  placeholder="Enter Signature"
                  type="number"
                  name="signNumber"
                  value={signNumber}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Please Enter Signature Number"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationSignatureNumber"
                />
              </FormGroup>
            </Col>

            <Col md="4">
              <FormGroup>
                <Label htmlFor="validationSignName">Signature Name</Label>
                <AvField
                  placeholder="Enter Signature"
                  type="text"
                  name="signName"
                  value={signName}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Please Enter signature Name"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationSignName"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label htmlFor="validationContractType">contract Type</Label>
                <AvField
                  type="select"
                  name="contractType"
                  value={contractType}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Please Select Contract Type"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationContractType"
                  helpMessage={contractType === "" ? "Select car status" : ""}
                >
                  {Type.map((data, index) => {
                    return <option key={index}>{data}</option>;
                  })}
                </AvField>
              </FormGroup>
            </Col>
          </Row>
          <ModalFooter>
            <button
              style={{ background: "#d33" }}
              className="btn text-white"
              onClick={() => handleModal()}
            >
              Close
            </button>
            <button className="btn btn-primary">{ButtonText}</button>
          </ModalFooter>
        </AvForm>
      </ModalBody>
    </Modal>
  );
}

export default CarForm;
