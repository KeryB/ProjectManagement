import * as React from "react";
import PropTypes from "prop-types";
import {Button, Icon} from "antd";
import * as crudAction from "../../../actions/reduxCrud/crudActions";
import {bindActionCreators} from "redux/index";
import {connect} from "react-redux";
import {isEmpty} from "lodash";

class SaveComponent extends React.Component {

    static propTypes = {
        buttonText: PropTypes.string.isRequired,
        iconType: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired,
        crudAction
    };

    state = {
        loading: false,
        data:{}
    };

    handleClick = () => {
        const {data} = this.state;
        const {crudAction} = this.props;
        if(!isEmpty(data)){

        }
    };

    render() {
        const {buttonText, iconType, onSubmit} = this.props;
        return (
            <Button type="primary" htmlType="submit" loading={this.state.loading} onClick={this.handleClick}>
                <Icon type={this.state.loading ? undefined : iconType}/>{buttonText}
            </Button>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(crudAction, dispatch),
    }
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveComponent);