import './styles.scss';

import { Button, Modal, Row } from "antd";

import React from "react";
import deleteIcon from "../../../common/assets/images/delete.svg";


interface Props {
    closePopUp?: () => any,
    handleSubmit: (value: any) => any,
}

export default function BufferAllocateModal(props: Props) {
    return (
        <Modal
            visible
            width={600}
            onCancel={props.closePopUp}
            footer={null}
            closeIcon={
                <img
                    src={deleteIcon}
                    className="cancel-button"
                    alt="close"
                />
            }
        >
            <b className="big-font text-align-center flex center modal-content">Your team has reached the site guidelines limit</b>
            <p className="small-font text-align-center flex center modal-content">All the members you select above the site-guidelines
                will be rostered via buffer zone.</p>
            <p className="small-font text-align-center flex center modal-content">
                Please note buffer seats will be alloted only 48 hours before the Rostered date, subject to availability</p>
            <Row justify='center' align="middle">
                <Button className="bold" type="primary" onClick={props.handleSubmit}>
                    Roster via Buffer Area
                </Button>
            </Row>
        </Modal>
    );
}


