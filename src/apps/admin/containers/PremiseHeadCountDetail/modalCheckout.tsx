import React from "react";
import './styles.scss';
import '../../../../sass/main.scss';
import { Button, Modal, Row } from "antd";
import deleteIcon from "../../../common/assets/images/delete.svg";

export default function ModalMark(props: any) {
  const { title, message, buttonTest } = props;
  return (
    <Modal
      centered
      keyboard
      visible
      width={400}
      onCancel={props.closePopUp}
      title={<div className='modal-header'>{title}</div>}
      footer={null}
      closeIcon={
        <img
          src={deleteIcon}
          className="cancel-button"
          alt=""
        />
      }
    >
      <p className="big-font flex center modal-content">{` ${message}?`}</p>
      <Row justify="end" align="middle">
        <Button type="primary" className="bold" onClick={props.handleSubmit}>{buttonTest}</Button>
      </Row>
    </Modal>
  );
}


