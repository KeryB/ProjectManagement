import React from "react";
import {
    Input, Button, Checkbox, Icon, List, Popconfirm, Table, Tabs, Avatar, Pagination, Badge, Dropdown,
    Menu, Tooltip, Divider, Breadcrumb, Tag
} from "antd";
import moment from "moment";
import {Link} from "react-router-dom";
import * as Path from "../../../../utils/RoutePath";

const Search = Input.Search;

const TabPane = Tabs.TabPane;

const getData = () => {
    let data = [];

    data.push( {
        title: "Продлить акции по Mercedes-Benz StarClass",
        person: "Николаев Алексей",
        personTime: "20 мая 2018, 15:18",
        creator: "Зубкова Екатерина",
        lastMessage: "Зубкова Екатерина",
        lastMessageTime: "18 мая 2018, 14:38",
        countFile: '0',
        countMessage: '10',
        badgeCount: "",
        links: "2",
        isArchive: false,
        isClosed: true
    }, {
        title: "Обновить рекламу на сайте!",
        person: "Булычев Кирилл",
        personTime: "01 июня 2018, 17:52",
        creator: "Булычев Кирилл",
        lastMessage: "Денис Глотов",
        lastMessageTime: "03 июня 2018, 15:50",
        countFile: '1',
        countMessage: '3',
        badgeCount: "3",
        links: "0"
    }, {
        title: "Продвижение программы Mercedes-Benz StarClass",
        person: "Николаев Алексей",
        personTime: "15 июня 2018, 14:52",
        creator: "Зубкова Екатерина",
        lastMessage: "Зубкова Екатерина",
        lastMessageTime: "15 июня 2018, 17:55",
        countFile: '3',
        countMessage: '19',
        badgeCount: "",
        links: "2",
        isArchive: true,
        isClosed: true
    });

    return data;
};

const menu = (
    <Menu>
        <Menu.Item key="0">
            <Checkbox>
                Все
            </Checkbox>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="1">
            <Checkbox>
                Обычные
            </Checkbox>
        </Menu.Item>
        <Menu.Item key="3">
            <Checkbox>
                Важные
            </Checkbox>
        </Menu.Item>
        <Menu.Item key="4">
            <Checkbox>
                Обсуждаемые
            </Checkbox>
        </Menu.Item>
        <Menu.Item key="5">
            <Checkbox>
                Закрытые
            </Checkbox>
        </Menu.Item>
    </Menu>
);

const IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
);

const menuActions = (

    <Menu>
        <Menu.Item key="0">
            <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
)


class ChatList extends React.Component {

    onRow = (record) => {
        return {
            onClick: () => {
                console.log(record)
            },
        };
    };

    render() {

        return (
            <div className='chat-list'>
                <div className='p-block'>
                    <div>
                        <h3>
                            <Breadcrumb>
                                <Breadcrumb.Item href="">
                                    <Icon type="home"/> Главная
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    Список чатов
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </h3>
                        <div>
                            <Search
                                placeholder="Введите название темы"
                                onSearch={value => console.log(value)}
                                style={{width: 200}}
                            />
                            <span className='filter'>
                                <Tooltip title="Отображение">
                                    <Dropdown overlay={menu} trigger={['click']}>
                                        <Icon type="filter"/>
                                    </Dropdown>
                                </Tooltip>
                            </span>
                            <div className='display-inline-block float-right'>
                                <a className='a-btn-primary'><Icon type="plus-circle-o"/> Добавить тему</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='indent-p-block'>

                    <div className='list-message-container'>
                        <List
                            className="demo-loadmore-list"
                            itemLayout="horizontal"
                            dataSource={getData()}
                            renderItem={item => (
                                <List.Item>
                                    <div className='row'>
                                        <div className='col-6 col-md-7'>
                                            <span>
                                                <Checkbox style={{marginTop: '-58px'}}/>
                                                <Avatar src="/resources/images/profile.jpeg"
                                                        style={{marginTop: '-58px'}}/>
                                            </span>
                                            <div className='chat-message-title'>
                                                <div className='title'>
                                                    <h4 className='title-header'>
                                                        <Link to={{
                                                            pathname: Path.CHAT_PAGE,
                                                            state: {item: item}
                                                        }}>{item.title} {item.isArchive ?
                                                            <span>(Из архива)</span> : undefined}</Link>
                                                    </h4>
                                                    <Badge count={item.badgeCount}/>
                                                </div>
                                                <div className='last-your-message'>
                                                    <a>{item.person}</a>, {item.personTime}
                                                </div>
                                                <div className='stuff'>
                                                    <IconText type="file" text={item.countFile}/>
                                                    <Divider type="vertical"/>
                                                    <IconText type="message" text={item.countMessage}/>
                                                    <Divider type="vertical"/>
                                                    <IconText type='link' text={item.links}/>
                                                    <Divider type="vertical"/>
                                                    {item.isClosed ?  <Tag color="#87d068">Обсуждение закрыто</Tag> : undefined}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-6 col-md-2'>
                                            <div>
                                                <h4>
                                                    Создатель обсуждения:
                                                </h4>
                                            </div>
                                            <div>
                                                <a>{item.creator}</a>
                                            </div>
                                        </div>
                                        <div className='col-6 col-md-2'>
                                            <div>
                                                <h4>Последнее сообщение от: </h4>
                                                <a>{item.lastMessage}</a>
                                                <span>{" " + item.lastMessageTime}</span>
                                            </div>
                                        </div>
                                        <div className='col-6 col-md-1'>
                                            <Dropdown overlay={menuActions} trigger={['click']}>
                                                <a className="ant-dropdown-link" href="#">
                                                    <Icon style={{marginTop: '25px'}} type="down"/>
                                                </a>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </div>
                    {/*<div className='pagination'>*/}
                    {/*<Pagination size="small" total={50}/>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}

export default ChatList;