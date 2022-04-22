import React,{Fragment} from 'react';
//import { Cascader, Button } from 'antd';
import {ACascader} from "../../../../utils/makeField"
import { Field, reduxForm } from "redux-form";
import { Row, Col } from 'react-grid-system'; 
//import Cascader, { CascaderProps } from 'antd/lib/cascader';
import {optionsCiti, optionsType} from "../../../../assets/data/index"
import { useDispatch, useSelector } from "react-redux";
import {filtrEvents} from "../../../../redux/actions/actionCreator"

const options = [
    {
      label: 'Город',
      value: 'citi',
      children: optionsCiti,
    },
    {
      label: 'Тип',
      value: 'type',
      children:optionsType
    },
  ];


const FiltrEventForm =()=>{
        const onChange = value => {
        console.log(value);
      };
    return (
        <form >
            <Row align="start" >
                <Col md={4}>
                    <Field
                        component={ACascader}
                        name="casa"
                        style={{ width: '100%' }}
                        options={options}
                        onBlur={e => {
                            e.preventDefault();
                        }
                        }
                        cascaderProps={{
                            placeholder: 'Select city',
                            // loadData: this.loadData,
                            options: options
                        }}
                        onChange={onChange}
                        multiple
                        maxTagCount="responsive"
                    />
                </Col>
            </Row>
        </form>
    )
}
const FiltrEventReduxForm = reduxForm({
    form: "filtr_events",
    //validate
  })(FiltrEventForm);

export const Filtr = () => {
    const dispatch = useDispatch();
    const showResults = value => {
        debugger
        dispatch(filtrEvents(value.casa))
        console.log(value.casa);
    }
    return (
        <Fragment>
            <FiltrEventReduxForm
                onChange={showResults} />
        </Fragment>
    )
}


