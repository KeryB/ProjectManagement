import * as React from "react";
import {Card, Row, Col, Input, Form, Select, Button, Avatar, Icon, Breadcrumb, Divider,Radio} from 'antd';
import UploadAvatar from "../commoncomponents/UploadAvatar";
import SaveComponent from "../commoncomponents/SaveComponent";
import * as projectAction from "../../../actions/project/ProjectAction";
import {saveProject} from "../../../actions/reduxCrud/SaveActions";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function handleChange(value) {
    console.log(`selected ${value}`);
}

class ProjectCreation extends React.Component {

    state = {
        isLoading: false,
        projectType: ''
    };

    handleChangeState = (value) => {
        this.setState(value);
        console.log(this.state)
    };

    render() {
        const {form: {getFieldDecorator}, history} = this.props;

        const {projectType} = this.state;

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

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
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem
                                    label="Название"
                                    labelCol={{span: 7}}
                                    wrapperCol={{span: 13}}
                                >
                                    {getFieldDecorator('title', {
                                        rules: [{required: true, message: 'Данное поле обязательно к заполнению'}],
                                    })(
                                        <Input placeholder='Введите название проекта'/>
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Выбирете тип проекта"
                                    labelCol={{span: 7}}
                                    wrapperCol={{span: 12}}
                                >
                                    {getFieldDecorator('projectType', {
                                        rules: [{required: true, message: 'Данное поле обязательно к заполнению'}],
                                    })(
                                        <Select
                                            showSearch
                                            placeholder="Тип проекта"
                                            optionFilterProp="children"
                                            onChange={handleChange}
                                            notFoundContent="Не найдено"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Select.Option value='1'>{<span><Avatar
                                                size='small'/> хз</span>}</Select.Option>
                                            <Select.Option value='2'>{<span><Avatar
                                                size='small'/> хз</span>}</Select.Option>
                                            <Select.Option value='3'>{<span><Avatar
                                                size='small'/> хз</span>}</Select.Option>
                                        </Select>
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Описание"
                                    labelCol={{span: 7}}
                                    wrapperCol={{span: 12}}
                                >
                                    {getFieldDecorator('description', {})
                                    (
                                        <Input.TextArea rows={4}/>
                                    )}
                                </FormItem>
                                <div className='visibility-level'>
                                    <div className='row'>
                                        <div className='col-sm-3 offset-md-1'>
                                            <h4>Уровень видимости:</h4>
                                        </div>
                                        <div className='col-sm-4'>
                                            <RadioGroup onChange={this.onChange} value={this.state.value}>
                                                <Radio style={radioStyle} value={1}><Icon type="lock"/> Private</Radio>
                                                <Radio style={radioStyle} value={2}><i className="fas fa-globe"/> Public</Radio>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                </div>


                                <FormItem
                                    wrapperCol={{span: 14, offset: 12}}
                                >

                                    <SaveComponent
                                        buttonText='Создать проект'
                                        form={this.props.form}
                                        affix={saveProject}
                                        history={history}
                                    />

                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ProjectCreation = Form.create()(ProjectCreation);

export default ProjectCreation;