import {Checkbox} from 'antd';
import * as React from "react";
import PropTypes from "prop-types";

const CheckboxGroup = Checkbox.Group;

// const plainOptions = ['Apple', 'Pear', 'Orange'];
// const defaultCheckedList = ['Apple', 'Orange'];

class GroupCheckbox extends React.Component {

    static propTypes = {
        plainOptions: PropTypes.array.isRequired,
        defaultCheckedList: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            checkedList: [],
            indeterminate: true,
            checkAll: false,
        }
    }

    onChange = (checkedList) => {
        const {plainOptions, defaultCheckedList} = this.props;
            this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll: checkedList.length === plainOptions.length,
        });
    };

    onCheckAllChange = (e) => {
        const {plainOptions, defaultCheckedList} = this.props;
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };

    render() {
        const {plainOptions, defaultCheckedList} = this.props;
        return (
            <div>
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        Доступ
                    </Checkbox>
                </div>
                <br />
                <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
            </div>
        );
    }
}

export default GroupCheckbox;