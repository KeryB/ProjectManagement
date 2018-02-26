import * as React from "react";
import {Menu, Icon, Row, Col, Avatar, Timeline, Dropdown, Badge} from 'antd';
import PropTypes from "prop-types";
import * as Path from "../../../utils/RoutePath";
import {Link} from "react-router-dom";
import {isEmpty} from "lodash";

const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;

const handleProject = () => (
    <Menu>
        <Menu.Item>
            <div className='current-projects'>
                Текущие проекты
            </div>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
            <Link to={Path.CREATE_PROJECT}>
                <Icon type="right-circle-o"/> Создать проект
            </Link>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
            <Link to={Path.PROJECTS}><Icon type="bars"/> Показать все</Link>
        </Menu.Item>
        <Menu.Divider/>
    </Menu>
);

// const projectMenuItemGroup = (chosenProject) => (
//     <span style={{borderColor: 'black'}}>
//         {isEmpty(chosenProject) ? "Проект не выбран" :
//             <div>
//                 <Dropdown overlay={menu} trigger={['click']}>
//                     <a className=    "ant-dropdown-link" href="#">
//                         <Avatar size='large'/>
//                         <span className='span5-left'>
//                             {chosenProject.project.title}
//                         </span>
//                     </a>
//                 </Dropdown>
//             </div>
//
//         }
//     </span>
// );
const projectMenuItemGroup = ({project}) => (
    <span>
        <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link">
                <Badge dot> <Avatar shape="square" size='large' className='project-avatar'/></Badge>
                <span className='span5-left'>
                {isEmpty(project) ? <span>Проект не выбран</span> : <span>{project.title}</span>}
            </span>
                <Icon type="down"/>
            </a>
        </Dropdown>
    </span>

);


const menu = (
    <Menu>
        <Menu.Item>
            <Link to={Path.CREATE_PROJECT}>
                <Icon type="right-circle-o"/> Создать проект
            </Link>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
            <Link to={Path.PROJECTS}><Icon type="bars"/> Показать все</Link>
        </Menu.Item>
        <Menu.Divider/>
    </Menu>
);

class LeftBar extends React.Component {

    handleClick = (e) => {
        console.log('click ', e);
    };

    render() {

        const {chosenProject} = this.props;

        return (
            <Col span={4} className='left-bar'>
                <Menu
                    onClick={this.handleClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="vertical"
                >
                    <Menu.Item className='project-dropdown'>
                        {projectMenuItemGroup(chosenProject)}
                    </Menu.Item>
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
    chosenProject: PropTypes.object.isRequired
};
export default LeftBar;