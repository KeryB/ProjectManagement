import * as React from "react";
import {Avatar, Button, Col, Divider, Dropdown, Icon, Row, Spin, Input, Upload, Tabs} from "antd";
import {bindActionCreators} from "redux";
import {fetchTaskData} from "../../../../actions/TaskActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {isEmpty} from "lodash";
import {SubDropDown, SubList, SubTaskData} from "../../commoncomponents/SubComponents";
import {getEnumsTask, getTaskStatus, PriorityTask, TaskStatus, TaskTypeOption} from "../../../../utils/task/TaskUtils";
import * as Path from "../../../../utils/RoutePath";
import {Link} from "react-router-dom";
import moment from "moment";
import Comment from "../../commoncomponents/Comment";
import {Editor} from "react-draft-wysiwyg";

const parseParams = (params) => {
    console.log(params)
    return {
        id: parseInt(params.id)
    }
};
const TabPane = Tabs.TabPane;

const TaskActions = () => {

    return (
        <div className='task-actions'>
            <Button><Icon type="edit"/>Редактировать</Button>
            <Button><Icon type="message"/>Комменитировать</Button>
            <Button>Начать выполнение</Button>
            {SubDropDown({
                text: 'Еще'
            })}
        </div>
    )
};
const BuildDetail = ({task}) => {
    console.log(task);
    const taskType = getEnumsTask(task.taskType, TaskTypeOption);
    const status = getEnumsTask(task.status, TaskStatus);
    const priority = getEnumsTask(task.taskPriority, PriorityTask);

    return (
        <div className='detail'>
            <Divider orientation='left'><h4>Детализация</h4></Divider>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col">
                            Тип :
                        </div>
                        <div className='col'>
                            {taskType.avatar} {taskType.name}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            Статус :
                        </div>
                        <div className='col'>
                            {status.avatar}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <div className="col-6">
                            Приоритет :
                        </div>
                        <div className='col-6'>
                            {priority.avatar} {priority.name}
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-6">
                            Теги :
                        </div>
                        <div className='col-6'>
                            Теги
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

const BuildPeopleData = ({task, users}) => {
    const assignee = task.assignee;
    const reporter = task.reporter;

    return (
        <div className='task-people'>

            <div className="row">
                <div className="col-6">
                    Создатель:
                </div>
                <div className="col-6">
                    <Link to={`/dashboard/profile/${assignee.id}`}><Avatar
                        size='small'/> {assignee.firstName + ' ' + assignee.secondName}</Link>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    Исполнитель:
                </div>
                <div className="col-6">
                    <Link to={`/dashboard/profile/${reporter.id}`}><Avatar
                        size='small'/> {reporter.firstName + ' ' + reporter.secondName}</Link>
                </div>
            </div>
            <Divider orientation='left'>
                <h5>Даты</h5>
            </Divider>
            <SubTaskData title="Дата создания:" data={moment(task.creationDate)}/>
            {task.lastChange != null ?
                <SubTaskData title='Дата последнего изменения' data={moment(task.lastChange)}/> : undefined}
            {task.dateEnd != null ? <SubTaskData title='Завершения задания' data={moment(task.dateEnd)}/> : undefined}
            <Divider>
                <h5>Список пользователей</h5>
            </Divider>
            <SubList
                datasource={getDataSource(users)}
                avatar={<Avatar size='small'/>}
            />
        </div>
    )
};

const getDataSource = (userData) => {
    let data = [];
    userData.forEach((item, i) => {
        data.push({
            title: item.firstName + ' ' + item.secondName,
            description: 'Тут должна быть роль'
        })
    });
    return data;
};


const dragProps = {
    name: 'file',
    multiple: true,
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class Task extends React.Component {

    static propTypes = {
        taskReducer: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            isFetched: props.location.state.isFetched
        }
    }

    componentWillMount() {
        const {match: {params}, fetchTaskData, taskReducer: {loading, isFetched}} = this.props;
        console.log(this.props)

        if (!isEmpty(params) && !loading && !isFetched) {
            fetchTaskData(parseParams(params));
        }
    }

    componentWillReceiveProps(props) {
        const {match: {params}, fetchTaskData, taskReducer: {loading}, location: {state}} = props;
        const oldParams =  this.props.match.params;

        if (!isEmpty(params) && oldParams.id !== params.id) {
            console.log(oldParams);
            fetchTaskData(parseParams(params));
        }
    }

    handleClickCommentButton = () => {
        this.setState({
            showComponent: false
        })
    };

    render() {
        const {taskReducer: {taskData: {payload: {task, project, users, comments, loading}}, taskData: {payload}}} = this.props;

        return (
            <div className='p-block task' onClick={this.handleClickCommentButton}>
                {isEmpty(payload) ? <Spin/> :
                    <div className="row">
                        <div className="col-12 col-md-9">
                            <div className='header-project-task'>
                                <Link to={Path.ACTUAL_PROJECT}><Avatar size='large'/></Link>
                                <div className='project-title'>
                                    <span>{project.title}</span>
                                    <span style={{display: 'block'}}><h2>{task.title}</h2></span>
                                </div>
                            </div>
                            <TaskActions/>
                            <BuildDetail task={task}/>
                            <Divider/>
                            <div>
                                <Divider orientation='left'><h4>Описание</h4></Divider>

                                <Input.TextArea value={task.description} rows={4}/>
                            </div>
                            <div>
                                <Divider orientation='left'><h4>Файлы</h4></Divider>
                                <Upload.Dragger {...dragProps}>
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox"/>
                                    </p>
                                </Upload.Dragger>
                            </div>
                            <div>
                                <Divider orientation='left'><h4>Комментарии</h4></Divider>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="Комментарии" key="1">
                                        <Comment
                                            comments={comments}/>
                                    </TabPane>
                                    <TabPane tab="История" key="2">История</TabPane>
                                    <TabPane tab="Актиность" key="3">Актиность</TabPane>
                                </Tabs>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <BuildPeopleData task={task} users={users}/>
                        </div>
                    </div>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        taskReducer: state.task
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTaskData: bindActionCreators(fetchTaskData, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);