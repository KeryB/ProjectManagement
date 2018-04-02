import React from "react";
import {Input, Button, Checkbox, Icon, List, Popconfirm, Table, Tabs, Avatar, Pagination, Badge} from "antd";
import moment from "moment";
const Search = Input.Search;

const TabPane = Tabs.TabPane;

const getData = () => {
    let data = [];

    for (let i = 0; i < 10; i++) {
        data.push({
            title: "BLBLBLBLBLBL",
            person: "KIRILL"
        })
    }

    return data;
};


class Chats extends React.Component {

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
                        <a className='a-btn-primary'><Icon type="plus-circle-o"/> Добавить тему</a>
                    </div>
                </div>
                <div className='indent-p-block'>
                    <div>
                        <Search
                            placeholder="Введите название темы"
                            onSearch={value => console.log(value)}
                            style={{ width: 200 }}
                        />
                        <Icon type="filter"/>
                    </div>

                    <div className='list-message-container'>
                        <div className='row header-list'>
                            <div className='col-6 col-md-8'>
                                <Icon type="caret-right"/> Тема обсуждения
                            </div>
                            <div className='col-6 col-md-2'>
                                <Icon type="message"/> Ответов
                            </div>
                            <div className='col-6 col-md-2'>
                                Последнее сообщение от:
                            </div>
                        </div>
                        <List
                            className="demo-loadmore-list"
                            itemLayout="horizontal"
                            dataSource={getData()}
                            renderItem={item => (
                                <List.Item>
                                    <div className='row'>
                                        <div className='col-6 col-md-8'>
                                            <span>
                                                <Checkbox style={{marginTop: '-26px'}}/>
                                                <Avatar src="/resources/images/post.png" style={{marginTop: '-26px'}}/>
                                            </span>
                                            <div className='chat-message-title'>
                                                <div className='title'><a href="https://ant.design">{item.title}</a>
                                                    <Badge count={25}/></div>
                                                <div
                                                    className='last-your-message'>{item.person}, {moment(new Date()).format('DD MMMM YYYY, h:mm')}</div>
                                            </div>
                                        </div>
                                        <div className='col-6 col-md-2'>
                                            <span>
                                                Ответов: 0
                                            </span>
                                        </div>
                                        <div className='col-6 col-md-2'>
                                            <div><a>Izhdark</a></div>
                                            <div>{moment(new Date()).format('DD MMMM YYYY, h:mm')}</div>
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </div>
                    <div className='pagination'>
                        <Pagination size="small" total={50}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chats;