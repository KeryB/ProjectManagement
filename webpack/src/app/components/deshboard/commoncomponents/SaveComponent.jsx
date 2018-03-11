import * as React from "react";
import PropTypes from "prop-types";
import {Button, Icon, notification} from "antd";
import * as crudAction from "../../../actions/reduxCrud/crudActions";
import * as saveActions from "../../../actions/reduxCrud/SaveActions";
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
        form: PropTypes.object.isRequired,
        affix: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
    };

    state = {
        loading: false,
        data: {}
    };

    onSubmit = () => {
        const {affix, history, saveActions} = this.props;
        let {data} = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                data = values;
                this.state.loading = true;

                saveActions.saveProject(values, () => {
                    this.state.loading = false;
                    history.push(Path.ROOT);

                    openNotificationWithIcon('success', 'Успешно', 'Проект сохранен');
                }, () => {
                    openNotificationWithIcon('error', 'Ошибка', 'Что-то пошло не так..');
                    this.state.loading = false;
                })
            }
        });
    };

    render() {
        const {buttonText} = this.props;
        const {loading} = this.state;
        return (
            <Button
                type='primary'
                loading={loading}
                onClick={this.onSubmit}
                htmlType='submit'>
                {!loading ? <Icon type="save"/> : undefined}{buttonText}
            </Button>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveActions: bindActionCreators(saveActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(SaveComponent);