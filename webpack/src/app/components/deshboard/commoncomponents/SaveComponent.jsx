import * as React from "react";
import PropTypes from "prop-types";
import {Button, Icon} from "antd";
import * as crudAction from "../../../actions/reduxCrud/crudActions";
import {isEmpty} from "lodash";
import {connect} from "react-redux";

class SaveComponent extends React.Component {

    static propTypes = {
        buttonText: PropTypes.string.isRequired,
        iconType: PropTypes.string.isRequired,
        dataCallback: PropTypes.object.isRequired,
        form: PropTypes.object.isRequired,
    };

    state = {
        loading: false,
        data:{}
    };

    handleClick = () => {
        const {dataCallback} = this.props;


        console.log(dataCallback);
        if(!isEmpty(dataCallback)){
            console.log(dataCallback);
        }
    };

    onSubmit =() =>{
        const {onSubmit} = this.props;

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.state.fieldValues = values;
                console.log(this.props);
                console.log(this.state)
            }
        });
    };

    render() {
        const {buttonText, iconType,form} = this.props;

        return (
            <Button type="primary" htmlType="submit" loading={this.state.loading} onClick={this.onSubmit}>
                <Icon type={this.state.loading ? undefined : iconType}/>{buttonText}
            </Button>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

function mapStateToProps(state) {
    return {
    }
}

export default SaveComponent;