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
import { OwnerContext } from "./../../context/ownerContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomerForm() {
  // All method and Arrays came to customer folder in index as Context Api
  const {
    handleDateChange,
    handleUpdate,
    handleChange,
    newOwner,
    viewModal,
    handleModal,
    handleAdd,
  } = useContext(OwnerContext);

  const statusData = ["", "Active", "UnActive"];
  // Object Desture
  const { fullName, tellphone, address, date } = newOwner;

  // isComplate variable cheching object Empty if empty the modal doesn't close and not Add new customer or Update
  const handleSubmit = (e) => {
    e.persist();

    //cheching object is empty, if is empty will valid input or validation.
    const isComplate = Object.values(newOwner).every((val) => val !== "");
    if (isComplate) {
      newOwner._id ? handleUpdate() : handleAdd();
      handleModal();
    }
  };
  const ButtonText = newOwner._id ? "Update" : "Save";

  return (
    <Modal isOpen={viewModal} toggle={handleModal} backdrop="static" size="lg">
      <ModalHeader toggle={handleModal}>Owner Registration</ModalHeader>
      <ModalBody>
        <AvForm onSubmit={handleSubmit} className="needs-validation">
          <Row>
            <Col md="6">
              <FormGroup>
                <Label htmlFor="validationfullName">Name</Label>
                <AvField
                  name="fullName"
                  placeholder="full Name"
                  type="text"
                  value={fullName}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Enter full Name"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationfullName"
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label htmlFor="validationTellphone">Phone</Label>
                <AvField
                  name="tellphone"
                  placeholder="phone Number"
                  type="text"
                  value={tellphone}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Enter phone name"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationTellphone"
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label htmlFor="validationAddress">Address</Label>
                <AvField
                  name="address"
                  placeholder="address"
                  type="text"
                  value={address}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Enter the address"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationAddress"
                />
              </FormGroup>
            </Col>
            <Col md="6">
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

export default CustomerForm;
