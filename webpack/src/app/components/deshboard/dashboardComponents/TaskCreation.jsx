import * as React from "react";
import {Modal, Button, Icon, Select, Avatar, Divider} from 'antd';
import * as Path from '../../../utils/RoutePath'
import {PriorityTask, TaskTypeOption} from "../../../utils/task/TaskUtils";
import {Editor} from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js';
import {connect} from "react-redux";
import {isEmpty} from "lodash";
import {bindActionCreators} from "redux";
import {fetchProjectsByUserId} from "../../../actions/project/ProjectAction";
import PropTypes from "prop-types";
import FetchSelector from "../commoncomponents/FetchSelector";
import {fetchUsersByProjectId} from "../../../actions/UserAction";
import {saveTask} from "../../../actions/reduxCrud/SaveActions";
import {showErrorNotification, showSuccessNotification} from "../../../utils/Messages";
import {Field, reduxForm, SubmissionError} from 'redux-form'
import {required} from '../../forms/Validation';
import {FormSelect, TextField} from '../../forms/Inputs';

const Option = Select.Option;

const getProjectData = (projects) => {
    let data = [];
    projects.forEach((item, i) => {
        data.push({value:item.id, label: item.title})
    });
    return data;
};

const getUserData = (user) => {
    let data = [];
    user.forEach((item, i) => {
        data.push(<Option key={item.id} value={item.title}><Avatar size='small'/> {item.firstName + ' ' + item.secondName}</Option>)
    });
    return data;
};


const taskType = () => {
    const taskType = [];
    TaskTypeOption.forEach((item, index) => {
        taskType.push({value:item.value, label:item.name})
    });
    return taskType;
};

const priorityTask = () => {
    const priorityTask = [];
    PriorityTask.forEach((item, index) => {
        priorityTask.push({value:item.value, label:item.name})
    });
    return priorityTask;
};
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

