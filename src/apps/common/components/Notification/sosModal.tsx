import { Button, Modal, Row } from "antd";
import React from "react";
import deleteIcon from "../../../common/assets/images/delete.svg";
import '../../../../sass/main.scss';
import { useDispatch } from 'react-redux';
import { EvacuationAlertActions } from "../../store/evaculationAlert/EvacuationAlertAction";
import { RAISE_EVAC_ALERT_LABEL } from "../../constants/constants";

interface Props {
    onlyClosePopUp: () => void,
    closePopUp: () => void;
}


export default function SosModal(props: Props) {
    const dispatch = useDispatch();

    function sendAlert() {
        dispatch(EvacuationAlertActions.sendEvacuationAlertRequest({ site_id: 1, reason: "Evacuation alert" }));
        props.closePopUp();
    }

    return (
        <Modal
            visible
            width={600}
            onCancel={props.onlyClosePopUp}
            title={<div className='modal-header'>SOS</div>}
            footer={null}
            closeIcon={
                <img
                    src={deleteIcon}
                    className="cancel-button"
                    alt="close"
                />
            }
        >
            <div className="flex flex-column space-between">
                <h3 className="sos-title">
                    This alert is to be raised in case:
                </h3>
                <ul>
                    <li>
                        Notice of any COVID-19 suspect currently within premises
                    </li>
                    <li>
                        Notice of any COVID-19 suspect traced as associated with office premises in the last 14 days.
                    </li>
                </ul>
            </div>
            <Row justify="center" align="middle">
                <Button onClick={sendAlert} type="primary">
                    <p className="bold">
                        {RAISE_EVAC_ALERT_LABEL}
                    </p>
                </Button>
            </Row>
        </Modal>
    );
}


