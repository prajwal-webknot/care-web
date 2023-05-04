import 'antd/dist/antd.css';
import './styles.scss';

import React, { useEffect, useRef } from "react";
import { Button, Card, Form, Input, Row, Spin } from "antd";
import { FORM_ID_LABEL, FORM_PASS_LABEL, FORM_TITLE, LOGIN } from '../../../common/constants/constants';
import { isAuthSuccess, isAuthFailed, loginSelect, loginLoading } from '../../../common/store/auth/AuthReducer';
import { useDispatch, useSelector } from "react-redux";

import { AuthActions } from '../../../common/store/auth/AuthActions';
import { COLORS } from '../../../common/constants/colors';
import { Formik } from "formik";
import { Redirect } from 'react-router-dom';

const formLayout = {
  wrapperCol: { span: 25 },
};
const headerStyle = {
  color: COLORS.lightRed,
  'font-weight': 'bold'
};

const loginButtonStyle = {
  width: '35%'
};

const cardStyle = {
  width: '65%'
};

interface FormFields {
  username: string;
  password: string;
}

interface Props {
  history: string[];
}

export default function LoginForm(props: Props) {
  const dispatch = useDispatch();
  const initialFormValues: FormFields = {
    username: "",
    password: "",
  };

  // Selectors
  const loginResp = useSelector(loginSelect);
  const loading: boolean = useSelector(loginLoading);
  const authSuccess: boolean = useSelector(isAuthSuccess);
  const authFailed: boolean = useSelector(isAuthFailed);


  // Refs
  const userIdRef = useRef<Input>(null);
  const passwordRef = useRef<Input>(null);

  useEffect(() => {
    dispatch(AuthActions.clearReducer());
    localStorage.clear();
    if (userIdRef && userIdRef.current && userIdRef.current !== undefined) {
      userIdRef.current.focus();
    }
  }, []);

  const onSubmit = (values: FormFields) => {
    dispatch(AuthActions.loginRequest({ username: values.username.trim(), password: values.password }));
  };

  function clearReducer() {
    dispatch(AuthActions.clearReducer());
  }

  if (authSuccess) {
    return < Redirect to="/" />;
  }

  return (
    <Spin spinning={loading}>
      <div className="login-container">
        <Row justify="center" align="middle" className="vh-content w-100">
          <Card style={cardStyle} headStyle={headerStyle} title={FORM_TITLE} >
            <Formik
              initialValues={initialFormValues}
              onSubmit={values => onSubmit(values)}
              render={({ values, setFieldValue, handleSubmit, isValid }) => (
                <Form>
                  <Form.Item className="form-item" {...formLayout}>
                    <p className="form-labels">{FORM_ID_LABEL}</p>
                    <Input
                      // autoComplete="off"
                      ref={userIdRef}
                      size="large"
                      name="username"
                      type="text"
                      onChange={event => {
                        setFieldValue("username", event.target.value);
                        clearReducer();
                      }}
                      onPressEnter={() => passwordRef.current?.focus()}
                      value={values.username.trim()}
                    />
                  </Form.Item>
                  <Form.Item className="form-item" {...formLayout}>
                    <p className="form-labels">{FORM_PASS_LABEL}</p>
                    <Input
                      // autoComplete="off"
                      ref={passwordRef}
                      size="large"
                      name={FORM_PASS_LABEL.toLowerCase()}
                      type={FORM_PASS_LABEL.toLowerCase()}
                      onChange={event => {
                        setFieldValue(FORM_PASS_LABEL.toLowerCase(), event.target.value);
                        clearReducer();
                      }}
                      value={values.password.trim()}
                      onPressEnter={() => handleSubmit()}
                    />
                  </Form.Item>
                  {authFailed && (
                    <div className="red-font login-error-msg">
                      {loginResp.error?.errorResp?.message}
                    </div>)}
                  <Row justify="end" align="middle" className="w-100">
                    <Button
                      style={loginButtonStyle}
                      type="primary"
                      onClick={() => handleSubmit()}
                      disabled={!isValid}>
                      {LOGIN}
                    </Button>
                  </Row>
                </Form>
              )}
            />
          </Card>
        </Row>
      </div>
    </Spin>
  );
}


