import * as React from "react";
import {Col, List, Row, Avatar, Card, Divider, Tabs, Dropdown, Menu, Button, Icon, Input, Pagination} from "antd";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchTaskData} from "../../../actions/TaskActions";
import PropTypes from "prop-types";

const TabPane = Tabs.TabPane;

const data = [];
for (let i = 0; i < 25; i++) {
    data.push({title: 'Aw'})
}

class TaskProjectList extends React.Component {

    static propTypes = {
        taskData: PropTypes.object.isRequired
    };

    state = {
        data: [],
        loading: false,
        hasMore: true,
    };

    componentDidMount() {
        const {fetchTaskData} = this.props;
        fetchTaskData();
    }

    render() {
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
                                                dataSource={data}
                                                renderItem={item => (
                                                    <List.Item key={item.id}>
                                                        <List.Item.Meta
                                                            avatar={<Avatar
                                                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                                            title={<a href="https://ant.design">{item.title}</a>}
                                                        />
                                                        <div>Content</div>
                                                    </List.Item>
                                                )}
                                            />
                                        </div>
                                        <div className='pagination-panel'>
                                            <Pagination size="small" total={50}/>
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