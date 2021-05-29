import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

function Positions({ viewModal, handleModal, Positions }) {
  return (
    <div>
      <Modal
        isOpen={viewModal}
        toggle={handleModal}
        backdrop="static"
        size="lg"
      >
        <ModalHeader toggle={handleModal}>Project State</ModalHeader>
        <ModalBody>
          <div>
            {Positions.map((p, index) => (
              <div key={index}>
                <ul className="list-group">
                  <li className="list-group-item">{p}</li>
                </ul>
              </div>
            ))}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Positions;
