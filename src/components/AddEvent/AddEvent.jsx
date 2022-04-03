import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
//import { createField, InputControl } from "../../FormControl/FormControl";
import { maxLengthCreator, requiredField } from "../../utils/validators"; 
import { setNewEvent } from "../../redux/actions/actionCreator";
import { makeField } from "../../utils/makeField";
//import style from "../../FormControl/FormControl";
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


  
  const AInput = makeField(Input);
  //const ARadioGroup = makeField(RadioGroup);
  const ASelect = makeField(Option);
  //const ACheckbox = makeField(Checkbox);
  const ATextarea = makeField(TextArea);
  const ARangePicker = makeField(RangePicker);
  const AInputNumber = makeField(InputNumber);

const maxLenght = maxLengthCreator(30);
const AddEventForm = ({error,handleSubmit, ...props }) => {
    const { pristine, reset, submitting } = props;

  return (
    <div>
      <PageHeader
        style={{ border: "1px solid rgb(235, 237, 240)" }}
        onBack={() => <Link to="/profile" />}
        title="Cоздание события"
        //subTitle="Форма создания нового гнезда"
      />
      <form onSubmit={handleSubmit} style={{ paddingTop: "16px" }}>
        <Field
          label="Название"
          name="name"
          component={AInput}
          placeholder="Введите название события"
          validate={[requiredField, maxLenght]}
          hasFeedback
          validateStatus="success"
        />
<FormItem {...formItemLayout}>
        <Field
          label="Тип события"
          name="type"
          component="select"
          defaultValue="lucy"
          style={{ width: 120 }}
          validate={[requiredField]}
        >
          <option></option>
          <option value="Активный отды">Активный отды</option>
          <option value="Другое">Другое</option>
          <option value="Релакс">Релакс</option>
        </Field>
        </FormItem>
        <Field
          label="Описание"
          name="description"
          component={ATextarea}
          validate={[requiredField, maxLengthCreator(1000)]}
        />

        <Field
          label="Дата проведения"
          name="finalData"
          component={ARangePicker}
          placeholder={["От", "До"]}
          hasFeedback
          validate={[requiredField]}
          onFocus={(e) => e.preventDefault()}
          onBlur={(e) => e.preventDefault()}
        />
        <FormItem {...formItemLayout}>
          <Field
            label="Город"
            name="city"
            component="select"
            validate={[requiredField]}
          >
            <option></option>
            <option value="Саранск">Саранск</option>
            <option value="Москва">Москва</option>
            <option value="Санкт-Петербург">Санкт-Петербург</option>
          </Field>
          </FormItem>
        <Field
          label="Адрес"
          name="address"
          component={AInput}
          placeholder="Введите название"
          validate={[requiredField, maxLenght]}
          hasFeedback
          validateStatus="success"
        />
        <Field
          label="Количество мест"
          name="eventAmountMaximum"
          component={AInputNumber}
          validate={[requiredField]}
        />
        <Field
          label="Возраст. огран."
          name="eventAgeRestrictions"
          component={AInputNumber}
          validate={[requiredField]}
        />

        <FormItem {...tailFormItemLayout}>
          {error && <div>{error}</div>}
          </FormItem>
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

const AddEventReduxForm = reduxForm({
  form: "add_event",
  //validate
})(AddEventForm);


  
export const AddEvent = () => {
  const dispatch = useDispatch();

  const showResults = (value) => {
    debugger
    dispatch(setNewEvent(value))
  };
  /*if(isAuth){
        return <Redirect to={"/profile"}/>
    }*/
  return (
    <div >
      <AddEventReduxForm onSubmit={showResults} />
    </div>
  );
};
