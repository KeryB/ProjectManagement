import * as React from "react";
import {Avatar, Icon, Select} from "antd";
import PropTypes from "prop-types";

class FetchSelector extends React.Component {

    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            loading: false
        }
    }

    static propTypes = {
        commonsData: PropTypes.object.isRequired,
        handleFocusSelector: PropTypes.func.isRequired,
        onChange: PropTypes.func,
        data: PropTypes.array.isRequired,
    };

    onSelect=(e)=>{
      console.log(e);
    };

    render() {
        const {data, handleFocusSelector, onChange, commonsData: {isLoading}} = this.props;

        return (
            <div className="fetch-selector">
                {isLoading ? <Icon type='loading' style={{
                    position: 'absolute',
                    marginTop: '10px',
                    zIndex: '10',
                    left: '90%'
                }}/> : undefined}
                <Select
                    showSearch={true}
                    mode="combobox"
                    onFocus={handleFocusSelector}
                    onChange={onChange}
                    onSelect={this.onSelect}
                >
                    {data}
                </Select>
            </div>
        )
    }
}

export default FetchSelector;