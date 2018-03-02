import * as React from "react";
import PropTypes from "prop-types";
import {Button, Icon, notification } from "antd";
import * as crudAction from "../../../actions/reduxCrud/crudActions";
import {isEmpty} from "lodash";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as projectAction from "../../../actions/project/ProjectAction";
import * as Path from '../../../utils/RoutePath'

const openNotificationWithIcon = (type, messageText, descriptionText) => {
    notification[type]({
        message: messageText,
        description: descriptionText,
    });
};

class SaveComponent extends React.Component {

    static propTypes = {
        buttonText: PropTypes.string.isRequired,
        iconType: PropTypes.string.isRequired,
        form: PropTypes.object.isRequired,
        activeAction: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    state = {
        loading: false,
        data:{}
    };

    onSubmit =() =>{
        const {saveAction, history} = this.props;
        console.log(this.props);
        let {loading, data} = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                data = values;
                loading = true;
                saveAction.saveProject(values, ()=> {
                    loading = false;
                    console.log(history);
                    history.push(Path.ROOT);
                    openNotificationWithIcon('success', 'Успешно', 'Проект сохранен');
                }, () =>{
                    openNotificationWithIcon('error', 'Ошибка', 'Что-то пошло не так..');
                    loading = false;
                })
            }
        });
    };

    render() {
        const {buttonText, iconType} = this.props;

        return (
            <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
                <Icon type={this.state.loading ? 'loading' : iconType}/>{buttonText}
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