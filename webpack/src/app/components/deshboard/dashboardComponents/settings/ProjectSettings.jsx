import React from "react";
import {Avatar, Button, Icon, List, Table, Tabs} from "antd";

const TabPane = Tabs.TabPane;

const dataSource = [];
for (let i = 0; i < 10; i++) {
    dataSource.push({
        title: 'Антон Сергеевич',
        role: 'Заказчик'
    })
}

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    width: 150,
}, {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
}, {
    title: 'Address',
    dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 10; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

class ProjectSettings extends React.Component {

    render() {

        return (
            <div>
                <div className='p-block'>
                    <h3>BREADCRUMB</h3>
                </div>
                <div className='indent-p-block'>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Основные" key="1">Content of Tab Pane 1</TabPane>
                        <TabPane tab="Проект" key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab="Пользователи" key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default ProjectSettings;