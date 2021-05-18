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
import { PositionsContext } from "../../context/positionContext";
import "react-datepicker/dist/react-datepicker.css";

function PositionForm() {
  // All method and Arrays came to customer folder in index as Context Api
  const {
    handleUpdate,
    handleChange,
    newPosition,
    viewModal,
    handleModal,
    handleAdd,
    State,
  } = useContext(PositionsContext);

  const statusData = ["", "Active", "UnActive"];
  // Object Desture
  const { state, district } = newPosition;

  // isComplate variable cheching object Empty if empty the modal doesn't close and not Add new customer or Update
  const handleSubmit = (e) => {
    e.persist();

    //cheching object is empty, if is empty will valid input or validation.
    const isComplate = Object.values(newPosition).every((val) => val !== "");
    if (isComplate) {
      newPosition._id ? handleUpdate() : handleAdd();
      handleModal();
    }
  };
  const ButtonText = newPosition._id ? "Update" : "Save";

  return (
    <Modal isOpen={viewModal} toggle={handleModal} backdrop="static" size="lg">
      <ModalHeader toggle={handleModal}>Position Registration</ModalHeader>
      <ModalBody>
        <AvForm onSubmit={handleSubmit} className="needs-validation">
          <Row>
            <Col md="6">
              <FormGroup>
                <Label htmlFor="validationState">State</Label>
                <AvField
                  type="select"
                  name="state"
                  value={state}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Please Select state"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationState"
                  helpMessage={state === "" ? "Select state position" : ""}
                >
                  <option></option>
                  {State.map((data) => {
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
                <Label htmlFor="validationDistrict">District</Label>
                <AvField
                  name="district"
                  placeholder="Enter district"
                  type="text"
                  value={district}
                  onChange={(e) => handleChange(e)}
                  errorMessage="Please Enter district"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationDistrict"
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

export default PositionForm;
