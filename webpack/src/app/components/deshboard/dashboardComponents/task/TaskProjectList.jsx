import * as React from "react";
import {Col, List, Row, Avatar, Card, Divider, Tabs, Dropdown, Menu, Button, Icon, Input, Pagination} from "antd";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchTaskList} from "../../../../actions/TaskActions";
import PropTypes from "prop-types";
import {getEnumsTask, PriorityTask} from "../../../../utils/task/TaskUtils";
import {Link, Route, Switch} from "react-router-dom";
import * as Path from "../../../../utils/RoutePath";
import moment from "moment";

const TabPane = Tabs.TabPane;

const getDataSource = (taskList) => {
    const data = [];
    taskList.forEach((item, i) => {
        data.push({
            id: item.id,
            title: item.title,
            taskPriority: item.taskPriority
        })
    });
    return data;
};

class TaskProjectList extends React.Component {

    static propTypes = {
        taskData: PropTypes.object.isRequired
    };

    state = {
        data: [],
        loading: false,
        hasMore: true,
        pageable: {
            pageNumber: 0,
            pageSize: 30
        }
    };

    componentDidMount() {
        const {fetchTaskList} = this.props;
        fetchTaskList();
    }

    render() {
        const {pageable: {pageSize}} = this.state;
        const {taskData: {taskList, loading}, totalElements, children} = this.props;
        return (
            <div className='task-project-list'>
                <div className='p-block'>
                    <h2>
                        BREADCRUM
                    </h2>
                </div>
                <div className='indent-p-block'>
                    <div className='filter-panel'>
                        <Input.Search
                            placeholder="Поиск"
                            onSearch={value => console.log(value)}
                            style={{width: '20%', maxWidth: '220px'}}
                        />

                        <a className='a-btn-primary'>
                            Фильтры
                        </a>
                    </div>
                    <div className='content-panel'>
                        {/*<Tabs defaultActiveKey="1" size='small' tabPosition='right'>*/}
                            {/*<TabPane tab="Все задачи" key="1">*/}
                            {/*</TabPane>*/}
                            {/*<TabPane tab="Обсуждаемые" key="2">*/}
                            {/*</TabPane>*/}
                            {/*<TabPane tab="Исполняемые" key="3">Content of Tab Pane 3</TabPane>*/}
                            {/*<TabPane tab="Архивные" key="4">Content of Tab Pane 3</TabPane>*/}
                        {/*</Tabs>*/}
                        <h3>
                            Список задач
                        </h3>
                        <div className="row no-gutters">
                            <div className="col-4 col-md-3">
                                <div className='demo-infinite-container'>
                                    <List
                                        loading={loading}
                                        dataSource={getDataSource(taskList)}
                                        renderItem={item => (
                                            <List.Item key={item.id}>
                                                <List.Item.Meta
                                                    avatar={getEnumsTask(item.taskPriority, PriorityTask).avatar}
                                                    title={<Link to={{
                                                        pathname: `/dashboard/taskProjectList/task/${item.id}`,
                                                        state: {isFetched: false},
                                                    }}>{item.title}</Link>}
                                                />
                                                <div>{moment(item.creationDate).format("DD:MM:YYYY")}</div>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                                <div className='pagination-panel'>
                                    {totalElements > pageSize ?
                                        <Pagination size="small" total={pageSize}/> : undefined}
                                </div>
                            </div>
                            <div className="col-16 col-sm-8 col-md-9">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        taskData: state.task
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTaskList: bindActionCreators(fetchTaskList, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskProjectList)