import * as React from "react";
import PropTypes from "prop-types";
import {Button, Icon} from "antd";
import * as crudAction from "../../../actions/reduxCrud/crudActions";
import {isEmpty} from "lodash";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as projectAction from "../../../actions/project/ProjectAction";

class SaveComponent extends React.Component {

    static propTypes = {
        buttonText: PropTypes.string.isRequired,
        iconType: PropTypes.string.isRequired,
        form: PropTypes.object.isRequired,
        activeAction: PropTypes.object.isRequired
    };

    state = {
        loading: false,
        data:{}
    };

    onSubmit =() =>{
        const {saveAction} = this.props;
        const {data} = this.state;

        this.props.form.validateFields((err, values) => {
            if (!err) {
                saveAction.saveProject(data, ()=> {

                }, (error) =>{

                })
            }
        });
    };

    render() {
        const {buttonText, iconType,form, activeAction} = this.props;

        console.log(activeAction);
        return (
            <Button type="primary" htmlType="submit" loading={this.state.loading} onClick={this.onSubmit}>
                <Icon type={this.state.loading ? undefined : iconType}/>{buttonText}
            </Button>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveAction: bindActionCreators(projectAction, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(SaveComponent);