import React from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function CustomerForm(props) {
  return (
    <div>
      <Modal
        isOpen={props.viewModal}
        toggle={props.handleModal}
        backdrop="static"
        size="lg"
      >
        <ModalHeader toggle={props.handleModal}>Owner Information</ModalHeader>
        <ModalBody>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Warbixin Kooban</h5>
              <p className="card-text">
                Magaca Owner-ka waa{" "}
                <span className="text-primary">{props.AllOwner.fullName}</span> ,
                Number-kiisana waa
                <span className="text-primary"> {props.AllOwner.tellphone}</span>,
                Address-kiisa waa
                <span className="text-primary"> {props.AllOwner.address}</span>
              </p>
              <p className="card-text">
                <span className="text-muted">
                  waxaa la diwaan galiyey 
                  <span className="text-primary"> {new Date(props.AllOwner.date).toLocaleDateString()}
                  </span>
                </span>
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
}

export default CustomerForm;
