import * as React from "react";
import 'antd/dist/antd.css';
import './styles.scss';
import * as Yup from "yup";

import { Button, Card, Form, Input } from "antd";
import {
  // PASSWORD_CHANGE_FAILURE,
  PASSWORD_CHANGE_SUCCESS
} from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";

import { ChangePasswordActions } from "../../store/changePassword/ChangePasswordAction";
import ConfirmationModal from "../confirmationModal";
import { Formik } from "formik";
import SubHeader from '../SubHeader/SubHeader';
import { changePassSelect } from "../../store/changePassword/ChangePasswordReducer";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string(),
  newPassword: Yup.string()
    .min(8, 'Password must contain be 8 -16 Character.')
    .max(16, 'Password must contain be 8 -16 Character.')
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
      // .matches(/(?=.*[A-Z])/,
      "Password must contain one uppercase, one lowercase, one numeric and one special character."),
  confirmPassword: Yup.string()
    .when("newPassword", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("newPassword")],
        "Password doesn't match."
      )
    })
});

interface Props {
  history: string[];
}

export default function ChangePasswordScreen(props: Props) {
  const dispatch = useDispatch();
  const changePassResp = useSelector(changePassSelect);
  console.log('changePassResp', changePassResp);

  const initialFormValues: any = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };


  const [openConfirmation, toggleConfirmationModal] = React.useState(false);

  const onSubmit = (values: any, form: any) => {
    dispatch(ChangePasswordActions.ChangePasswordRequest({
      old_password: values.currentPassword,
      new_password: values.newPassword,
      refresh: localStorage.getItem('refreshToken')
    }));
    form.resetForm({});
    setTimeout(() => {
      openComfirmationPopUp();
    }, 1000);
  };

  function openComfirmationPopUp() {
    toggleConfirmationModal(true);
  }

  function closeComfirmationPopUp() {
    toggleConfirmationModal(false);
  }
  return (
    <div className="layout-container flex flex-column layout-vh">
      <SubHeader
        parent={"/"}
        title={'Change Password'}
      />
      <div className="flex center vertical-center">
        <Card className="w-50 flex center" bodyStyle={{ width: '70%', padding: '40px' }}>
          <Formik
            initialValues={initialFormValues}
            validationSchema={validationSchema}
            onSubmit={(values, form) => onSubmit(values, form)}
            render={({ values, errors, setFieldValue, handleSubmit, isValid, resetForm }) => (
              <Form>
                <Form.Item>
                  <Input
                    size="large"
                    name="currentPassword"
                    placeholder="Current Password"
                    type="password"
                    onChange={event => {
                      setFieldValue("currentPassword", event.target.value);
                    }}
                    value={values.currentPassword}
                  />
                </Form.Item>

                <Form.Item>
                  <Input
                    size="large"
                    name="newPassword"
                    placeholder="New Password"
                    type="password"
                    onChange={event => {
                      setFieldValue("newPassword", event.target.value);
                    }}
                    value={values.newPassword}
                    onPressEnter={() => handleSubmit()}
                  />
                </Form.Item>
                {errors.newPassword && <div className="red-font message">{errors.newPassword}</div>}

                <Form.Item>
                  <Input
                    size="large"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    onChange={event => {
                      setFieldValue("confirmPassword", event.target.value);
                    }}
                    value={values.confirmPassword}
                    onPressEnter={() => handleSubmit()}
                  />
                </Form.Item>
                {errors.confirmPassword && <div className="red-font message">{errors.confirmPassword}</div>}
                <div className="flex flex-row end">
                  <Button type="primary"
                    disabled={!values.currentPassword && !values.newPassword && !values.confirmPassword}
                    onClick={() => {
                      setFieldValue("currentPassword", '');
                      setFieldValue("newPassword", '');
                      setFieldValue("confirmPassword", '');
                    }}>
                    CANCEL
                  </Button>
                  <Button
                    className="change-pass-reset-button"
                    type="primary"
                    onClick={() => handleSubmit()}
                    disabled={!isValid || !values.newPassword}
                  >
                    RESET
                  </Button>
                </div>
                <div className="red-font message password-pattern">{'*Note: Password must contain one uppercase, one lowercase, one numeric and one special character.'}</div>
              </Form>
            )}
          />
        </Card>
      </div>
      {openConfirmation && !changePassResp.isFetching &&
        <ConfirmationModal
          closeComfirmationPopUp={closeComfirmationPopUp}
          displayMessage={changePassResp?.error ? changePassResp?.data?.errorResp?.message : PASSWORD_CHANGE_SUCCESS}

        />
      }
    </div>
  );
}


