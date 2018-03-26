import * as React from "react";
import {Avatar, Icon, Select} from "antd";
import PropTypes from "prop-types";

class FetchSelect extends React.Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
        loading: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    render() {
        const {data, mode, onBlur, onChange, onFocus, onSelect, placeholder, size, filterOption, loading} = this.props;


        return (
            <div className="fetch-selector">
                { loading ? <Icon type='loading'/> : undefined}
                <Select mode={mode}
                        onBlur={onBlur}
                        onChange={onChange}
                        onFocus={onFocus}
                        onSelect={onSelect}
                        placeholder={placeholder}
                        size={size}
                        filterOption={filterOption}
                >
                    {data}
                </Select>
            </div>
        )
    }
}

export default FetchSelect;