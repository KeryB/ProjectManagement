import * as React from "react";
import {Layout, Menu, Breadcrumb, Button, Icon, Avatar} from 'antd';
import {Link} from "react-router-dom";
import * as Path from '../../utils/RoutePath'
import * as Status from '../../utils/AuthStatus';

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
            <Button type="primary" className='position-right'>
                <Link to={Path.LOGIN}>Регистрация/Авторизация</Link>
            </Button>
            : undefined
        }
    </SubMenu>
);

const authorizedComponents = (user) => (
    <SubMenu
        title={<div><span><Avatar size='large'/></span><span>{user.firstName + ' ' + user.secondName}</span></div>}>
        <Menu.Item key="setting:1">Настройки</Menu.Item>
        <Menu.Item key="setting:2">Профайл</Menu.Item>
        <Menu.Item key="setting:3">Что-то еще</Menu.Item>
        <Menu.Item key="setting:4">Выйти</Menu.Item>
    </SubMenu>
);

class Navbar extends React.Component {

    render() {
        const {location, user} = this.props;
        console.log(this.props);
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
                                authorizedComponents(user)
                        }
                    </Menu>
                </Header>
            </Layout>
        )
    }
}

Navbar.propTypes = {
    location: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
};

export default Navbar;