class TaskCreation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            editorState: EditorState.createEmpty(),
            projectId: null,
            userId: null
        };
    }


    static propTypes = {
        commonsData: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.setState({
            visible: true
        })

    }

    handleCancel = () => {
        const {history} = this.props;
        this.setState({visible: false});
        history.push(Path.ROOT)
    };

    //todo editor blocks
    handleSubmit = (e) => {
        const {saveTask, history} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values, this.state);
            if (!err) {
                values.userId = parseInt(values.userId);
                values.projectId = parseInt(values.projectId);
                values.taskPriority = parseInt(values.taskPriority);
                if (values.dateEnd) {
                    values.dateEnd = values.dateEnd.toDate();
                }
                values.taskType = parseInt(values.taskType);
                saveTask(values, ()=>{
                    showSuccessNotification('success', 'Задача ' + values.title + '-' + values.projectId + ' успешно создана')
                    history.push(Path.ROOT)
                }, () => {
                    showErrorNotification('error', 'Что-то пошло не так(');
                    history.push(Path.ROOT)
                });
            }
        });
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    handleFocusComboBox = () => {
        const {commonsData: {projects}, fetchProjects} = this.props;
        if (isEmpty(projects)) {
            fetchProjects();
        }
    };
    handleFocusAssegnee = () => {
        const {commonsData: {users}, fetchUsers} = this.props;
        const {projectId} = this.state;
        if (projectId != null) {
            fetchUsers(projectId)
        }
    };
    handleProjectChange = (value) => {
        if (value) {
            this.setState({
                projectId: parseInt(value)
            })
        } else {
            this.setState({
                projectId: null
            })
        }
    };

    handleCheckState = (rule, value, cb) => {
        const {projectId} = this.state;
        if (projectId == null) {
            cb(true);
        }
        cb(false)
    };

    taskForm(){
        const {submitting, handleSubmit, commonsData, commonsData: {users, projects}} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <Field
                    name='projectId'
                    onFocus={this.handleFocusComboBox}
                    label="Выберите проект"
                    options={getProjectData(projects)}
                    mode='combobox'
                    validate={required}
                    required
                    formItemLayout={formItemLayout}
                    placeholder='Выберите проект...'
                    component={FormSelect}/>
                <Field
                    name='title'
                    label='Введите название задачи'
                    validate={required}
                    required
                    formItemLayout={formItemLayout}
                    component={TextField}
                />
                <Divider/>
                <Field
                    name='taskType'
                    onFocus={this.handleFocusComboBox}
                    label="Выберите тип задачи"
                    options={taskType()}
                    validate={required}
                    required
                    formItemLayout={formItemLayout}
                    placeholder='Выберите тип задачи'
                    component={FormSelect}/>

                <Field
                    name='taskPriority'
                    onFocus={this.handleFocusComboBox}
                    label="Выберите приоритет задачи"
                    options={priorityTask()}
                    validate={required}
                    required
                    formItemLayout={formItemLayout}
                    placeholder='Приоритет'
                    component={FormSelect}/>

            </form>
        )
    }

    render() {
        const {visible, loading, editorState} = this.state;
        const {form: {getFieldDecorator}, commonsData, commonsData: {users, projects}} = this.props;

        return (
            <div className='create-task'>
                <Modal
                    width='750px'
                    visible={visible}
                    title={<span><Icon type="solution"/> Создание задачи</span>}
                    onCancel={this.handleCancel}
                    footer={[
                            <Button key="back" onClick={this.handleCancel}>Return</Button>,

                            <Button key="submit" type="primary" loading={loading} htmlType="submit">
                                Создать
                            </Button>
                    ]}
                >


                    {/*<Form onSubmit={this.handleSubmit} layout='inline'>*/}
                        {/*<FormItem*/}
                            {/*label="Выберете проект"*/}
                            {/*wrapperCol={{ span: 14, offset: 4 }}*/}
                        {/*>*/}
                            {/*{getFieldDecorator('projectId', {*/}
                                {/*rules: [{required: true, message: 'Проект на выбран!'}],*/}
                            {/*})(*/}
                                {/*<FetchSelector*/}
                                    {/*commonsData={commonsData}*/}
                                    {/*handleFocusSelector={this.handleChangeCombobox}*/}
                                    {/*handleSubmit={this.handleSubmit}*/}
                                    {/*onChange={this.handleProjectChange}*/}
                                    {/*data={getProjectData(projects)}*/}
                                {/*/>*/}
                            {/*)}*/}
                        {/*</FormItem>*/}

                        {/*<FormItem*/}
                            {/*label="Название"*/}
                            {/*wrapperCol={{ span: 14, offset: 4 }}*/}
                        {/*>*/}
                            {/*{getFieldDecorator('title', {*/}
                                {/*rules: [{required: true, message: 'Название задачи не введено!'}],*/}
                            {/*})(*/}
                                {/*<Input/>*/}
                            {/*)}*/}
                        {/*</FormItem>*/}
                        {/*<Divider/>*/}

                        {/*<FormItem*/}
                            {/*label="Тип задачи"*/}
                            {/*labelCol={{span: 7}}*/}
                            {/*wrapperCol={{span: 13}}*/}
                        {/*>*/}
                            {/*{getFieldDecorator('taskType', {*/}
                                {/*rules: [{required: true, message: 'Выберете тип задачи!'}],*/}
                            {/*})(*/}
                                {/*<Select*/}
                                    {/*placeholder="Пожалйста, выберете тип задачи"*/}
                                    {/*onChange={this.handleSelectChange}*/}
                                {/*>*/}
                                    {/*{taskType()}*/}
                                {/*</Select>*/}
                            {/*)}*/}
                        {/*</FormItem>*/}

                        {/*<FormItem*/}
                            {/*label="Приоритет"*/}
                            {/*labelCol={{span: 7}}*/}
                            {/*wrapperCol={{span: 13}}*/}
                        {/*>*/}
                            {/*{getFieldDecorator('taskPriority', {*/}
                                {/*rules: [{*/}
                                    {/*required: true,*/}
                                    {/*message: 'Выберете приоритет задачи!'*/}
                                {/*}],*/}
                            {/*})(*/}
                                {/*<Select*/}
                                    {/*placeholder="Пожалйста, выберете приоритет задачи"*/}
                                {/*>*/}
                                    {/*{priorityTask()}*/}
                                {/*</Select>*/}
                            {/*)}*/}
                        {/*</FormItem>*/}
                        {/*<FormItem*/}
                            {/*label="Назначить"*/}
                            {/*labelCol={{span: 7}}*/}
                            {/*wrapperCol={{span: 13}}*/}
                        {/*>*/}
                            {/*{getFieldDecorator('userId', {*/}
                                {/*rules: [{*/}
                                    {/*required: true,*/}
                                    {/*message: 'Выберете приоритет задачи!'*/}
                                {/*}],*/}
                            {/*})(*/}
                                {/*<FetchSelector*/}
                                    {/*commonsData={commonsData}*/}
                                    {/*handleFocusSelector={this.handleFocusAssegnee}*/}
                                    {/*handleSubmit={this.handleSubmit}*/}
                                    {/*data={getUserData(users)}*/}
                                {/*/>*/}
                            {/*)}*/}
                        {/*</FormItem>*/}
                        {/*<FormItem*/}
                            {/*label="Дата завершения задачи"*/}
                            {/*labelCol={{span: 9}}*/}
                            {/*wrapperCol={{span: 13}}*/}
                        {/*>*/}
                            {/*{getFieldDecorator('dateEnd', {})(*/}
                                {/*<DatePicker/>*/}
                            {/*)}*/}
                        {/*</FormItem>*/}
                        {/*<FormItem*/}
                            {/*label="Время выполнения задачи"*/}
                            {/*labelCol={{span: 9}}*/}
                            {/*wrapperCol={{span: 12}}*/}
                        {/*>*/}
                            {/*{getFieldDecorator('time', {})(*/}
                                {/*<TimePicker style={{width: '60%'}} format="HH:mm"/>*/}
                            {/*)}*/}
                        {/*</FormItem>*/}
                        {/*<Divider/>*/}

                        {/*<FormItem*/}
                            {/*label="Описание задания"*/}
                            {/*labelCol={{span: 5}}*/}
                            {/*wrapperCol={{span: 17}}*/}
                        {/*>*/}
                            {/*{getFieldDecorator('description', {})(*/}
                                {/*<Editor*/}
                                    {/*style={{width: '78%'}}*/}
                                    {/*editorState={editorState}*/}
                                    {/*toolbarClassName="toolbarClassName"*/}
                                    {/*wrapperClassName="wrapperClassName"*/}
                                    {/*editorClassName="editorClassName"*/}
                                    {/*onEditorStateChange={this.onEditorStateChange}*/}
                                {/*/>*/}
                            {/*)}*/}
                        {/*</FormItem>*/}
                    {/*</Form>*/}


                    {this.taskForm()}
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        commonsData: state.commonStateless
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchProjects: bindActionCreators(fetchProjectsByUserId, dispatch),
        fetchUsers: bindActionCreators(fetchUsersByProjectId, dispatch),
        saveTask: bindActionCreators(saveTask, dispatch)
    }
}

TaskCreation = reduxForm({
    form: 'taskForm'
})(TaskCreation);

export default connect(mapStateToProps, mapDispatchToProps)(TaskCreation);