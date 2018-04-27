import React from "react";
import {Avatar, Button, Checkbox, Icon, List, Popconfirm, Table, Tabs} from "antd";

const TabPane = Tabs.TabPane;

const dataSource = [];
for (let i = 0; i < 10; i++) {
    dataSource.push({
        title: 'Антон Сергеевич',
        role: 'Заказчик'
    })
}

const columns = [{
    dataIndex: 'avatar',
    key: 'avatar',
    render: (text, record) =>
        <a>
            <Avatar/>
        </a>

}, {
    title: 'Имя Фамилия',
    dataIndex: 'name',
    key: 'name'
}, {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email'
}, {
    title: 'Роли',
    dataIndex: 'roles',
    key: 'roles'
}, {
    title: 'Заблокирован',
    dataIndex: 'locked',
    key: 'locked',
    render: (text, record) =>
        <Checkbox defaultChecked={false} disabled/>
}, {
    dataIndex: 'delete',
    key: 'delete',
    render: (text, record) =>
        <Icon type="close-circle-o" onClick={(e)=>{
            e.stopPropagation();
            console.log("")
        }}/>
}];

const data = [];
for (let i = 0; i < 10; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        email: 32,
        roles: `London, Park Lane no. ${i}`,
    });
}

class ProjectSettingsUser extends React.Component {

    onRow = (record) => {
        return {
            onClick: () => {
                console.log(record)
            },
        };
    };

    render() {

        return (
            <div>
                <div className='p-block'>
                    <div className='display-inline-block'>
                        <h3>BREADCRUMB</h3>
                    </div>
                    <div className='display-inline-block float-right'>
                        <a className='a-btn-primary'><Icon type="plus-circle-o"/> Добавить</a>
                    </div>
                </div>
                <div className='indent-p-block project-settings-user'>
                    <Table columns={columns}
                           dataSource={data}
                           size="middle"
                           bordered
                           onRow={this.onRow}
                           className='tr-cursor-pointer'
                    />
                </div>
            </div>
        )
    }
}

export default ProjectSettingsUser;