import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { loginUser} from '../../redux/actions/actionCreator'
import {createField, InputControl} from '../../FormControl/FormControl'
import { maxLengthCreator, requiredField } from '../../utils/validators'
import style from '../../FormControl/FormControl.css'
//import { AppStateType } from '../../redux/ReduxStore'
/*************************************** */
import { Form, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 6 },
};

/************************************************* */
const NewInput = ({
    ...rest
}) => {
return (
<FormItem>
<Input rows={4} {...rest.input} />
</FormItem>);
};
const NewInputPass = ({
    ...rest
}) => {
return (
<FormItem>
<Input.Password rows={4} {...rest.input} />
</FormItem>);
};
const NewCheckbox = ({
    ...rest
}) => {
return (
<FormItem>
<Checkbox  {...rest.input}>Remember me</Checkbox>
</FormItem>);
};

const maxLenght = maxLengthCreator(30)
const LoginForm =({handleSubmit, error }) =>{
    return (
        <form onSubmit={handleSubmit}>
        {createField("Login","login",undefined,[requiredField, maxLenght],NewInput)}
        {createField("Password","pass",undefined,[requiredField, maxLenght],NewInputPass,{type:"password"})}
        {createField(undefined,"remember_me",undefined,[],NewCheckbox,{type:"checkbox"})}
        {/*<FormItem label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
            {createField("Login","login",undefined,[requiredField, maxLenght],NewInput)}
        </FormItem>
        <FormItem label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
            {createField("Password","pass",undefined,[requiredField, maxLenght],NewInputPass,{type:"password"})}
        </FormItem>
        <FormItem {...tailLayout} name="remember_me" valuePropName="checked"> 
            {createField(undefined,"remember_me",undefined,[],NewCheckbox,{type:"checkbox"})}
        </FormItem>
        <FormItem {...tailLayout}>{error &&<div className={style.formSummaryError}>{error}</div>}</FormItem>
*/}  
            <div>
            <FormItem {...tailLayout}>
            <Button type="primary" htmlType="submit">Login</Button>
                </FormItem>
            </div>
        </form>
       )
}
//const LoginReduxForm = reduxForm<LoginFormValueType,LoginFormOwnProps>({form:'login'})(LoginForm);
const LoginReduxForm = reduxForm({form:'login'})(LoginForm);

export const Login =() =>{
const { isAuth } = useSelector(store => store?.authUser);
//const captchaUrl = useSelector((state:AppStateType)=>state.auth.captchaUrl)
const dispatch = useDispatch() 
    const onSubmit = (value)=>{
        debugger
        dispatch(loginUser(value) )
    }
    if(isAuth) return <Navigate to={"/"}/>
    
    return (
        <div style={{padding:"16px"}}>
           <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}
