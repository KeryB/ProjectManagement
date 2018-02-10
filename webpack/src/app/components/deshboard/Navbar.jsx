import * as React from "react";
import {Layout, Menu, Breadcrumb, Button, Icon, Avatar, Dropdown} from 'antd';
import {Link} from "react-router-dom";
import * as Path from '../../utils/RoutePath'
import * as Status from '../../utils/AuthStatus';
import PropTypes from 'prop-types';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const {Header, Content, Footer} = Layout;


const notAuthComponent = (location) => (
    <SubMenu>
        <Menu.Item key="1">Пример</Menu.Item>
        <Menu.Item key="2">Пример</Menu.Item>
        <Menu.Item key="3">Пример</Menu.Item>
        {location.pathname !== Path.LOGIN
            ?
            <Menu.Item><Button type="primary" className='position-right'>
                <Link to={Path.LOGIN}>Регистрация/Авторизация</Link>
            </Button>
            </Menu.Item>
            : undefined

        }
    </SubMenu>
);

const profileMenu = (
    <Menu>
        <Menu.Item key="0">
            <a><Icon type="profile"/> Профайл</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a>фыв</a>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="3"><Icon type="logout"/> Выйти</Menu.Item>
    </Menu>
);

const projectList = (item, index) => {
    return <Menu.Item key={index}>asd</Menu.Item>
};

const projectMenu = (project) => (
    <Menu>
        {
            project
                ? project.map((item, index) => {
                    return <Menu.Item key={index}>
                        <a href='#'>{item.project.shortTitle}</a>
                    </Menu.Item>
                })
                : <div> У вас нет проектов</div>
        }
    </Menu>
);

class Navbar extends React.Component {

    render() {
        const {location, user, project} = this.props;
        console.log(project);
        return (
            <Layout className="layout">
                <Header>
                    <Link to={Path.DASHBOARD} className='logo'>
                        <div className='top_home_logo'>
                        </div>
                    </Link>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                    >
                        {
                            (user.tokenStatus === Status.NOT_AUTH) ?
                                notAuthComponent(location)
                                :
                                <Menu>
                                    <Dropdown overlay={projectMenu(project)}>
                                        <a className="ant-dropdown-link" href="#">
                                            <Icon type="folder"/>
                                            <span> Проекты</span>
                                            <Icon type="down"/>
                                        </a>
                                    </Dropdown>
                                    <Dropdown overlay={profileMenu} trigger={['click']}>
                                        <a className='top_profile'>
                                            <Avatar size='large'/>
                                            <span>{user.firstName + ' ' + user.secondName}</span>
                                        </a>
                                    </Dropdown>
                                </Menu>
                        }
                    </Menu>
                </Header>
            </Layout>
        )
    }
}

Navbar.propTypes = {
    location: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    project: PropTypes.array.isRequired,
};

export default Navbar;
