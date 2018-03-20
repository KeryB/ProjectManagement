import * as React from "react";
import {Card, Row, Col, Input, Form, Select, Button, Avatar, Icon} from 'antd';
import UploadAvatar from "../commoncomponents/UploadAvatar";
import SaveComponent from "../commoncomponents/SaveComponent";
import * as projectAction from "../../../actions/project/ProjectAction";
import {saveProject} from "../../../actions/reduxCrud/SaveActions";

const FormItem = Form.Item;

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
        const {form :{getFieldDecorator}, history} = this.props;

        const {projectType} = this.state;

        return (
            <div className='project-creation'>
                <div className='p-block'>
                    <div className='header'>
                        <h2 style={{ margin: 'auto'}}>Создание проекта</h2>
                    </div>
                </div>
                <div className='indent-p-block'>
                    <Row gutter={16} className='project-creation-row'>
                        <Col span={4} >
                            <UploadAvatar onChange={this.handleChangeState}/>
                        </Col>
                        <Col span={16}>
                            <Card>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormItem
                                        label="Название"
                                        labelCol={{span: 7}}
                                        wrapperCol={{span: 12}}
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
                                                <Select.Option value='1'>{<span><Avatar size='small'/> хз</span>}</Select.Option>
                                                <Select.Option value='2'>{<span><Avatar size='small'/> хз</span>}</Select.Option>
                                                <Select.Option value='3'>{<span><Avatar size='small'/> хз</span>}</Select.Option>
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
                                    <FormItem
                                        wrapperCol={{span: 12, offset: 10}}
                                    >

                                        <SaveComponent
                                            buttonText='Создать проект'
                                            form={this.props.form}
                                            affix={saveProject}
                                            history={history}
                                        />

                                    </FormItem>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

ProjectCreation = Form.create()(ProjectCreation);

export default ProjectCreation;