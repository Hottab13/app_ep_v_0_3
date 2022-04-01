//import { FiledValidatoeType } from '../../utils/validators';
import React from "react";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import styles from "./FormControl.css"

const FormControl =({meta:{touched,error},children})=>{
    const hasError = error && touched
    return(
        <div className={styles.formControl +" "+(hasError? styles.error: " ") }> 
            <div>
                {children}
            </div>
               {hasError && <span>{error}</span>}
        </div>
    )
}
export const Texteria=(props)=>{
    const  {input,meta,...restProps} = props
    return<FormControl {...props}><textarea {...restProps} {...input}/></FormControl>
} 
export const InputControl=(props)=>{
    const  {input,meta,...restProps} = props
    return<FormControl {...props}><input {...restProps} {...input}/></FormControl>
} 

export const createField=(
  placeholder,
  name,
  label,
  validate,
  component,
  props = {},
  text = ""
)=> {
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        label={label}
        validate={validate}
        component={component}
        {...props}
      />
      {text}
    </div>
  );
}
