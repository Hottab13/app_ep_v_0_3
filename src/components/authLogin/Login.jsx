import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { reduxForm } from "redux-form";
import { loginUser } from "../../redux/actions/actionCreator";
import { createField } from "../../utils/createFields";
import { maxLengthCreator, requiredField, email } from "../../utils/validators";
import { AInputPass, AInput, ACheckbox } from "../../utils/makeField";
//import style from '../../FormControl/FormControl.css'
import { Form, Input, Button, Checkbox, Alert } from "antd";

const FormItem = Form.Item;
const maxLenght = maxLengthCreator(30);

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 6 },
};

const LoginForm = ({ handleSubmit, message, isToggleLoading, isToggleErr }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField(
        "Электронная почта",
        "login",
        undefined,
        [requiredField, maxLenght, email],
        AInput
      )}
      {createField(
        "Пароль",
        "pass",
        undefined,
        [requiredField, maxLenght],
        AInputPass,
        { type: "password" }
      )}
      {createField(
        undefined,
        "remember_me",
        undefined,
        [],
        ACheckbox,
        { type: "checkbox" },
        "Запомнить меня(функция не работает)"
      )}
      <Link to="/registration">Регистрация</Link>
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
          Вход
        </Button>
      </FormItem>
    </form>
  );
};
const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

export const Login = () => {
  const authUser = useSelector((store) => store.authUser);
  const dispatch = useDispatch();
  const onSubmit = (value) => {
    debugger;
    dispatch(loginUser(value));
  };
  if (authUser.isAuth) return <Navigate to={"/profile"} />;
  return (
    <Fragment style={{ padding: "16px" }}>
      <LoginReduxForm
        message={authUser.message}
        isToggleLoading={authUser.isToggleLoading}
        isToggleErr={authUser.isToggleErr}
        onSubmit={onSubmit}
      />
    </Fragment>
  );
};
