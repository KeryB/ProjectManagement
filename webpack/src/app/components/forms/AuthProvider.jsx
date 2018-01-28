import React from 'react'
import {Icon, Tabs} from 'antd';
import {Field, reduxForm} from 'redux-form'
import {email, required} from "./Validation";

const TabPane = Tabs.TabPane;

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div>
        <div>
            <input {...input} placeholder={label} type={type}>
            </input>
            {touched && error ? <span className="line-error"/> : <span className="line"/>}
            {touched && error ? <label className='error-label'>{error}</label> : undefined}
        </div>
    </div>
);


class AuthProvider extends React.Component {

    constructor(props) {
        super(props);

    }

    onSubmitLogin = () => {

    };

    loginForm() {
        const {handleSubmit} = this.props;
        return (
            <div>
                <div className='user'>
                    <h2>
                        Вход на сайт
                    </h2>
                </div>
                <form onSubmit={handleSubmit(this.onSubmitLogin)}>
                    <Field
                        name='email'
                        type='text'
                        component={renderField}
                        validate={[required, email]}
                        label="email"
                    />
                    <Field
                        name='password'
                        type='password'
                        component={renderField}
                        validate={required}
                        label="Пароль"
                    />
                    <input type="submit" value="Войти" id="send"/>
                </form>
                <div className='footer'>
                    <Icon type='facebook' style={{fontSize:"18px", backgroundColor: "#3C599F",borderRadius: "50%"}}/>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="log-form">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Авторизация" key="1">
                            {this.loginForm()}
                        </TabPane>
                        <TabPane tab="Регистрация" key="2">
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