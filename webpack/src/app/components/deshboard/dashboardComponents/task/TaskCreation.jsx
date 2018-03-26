import * as React from "react";
import {Modal, Button, Icon, Select, Divider} from 'antd';
import * as Path from '../../../../utils/RoutePath'
import {PriorityTask, TaskTypeOption} from "../../../../utils/task/TaskUtils";
import {Editor} from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js';
import {connect} from "react-redux";
import {isEmpty} from "lodash";
import {bindActionCreators} from "redux";
import {fetchProjectsByUserId} from "../../../../actions/project/ProjectAction";
import PropTypes from "prop-types";
import {fetchUsersByProjectId} from "../../../../actions/UserAction";
import {showErrorNotification, showSuccessNotification} from "../../../../utils/Messages";
import {Field, reduxForm, SubmissionError} from 'redux-form'
import {required} from '../../../forms/Validation';
import {
    FormAutoComplete, FormDatePicker, FormEditWysiwyg, FormSelect, FormSelectt, FormTimePicker,
    TextField
} from '../../../forms/Inputs';
import {ModalFooter} from "../../commoncomponents/SubComponents";
import {saveTask} from "../../../../actions/TaskActions";
import Avatar from "antd/es/avatar/index";

const getProjectData = (projects) => {
    let data = [];
    projects.forEach((item, i) => {
        data.push({value: item.id, label: item.title})
    });
    return data;
};

const getUserData = (user) => {
    let data = [];
    user.forEach((item, i) => {
        data.push({value: item.id,
            label: item.firstName + ' ' + item.secondName,
            avatar: <Avatar size='small'/>})
    });
    return data;
};


const taskType = () => {
    const taskType = [];
    TaskTypeOption.forEach((item, index) => {
        taskType.push({value: item.value, label: item.name, avatar: item.avatar})
    });
    return taskType;
};

const priorityTask = () => {
    const priorityTask = [];
    PriorityTask.forEach((item, index) => {
        priorityTask.push({value: item.value, label: item.name,  avatar: item.avatar})
    });
    return priorityTask;
};
const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 8},
};

const getDataSource = (projects) => {
    let data = [];
    projects.forEach((item, i) => {
        data.push({text: item.title, value: item.id, avatar: item.avatar})
    });
    return data;
};

const FORM_ID = 'taskForm';

class TaskCreation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            editorState: EditorState.createEmpty(),
            projectId: null,
            userId: null,
            taskRequestDto: {}
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

    onHideModal = () => {
        const {history} = this.props;
        this.setState({visible: false});
        history.push(Path.ROOT)
    };

    //todo editor blocks
    onSubmit = (values) => {
        const {saveTask, history} = this.props;
        console.log(values.description);
        this.setState({
            ...this.state,
            taskRequestDto: {
                title: values.title,
                userId: parseInt(values.userId),
                projectId: parseInt(values.projectId),
                taskPriority: parseInt(values.taskPriority),
                taskType: parseInt(values.taskType),
                dateEnd: values.dateEnd ? values.dateEnd.toDate() : null,
                description: values.description ? JSON.stringify(values.description.blocks) : ''
            }
        }, () => {
            saveTask(this.state.taskRequestDto, () => {
                showSuccessNotification('success', 'Задача ' + values.title + '-' + values.projectId + ' успешно создана');
                history.push(Path.ROOT)
            });
        });
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
    handleSelect = (value) => {
        if (value) {
            this.setState({
                projectId: parseInt(value)
            })
        } else {
            this.setState({
                projectId: null
            })
        }
    }

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
    onSearch = (value) => {
        console.log(value);
    }

    render() {
        const {visible, loading} = this.state;
        const {submitting, handleSubmit, commonsData: {users, projects}, commonsData: {isLoading}} = this.props;
        const {onSubmit, onHideModal} = this;

        const footer = ModalFooter({
            onSubmit: handleSubmit(onSubmit),
            isSubmitting: submitting,
            onClose: onHideModal,
            submitButtonMessage: 'Создать',
            submitButtonIcon: 'save',
        });
        return (
            <div className='create-task'>
                <Modal
                    width='750px'
                    visible={visible}
                    title={<span><Icon type="solution"/> Создание задачи</span>}
                    onCancel={this.onHideModal}
                    footer={footer}
                >
                    <form id={FORM_ID} onSubmit={handleSubmit(onSubmit)}>
                        <Field
                            name='projectId'
                            onFocus={this.handleFocusComboBox}
                            onSelect={this.handleSelect}
                            label="Выберите проект"
                            options={getProjectData(projects)}
                            mode='combobox'
                            creatable={true}
                            validate={required}
                            required
                            loading={isLoading}
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
                            label="'Дата заверешения задачи"
                            formItemLayout={{
                                labelCol: {span: 8},
                                wrapperCol: {span: 15},
                            }}
                            placeholder='Дата заверешения задачи'
                            component={FormDatePicker}/>
                        <Field
                            name='time'
                            label="Время задачи"
                            formItemLayout={{
                                labelCol: {span: 8},
                                wrapperCol: {span: 11},
                            }}
                            placeholder='Время на задачу'
                            component={FormTimePicker}/>

                        <Field
                            name='description'
                            label="Описание"
                            formItemLayout={{
                                labelCol: {span: 4},
                                wrapperCol: {span: 17},
                            }}
                            onEditorStateChange={this.onEditorStateChange}
                            component={FormEditWysiwyg}/>
                    </form>
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
    form: FORM_ID
})(TaskCreation);

export default connect(mapStateToProps, mapDispatchToProps)(TaskCreation);