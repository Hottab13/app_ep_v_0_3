import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { createField, InputControl } from "../common/FormControl/FormControl";
import { maxLengthCreator, requiredField } from "../utils/validators";
import style from "../common/FormControl//FormControl.module.css";
//import { AppStateType } from "../../redux/ReduxStore";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Radio,
  InputNumber,
  PageHeader,
} from "antd";
//@ts-ignore
import {SelectField} from 'redux-form-antd'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
//const { Number } = InputNumber;
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 }
    }
  };
const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 14,
        offset: 6
      }
    }
  };
//@ts-ignore
const makeField = (Component) => ({ input, meta, children, hasFeedback, label, ...rest }) => {
    const hasError = meta.touched && meta.invalid;
    return (
      <FormItem
        {...formItemLayout}
        label={label}
        validateStatus={hasError ? "error" : "success"}
        hasFeedback={hasFeedback && hasError}
        help={hasError && meta.error}
      >
        <Component {...input} {...rest} children={children}/>
      </FormItem>
    );
  };
  
  const AInput = makeField(Input);
  //const ARadioGroup = makeField(RadioGroup);
  const ASelect = makeField(Select);
  //const ACheckbox = makeField(Checkbox);
  const ATextarea = makeField(TextArea);
  const ARangePicker = makeField(RangePicker);
  const AInputNumber = makeField(InputNumber);


const maxLenght = maxLengthCreator(10);
const AddNestForm = ({error, ...props }) => {
    const { handleSubmit, pristine, reset, submitting } = props;
  /*const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };*/
  // rules={[{ required: true, message: "Пожалуйста введите название!" }]}
  return (
      <div>
    <PageHeader
    style={{ border: "1px solid rgb(235, 237, 240)" }}
    onBack={() => <Link to="/profile"/>}
    title="Cоздание гнезда"
    //subTitle="Форма создания нового гнезда"
  />
    <form onSubmit={handleSubmit} style={{ paddingTop: "16px" }}>
      
      <Field
        label="Название"
        name="nestName"
        component={AInput}
        placeholder="Введите название"
        validate={[requiredField, maxLenght]}
        hasFeedback
        validateStatus="success"
        
      />
      {/*<Field
        label="Тип"
        name="nestType"
        component={ASelect}
        onChange={handleChange}
      >
        <Option value="ff0000">ff0000</Option>
        <Option value="00ff00">00ff00</Option>
        <Option value="0000ff">0000ff</Option>
      </Field>*/}
      <FormItem {...tailFormItemLayout}>
      <Field name="nestType" component="select" validate={[requiredField]}>
            <option></option>
            <option value="Активный отдых">Активный отдых</option>
            <option value="Другое">Другое</option>
            <option value="Релакс">Релакс</option>
  </Field>
  </FormItem>
      <Field
        label="Описание"
        name="nestLocation"
        component={ATextarea}
        validate={[requiredField, maxLengthCreator(1000)]}
      />

      <Field
        label="Дата проведения"
        name="nestDate"
        //@ts-ignore
        component={ARangePicker}
        placeholder={["От", "До"]}
        hasFeedback
        validate={[requiredField]}
        onFocus={(e) => e.preventDefault()}
        onBlur={(e) => e.preventDefault()}
      />
      <FormItem >
      <Field
        label="Адрес"
        name="nestName"
        component={AInput}
        placeholder="Введите название"
        validate={[requiredField, maxLenght]}
        hasFeedback
        validateStatus="success"
        
      />
      <Field
        //label="Улица"
        name="nestName"
        component={AInput}
        placeholder="Введите название"
        validate={[requiredField, maxLenght]}
        hasFeedback
        validateStatus="success"
        
      />
      </FormItem>
      <Field
        label="Количество мест"
        name="nestAmountMaximum"
        component={AInputNumber}
        validate={[requiredField]}
      />
      <Field
        label="Возраст. огран."
        name="nestAgeRestrictions"
        component={AInputNumber}
        validate={[requiredField]}
      />
      {/*<Form.Item
          label="Адресс"
          name="nestLocation"
          rules={[{ required: true, message: "Пожалуйста введите адрес!" }]}
        >
          {createField<NestFormValueTypeKey>(
            "Адресс",
            "nestLocation",
            [requiredField, maxLenght],
            NewInput
          )}
        </Form.Item>
        <Form.Item
          label="Время"
          name="nestTime"
          rules={[{ required: true, message: "Пожалуйста введите время!" }]}
        >
          {createField<NestFormValueTypeKey>(
            "Время",
            "nestTime",
            [requiredField, maxLenght],
            NewInput
          )}
        </Form.Item>
        <FormItem {...tailLayout}>
          {error && <div className={style.formSummaryError}>{error}</div>}
          </FormItem>*/}
      <FormItem {...tailFormItemLayout}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={pristine || submitting}
          style={{ marginRight: "10px" }}
          
        >
          Создать
        </Button>

        <Button disabled={pristine || submitting} onClick={reset}>
          Очистить
        </Button>
      </FormItem>
    </form>
    </div>
  );
};
const validate = (values) => {
    const errors = {};
    if (!values.nestName) {
      //errors.nestName = "Required";
    }
  
    return errors;
  };
const AddNestReduxForm = reduxForm<NestFormValueType, LoginFormOwnProps>({
  form: "add_nest",
  validate
})(AddNestForm);


  
export const AddNest = () => {
  //const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  //const captchaUrl = useSelector((state:AppStateType)=>state.auth.captchaUrl)
  const dispatch = useDispatch();

  const showResults = (value) => {
    console.log(value)
    //dispatch(loginUser(value.nestName, value.pass));
  };
  /*if(isAuth){
        return <Redirect to={"/profile"}/>
    }*/
  return (
    <div >
      <AddNestReduxForm onSubmit={showResults} />
    </div>
  );
};
