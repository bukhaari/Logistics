import React, { useContext, useEffect } from "react";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { ProjectContext } from "./../../context/projectContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

function CustomerForm() {
  // All method and Arrays came to customer folder in index as Context Api
  const {
    handleUpdate,
    handleChange,
    newProject,
    viewModal,
    handleModal,
    handleAdd,
    Positions,
    handleStartDateChange,
    handleEndDateChange,
    handleChangePositions,
  } = useContext(ProjectContext);

  let optionGroup = Positions.map((p) => {
    return {
      label: `${p.district}, ${p.state.name}`,
      value: p._id,
    };
  });

  // Object Desture
  const { name, requiredCar, startDate, endDate, positions } = newProject;
  // isComplate variable cheching object Empty if empty the modal doesn't close and not Add new customer or Update
  const handleSubmit = (e) => {
    e.persist();
    // console.log(positions)

    //cheching object is empty, if is empty will valid input or validation.
    const isComplate = Object.values(newProject).every((val) => val !== "");
    if (isComplate) {
      newProject._id ? handleUpdate() : handleAdd();
      handleModal();
    }
  };
  const ButtonText = newProject._id ? "Update" : "Save";

  return (
    <Modal isOpen={viewModal} toggle={handleModal} backdrop="static" size="lg">
      <ModalHeader toggle={handleModal}>Project Registration</ModalHeader>
      <ModalBody>
        <AvForm onSubmit={handleSubmit} className="needs-validation">
          <Row>
            <Col md="6">
              <FormGroup>
                <Label htmlFor="validationName">Name</Label>
                <AvField
                  name="name"
                  placeholder="Enter Name"
                  type="text"
                  value={name}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Please Enter Name"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationName"
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label htmlFor="validationRequiredCar">How many Cars</Label>
                <AvField
                  name="requiredCar"
                  placeholder=" Enter Numbers of Cars"
                  type="number"
                  value={requiredCar}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Enter the Numbers Cars"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationRequiredCar"
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>Start Date</Label>
                <InputGroup>
                  <DatePicker
                    className="form-control"
                    selected={startDate}
                    onChange={(e) => handleStartDateChange(e)}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>End Date</Label>
                <InputGroup>
                  <DatePicker
                    className="form-control"
                    selected={endDate}
                    onChange={(e) => handleEndDateChange(e)}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label htmlFor="validationPositions">Positions</Label>
                <Select
                  // closeMenuOnSelect={true}
                  value={positions}
                  isMulti={true}
                  onChange={(e) => handleChangePositions(e)}
                  options={optionGroup}
                  classNamePrefix="select2-selection"
                />
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

export default CustomerForm;
