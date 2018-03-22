import {Select, Form, Input, DatePicker, TimePicker} from "antd";
import {DATE_ONLY_FORMAT, fullDateTimeFormat} from "../../utils/DateUtils";
import {Editor} from "react-draft-wysiwyg";

const Option = Select.Option;
const FormItem = Form.Item;

export const FormSelect = ({
                               input,
                               options = [],
                               label,
                               disabled,
                               required,
                               formItemLayout = {},
                               meta: {touched, error},
                               placeholder,
                               mode,
                               size = 'default',
                               ...rest,
                           }) => {
    if (!input.value && (mode === 'tags' || mode === 'multiple')) {
        input.value = [];
    }
    

    const data =[];
    options.forEach(({value,label}, i)=>{
        data.push(<Option key={value}>{label}</Option>)
    });

    return <FormItem label={label}
                     required={required}
                     labelCol={formItemLayout.labelCol}
                     wrapperCol={formItemLayout.wrapperCol}
                     validateStatus={touched && error ? 'error' : undefined}
                     help={touched && error ? error : undefined}>
        <Select {...{...input, placeholder, size, disabled, mode, ...rest}}>
            {data}
        </Select>
    </FormItem>
};


export const TextField = ({
                              input,
                              icon,
                              label,
                              disabled,
                              formItemLayout = {},
                              required,
                              placeholder,
                              type = 'text',
                              size = 'default',
                              meta: {touched, error}, name, validate,
                              wrapperProps = {},
                              ...   rest,
                          }) => {

    const Comp = type === 'textarea' ? Input.TextArea : Input;

    return <FormItem label={label}
                     required={required}
                     labelCol={formItemLayout.labelCol}
                     wrapperCol={formItemLayout.wrapperCol}
                     validateStatus={touched && error ? 'error' : undefined}
                     help={touched && error ? error : undefined}
                     {...{...wrapperProps}}>
        <Comp {...{...input, placeholder, disabled, type, size, ...rest}}
              prefix={icon ? icon : null}/>
    </FormItem>;
};

export const FormDatePicker = ({
                                   input, meta: {touched, error},
                                   placeholder = '',
                                   disabled = false, label,
                                   required = false,
                                   formItemLayout = {},
                                   range = false,
                                   size = 'default',
                                   withTime = false,
                                   name, validate, normalize, ...rest
                               }) => {
    // const format = withTime ? fullDateTimeFormat : DATE_ONLY_FORMAT;
    // const Component = range ? DatePicker.RangePicker : DatePicker;
    return <FormItem required={required}
                     label={label}
                     validateStatus={touched && error ? 'error' : undefined}
                     labelCol={formItemLayout.labelCol}
                     wrapperCol={formItemLayout.wrapperCol}
                     help={touched && error ? error : undefined}>
        <DatePicker
                   placeholder={placeholder}/>
    </FormItem>;
};

export const FormTimePicker = ({
                                   input: {onBlur, ...inputRest}, meta: {touched, error},
                                   disabled, label, required = false,
                                   placeholder = '',
                                   size = 'default',
                                   seconds = false,
                                   ...    rest
                               }) => {

    return <FormItem required={required}
                     label={label}
                     validateStatus={touched && error ? 'error' : undefined}
                     help={touched && error ? error : undefined}>
        <TimePicker {...inputRest}
                    {...rest}
                    format={seconds ? undefined : hourMinuteFormat}
                    disabled={disabled}
                    size={size}
                    placeholder={placeholder}/>
    </FormItem>;
};

export const FormAutoComplete = ({
                                     input,
                                     options = [],
                                     label,
                                     disabled,
                                     required,
                                     meta: {touched, error},
                                     placeholder,
                                     name, validate,
                                     wrapperProps = {},
                                     ...   rest,
                                 }) => {
    return <FormItem label={label}
                     required={required}
                     {...wrapperProps}
                     validateStatus={touched && error ? 'error' : undefined}
                     help={touched && error ? error : undefined}>
        <AutoComplete
            dataSource={options}
            disabled={disabled}
            filterOption={filterOptions}
            value={input.value}
            optionLabelProp='value'
            onChange={input.onChange}
            onSelect={(v, o) => input.onChange(o.key)}
            placeholder={placeholder}
            {...rest}
        />
    </FormItem>;
};

export const FormEditWysiwyg = ({
                                    input,
                                    label,
                                    meta: {touched, error},
                                    placeholder,
                                    formItemLayout = {},
                                    editorState,
                                    required = false,
                                    ...rest,
                                }) => {

    return <FormItem required={required}
                     label={label}
                     validateStatus={touched && error ? 'error' : undefined}
                     labelCol={formItemLayout.labelCol}
                     wrapperCol={formItemLayout.wrapperCol}
                     help={touched && error ? error : undefined}>
        <Editor {...{...input, placeholder, ...rest}}
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
        />
    </FormItem>;
};