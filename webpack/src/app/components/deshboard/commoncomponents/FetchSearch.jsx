import * as React from "react";
import {Icon, Input} from 'antd';
import PropTypes from 'prop-types';
import {isEmpty} from "lodash";


const FetchSearchComponent = ({label, onChange, isLoading, suffix}) => (
    <span>
        <Input placeholder={label} onChange={onChange} style={{width: '200px'}}/>
        {isLoading ? <Icon type="loading"/> :
            <span>{suffix}</span>
        }
    </span>
);

class FetchSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            isLoading: false
        };
    }

    static propTypes = {
        placeHolder: PropTypes.string.isRequired,
        onChange: PropTypes.func,
    };


    componentWillMount() {
        this.timer = null;
    }

    handleChange = (e) => {
        clearTimeout(this.state.timer);
        this.setState({
            value: e.target.value,
            isLoading: true
        });
        this.state.timer = setTimeout(this.triggerChange, 500);
    };

    triggerChange = () => {
        const {value} = this.state;
        this.setState({
            isLoading: false
        });
        this.props.onChange(value);
    };

    handleChangeState=()=>{
        this.setState({value: ''});

    };

    render() {
        const {autoTimeout, placeHolder} = this.props;
        const {isLoading, value} = this.state;
        const suffix = value ? <Icon type="close-circle" onClick={this.handleChange}/> :
            <Icon type="search"/>;
        return (
            <FetchSearchComponent
                label={placeHolder}
                onChange={this.handleChange}
                isLoading={isLoading}
                suffix={suffix}/>
        )
    }

}

export default FetchSearch;