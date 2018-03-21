import {Select, Form, Input} from "antd";

const Option = Select.Option;
const FormItem = Form.Item;

export const FormSelect = ({
                               input,
                               options = [],
                               label,
                               disabled,
                               required,
                               meta: {touched, error},
                               placeholder,
                               mode,
                               size = 'default',
                               ...   rest,
                           }) => {
    if (!input.value && (mode === 'tags' || mode === 'multiple')) {
        input.value = [];
    }
    const select =
        <Select {...{...input, placeholder, size, disabled, mode, ...rest}}>
            {options.map(({value, label}) => <Option key={value} value={label}>{label}</Option>)}
        </Select>;

    return <FormItem label={label}
                     required={required}
                     validateStatus={touched && error ? 'error' : undefined}
                     help={touched && error ? error : undefined}>
        {select}
    </FormItem>;
};


export const FormInput = ({input, label, placeholder, type, meta: {touched, error, warning}}) => {

    return <FormItem label={label}
                     required={required}
                     validateStatus={touched && error ? 'error' : undefined}
                     help={touched && error ? error : undefined}>
        <Input {...input} placeholder={placeholder} type={type}/>
    </FormItem>
};