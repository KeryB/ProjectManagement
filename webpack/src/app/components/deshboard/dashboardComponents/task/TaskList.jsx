import React from "react";
import {Breadcrumb, Button, Card, Dropdown, Menu, Icon, Input, List, Collapse, Avatar, Badge, Select, Tag} from "antd";
import TaskTable from "./TaskTable";

const Panel = Collapse.Panel;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={1}>{}</Option>);
}

const getData = () => {

    const data = [{
        projectTitle: "awdawdAAA",
        avatar: <Avatar shape="square" size='small'/>,
        count: 6
    }, {
        projectTitle: "AAAA",
        avatar: <Avatar shape="square" size='small'/>,
        count: 2
    }];

    return data
};

const getTitleCollapse = (item) => {

    return (
        <span>
            <span style={{marginRight: '5px'}}>
                {item.avatar}
            </span>
            <a style={{paddingRight: '5px'}}>{item.projectTitle}</a>
            <Badge count={item.count}/>
        </span>
    )
};

class TaskList extends React.Component {

    render() {

        return (
            <div>
                <div className='p-block task-list'>
                    <h4>
                        <Breadcrumb>
                            <Breadcrumb.Item> <Icon type="home" /> Главная</Breadcrumb.Item>
                            <Breadcrumb.Item>Список задач</Breadcrumb.Item>
                        </Breadcrumb>
                    </h4>
                    <div className='filter-panel'>
                        <div className='filter-buttons'>
                            <Button icon='filter'>Фильтры</Button>
                            <span className='filter-search'>
                                <Input.Search
                                    placeholder="Введите название задачи"
                                    onSearch={value => console.log(value)}
                                    style={{width: 220}}
                                />
                            </span>
                            <div className='float-right'>
                                <Button type='primary'>Создать задачу</Button>
                            </div>
                        </div>
                        <div className='filter-active'>
                            <Tag color="red">Отображение: по-проектно</Tag>
                            <Tag color="red">Задачи:все</Tag>
                        </div>
                    </div>
                </div>
                <div className='indent-p-block'>
                    <List
                        itemLayout="horizontal"
                        dataSource={getData()}
                        renderItem={item => (
                            <div>
                                <Collapse bordered={false}>
                                    <Panel header={getTitleCollapse(item)} key="1">
                                        <TaskTable/>
                                    </Panel>
                                </Collapse>
                            </div>
                        )}
                    />
                </div>
            </div>
        )
    }
}

export default TaskList;