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
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { TypeContext } from "../../context/TypeContext";
import "react-datepicker/dist/react-datepicker.css";

function TyeForm() {
  // All method and Arrays came to customer folder in index as Context Api
  const {
    handleUpdate,
    handleChange,
    newType,
    viewModal,
    handleModal,
    handleAdd,
  } = useContext(TypeContext);

  // Object Desture
  const { name } = newType;

  // isComplate variable cheching object Empty if empty the modal doesn't close and not Add new customer or Update
  const handleSubmit = (e) => {
    e.persist();

    //cheching object is empty, if is empty will valid input or validation.
    const isComplate = Object.values(newType).every((val) => val !== "");
    if (isComplate) {
      newType._id ? handleUpdate() : handleAdd();
      handleModal();
    }
  };
  const ButtonText = newType._id ? "Update" : "Save";

  return (
    <Modal isOpen={viewModal} toggle={handleModal} backdrop="static" size="lg">
      <ModalHeader toggle={handleModal}>Type Registration</ModalHeader>
      <ModalBody>
        <AvForm onSubmit={handleSubmit} className="needs-validation">
          <Row>
            <Col md="12">
              <FormGroup>
                <Label htmlFor="validationName">Type</Label>
                <AvField
                  name="name"
                  placeholder="Enter name"
                  type="text"
                  value={name}
                  onChange={handleChange}
                  errorMessage="please Enter name"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationName"
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

export default TyeForm;
