import PropTypes from "prop-types";
import Navbar from "../Navbar";
import {Menu, Icon, Avatar, Dropdown} from 'antd';
import {Link} from "react-router-dom";

const profileMenu = (logout) => (
    <Menu>
        <Menu.Item key="0">
            <Link to={RoutePath}><Icon type="idcard"/> Профиль</Link>
        </Menu.Item>
        <Menu.Item key="1">
            <a><Icon type="setting"/> Настройки</a>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="2">
            <a onClick={logout}>
                <Icon type="logout"/> Выйти
            </a>
        </Menu.Item>
    </Menu>
);

const projectMenu = (project) => (
    <Menu>
        <Menu.Item>
            <a className='current-projects'>
                Текущие проекты
            </a>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
            <a>
                <Icon type="right-circle-o"/> Создать проект
            </a>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
            <a><Icon type="bars" /> Показать все</a>
        </Menu.Item>
        <Menu.Divider/>
        {
            project
                ? project.map((item, index) => {
                    return <Menu.Item key={index}>
                        <Link to='#'><Avatar size='small'/> {item.project.shortTitle}</Link>
                    </Menu.Item>
                })
                : <div> У вас нет проектов</div>
        }
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
        const {user, project, logout} = this.props;
        return (
            <div>
                <Dropdown overlay={profileMenu(logout)} trigger={['click']}>
                    <a className='float-right'>
                        <Avatar size='large'/>
                        <span className='user-name'>{user.firstName + ' ' + user.secondName}</span>
                    </a>
                </Dropdown>

                <Dropdown overlay={projectMenu(project)}>
                    <a className="a-btn projects" href="#">
                        <Icon type="folder"/>
                        <span> Проекты</span>
                        <Icon type="down"/>
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
    project: PropTypes.array.isRequired,
    logout: PropTypes.func.isRequired,
};


export default AuthHeader;