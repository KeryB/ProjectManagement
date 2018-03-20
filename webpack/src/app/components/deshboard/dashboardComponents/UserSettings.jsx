import * as React from "react";
import {Button, Card, DatePicker, Divider, Form, Icon, Input, Row, Tabs} from "antd";
import UploadAvatar from "../commoncomponents/UploadAvatar";
import PropTypes from "prop-types";
import ChangePasswordModal from "../commoncomponents/ChangePasswordModal";

class UserSettings extends React.Component {

    static propTypes = {
        userData: PropTypes.object.isRequired
    };

    state = {
        loading: false,
        showModal: false
    };

    handleChangeState = (value) => {
        this.setState(value);
        console.log(this.state)
    };

    handleChangeTabs = () => {

    };

    handleSubmit = (e) => {
        e.preventDefault();
        let {loading} = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.state.loading = true;
                console.log(values);
            }
        });
    }

    handleChangePassword = (e) => {

        this.setState({
            showModal: true,
        });
    }

    componentDidMount() {
        const {setFieldsValue} = this.props.form;
        const {userData: {user}} = this.props;
        setFieldsValue({
            email: user.email,
            firstName: user.firstName,
            secondName: user.secondName,
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {loading, showModal} = this.state;

        console.log(showModal)
        return (
            <div className='settings'>
                <div className='p-block'>
                    <h2>
                        Настройки
                    </h2>
                </div>

                <div className='indent-p-block'>
                    <Tabs defaultActiveKey="1" onChange={this.handleChangeTabs}>
                        <Tabs.TabPane tab="Профиль" key="1">
                            <Row gutter={16}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Item
                                        label="E-mail"
                                        labelCol={{span: 2}}
                                        wrapperCol={{offset: 3}}
                                    >
                                        {getFieldDecorator('email', {
                                            rules: [{required: true, message: 'Поля обязательно для заполнения'}],
                                        })(
                                            <Input style={{width: '50%'}}/>
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        label="Поменять пароль"
                                        labelCol={{span: 2}}
                                        wrapperCol={{offset: 3}}
                                    >
                                        <Button type='primary' onClick={this.handleChangePassword}><Icon type="key"/>Сменить</Button>
                                        <ChangePasswordModal showModal={this.state.showModal} />
                                    </Form.Item>
                                    <Divider/>

                                    <Form.Item
                                        label="Изображение профиля"
                                        labelCol={{span: 2}}
                                        wrapperCol={{offset: 3}}
                                    >
                                        {getFieldDecorator('icon', {})(
                                            <UploadAvatar onChange={this.handleChangeState}/>
                                        )}
                                    </Form.Item>
                                    <Divider/>
                                    <Form.Item
                                        label="Имя"
                                        labelCol={{span: 2}}
                                        wrapperCol={{offset: 3}}
                                    >
                                        {getFieldDecorator('firstName', {
                                            rules: [{required: true, message: 'Поля обязательно для заполнения'}]
                                        })(
                                            <Input style={{width: '50%'}}/>
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        label="Фамилия"
                                        labelCol={{span: 2}}
                                        wrapperCol={{offset: 3}}
                                    >
                                        {getFieldDecorator('secondName', {
                                            rules: [{required: true, message: 'Поля обязательно для заполнения'}]
                                        })(
                                            <Input style={{width: '50%'}}/>
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        label="Дата Рождения"
                                        labelCol={{span: 2}}
                                        wrapperCol={{offset: 3}}
                                    >
                                        {getFieldDecorator('birthDay', {})(
                                            <DatePicker/>
                                        )}
                                    </Form.Item>
                                    <Divider/>
                                    <Button type='primary' loading={loading} style={{left: "44%"}}
                                            htmlType='submit'>{!loading ? <Icon type="save"/> : undefined}Сохранить</Button>
                                </Form>
                            </Row>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Уведомления" key="2">Content of Tab Pane 2</Tabs.TabPane>
                        <Tabs.TabPane tab="Проекты" key="3">Content of Tab Pane 3</Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

UserSettings = Form.create()(UserSettings);

export default UserSettings;