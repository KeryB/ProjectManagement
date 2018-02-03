import React from 'react'
import {Icon, Tabs, Button} from 'antd';
import {Field, reduxForm, SubmissionError} from 'redux-form'
import {email, inputName, maxLength, required, PASSWORD_IS_NOT_CONFIRM} from "./Validation";
import {connect} from "react-redux";
import * as authAction from "../../actions/AuthAction";
import {bindActionCreators} from "redux";
import {API_AUTH_LOGIN} from "../../const/ApiPath";

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
        const {handleSubmit, authAction} = this.props;
        handleSubmit((values, event, props) => new Promise((resolve, reject) => {
            authAction.makeAuth(API_AUTH_LOGIN, values, resolve, () => reject(new SubmissionError({
                password: 'Неверно E-mail или пароль'
            })))
        }))()
    };

    onSubmitRegistration = (values) => {
        if (values.password !== values.confirmPassword) {
            throw new SubmissionError({confirmPassword: PASSWORD_IS_NOT_CONFIRM});
        }
        console.log(values);
    };

    onChange(props) {
    }

    loginForm() {
        const {submitting, handleSubmit} = this.props;
        console.log(submitting);
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
        const {handleSubmit} = this.props;
        return (
            <div>
                <h2>
                    Регистрация
                </h2>
                <div className='user'>
                </div>
                <form onSubmit={handleSubmit(this.onSubmitRegistration)}>
                    <Field
                        name='name'
                        type='text'
                        component={renderFieldRegistration}
                        validate={[required, inputName, maxLength]}
                        label="Введите Имя"
                        placeHolder="Имя"
                    />
                    <Field
                        name='secondname'
                        type='text'
                        component={renderFieldRegistration}
                        validate={[inputName, maxLength]}
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
                    <input type="submit" value="Регистрация" id="send"
                           onClick={handleSubmit(this.onSubmitRegistration)}/>
                </form>
                <div className='footer'>
                    <Icon type='anticon-google'/>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
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
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        authAction: bindActionCreators(authAction, dispatch)
    };
}

AuthProvider.propTypes = {
    authAction: React.PropTypes.object.isRequired,
};

AuthProvider = reduxForm({
    form: 'loginForm'
})(AuthProvider);

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);