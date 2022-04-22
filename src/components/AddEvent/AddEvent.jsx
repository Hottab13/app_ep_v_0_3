import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, requiredField, number } from "../../utils/validators";
import { setNewEvent, uploadPhotoAvaEvent } from "../../redux/actions/actionCreator";
import { AInput, ATextarea, ARangePicker, AInputNumber, ASelect , Option} from "../../utils/makeField";
import { createField, createFieldSelect } from '../../utils/createFields'
import {
  Form,
  Button,
  PageHeader,
  Alert
} from "antd";
import {optionsCiti, optionsType} from "../../assets/data/index"
import PicturesWall from "../Profile/PostInfo/UploadPhotoAva";

const FormItem = Form.Item;

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

const maxLenght = maxLengthCreator(100);
const AddEventForm = ({uploadPhoto,success,err,message,isToggleLoading,error,handleSubmit, ...props }) => {
    const { pristine, reset, submitting } = props;
  return (
    <div>
      <PageHeader
        style={{ border: "1px solid rgb(235, 237, 240)" }}
        onBack={() => <Link to="/profile" />}
        title="Cоздание события"
        //subTitle="Форма создания нового гнезда"
      />
      <form onSubmit={handleSubmit} style={{ paddingTop: "16px" }} >
        {createField("Введите название события", "name", "Название", [requiredField, maxLenght], AInput)}
        {createFieldSelect("Выберите тип", "type", "Тип события", [requiredField], ASelect, optionsType)}
        {createField("Введите описание", "description", "Описание события", [requiredField, maxLengthCreator(2000)], ATextarea)}
        <Field
          label="Дата проведения"
          name="dateOfTheEvent"
          component={ARangePicker}
          placeholder={["От", "До"]}
          hasFeedback
          validate={[requiredField]}
          onFocus={(e) => e.preventDefault()}
          onBlur={(e) => e.preventDefault()}
  />
        {createFieldSelect("Выберите город", "city", "Город события", [requiredField], ASelect, optionsCiti)}
        {createField("Введите адрес", "address", "Адрес проведения события", [requiredField, maxLengthCreator(100)], AInput)}
        <Field
          label="Количество мест"
          name="amountMaximum"
          component={AInputNumber}
          validate={[requiredField,number]}
          min={1}
          max={1000}
          defaultValue={1}
        />
        <Field
          label="Возраст. огран."
          name="ageRestrictions"
          component={AInputNumber}
          validate={[requiredField, number]}
          min={18}
          max={100}
          defaultValue={18}
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\+\s?|(,*)/g, '')}
        />
        <PicturesWall 
            uploadPhoto={uploadPhoto}/>
            
        <FormItem {...tailFormItemLayout}>
          {err ? <Alert message={"Ошибка: " + message} type="error" /> :
            success ?
              <Alert message={"Событие успешно создано: " + message} type="success" />
              : ""}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={pristine || submitting || err || success}
            loading={isToggleLoading}
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
  const events = useSelector((state)=>state.events);
  const {isAuth} = useSelector((state) => state.authUser);
  const uploadPhoto=(imgData)=>{
    debugger
    dispatch(uploadPhotoAvaEvent(imgData)); 
  }
  const showResults = (value) => {
    debugger
    dispatch(setNewEvent(value))
  };
  if (!isAuth) return <Navigate to={"/login"} />
  return (
    <React.Fragment >
      <AddEventReduxForm 
      uploadPhoto={uploadPhoto}
      onSubmit={showResults}
      isToggleLoading={events.isToggleLoading}
      err={events.isToggleErr} 
      success={events.isToggleSuccess} 
      message={events.message}
       />
    </React.Fragment>
  );
};
