import React from 'react'
import {Icon, Tabs, Button} from 'antd';
import {Field, reduxForm, SubmissionError} from 'redux-form'
import {email, inputName, maxLength, required, PASSWORD_IS_NOT_CONFIRM} from "./Validation";
import {connect} from "react-redux";
import * as userAction from "../../actions/UserAction";
import {bindActionCreators} from "redux";
import {API_AUTH_LOGIN, API_AUTH_REGISTRATION} from "../../const/ApiPath";
import {EMAIL_NOT_UNIQUE} from "../../const/http/HttpStatus";
import PropTypes from 'prop-types';

const TabPane = Tabs.TabPane;

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div>
        {touched && error ? <Icon type='exclamation-circle' className='error-icon'/> : undefined}
        <input {...input} placeholder={label} type={type}>
        </input>
        {touched && error ? <span className="line-error"/> : <span className="line"/>}
        {touched && error ? <label className='error-label'>{error}</label> : undefined}
    </div>
);

const renderFieldRegistration = ({input, label, type, meta: {touched, error, warning}, placeHolder}) => (
    <div>
        {touched && error ? <Icon type='exclamation-circle' className='error-icon'/> : undefined}
        <input {...input} placeholder={label} type={type}>
        </input>
        {touched && error ? <span className="line-error"/> : <span className="line"/>}
        {touched && error ? <label className='error-label'>{error}</label> : undefined}
    </div>
);


class AuthProvider extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        loading: false,
        iconLoading: false,
    };

    enterLoading = () => {
        this.setState({loading: true});
    };

    enterIconLoading = () => {
        this.setState({iconLoading: true});
    };

    onSubmitLogin = (values) => {
        const {handleSubmit, userAction, history} = this.props;
        handleSubmit((values, event, props) => new Promise((resolve, reject) => {
            userAction.makeAuth(API_AUTH_LOGIN, values, () => {
                // history.push(Path.ROOT);
            }, () => reject(new SubmissionError({
                password: 'Неверно E-mail или пароль'
            })))
        }))()
    };

    onSubmitRegistration = (values) => {

        if (values.password !== values.confirmPassword) {
            throw new SubmissionError({confirmPassword: PASSWORD_IS_NOT_CONFIRM});
        }

        const {handleSubmit, userAction} = this.props;

        handleSubmit((values, event, props) => new Promise((resolve, reject) => {
            userAction.makeAuth(API_AUTH_REGISTRATION, values, resolve, (error) => {
                if (error.status === EMAIL_NOT_UNIQUE) {
                    reject(new SubmissionError({
                        email: error.message
                    }))
                } else {
                    //todo Показать модальное окно
                }
            })
        }))()
    };

    onChange(props) {
    }

    loginForm() {
        const {submitting, handleSubmit} = this.props;
        console.log(this.props);
        return (
            <div>
                <div>
                    <h2>
                        Вход на сайт
                    </h2>
                    <div className='user'>
                    </div>
                </div>
                <form onSubmit={handleSubmit(this.onSubmitLogin)}>
                    <Field
                        name='email'
                        type='text'
                        component={renderField}
                        validate={[required, email, maxLength]}
                        label="email"
                    />
                    <Field
                        name='password'
                        type='password'
                        component={renderField}
                        validate={[required, maxLength]}
                        label="Пароль"
                    />
                    <Button type="primary" loading={submitting} onClick={this.onSubmitLogin}>
                        Войти
                    </Button>
                </form>
                <div className="forget-password">
                    <a href="#">Забыли пароль?</a>
                </div>
                <div className='footer'>
                    <a href='#'>
                        <Icon type="google-plus" className='fa-google-plus'/>
                    </a>
                    <a href='#'>
                        <Icon type="twitter" className='fa-twitter'/>
                    </a>
                </div>
            </div>
        )
    }

    registrationForm() {
        const {submitting, handleSubmit} = this.props;
        return (
            <div>
                <h2>
                    Регистрация
                </h2>
                <div className='user'>
                </div>
                <form onSubmit={handleSubmit(this.onSubmitRegistration)}>
                    <Field
                        name='firstName'
                        type='text'
                        component={renderFieldRegistration}
                        validate={[required, inputName, maxLength]}
                        label="Введите Имя"
                        placeHolder="Имя"
                    />
                    <Field
                        name='secondName'
                        type='text'
                        component={renderFieldRegistration}
                        validate={[required, inputName, maxLength]}
                        label="Введите Фамилию"
                    />
                    <Field
                        name='email'
                        type='text'
                        component={renderFieldRegistration}
                        validate={[required, email, maxLength]}
                        label="Введите E-mail"
                    />
                    <Field
                        name='password'
                        type='password'
                        component={renderFieldRegistration}
                        validate={[required, maxLength]}
                        label="Пароль"
                    />
                    <Field
                        name='confirmPassword'
                        type='password'
                        component={renderFieldRegistration}
                        validate={required}
                        label="Повторите пароль"
                    />
                    <Button type="primary" loading={submitting} onClick={handleSubmit(this.onSubmitRegistration)}>
                        Зарегистрироваться
                    </Button>
                </form>
                <div className='footer'>
                    <a href='#'>
                        <Icon type="google-plus" className='fa-google-plus'/>
                    </a>
                    <a href='#'>
                        <Icon type="twitter" className='fa-twitter'/>
                    </a>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="log-form">
                <Tabs defaultActiveKey="1" onChange={this.onChange()}>
                    <TabPane tab="Авторизация" key="1">
                        {this.loginForm()}
                    </TabPane>
                    <TabPane tab="Регистрация" key="2">
                        {this.registrationForm()}
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        userAction: bindActionCreators(userAction, dispatch)
    };
}

AuthProvider.propTypes = {
    userAction: PropTypes.object.isRequired,
};

AuthProvider = reduxForm({
    form: 'loginForm'
})(AuthProvider);

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);