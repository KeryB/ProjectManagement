import * as React from "react";
import {Menu, Icon, Row, Col, Avatar, Timeline} from 'antd';
import PropTypes from "prop-types";
import * as Path from "../../../utils/RoutePath";

import {Link} from "react-router-dom";
const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;

const handleProject = (projectPermissions) =>(
    <Menu>
        <Menu.Item>
            <div className='current-projects'>
                Текущие проекты
            </div>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
            <a>
                <Icon type="right-circle-o"/> Создать проект
            </a>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
            <Link to={Path.PROJECTS}><Icon type="bars"/> Показать все</Link>
        </Menu.Item>
        <Menu.Divider/>
        {
            projectPermissions
                ? projectPermissions.map((item, index) => {
                    return <Menu.Item key={index}>
                        <Link to='#'><Avatar size='small'/> {item.project.shortTitle}</Link>
                    </Menu.Item>
                })
                : <div> У вас нет проектов</div>
        }
    </Menu>
);

class LeftBar extends React.Component {

    render() {

        const {projectPermissions} = this.props;

        return (
            <Col span={4} className='left-bar'>
                <Menu
                    onClick={this.handleClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="vertical"
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
                        <SubMenu key="4" title={<span><Icon type="folder" /><span>Проекты</span></span>}>
                            {handleProject(projectPermissions)}
                        </SubMenu>
                        <Menu.Item key="5">
                            <a href="#">
                                <Icon type="profile"/>
                                <span>Список задач</span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <a href="#">
                                <Icon type="file"/>
                                <span>Файлы проекта</span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="7">
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

LeftBar.propTypes = {
    projectPermissions: PropTypes.array.isRequired
};
export default LeftBar;