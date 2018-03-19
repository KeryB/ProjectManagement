import * as React from "react";
import {Col, List, Row, Avatar, Card, Divider, Tabs, Dropdown, Menu, Button, Icon} from "antd";
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
                <h3>
                    BREADCRUM
                </h3>
                <Card>
                    wad
                </Card>

                <Tabs defaultActiveKey="1" size='small' tabPosition='left'>
                    <TabPane tab="Все задачи" key="1">
                    </TabPane>
                    <TabPane tab="Обсуждаемые" key="2">
                        <Row>
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
                            </Col>
                            <Col span={16}>
                                <Card>
                                    asd
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Архивные" key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
            </div>
        )
    }

}

export default TaskProjectList