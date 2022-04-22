import React from "react";
import { Field } from "redux-form";
import styles from "./FormControl.css";

const FormControl = ({ meta: { touched, error }, children }) => {
  const hasError = error && touched;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : " ")}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  );
};
export const Texteria = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...restProps} {...input} />
    </FormControl>
  );
};
export const InputControl = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...restProps} {...input} />
    </FormControl>
  );
};
export const createFieldSelect = (
  placeholder,
  name,
  label,
  validate,
  component,
  options
) => {
  return (
    <Field
      placeholder={placeholder}
      name={name}
      label={label}
      validate={validate}
      component={component}
      options={options}
      onBlur={(e) => {
        e.preventDefault();
      }}
    />
  );
};

export const createField = (
  placeholder,
  name,
  label,
  validate,
  component,
  props = {},
  text = ""
) => {
  return (
    <Field
      placeholder={placeholder}
      name={name}
      label={label}
      validate={validate}
      component={component}
      {...props}
    />
  );
};
