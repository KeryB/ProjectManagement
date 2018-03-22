import {Select, Form, Input} from "antd";

const Option = Select.Option;
const FormItem = Form.Item;

export const FormSelect = ({
                               input,
                               options = [],
                               label,
                               disabled,
                               required,
                               formItemLayout={},
                               meta: {touched, error},
                               placeholder,
                               mode,
                               size = 'default',
                               ...   rest,
                           }) => {
    if (!input.value && (mode === 'tags' || mode === 'multiple')) {
        input.value = [];
    }

    console.log(placeholder);

    const select =
        <Select {...{...input, placeholder, size, disabled, mode, ...rest}}>
            {options.map(({value, label}) => <Option key={value} value={label}>{label}</Option>)}
        </Select>;

    return <FormItem label={label}
                     required={required}
                     labelCol={formItemLayout.labelCol}
                     wrapperCol={formItemLayout.wrapperCol}
                     validateStatus={touched && error ? 'error' : undefined}
                     help={touched && error ? error : undefined}>
        {select}
    </FormItem>;
};


export const TextField = ({
                              input,
                              icon,
                              label,
                              disabled,
                              formItemLayout={},
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
                                   input:                        {onBlue, ...inputRest}, meta: {touched, error},
                                   placeholder = '',
                                   disabled = false, label,
                                   required = false,
                                   range = false,
                                   size = 'default',
                                   withTime = false,
                                   name, validate, normalize, ...rest
                               }) => {
    //if (!input.value) input.value = moment();
    const format = withTime ? fullDateTimeFormat : DATE_ONLY_FORMAT;
    const Component = range ? DatePicker.RangePicker : DatePicker;
    return <FormItem required={required}
                     label={label}
                     validateStatus={touched && error ? 'error' : undefined}
                     help={touched && error ? error : undefined}>
        <Component showTime={withTime}
                   format={format}
                   {...rest}
                   {...inputRest}
                   size={size}
                   disabled={disabled}
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