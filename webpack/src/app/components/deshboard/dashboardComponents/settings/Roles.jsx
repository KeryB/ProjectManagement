import React from 'react'
import {Button, Modal} from "antd";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {ModalFooter} from "../../commoncomponents/SubComponents";
import {FormCheckBox, FormRadioGroup, TextField} from "../../../forms/Inputs";
import {required} from "../../../forms/Validation";
import {Permissions} from "./Permissions";

const FORM_ID = 'project_permission';

const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 15},
};


const setDataField = () => {


    Permissions.forEach((item, index) => (
            <Field
                name='note'
                label='Документы'
                formItemLayout={formItemLayout}
                plainOptions={item[index]}
                defaultCheckedList={item[index]}
                component={FormCheckBox}
            />
    ));

};

class Roles extends React.Component {

    static propTypes = {
        visible: PropTypes.bool.isRequired,
    };

    state = {
        loading: false,
        visible: false
    };

    componentWillReceiveProps(props) {
        const {visible} = props;
        this.setState({
            visible: visible
        })
    }

    handleOk = () => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false, visible: false});
        }, 3000);
    };
    handleCancel = () => {
        this.setState({visible: false});
    };

    onSubmit = (values) => {
        console.log(values);
    };

    onHideModal = () => {
        this.setState({
            visible: false
        })
    };

    render() {
        const {handleSubmit} = this.props;
        const {loading, visible} = this.state;
        const {onSubmit, onHideModal} = this;

        const footer = ModalFooter({
            onSubmit: handleSubmit(onSubmit),
            onClose: onHideModal,
            submitButtonMessage: 'Сохранить',
            submitButtonIcon: 'save',
        });

        return (
            <div>
                <Modal
                    visible={visible}
                    title="Роли"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={footer}
                >
                    <form id={FORM_ID} onSubmit={handleSubmit(onSubmit)}>

                        <Field
                            name='name'
                            label='Роль'
                            placeholder='Введите название роли'
                            validate={required}
                            required
                            formItemLayout={formItemLayout}
                            component={TextField}
                        />

                        <Field
                            name='note'
                            label='Примечание'
                            placeholder='Введите примечание'
                            formItemLayout={formItemLayout}
                            component={TextField}
                        />
                        <div className='row-group-modal-checkbox'>

                            <Field
                                name="asdasd"
                                label='Документы'
                                formItemLayout={formItemLayout}
                                plainOptions={Permissions[0].token}
                                defaultCheckedList={Permissions[0].token}
                                component={FormCheckBox}
                            />

                            <Field
                                name="asdasd"
                                label='Задачи'
                                formItemLayout={formItemLayout}
                                plainOptions={Permissions[1].token}
                                defaultCheckedList={Permissions[1].token}
                                component={FormCheckBox}
                            />
                            <Field
                                name="asdasd"
                                label='Обсуждение'
                                formItemLayout={formItemLayout}
                                plainOptions={Permissions[2].token}
                                defaultCheckedList={Permissions[2].token}
                                component={FormCheckBox}
                            />
                            <Field
                                name="asdasd"
                                label='Проект'
                                formItemLayout={formItemLayout}
                                plainOptions={Permissions[3].token}
                                defaultCheckedList={Permissions[3].token}
                                component={FormCheckBox}
                            />
                        </div>

                    </form>
                </Modal>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}


Roles = reduxForm({
    form: FORM_ID
})(Roles);

export default connect(null, mapDispatchToProps)(Roles);