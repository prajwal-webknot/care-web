import './styles.scss';

import { Button, Checkbox, Modal, Row, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntrySurveyActions } from "../../store/actions/EntrySurveyAction";
import deleteIcon from "../../../common/assets/images/delete.svg";
import { entrySurveyResponse } from "../../store/reducers/EntrySurveyReducer";
import { DENY_ENTRY, ALLOW_ENTRY } from "../../../common/constants/constants";

const { Option } = Select;

interface Props {
    closePopUp?: () => any,
    name: string,
    handleCheckBoxChange: (value: any) => any,
    handleChange: (value: any, id: number, desc: string) => any,
    handleSubmit: (value: any) => any,
    disabled: boolean;
    buttonText: string;
}

export default function ModalMark(props: Props) {
    const dispatch = useDispatch();

    const { disabled, buttonText } = props;
    useEffect(() => {
        dispatch(EntrySurveyActions.entrySurveyRequest({}));
    }, []);

    const entrySurvey = useSelector(entrySurveyResponse);
    let surveyData: any = [];
    if (entrySurvey && entrySurvey?.data && entrySurvey.data.survey) {
        surveyData = entrySurvey.data.survey;
    }


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
                    alt=""
                />
            }
        >
            <div className="flex flex-column mark-modal-body space-between">
                <Checkbox onChange={props.handleCheckBoxChange}>Mark User as Arrived</Checkbox>
                {surveyData.map((question: any) => {
                    return <Select placeholder={question.description} onChange={(e) => props.handleChange(e, question.id, question.description)}>
                        {question.choices.map((choice: any) => {
                            return (
                                <Option className="capitalize" key={choice.choice} value={choice.choice}>
                                    {choice.choice}
                                </Option>
                            );
                        })}
                    </Select>;
                })}
            </div>
            <Row justify="end" align="middle">
                <Button type="primary" disabled={disabled} danger={buttonText === DENY_ENTRY} className={`bold ${buttonText === ALLOW_ENTRY && 'green-background'}`} onClick={() => props.handleSubmit(buttonText)}>{buttonText}</Button>
            </Row>
        </Modal>
    );
}


