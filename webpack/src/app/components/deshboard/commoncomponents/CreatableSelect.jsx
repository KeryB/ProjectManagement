import {Select} from 'antd';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

const Option = Select.Option;

class CreatableSelect extends Component {

    static defaultProps = {
        value:   '',
        options: [],
    };

    static propTypes = {
        value:    PropTypes.string,
        onChange: PropTypes.func.isRequired,
        options:  PropTypes.array,
    };

    init = props => {
        if (props.value !== this.state.value) {
            this.setState({value: props.value});
        }
    };

    componentWillReceiveProps(props) {
        this.init(props);
    }

    componentWillMount() {
        this.init(this.props);
    }

    state = {
        value: '',
    };

    handleChange = value => this.setState({value}, () => this.props.onChange(value));

    getOptions = () => {
        const {value} = this.state;
        const array = value ? [{value, label: value}, ...this.props.options] : this.props.options;
        return array.map(({value, label}) => <Option key={value} >{label}</Option>);
    };

    render() {
        const {onChange, options, ...rest} = this.props;
        return <Select {...rest}
                       mode="combobox"
                       onChange={this.handleChange}
                       filterOption={false}>
            {this.getOptions()}
        </Select>;
    }
}

export default CreatableSelect;
