import * as React from "react";
import {Menu, Icon, Row, Col, Avatar, Timeline} from 'antd';
import DashboardTimeline from "./DashboardTimeline";
const MenuItemGroup = Menu.ItemGroup;

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
                    <MenuItemGroup key="g1" title="Dashboard">
                        <Menu.Item key="1">
                            <a href="#">
                                <Icon type="home"/>
                                <span>Home</span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <a href="#">
                                <Icon type="mail"/>
                                <span>Почта</span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <a href="#">
                                <Icon type="message"/>
                                <span>Чаты</span>
                            </a>
                        </Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup key="g3" title='Название проекта'>
                        <Menu.Item key="4">
                            <a href="#">
                                <Icon type="profile"/>
                                <span>Список задач</span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <a href="#">
                                <Icon type="file"/>
                                <span>Файлы проекта</span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <a href="#">
                                <Icon type="setting"/>
                                <span>Настройки</span>
                            </a>
                        </Menu.Item>
                    </MenuItemGroup>
                </Menu>
            </Col>
        )
    }
}
export default LeftBar;