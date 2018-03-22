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
import {FormDatePicker, FormEditWysiwyg, FormSelect, TextField} from '../../forms/Inputs';

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
        data.push({value:item.id, label: item.firstName + ' ' + item.secondName})
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
    handleSubmit = (values) => {
        console.log(values);


        // const {saveTask, history} = this.props;
        // e.preventDefault();
        // this.props.form.validateFields((err, values) => {
        //     console.log(values, this.state);
        //     if (!err) {
        //         values.userId = parseInt(values.userId);
        //         values.projectId = parseInt(values.projectId);
        //         values.taskPriority = parseInt(values.taskPriority);
        //         if (values.dateEnd) {
        //             values.dateEnd = values.dateEnd.toDate();
        //         }
        //         values.taskType = parseInt(values.taskType);
        //         saveTask(values, ()=>{
        //             showSuccessNotification('success', 'Задача ' + values.title + '-' + values.projectId + ' успешно создана')
        //             history.push(Path.ROOT)
        //         }, () => {
        //             showErrorNotification('error', 'Что-то пошло не так(');
        //             history.push(Path.ROOT)
        //         });
        //     }
        // });
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
        console.log(this.state);
        if (projectId != null) {
            fetchUsers(projectId)
        }
    };
    handleProjectChange = (value) => {
        console.log(value);
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
                    onChange={this.handleProjectChange}
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
                    placeholder='Название задачи'
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

                <Field
                    name='userId'
                    onFocus={this.handleFocusAssegnee}
                    label="Выберите пользователя"
                    options={getUserData(users)}
                    mode='combobox'
                    validate={required}
                    required
                    formItemLayout={formItemLayout}
                    placeholder='Выберите пользователя'
                    component={FormSelect}/>

                <Field
                    name='dateEnd'
                    label="Выберите пользователя"
                    formItemLayout={{
                        labelCol: { span: 8 },
                        wrapperCol: { span: 15 },
                    }}
                    placeholder='Дата заверешения задачи'
                    component={FormDatePicker}/>

                <Field
                    name='description'
                    label="Описание"
                    formItemLayout={{
                        labelCol: { span: 4 },
                        wrapperCol: { span: 17 },
                    }}
                    onEditorStateChange={this.onEditorStateChange}
                    component={FormEditWysiwyg}/>

            </form>
        )
    }

    render() {
        const {visible, loading} = this.state;
        const {submitting, handleSubmit} = this.props;

        return (
            <div className='create-task'>
                <Modal
                    width='750px'
                    visible={visible}
                    title={<span><Icon type="solution"/> Создание задачи</span>}
                    onCancel={this.handleCancel}
                    footer={[
                        <form onSubmit={handleSubmit(this.handleSubmit)}>
                            <Button key="back" onClick={this.handleCancel}>Return</Button>,

                            <Button key="submit" type="primary" loading={submitting} htmlType="submit">
                                Создать
                            </Button>
                        </form>
                    ]}
                >
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