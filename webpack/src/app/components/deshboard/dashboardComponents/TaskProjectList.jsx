import * as React from "react";
import {Col, List, Row, Avatar, Card, Divider, Tabs, Dropdown, Menu, Button, Icon, Input, Pagination} from "antd";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchTaskData} from "../../../actions/TaskActions";
import PropTypes from "prop-types";
import {PriorityTask} from "../../../utils/task/TaskUtils";

const TabPane = Tabs.TabPane;

const getDataSource = (taskList) => {
    const data = [];
    taskList.forEach((item, i) => {
        console.log(item)
        data.push({title: item.title})
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
        const {fetchTaskData} = this.props;
        fetchTaskData();
    }

    render() {
        const {pageable: {pageSize}} = this.state;
        const {taskData: {taskList, loading}} = this.props;
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
                        <Tabs defaultActiveKey="1" size='small' tabPosition='right'>
                            <TabPane tab="Все задачи" key="1">
                                <Row>
                                    <h3>
                                        Список задач
                                    </h3>
                                    <Col span={9}>
                                        <div className='demo-infinite-container'>
                                            <List
                                                loading={loading}
                                                dataSource={getDataSource(taskList)}
                                                renderItem={item => (
                                                    <List.Item key={item.id}>
                                                        <a>{PriorityTask.name}{item.title}</a>
                                                    </List.Item>
                                                )}
                                            />
                                        </div>
                                        <div className='pagination-panel'>
                                            <Pagination size="small" total={pageSize}/>
                                        </div>
                                    </Col>
                                    <Col span={16}>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="Обсуждаемые" key="2">
                            </TabPane>
                            <TabPane tab="Исполняемые" key="3">Content of Tab Pane 3</TabPane>
                            <TabPane tab="Архивные" key="4">Content of Tab Pane 3</TabPane>
                        </Tabs>
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
        fetchTaskData: bindActionCreators(fetchTaskData, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskProjectList)