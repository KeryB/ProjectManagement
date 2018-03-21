import {Select} from "antd";

const Option = Select.Option;

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
            {options.map(({value, label}) => <Option key={value} value={value}>{label}</Option>)}
        </Select>;

    return <FormItem label={label}
                     required={required}
                     validateStatus={touched && error ? 'error' : undefined}
                     help={touched && error ? error : undefined}>
        {select}
    </FormItem>;
};