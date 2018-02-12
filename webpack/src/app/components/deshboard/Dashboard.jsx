import * as React from "react";
import {Menu, Icon, Row, Col,Avatar} from 'antd';

const MenuItemGroup = Menu.ItemGroup;
import Timeline from "./DashboardTimeline";

const dashboardsRoute = () => {
};

class DashBoard extends React.Component {


    render() {

        const {userData: {projectPermissions}} = this.props;
        console.log(projectPermissions);

        return (
            <div className='dashboard'>

                <Row gutter={48} style={{padding: '10px', margin:'0px'}}>
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
                    <Timeline/>
                </Row>
            </div>
        )
    }
}

export default DashBoard;