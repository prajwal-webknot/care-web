import "./styles.scss";

import * as Yup from "yup";
// import {
//   AROGYASETU_STATUS,
//   BODY_TEMP,
//   NATURE_OF_VISIT,
//   R2W_INDEX,
//   R2W_INDEX_STATUS,
// } from "../../../common/constants/constants";
// import { Button, Checkbox, Form, Input, Modal, Row, Select } from "antd";
import { Button, Form, Input, Modal, Row } from "antd";
import React from "react";
import { Formik } from "formik";
import deleteIcon from "../../../common/assets/images/delete.svg";
import moment from "moment";
import localStorage from "redux-persist/es/storage";
// const { Option } = Select;

interface Props {
  siteId: any;
  closePopUp: () => any;
  handleTempVisitSubmit: (data: any) => any;
}

interface FormFields {
  first_name: string;
  last_name: string;
  phone_number: any;
  email: string;
}

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  phone_number: Yup.string().min(10).max(10).required(),
  email: Yup.string().email(),
});

export default function TempVisitorModal(props: Props) {
  const initialFormValues: FormFields = {
    first_name: "",
    last_name: "",
    phone_number: null,
    email: "",
  };
  const onSubmit = (values: any) => {
    values.phone_number = +values.phone_number;
    values.valid_from = moment().unix().toFixed(1);
    values.valid_to = moment().endOf("day").unix().toFixed(1);
    values.site_id = +props.siteId ?? "";
    props.handleTempVisitSubmit(values);
  };

  return (
    <Modal
      visible
      width={400}
      onCancel={props.closePopUp}
      title={<div className="modal-header">Temporary Visitor</div>}
      footer={null}
      closeIcon={<img src={deleteIcon} className="cancel-button" alt="" />}
    >
      <div className="flex flex-column space-between modal-content">
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={(values) => onSubmit(values)}
          render={({ values, setFieldValue, handleSubmit, isValid }) => (
            <Form>
              <Form.Item>
                <Input
                  type="text"
                  onChange={(event) => {
                    setFieldValue("first_name", event.target.value);
                  }}
                  value={values.first_name}
                  placeholder="First Name"
                />
              </Form.Item>
              <Form.Item>
                <Input
                  type="text"
                  onChange={(event) => {
                    setFieldValue("last_name", event.target.value);
                  }}
                  value={values.last_name}
                  placeholder="Last Name"
                />
              </Form.Item>
              <Form.Item>
                <Input
                  className={"phoneInput"}
                  type="tel"
                  maxLength={10}
                  onChange={(event: any) => {
                    const { value } = event.target;
                    const reg = /^\d+$/;
                    if ((!isNaN(value) && reg.test(value)) || value === "") {
                      setFieldValue("phone_number", value);
                    }
                  }}
                  value={values.phone_number}
                  placeholder="Mobile Number"
                />
              </Form.Item>
              <Form.Item>
                <Input
                  type="text"
                  onChange={(event) => {
                    setFieldValue("email", event.target.value);
                  }}
                  value={values.email}
                  placeholder="E-Mail"
                />
              </Form.Item>

              <Row justify="end" align="middle" className="w-100">
                <Button
                  type="primary"
                  className="bold"
                  onClick={() => handleSubmit()}
                  disabled={!isValid}
                >
                  CONFIRM
                </Button>
              </Row>
            </Form>
          )}
        />
      </div>
    </Modal>
  );
}
