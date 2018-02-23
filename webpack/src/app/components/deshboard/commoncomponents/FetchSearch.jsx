import * as React from "react";
import {Input} from 'antd';
import PropTypes from 'prop-types';


const field = ( {autoSubmit, input: {onChange, ...rest}, label}) => (
    <Input.Search {...{...rest}} onChange={e => {
        onChange(e);
    }} placeholder={label}/>
);

class FetchSearch extends React.Component {

    static propTypes = {
        placeHolder: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        autoTimeout: PropTypes.number
    };

    constructor(props) {
        super(props);
        this._autoTimer = null;
    }

    state ={

    }

    componentWillUnmount() {
        clearTimeout(this._autoTimer);
    }

    _handleChange = (e) => {

        console.log(e);
            this._autoTimer = setTimeout(() => {
                clearTimeout(this._autoTimer);
                this.state.name=e.target.value;
                console.log(this.state)
            }, 500);

    };

    render() {
        const {autoTimeout, placeHolder, onChange} = this.props;

        return (
            <Input.Search onChange={this._handleChange}/>
        )
    }

}
export default FetchSearch;