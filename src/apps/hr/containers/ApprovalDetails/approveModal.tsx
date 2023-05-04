import './styles.scss';

import { Button, Modal, Row } from "antd";

import React from "react";
import deleteIcon from "../../../common/assets/images/delete.svg";
import { CONFIRM } from "../../../common/constants/constants";


interface Props {
    closePopUp?: () => any,
    name: string,
    handleSubmit: (value: any) => any,
    status: string,
}

export default function ApproveModal(props: Props) {
    return (
        <Modal
            visible
            width={400}
            onCancel={props.closePopUp}
            title={<div className='modal-header'>{props.name}</div>}
            footer={null}
            closeIcon={
                <img
                    src={deleteIcon}
                    className="cancel-button"
                    alt="close"
                />
            }
        >
            <div className="big-font flex center modal-content">{props.status}</div>
            <Row justify="end" align="middle">
                <Button className="bold" type="primary" onClick={props.handleSubmit}>
                    {CONFIRM}
                </Button>
            </Row>
        </Modal>
    );
}


