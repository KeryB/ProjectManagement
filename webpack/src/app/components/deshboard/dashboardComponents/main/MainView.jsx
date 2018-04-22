import React from "react";
import {Avatar, Button, Calendar, Card, Divider, Icon, Table, Tooltip, Radio} from "antd";
import {PriorityTask, TaskStatus, TaskTypeOption} from "../../../../utils/task/TaskUtils";
import DashboardTimeline from "../../navigation/DashboardTimeline";
import {DefaultButton, DefaultViewMode} from "../../commoncomponents/SubComponents";
import {ViewMode} from "../../../../utils/timeline/ViewMode";
import ScheduleTaskCalendar from "./ScheduleTaskCalendar";

const ButtonGroup = Button.Group;

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
    title: 'Время',
    dataIndex: 'timeSpent',
    key: 'timeSpent',
}, {
    title: 'Последнее изменение',
    dataIndex: 'lastChange',
    key: 'lastChange',
}];
const data = [{
    key: '1',
    type: <span>{TaskTypeOption[0].avatar} {TaskTypeOption[0].name}</span>,
    name: 'Срочно первый баг',
    priority: <span>{PriorityTask[0].avatar}</span>,
    status: <span>{TaskStatus[0].avatar}</span>,
    timeSpent: '1ч 52мин',
    lastChange: '05.04.2018, 15:24'
}, {
    key: '2',
    type: <span>{TaskTypeOption[1].avatar} {TaskTypeOption[1].name}</span>,
    name: 'Срочно второй баг',
    priority: <span>{PriorityTask[1].avatar}</span>,
    status: <span>{TaskStatus[0].avatar}</span>,
    timeSpent: '2ч 32мин',
    lastChange: '04.04.2018, 11:35'
}, {
    key: '3',
    type: <span>{TaskTypeOption[2].avatar} {TaskTypeOption[2].name}</span>,
    name: 'Срочно первый баг',
    priority: <span>{PriorityTask[1].avatar}</span>,
    status: <span>{TaskStatus[3].avatar}</span>,
    timeSpent: '2ч 32мин',
    lastChange: '04.04.2018, 11:35'
}, {
    key: '4',
    type: <span>{TaskTypeOption[0].avatar} {TaskTypeOption[0].name}</span>,
    name: 'Срочно первый баг',
    priority: <span>{PriorityTask[1].avatar}</span>,
    status: <span>{TaskStatus[1].avatar}</span>,
    timeSpent: '5ч 32мин',
    lastChange: '03.04.2018, 11:35'
}, {
    key: '5',
    type: <span>{TaskTypeOption[0].avatar} {TaskTypeOption[0].name}</span>,
    name: 'Срочно первый баг',
    priority: <span>{PriorityTask[1].avatar}</span>,
    status: <span>{TaskStatus[1].avatar}</span>,
    timeSpent: '5ч 32мин',
    lastChange: '03.04.2018, 11:35'
}, {
    key: '6',
    type: <span>{TaskTypeOption[0].avatar} {TaskTypeOption[0].name}</span>,
    name: 'Срочно первый баг',
    priority: <span>{PriorityTask[1].avatar}</span>,
    status: <span>{TaskStatus[1].avatar}</span>,
    timeSpent: '5ч 32мин',
    lastChange: '03.04.2018, 11:35'
}];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: ViewMode[0].value
        }
    }

    handleClickCurrentTusks = () => {
        this.setState = {
            viewMode: ViewMode[0].value
        }
    };
    handleClickGroupByTasks = () => {
        console.log("asdad");
        this.setState = {
            viewMode: ViewMode[1].value
        };
    };
    handleClickGroupByProject = () => {
        this.setState = {
            viewMode: ViewMode[2].value
        };
    };

    render() {
        const {viewMode} = this.state;

        let view;
        if (viewMode === ViewMode[0].value) {
            view = <div className='table'>
                <Table columns={columns}
                       dataSource={data}
                       size='small'
                       pagination
                />
            </div>
        } else {

        }

        return (
            <div className='main-view'>
                <div className='row'>
                    <div className='col-sm-8'>
                        <div className='p-block'>
                            <div>
                                <div className='setting-task-main'>
                                    <div className='change-view-mode'>
                                        <Radio.Group>
                                            <Radio.Button value="large"><i className='fas fa-table'/></Radio.Button>
                                            <Radio.Button value="default"><i className='fas fa-list-ol'/></Radio.Button>
                                            <Radio.Button value="small"><i className='fas fa-th-list'/></Radio.Button>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                            <div className='main-view-header'>
                                <h3 className='display-inline-block'>Текущие задачи</h3>
                            </div>
                            <div>
                                <Table columns={columns}
                                       dataSource={data}
                                       size='middle'
                                       pagination={false}
                                       rowSelection={rowSelection}
                                />
                            </div>
                        </div>
                        <div className='activity-stream indent-p-block'>
                            <div className='col-8'>
                                <DashboardTimeline/>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-4'>
                        <div className='p-block'>
                            <h3>Календарь задач</h3>
                            <ScheduleTaskCalendar/>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default MainView;