import "./styles.scss";

import { Button, Checkbox, Input, Modal, Row, Select, Typography } from "antd";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntrySurveyActions } from "../../store/actions/EntrySurveyAction";
import deleteIcon from "../../../common/assets/images/delete.svg";
import { entrySurveyResponse } from "../../store/reducers/EntrySurveyReducer";
import { DENY_ENTRY, ALLOW_ENTRY } from "../../../common/constants/constants";

const { Option } = Select;

interface Props {
  closeEditCafe?: () => any;
  // name: string,
  // handleCheckBoxChange: (value: any) => any,
  // handleChange: (value: any, id: number, desc: string) => any,
  handleSubmit: (value: any) => any;
  // disabled: boolean;
  modalData: any;
  buttonText: string;
}

export default function EditCafeModal(props: Props) {
  // const dispatch = useDispatch();
  const { modalData, buttonText, handleSubmit } = props;
  const [seats, setSeats] = useState(modalData.available_seats);
  const [isActive, setIsActive] = useState(modalData.is_active);
  // useEffect(() => {
  //     dispatch(EntrySurveyActions.entrySurveyRequest({}));
  // }, []);

  // const entrySurvey = useSelector(entrySurveyResponse);
  // let surveyData: any = [];
  // if (entrySurvey && entrySurvey?.data && entrySurvey.data.survey) {
  //     surveyData = entrySurvey.data.survey;
  // }

  return (
    <Modal
      visible
      //   width={400}
      onCancel={props.closeEditCafe}
      title={
        <>
          <div className="modal-header">{modalData.cafeteria_name}</div>
          <p>{modalData.site_name}</p>
        </>
      }
      footer={null}
      closeIcon={<img src={deleteIcon} className="cancel-button" alt="" />}
    >
      <div className="flex flex-column mark-modal-body space-between centerAlign">
        <label>Total Capacity</label>
        <Input
          type={"number"}
          size={"large"}
          style={{ width: 400, marginBottom: "1rem" }}
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          min={0}
        />
        <label>Select Area Status</label>
        <Select
          size={"large"}
          defaultValue={isActive}
          style={{ width: 400 }}
          onChange={(val) => setIsActive(val)}
        >
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
      </div>

      <Row justify="end" align="middle" style={{ marginTop: "2.5rem" }}>
        <Button
          type="primary"
          size={"large"}
          onClick={() => handleSubmit({ seats, isActive, id:modalData.id })}
        >
          {buttonText}
        </Button>
      </Row>
    </Modal>
  );
}
