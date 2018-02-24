import * as React from "react";
import {Icon, Input} from 'antd';
import PropTypes from 'prop-types';


const FetchSearchComponent = ({label, onChange, isLoading}) => (
    <span>
        <Input placeholder={label} onChange={onChange} style={{width: '200px'}}/>
        {isLoading ? <Icon type="loading" />: <Icon type="search" />}
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

    render() {
        const {autoTimeout, placeHolder} = this.props;
        const {isLoading} = this.state;
        return (
            <FetchSearchComponent label={placeHolder} onChange={this.handleChange} isLoading={isLoading}/>
        )
    }

}

export default FetchSearch;