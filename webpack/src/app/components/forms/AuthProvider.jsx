import React from 'react'
import {Icon, Tabs} from 'antd';
import {Field, reduxForm} from 'redux-form'
import {email, inputName, maxLength, required} from "./Validation";
import * as Path from '../../utils/RoutePath'

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
        <label>{placeHolder}</label>
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

    onSubmitLogin = () => {

    };

    onSubmitRegistration = () => {

    };

    onChange(props) {
    }

    loginForm() {
        const {handleSubmit} = this.props;
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
                    <input type="submit" value="Войти" id="send"/>
                </form>
                <div className="forget-password">
                    <a href="#">Забыли пароль?</a>
                </div>
                <div className='footer'>
                    <a className='social-media'>
                        <Icon type='google' className='icon-google-plus'>
                            <span   />
                        </Icon>
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
                    <input type="submit" value="Регистрация" id="send"/>
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
                    <Tabs defaultActiveKey="1" onChange={this.onChange(this.props)}>
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

AuthProvider = reduxForm({
    form: 'loginForm'
})(AuthProvider);

export default AuthProvider;