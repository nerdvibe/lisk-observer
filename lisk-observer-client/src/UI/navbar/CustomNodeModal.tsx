import React from "react";
import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

interface CustomNodeProps {
  show: boolean;
  closeModal: () => void;
}

const CustomNodeModal = ({ show, closeModal }: CustomNodeProps) => {
  const [customNode, setCustomNode] = useState(
    localStorage.getItem("CUSTOM-ENDPOINT") || ""
  );

  const reloadPage = () =>
    setTimeout(() => {
      window.location.reload();
    }, 250);

  const changeNode = () => {
    if (customNode) {
      localStorage.setItem("CUSTOM-ENDPOINT", customNode);
      reloadPage();
    }
  };

  const resetDefault = () => {
    localStorage.removeItem("CUSTOM-ENDPOINT");
    reloadPage();
  };

  return (
    <Modal
      isOpen={show}
      showStaticBackdropAnimation={true}
      backdropClassName="custom-node-modal-backdrop"
      toggle={closeModal}
      contentClassName="custom-node-modal"
    >
      <ModalHeader toggle={closeModal}>
        <h1 className="black-text mb-0 force-white-text">Custom node</h1>
      </ModalHeader>
      <ModalBody className="force-white-text">
        <p className="force-white-text">
          Please write your custom node <br />
        </p>
        <Input
          className="mt-2 white-input"
          defaultValue={process.env.REACT_APP_SERVER_URL}
          placeholder={
            !!customNode ? customNode : process.env.REACT_APP_SERVER_URL
          }
          value={customNode}
          onChange={(e) => setCustomNode(e.target.value)}
        />
      </ModalBody>
      <ModalFooter className="mt-3">
        <p className="pointer ml-2 force-white-text" onClick={resetDefault}>
          Reset default
        </p>
        <Button className="btn-icon" color="google" onClick={changeNode}>
          Apply
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomNodeModal;
