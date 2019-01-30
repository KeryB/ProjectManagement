import * as React from "react";
import {Card, Row, Col, Input, Form, Select, Button, Avatar, Icon, Breadcrumb, Divider, Radio} from 'antd';
import UploadAvatar from "../commoncomponents/UploadAvatar";
import SaveComponent from "../commoncomponents/SaveComponent";
import * as projectAction from "../../../actions/project/ProjectAction";
import {saveProject} from "../../../actions/reduxCrud/SaveActions";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {FormRadioGroup, FormSelect, openNotificationWithIcon, TextField} from "../../forms/Inputs";
import {required} from "../../forms/Validation";
import * as Path from "../../../utils/RoutePath";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function handleChange(value) {
    console.log(`selected ${value}`);
}

const FORM_ID = 'projectCreationForm';

const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 8},
};

const getRadioData = () => {

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };
    let data = [];

    data.push({
        key: 1,
        value:  <Radio style={radioStyle} value='true'><Icon type="lock"/> Private</Radio>
    }, {
        key: 2,
        value:  <Radio style={radioStyle} value='false'><i className="fas fa-globe"/> Public</Radio>
    });

    return data;
};

class ProjectCreation extends React.Component {

    state = {
        isLoading: false,
        projectType: ''
    };

    handleChangeState = (value) => {
        this.setState(value);
        console.log(this.state)
    };

    onSubmit = (values) => {
        const {saveProject, history} = this.props;

        saveProject(values, ()=>{
            openNotificationWithIcon('success', 'Успешно', 'Проект сохранен');
            history.push(Path.ROOT);
        }, ()=>{
            openNotificationWithIcon('error', 'Ошибка', 'Что-то пошло не так..');
        })

    };

    render() {
        const {handleSubmit, history} = this.props;
        const {projectType} = this.state;

        return (
            <div className='project-creation'>
                <div className='p-block'>
                    <h4>
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <Icon type="home"/> Главная
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                Создание проекта
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </h4>
                    <div className='row'>
                        <div className='col-sm-1'>
                            <UploadAvatar onChange={this.handleChangeState}/>
                        </div>
                        <div className='col-sm-8'>
                            <form id={FORM_ID} onSubmit={handleSubmit(this.onSubmit)} className='creation-form'>
                                <Field name='title'
                                       label='Название проекта'
                                       placeholder='Введите название проекта'
                                       validate={required}
                                       required
                                       formItemLayout={formItemLayout}
                                       component={TextField}
                                />
                                <Field
                                    name='projectType'
                                    onFocus={this.handleFocusComboBox}
                                    label='Выбирете тип проекта'
                                    options={[]}
                                    formItemLayout={formItemLayout}
                                    placeholder='Тип проекта'
                                    component={FormSelect}/>

                                <Field name='description'
                                       label='Описание проекта'
                                       type='textarea'
                                       formItemLayout={formItemLayout}
                                       component={TextField}
                                />
                                <Field
                                    name='locked'
                                    data={getRadioData()}
                                    label='Уровень видимости'
                                    requred
                                    validate={required}
                                    formItemLayout={formItemLayout}
                                    component={FormRadioGroup}/>


                                <Button type='primary' onClick={handleSubmit(this.onSubmit)}>
                                    Сохранить
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


ProjectCreation = reduxForm({
    form: FORM_ID
})(ProjectCreation);

function mapDispatchToProps(dispatch) {
    return {
        saveProject: bindActionCreators(saveProject, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(ProjectCreation);