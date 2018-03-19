import * as React from "react";
import {Col, List, Row, Avatar, Card, Divider, Tabs, Dropdown, Menu, Button, Icon, Input, Pagination} from "antd";

const TabPane = Tabs.TabPane;

const data = [];
for (let i = 0; i < 25; i++) {
    data.push({title: 'Aw'})
}

class TaskProjectList extends React.Component {

    state = {
        data: [],
        loading: false,
        hasMore: true,
    }
    getData = (callback) => {
    }

    componentWillMount() {
        this.getData((res) => {
            this.setState({
                data: res.results,
            });
        });
    }

    handleInfiniteOnLoad = () => {
        let data = this.state.data;
        this.setState({
            loading: true,
        });
        if (data.length > 14) {
            message.warning('Infinite List loaded all');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.getData((res) => {
            data = data.concat(res.results);
            this.setState({
                data,
                loading: false,
            });
        });
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
                            placeholder="Введите название задачи"
                            onSearch={value => console.log(value)}
                            style={{width: '20%', maxWidth:'220px'}}
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
                                            <Pagination size="small" total={50} />
                                        </div>
                                    </Col>
                                    <Col span={16}>
                                        <Card>
                                            asd
                                        </Card>
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

export default TaskProjectList