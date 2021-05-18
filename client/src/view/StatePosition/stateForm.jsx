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
import { StateContext } from "../../context/statePositionContext";
import "react-datepicker/dist/react-datepicker.css";

function StateForm() {
  // All method and Arrays came to customer folder in index as Context Api
  const {
    handleUpdate,
    handleChange,
    newState,
    viewModal,
    handleModal,
    handleAdd,
  } = useContext(StateContext);

  // Object Desture
  const { name } = newState;

  // isComplate variable cheching object Empty if empty the modal doesn't close and not Add new customer or Update
  const handleSubmit = (e) => {
    e.persist();

    //cheching object is empty, if is empty will valid input or validation.
    const isComplate = Object.values(newState).every((val) => val !== "");
    if (isComplate) {
      newState._id ? handleUpdate() : handleAdd();
      handleModal();
    }
  };
  const ButtonText = newState._id ? "Update" : "Save";

  return (
    <Modal isOpen={viewModal} toggle={handleModal} backdrop="static" size="lg">
      <ModalHeader toggle={handleModal}>
        State Position Registration
      </ModalHeader>
      <ModalBody>
        <AvForm onSubmit={handleSubmit} className="needs-validation">
          <Row>
            <Col md="12">
              <FormGroup>
                <Label htmlFor="validationState">State</Label>
                <AvField
                  placeholder="Enter state"
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  errorMessage="please Enter state"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationState"
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

export default StateForm;
