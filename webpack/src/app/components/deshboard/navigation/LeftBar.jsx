import * as React from "react";
import {Menu, Icon, Col, Avatar, Dropdown, Badge} from 'antd';
import PropTypes from "prop-types";
import * as Path from "../../../utils/RoutePath";
import {Link} from "react-router-dom";
import {isEmpty} from "lodash";

const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;

const projectMenuItemGroup = (chosenProject) => (

    <span>
        <Badge dot> <Avatar shape="square" size='large' className='project-avatar'/></Badge>
        <span className='span5-left'>
            {chosenProject !== null ? <span>{chosenProject.primaryProject.title}</span> :
                <span>Проект не выбран</span>}
                    </span>
    </span>

);

const menu = (countProjects) => (
    <Menu>
        <Menu.Item>
            <Link to={Path.CREATE_PROJECT}>
                <Icon type="right-circle-o"/> Создать новый проект
            </Link>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
            <Link to={Path.PROJECTS} className='show-all-projects'>
                <Icon type="bars"/> Показать все проекты
                <Badge style={{marginLeft: '10px'}} count={countProjects}/>
            </Link>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
            <Link to={Path.ADD_PROJECT}><Icon type="user-add"/> Добавить в проект </Link>
        </Menu.Item>
        <Menu.Item>
            <Link to={Path.ADD_PROJECT}><Icon type="area-chart"/> Текущий проект</Link>
        </Menu.Item>
    </Menu>
);

class LeftBar extends React.Component {

    handleClick = (e) => {
        console.log('click ', e);
    };

    render() {

        const {projectData: {countProjects, chosenProject}} = this.props;
        console.log(this.props);

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
                            <Link to={Path.ADD_PROJECT}><Icon type="user-add"/> Добавить в проект </Link>
                        </Menu.Item>
                        {chosenProject != null ?
                        <Menu.Item>
                           <Link to={`/dashboard/project/id=${chosenProject.primaryProject.id}`}><Icon type="area-chart"/> Текущий проект</Link>
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

                </Menu>
            </Col>
        )
    }
}

LeftBar.propTypes = {
    projectData: PropTypes.object.isRequired
};
export default LeftBar;