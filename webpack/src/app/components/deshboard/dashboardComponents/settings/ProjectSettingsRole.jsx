import React from "react";
import {Avatar, Button, Checkbox, Icon, List, Table, Tabs} from "antd";
import Roles from "./Roles";

const TabPane = Tabs.TabPane;

const dataSource = [];
for (let i = 0; i < 10; i++) {
    dataSource.push({
        title: 'Антон Сергеевич',
        role: 'Заказчик'
    })
}

const columns = [{
    title: 'Роль',
    dataIndex: 'role',
    key: 'role'
}, {
    title: 'Примечание',
    dataIndex: 'description',
    key: 'description'
}, {
    dataIndex: 'delete',
    key: 'delete',
    render: (text, record) =>
        <Icon type="close-circle-o" onClick={() => {
        }}/>
}];

const data = [];
    data.push({
        key: 1,
        role: 'Супер-администратор',
        description: ''
    },{
        key: 2,
        role: 'Заказчик',
        description: ''
    }, {
        key: 3,
        role: 'Менеджер',
        description: ''
    });


class ProjectSettingsRole extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleModal: false
        }
    }

    onRow = (record) => {
        return {
            onClick: () => {
                this.setState({
                    visibleModal: true
                })
            },
        };
    };

    componentWillReceiveProps(props) {
        this.setState({
            visibleModal: false
        })
    }

    render() {
        const {visibleModal} = this.state;

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
                           size="small"
                           onRow={this.onRow}
                           className='tr-cursor-pointer'
                    />
                    <Roles visible={visibleModal}/>
                </div>
            </div>
        )
    }
}

export default ProjectSettingsRole;