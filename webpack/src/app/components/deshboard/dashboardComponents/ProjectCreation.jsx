import * as React from "react";
import {Card, Row, Col, Input, Form, Select, Button, Avatar, Icon} from 'antd';
import UploadAvatar from "../commoncomponents/UploadAvatar";
import SaveComponent from "../commoncomponents/SaveComponent";
import * as projectAction from "../../../actions/project/ProjectAction";

const FormItem = Form.Item;

function handleChange(value) {
    console.log(`selected ${value}`);
}

function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}

class ProjectCreation extends React.Component {

    state = {
        isLoading: false,
        fieldValues: {}
    };

    handleChangeState = (value) => {
        this.setState(value);
        console.log(this.state)
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.state.fieldValues = values;
                console.log(this.props);
                console.log(this.state)
                this.handleCallback(this.state);
            }
        });

    };

    handleCallback = (values)=>{
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        console.log(this.state);
        return (
            <div>
                <div className='header'>
                    <h2>Создание проекта</h2>
                </div>
                <Row gutter={16}>
                    <Col span={4}>
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
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            notFoundContent="Не найдено"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Select.Option value="jack">{<span><Avatar size='small'/> хз</span>}</Select.Option>
                                            <Select.Option value="lucy">{<span><Avatar size='small'/> хз</span>}</Select.Option>
                                            <Select.Option value="tom">{<span><Avatar size='small'/> хз</span>}</Select.Option>
                                        </Select>
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Описание"
                                    labelCol={{span: 7}}
                                    wrapperCol={{span: 12}}
                                >
                                    <Input.TextArea/>
                                </FormItem>
                                <FormItem
                                    wrapperCol={{span: 12, offset: 10}}
                                >

                                    <SaveComponent
                                        buttonText='Создать проект'
                                        iconType='save'
                                        dataCallback={this.state.fieldValues}
                                        form={this.props.form}
                                        activeAction={projectAction}
                                    />

                                </FormItem>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

ProjectCreation = Form.create()(ProjectCreation);

export default ProjectCreation;