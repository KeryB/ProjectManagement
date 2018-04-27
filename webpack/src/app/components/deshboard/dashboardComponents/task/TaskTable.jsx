import React from "react";
import {Progress, Table} from "antd";
import {PriorityTask, TaskStatus, TaskTypeOption} from "../../../../utils/task/TaskUtils";

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

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
}, {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
}, {
    title: 'Срок',
    dataIndex: 'time',
    key: 'time',
},{
    title: 'Дата начала',
    dataIndex: 'startDate',
    key: 'startDate',
},{
    title: 'Длительность',
    dataIndex: 'timeSpent',
    key: 'timeSpent',
}, {
    title: 'Процент выполнения',
    dataIndex: 'progress',
    key: 'progress',
},{
    title: 'Последнее изменение',
    dataIndex: 'lastChange',
    key: 'lastChange',
}];
const data = [{
    key: '1',
    type: <span>{TaskTypeOption[0].avatar} {TaskTypeOption[0].name}</span>,
    name: 'Срочно первый баг',
    priority: <span>{PriorityTask[0].avatar} {PriorityTask[0].name}</span>,
    status: <span>{TaskStatus[0].avatar}</span>,
    time:'2ч',
    timeSpent: '1ч 52мин',
    lastChange: '05.04.2018, 15:24',
    progress: <Progress percent={50} status="active"/>
}, {
    key: '2',
    type: <span>{TaskTypeOption[1].avatar} {TaskTypeOption[1].name}</span>,
    name: 'Срочно второй баг',
    priority: <span>{PriorityTask[1].avatar} {PriorityTask[1].name}</span>,
    status: <span>{TaskStatus[0].avatar}</span>,
    time:'2ч',
    timeSpent: '2ч 32мин',
    lastChange: '04.04.2018, 11:35',
    progress: <Progress percent={50} status="active"/>
}, {
    key: '3',
    type: <span>{TaskTypeOption[2].avatar} {TaskTypeOption[2].name}</span>,
    name: 'Срочно третий баг',
    priority: <span>{PriorityTask[1].avatar} {PriorityTask[1].name}</span>,
    status: <span>{TaskStatus[3].avatar}</span>,
    time:'2ч',
    timeSpent: '2ч 32мин',
    lastChange: '04.04.2018, 11:35',
    progress: <Progress percent={50} status="active"/>
}, {
    key: '4',
    type: <span>{TaskTypeOption[0].avatar} {TaskTypeOption[0].name}</span>,
    name: 'Срочно четвертый баг',
    priority: <span>{PriorityTask[1].avatar} {PriorityTask[1].name}</span>,
    status: <span>{TaskStatus[1].avatar}</span>,
    time:'2ч',
    timeSpent: '5ч 32мин',
    lastChange: '03.04.2018, 11:35',
    progress: <Progress percent={50} status="active"/>
}, {
    key: '5',
    type: <span>{TaskTypeOption[0].avatar} {TaskTypeOption[0].name}</span>,
    name: 'Срочно пятый баг',
    priority: <span>{PriorityTask[1].avatar} {PriorityTask[1].name}</span>,
    status: <span>{TaskStatus[1].avatar}</span>,
    time:'2ч',
    timeSpent: '5ч 32мин',
    lastChange: '03.04.2018, 11:35',
    progress: <Progress percent={50} status="active"/>
}, {
    key: '6',
    type: <span>{TaskTypeOption[0].avatar} {TaskTypeOption[0].name}</span>,
    name: 'Срочно шестой баг',
    priority: <span>{PriorityTask[1].avatar} {PriorityTask[1].name}</span>,
    status: <span>{TaskStatus[1].avatar}</span>,
    time:'2ч',
    timeSpent: '5ч 32мин',
    lastChange: '03.04.2018, 11:35',
    progress: <Progress percent={50} status="active"/>
}];

class TaskTable extends React.Component {

    render() {

        return (
            <div>
                <Table columns={columns}
                       dataSource={data}
                       size='middle'
                       pagination={false}
                       rowSelection={rowSelection}
                />
            </div>
        )
    }
}

export default TaskTable;