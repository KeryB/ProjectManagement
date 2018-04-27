import {Avatar, Button, Card, Col, Icon, List, Row, Spin, Timeline} from "antd";
import React from 'react';

const geteDataSource = () => {
    const data = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            user: 'Bulychev Kirill',
            action: {
                actionTitle: ' закрыл задачу ',
                taskTitle: ' Срочно сломались выборки! '
            },
            passedTime: '35мин назад'
        });
    }
    return data;
};

const TimeLineComponent = ({data}) => {
    const action = data.action;

    return (
        <div className='timeline'>
            {/*<div className='date-header'>*/}
            {/*Сегодня*/}
            {/*</div>*/}

            <div className='row content'>
                <div className='avatar'>
                    <Avatar src='/resources/images/profile.jpeg'/>
                </div>
                <div className='actions'>
                    <p>
                        <a>{data.user}</a>
                        {action.actionTitle}
                        <a><s>{action.taskTitle}</s></a>
                    </p>

                    <div className='footer-timeline'>
                        <span>
                            <Icon type="clock-circle-o"/> 2 часа назад
                        </span>
                        <span>
                            <a> Прокомментировать</a>
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
};

class DashboardTimeline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadingMore: false,
            showLoadingMore: true,
        }
    }

    render() {
        const {loading, loadingMore, showLoadingMore} = this.state;

        const loadMore = showLoadingMore ? (
            <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px'}}>
                {loadingMore && <Spin/>}
                {!loadingMore && <Button onClick={this.onLoadMore}><i className="fas fa-spinner"/> Загрузить еще</Button>}
            </div>
        ) : null;

        return (
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                loading={loading}
                loadMore={loadMore}
                dataSource={geteDataSource()}
                renderItem={item => (
                    <List.Item>
                        <TimeLineComponent data={item}/>
                    </List.Item>

                )}
            />
        )
    }
}

export default DashboardTimeline;