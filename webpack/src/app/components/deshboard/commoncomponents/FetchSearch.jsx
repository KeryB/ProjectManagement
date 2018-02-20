import * as React from "react";
import {Input} from 'antd';
import PropTypes from 'prop-types';

const Search = Input.Search;

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

    componentWillUnmount() {
        clearTimeout(this._autoTimer);
    }

    _handleChange = (autoTimeout) => {
        console.log(autoTimeout);
        if (autoTimeout > 0) {
            this._autoTimer = setTimeout(() => {
                clearTimeout(this._autoTimer);
            }, autoTimeout);
        }
    };

    render() {
        const {autoTimeout, placeHolder, onChange} = this.props;

        return (
            <field>
                <Search
                    autoSubmit={this._handleChange}
                    label={placeHolder}
                />
            </field>
        )
    }

}
export default FetchSearch;