import './styles.scss';

import { Button, Modal, Row } from "antd";

import React from "react";
import deleteIcon from "../../../common/assets/images/delete.svg";

interface Props {
    closePopUp?: () => any;
}


export default function AlertModal(props: Props) {
    return (
        <Modal
            visible
            width={400}
            onCancel={props.closePopUp}
            title={<div className='modal-header'>Alert Guidelines</div>}
            footer={null}
            closeIcon={
                <img
                    src={deleteIcon}
                    className="cancel-button"
                    alt="close"
                />
            }
        >
            <div className="flex flex-column mark-modal-body space-between">
                <ol>
                    <ul>
                        This is guideline 1
                </ul>
                    <ul>
                        This is guideline 2
                </ul>
                    <ul>
                        This is guideline 3
                </ul>
                </ol>
            </div>
            <Row justify="end" align="middle">
                <Button type="primary" className="bold" onClick={props.closePopUp}>Okay</Button>
            </Row>
        </Modal>
    );
}


