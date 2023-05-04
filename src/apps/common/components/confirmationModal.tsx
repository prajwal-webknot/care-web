import '../../../sass/main.scss';

import { Button, Modal, Row } from "antd";

import React from "react";
import deleteIcon from "../assets/images/delete.svg";

interface Props {
  closeComfirmationPopUp: () => void;
  handleClickYes?: () => void;
  handleClickNo?: () => void;
  displayMessage: string;
  confirmRequest?: boolean;
}

export default function ConfirmationModal(props: Props) {
  return (

    <Modal
      visible
      width={500}
      onCancel={props.closeComfirmationPopUp}
      footer={null}
      closeIcon={
        <img
          src={deleteIcon}
          className="cancel-button"
          alt=""
        />
      }
    >
      <div className="big-font flex center modal-content">
        {props.displayMessage}
      </div>
      <Row justify="end" align="middle">
        {props.confirmRequest ?
          <>
            <Button type="primary" className="confirmation bold" onClick={props.handleClickYes}>{}Yes</Button>
            <Button type="primary" className="confirmation bold" onClick={props.handleClickNo}>{}NO</Button>
          </>
          :
          <Button type="primary" className="bold" onClick={props.closeComfirmationPopUp}>{}OK</Button>
        } </Row>
    </Modal>
  );
}


