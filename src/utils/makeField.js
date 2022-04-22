import {
  Form,
  Input,
  Checkbox,
  Select,
  DatePicker,
  Radio,
  InputNumber,
  Cascader,
} from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const FormItem = Form.Item;
const makeField =
  (Component) =>
  ({ input, meta, children, hasFeedback, label, ...rest }) => {
    const hasError = meta.touched && meta.invalid;
    return (
      <FormItem
        {...formItemLayout}
        label={label}
        validateStatus={hasError ? "error" : "success"}
        hasFeedback={hasFeedback && hasError}
        help={hasError && meta.error}
      >
        <Component {...input} {...rest} children={children} />
      </FormItem>
    );
  };
const RadioGroup = Radio.Group;
export const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

export const AInputPass = makeField(Input.Password);
export const AInput = makeField(Input);
export const ARadioGroup = makeField(RadioGroup);
export const ASelect = makeField(Select);
export const ACheckbox = makeField(Checkbox);
export const ATextarea = makeField(TextArea);
export const ARangePicker = makeField(RangePicker);
export const AInputNumber = makeField(InputNumber);
export const ACascader = makeField(Cascader);
