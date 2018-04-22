import React from "react";
import {Avatar, Calendar, Icon, List} from "antd";
import {TaskTypeOption} from "../../../../utils/task/TaskUtils";
import moment from "moment/moment";
import * as Path from "../../../../utils/RoutePath";
import {Link} from "react-router-dom";

const getDataSource = () => {
    let data = [];
    data.push({
        title: 'Название задачи',
        description: 'бла бла бла бла',
        avatar: TaskTypeOption[0].avatar
    }, {
        title: 'Название задачи',
        description: 'бла бла бла бла',
        avatar: TaskTypeOption[0].avatar
    });
    return data;
};

const getListData = (value) => {
    const listDate = [];
    console.log(value.date() === moment(new Date()).date());
    const today = moment(new Date());
    if (value.date() === moment(new Date()).date()) {
        return listDate.push();
    }

    return listDate;
};


class ScheduleTaskCalendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadingMore: false,
            showLoadingMore: true,
        }
    }

    cellRender = (value) => {

        const listData = getListData(value);

        // if (value.date() === moment(new Date()).date()) {
        //
        //     return (
        //         <p>asdasd</p>
        //     )
        // }
    };
    dateFullCellRender=(value)=>{
        // if (value.date() === moment(new Date()).date()) {
        //
        //     return (
        //         <p>asdasd</p>
        //     )
        // }
        // return()
    };

    render() {
        const {loading, loadingMore, showLoadingMore} = this.state;

        return (
            <div>
                <div>
                    <div style={{border: '1px solid #d9d9d9', borderRadius: 4}}>
                        <Calendar fullscreen={false} dateCellRender={this.cellRender} />
                    </div>
                </div>
                <div>
                    <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        loading={loading}
                        dataSource={getDataSource()}
                        renderItem={item => (
                            <div className='tisk-list-schedule'>
                                <div className='row'>
                                    <div className='col-sm-8'>
                                        <span>{item.avatar}</span>
                                        <div className='display-inline-block'>
                                            <h4>{item.title}</h4>
                                            <div>{item.description}</div>
                                        </div>
                                    </div>
                                    <div className='col-sm-4'>
                                        <div style={{marginTop: '11px'}}>
                                            <Link to={Path.DETAIL_SCHEDULE_TASK_CALENDAR}><Icon type="right-square-o"/> Детализация</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
        )
    }
}

export default ScheduleTaskCalendar;