import React from "react";
import {Divider, Icon, Table} from "antd";
import ScheduleTaskCalendar from "./ScheduleTaskCalendar";

const columns = [{
    title: 'Тип',
    dataIndex: 'type',
    key: 'type',
}, {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
}, {
    title: 'Приоритет',
    dataIndex: 'priority',
    key: 'priority',
},{
    title: 'Приоритет',
    dataIndex: 'priority',
    key: 'priority',
}, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
      <a href="#">Action 一 {record.name}</a>
      <Divider type="vertical" />
      <a href="#">Delete</a>
      <Divider type="vertical" />
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
    ),
}];
const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}];

class MainView extends React.Component {

    render() {
        return (
            <div className='row'>
                <div className='col-6'>
                    <div className='p-block'>
                        <div className='main-view-header'>
                            <h3>Текущие задачи</h3>
                        </div>
                        <div className='table' style={{marginTop:'20px'}}>
                            <Table columns={columns}
                                   dataSource={data}
                                   size='small'
                            />
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='p-block'>
                        <h2>Активные обсуждения</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainView;