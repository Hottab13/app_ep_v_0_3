import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { registrationUser } from "../../redux/actions/actionCreator";
import { createField } from "../../utils/createFields";
import {
  maxLengthCreator,
  requiredField,
  match,
  email,
} from "../../utils/validators";
import { AInputPass, AInput } from "../../utils/makeField";
import { Form, Button, Alert } from "antd";

const FormItem = Form.Item;
const maxLenght = maxLengthCreator(30);

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 6 },
};

const RegistrationForm = ({
  handleSubmit,
  message,
  isToggleLoading,
  isToggleErr,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField(
        "Имя",
        "name",
        undefined,
        [requiredField, maxLenght],
        AInput
      )}
      {createField(
        "Электронная почта",
        "login",
        undefined,
        [requiredField, maxLenght, email],
        AInput
      )}
      {createField(
        "Пароль",
        "password",
        undefined,
        [requiredField, maxLenght],
        AInputPass,
        { type: "password" }
      )}
      {createField(
        "Повторите пароль",
        "confirmPassword",
        undefined,
        [requiredField, maxLenght, match("password")],
        AInputPass,
        { type: "password" }
      )}

      <FormItem>
        {isToggleErr && <Alert message={message} type="error" />}
      </FormItem>
      <FormItem {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={isToggleErr}
          loading={isToggleLoading}
          style={{ marginRight: "10px" }}
        >
          Регистрация
        </Button>
      </FormItem>
    </form>
  );
};
const RegistrationReduxForm = reduxForm({ form: "registration" })(
  RegistrationForm
);

export const Registration = () => {
  const authUser = useSelector((store) => store.authUser);
  const dispatch = useDispatch();
  const onSubmit = (value) => {
    debugger;
    dispatch(registrationUser(value));
  };
  if (authUser.isAuth) return <Navigate to={"/profile"} />;
  return (
    <Fragment style={{ padding: "16px" }}>
      <RegistrationReduxForm
        message={authUser.message}
        isToggleLoading={authUser.isToggleLoading}
        isToggleErr={authUser.isToggleErr}
        onSubmit={onSubmit}
      />
    </Fragment>
  );
};
