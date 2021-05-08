import React, { useContext } from "react";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  InputGroup,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { CarContext } from "../../context/carContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CarForm() {
  // All method and Arrays came to customer folder in index as Context Api
  const {
    handleDateChange,
    handleUpdate,
    handleChange,
    newCar,
    Drivers,
    Owners,
    Types,
    viewModal,
    handleModal,
    handleAdd,
  } = useContext(CarContext);

  const statusData = ["", "Active", "UnActive"];
  const stateData = ["", "Excellent", "Very Good", "Good", "Poor", "Very Poor"];

  // Object Desture
  const { carTypeId, driverId, ownerId, plate, state, status, date } = newCar;

  // isComplate variable cheching object Empty if empty the modal doesn't close and not Add new customer or Update
  const handleSubmit = (e) => {
    e.persist();

    //cheching object is empty, if is empty will valid input or validation.
    const isComplate = Object.values(newCar).every((val) => val !== "");
    if (isComplate) {
      newCar._id ? handleUpdate() : handleAdd();
      handleModal();
    }
  };
  const ButtonText = newCar._id ? "Update" : "Save";

  return (
    <Modal isOpen={viewModal} toggle={handleModal} backdrop="static" size="lg">
      <ModalHeader toggle={handleModal}>Car Registration</ModalHeader>
      <ModalBody>
        <AvForm onSubmit={handleSubmit} className="needs-validation">
          <Row>
            <Col md="6">
              <FormGroup>
                <Label htmlFor="validationCarTypeId">Type</Label>
                <AvField
                  type="select"
                  name="carTypeId"
                  value={carTypeId}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Please Select Type"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationCarTypeId"
                  helpMessage={carTypeId === "" ? "Select Car Type" : ""}
                >
                  <option></option>
                  {Types.map((data) => {
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
                <Label htmlFor="validationDriverId">Driver</Label>
                <AvField
                  type="select"
                  name="driverId"
                  value={driverId}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Please Select driver"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationDriverId"
                  helpMessage={driverId === "" ? "Select Car Driver" : ""}
                >
                  <option></option>
                  {Drivers.map((data) => {
                    return (
                      <option key={data._id} value={data._id}>
                        {data.fullName}
                      </option>
                    );
                  })}
                </AvField>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label htmlFor="validationOwnerId">Owner</Label>
                <AvField
                  type="select"
                  name="ownerId"
                  value={ownerId}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Please Select owner"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationOwnerId"
                  helpMessage={ownerId === "" ? "Select Car DriverId" : ""}
                >
                  <option></option>
                  {Owners.map((data) => {
                    return (
                      <option key={data._id} value={data._id}>
                        {data.fullName}
                      </option>
                    );
                  })}
                </AvField>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label htmlFor="validationPlate">Plate</Label>
                <AvField
                  name="plate"
                  placeholder="Enter Plate"
                  type="text"
                  value={plate}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Please Enter Plate"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationPlate"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label htmlFor="validationState">State</Label>
                <AvField
                  type="select"
                  name="state"
                  value={state}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Please Select the state"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationState"
                  helpMessage={state === "" ? "Select car state" : ""}
                >
                  {stateData.map((data, index) => {
                    return <option key={index}>{data}</option>;
                  })}
                </AvField>
              </FormGroup>
            </Col>

            <Col md="4">
              <FormGroup>
                <Label htmlFor="validationStatus">Status</Label>
                <AvField
                  type="select"
                  name="status"
                  value={status}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Please Select the status"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationStatus"
                  helpMessage={status === "" ? "Select car status" : ""}
                >
                  {statusData.map((data, index) => {
                    return <option key={index}>{data}</option>;
                  })}
                </AvField>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Date</Label>
                <InputGroup>
                  <DatePicker
                    className="form-control"
                    selected={date}
                    onChange={(e) => handleDateChange(e)}
                  />
                </InputGroup>
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
