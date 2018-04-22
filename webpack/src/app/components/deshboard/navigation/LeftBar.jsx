import * as React from "react";
import {Menu, Icon, Col, Avatar, Dropdown, Badge} from 'antd';
import PropTypes from "prop-types";
import * as Path from "../../../utils/RoutePath";
import {Link} from "react-router-dom";
import {isEmpty} from "lodash";

class LeftBar extends React.Component {


    render() {


        return (
            <Col span={4} className='left-bar'>
                <Menu
                    onClick={this.handleClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    <SubMenu key="sub1" title={projectMenuItemGroup(chosenProject, countProjects)} className='project-profile'>
                        <Menu.Divider/>
                        <Menu.Item>
                            <Link to={Path.CREATE_PROJECT}>
                                <Icon type="right-circle-o"/> Создать проект
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={Path.PROJECTS} className='show-all-projects'>
                                <Icon type="bars"/> Показать все
                                <Badge style={{marginLeft: '10px', backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}} count={countProjects}/>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={Path.ADD_TO_PROJECT}><Icon type="user-add"/> Добавить в проект </Link>
                        </Menu.Item>
                        {chosenProject != null ?
                        <Menu.Item>
                           <Link to={`/dashboard/project/${chosenProject.primaryProject.id}`}><Icon type="file"/> Текущий проект</Link>
                        </Menu.Item> : undefined}
                    </SubMenu>
                    <Menu.Divider/>
                    <Menu.Item key="1">
                        <a href="#">
                            <Icon type="home"/>
                            <span>Главная</span>
                        </a>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={Path.MAIL}>
                            <Icon type="mail"/>
                            <span>Почта</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to={Path.CHAT_LIST}>
                            <Icon type="message"/>
                            <span>Чаты <Badge count={9}/></span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to={Path.TASK_PROJECT_LIST}>
                            <Icon type="profile"/>
                            <span>Список задач</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub2" title={<span><Icon type="profile"/>Задачи</span>}>
                        <Menu.Item>
                            <Link to={Path.TASK_PROJECT_LIST}>
                                <Icon type="right-circle-o"/> Все задачи
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={Path.TASK_PROJECT_LIST}>
                                <Icon type="right-circle-o"/> Задачи по всем проектам
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title={<div><Icon type="usergroup-add" /><span>Роли</span><span> и Пользователи</span></div>}>
                        {chosenProject != null ?
                        <Menu.Item>
                            <Link to={`/dashboard/users/project:${chosenProject.primaryProject.id}`}>
                                <Icon type="user"/> Пользователи
                            </Link>
                        </Menu.Item> : undefined }
                        {chosenProject != null ? <Menu.Item>
                            <Link to={`/dashboard/permission/project:${chosenProject.primaryProject.id}`}>
                                <Icon type="right-circle-o"/> Роли(Права)
                            </Link>
                        </Menu.Item> : undefined}
                    </SubMenu>
                    <Menu.Item key="7">
                        <Link to={Path.PROJECT_SETTINGS}>
                            <Icon type="setting"/>
                            <span>Настройки</span>
                        </Link>
                    </Menu.Item>

                </Menu>
            </Col>
        )
    }
}

export default LeftBar;