import * as React from "react";
import {Menu, Icon, Layout} from 'antd';
import {isEmpty} from "lodash";
import {Link} from "react-router-dom";
import * as Path from "../../../utils/RoutePath";
import PropTypes from "prop-types";

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

class LayoutSider extends React.Component {

    static propTypes = {
        chosenProject: PropTypes.object
    };

    render() {

        const {chosenProject} = this.props;

        return (
            <Sider
                collapsed
            >
                <a className='logo'>
                </a>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <Link to={Path.DASHBOARD}>
                            <div className='icon-layout'>
                                <Icon type="desktop"/>
                            </div>
                            <div className='text-layout'>Главная</div>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={Path.MAIL}>
                            <div className='icon-layout'>
                                <Icon type="mail"/>
                            </div>
                            <div className='text-layout'>Почта</div>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to={Path.CHAT_LIST}>
                            <div className='icon-layout'>
                                <Icon type="message"/>
                            </div>
                            <div className='text-layout'>Чаты</div>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <div className='icon-layout'>
                            <Icon type="file"/>
                        </div>
                        <div className='text-layout'>Файлы</div>
                    </Menu.Item>
                    <Menu.Item key="5">
                        {chosenProject != null ?
                            <Link to={`/dashboard/project/${chosenProject.primaryProject.id}`}>
                                <div className='icon-layout'>
                                    <Icon type="safety"/>
                                </div>
                                <div className='text-layout'>Проект</div>
                            </Link>:
                            undefined}
                    </Menu.Item>

                    <SubMenu
                        key="sub1"
                        title={<div>
                            <div className='icon-layout'>
                                <Icon type="solution"/>
                            </div>
                            <div className='text-layout'>Задачи</div>
                        </div>}
                    >
                        <Menu.Item key="6">
                            <Link to={Path.TASK_LIST}><Icon type="calendar"/> Список задач</Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to={Path.TASK_PROJECT_LIST}><Icon type="calendar"/> Доступные задачи</Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to={Path.DETAIL_SCHEDULE_TASK_CALENDAR}><Icon type="calendar"/> Календарь задач</Link>
                        </Menu.Item>
                        <Menu.Item key="9"><Icon type="bar-chart"/> Статистика</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={<div>
                            <div className='icon-layout'>
                                <Icon type="usergroup-add"/>
                            </div>
                            <div className='text-layout'>Пользователи</div>
                        </div>}
                    >
                        <Menu.Item key="10">
                            {chosenProject != null ?
                                <Link to={`/dashboard/users/project:${chosenProject.primaryProject.id}`}>
                                    <Icon type="user"/> Пользователи
                                </Link>
                                : undefined}
                        </Menu.Item>
                        <Menu.Item key="11">
                            {chosenProject != null ?
                                <Link to={`/dashboard/permission/project:${chosenProject.primaryProject.id}`}>
                                    <Icon type="right-circle-o"/> Роли(Права)
                                </Link>
                                : undefined}
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="12">
                        <div className='icon-layout'>
                            <Icon type="setting"/>
                        </div>
                        <div className='text-layout'>Настройка</div>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default LayoutSider;