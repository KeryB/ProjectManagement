import PropTypes from "prop-types";
import Navbar from "../Navbar";
import {Menu, Icon, Avatar, Dropdown, Button} from 'antd';
import {Link} from "react-router-dom";
import * as Path from '../../../utils/RoutePath'

const profileMenu = (logout, user) => (
    <Menu>
        <Menu.Item key="0">
            <Link to={`/dashboard/profile/${user.id}`}><Icon type="idcard"/> Профиль</Link>
        </Menu.Item>
        <Menu.Item key="1">
            <Link to={Path.Settings}><Icon type="setting"/> Настройки</Link>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="2">
            <a onClick={logout}>
                <Icon type="logout"/> Выйти
            </a>
        </Menu.Item>
    </Menu>
);

const notification = () => (
    <Menu>
        <Menu.Item key='0'>
            <a className='current-projects'>
                Текущие проекты
            </a>
        </Menu.Item>
    </Menu>
);

class AuthHeader extends React.Component {


    render() {
        const {user, logout} = this.props;
        return (
            <div>
                <Link to={Path.CREATE_TASK}> Создать задачу</Link>
                <Dropdown overlay={profileMenu(logout, user)} trigger={['click']}>
                    <a className='float-right'>
                        <Avatar size='large'/>
                        <span className='user-name'>{user.firstName + ' ' + user.secondName}</span>
                    </a>
                </Dropdown>


                <Dropdown overlay={notification()} trigger={['click']}>
                    <a className="notification" href="#">
                        <Icon type="notification"/>
                    </a>
                </Dropdown>
            </div>
        )
    }
}

AuthHeader.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};


export default AuthHeader;