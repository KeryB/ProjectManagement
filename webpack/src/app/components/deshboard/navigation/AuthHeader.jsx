import PropTypes from "prop-types";
import {Menu, Icon, Avatar, Dropdown, Button, Layout, Badge, List} from 'antd';
import {Link} from "react-router-dom";
import * as Path from '../../../utils/RoutePath'
import {removeStorageItem} from "../../../utils/token/LocalStorage";
import {tokenHeader} from "../../../actions/api/Api";

const {Header} = Layout;

const data = [{
    avatar: <Avatar src="/resources/images/message.png"/>,
    title: 'Новое письмо на почте',
    payload: 'Бла бла бла бла бла бла'
}, {
    avatar: <Avatar src="/resources/images/user_add.png"/>,
    title: 'Новое письмо на почте',
    payload: 'Бла бла бла бла бла бла'
}];

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
        <div className='list-notification'>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={item.avatar}
                            title={<a>{item.title}</a>}
                            description={item.payload}
                        />
                    </List.Item>
                )}
            />
            <div className='show-all'>
                <a>Показать все</a>
            </div>
        </div>
    </Menu>
);

const projectActions = () => (
    <Menu>
        <Menu.Item key="0">
            <Link to={Path.CREATE_PROJECT}>
                <Icon type="right-circle-o"/> Создать новый проект
            </Link>
        </Menu.Item>
        <Menu.Item key="1">
            <Link to={Path.ADD_TO_PROJECT}><Icon type="user-add"/> Добавить в проект </Link>
        </Menu.Item>
        <Menu.Item key="2">
            <Link to={Path.PROJECTS} className='show-all-projects'>
                <Icon type="bars"/> Показать все проекты
                <Badge style={{marginLeft: '10px'}} count={5}/>
            </Link>
        </Menu.Item>
    </Menu>
);

class AuthHeader extends React.Component {

    logout = () => {
        removeStorageItem(tokenHeader);
        window.location.href = '/';
    };


    render() {
        const {user, project} = this.props;

        return (
            <Header>
                <div className='sub-header'>
                    <Dropdown overlay={projectActions()} trigger={['click']}>
                        <div className='project-header'>
                            <i className="far fa-folder"/>
                            {project != null ? <h3 style={{
                                display: 'inline-block',
                                marginBottom: '0px'
                            }}>{project.primaryProject.title}</h3> : undefined}
                        </div>
                    </Dropdown>
                    {/*<Link to={Path.CREATE_TASK}> Создать задачу</Link>*/}
                    <Dropdown overlay={profileMenu(this.logout, user)} trigger={['click']}>
                        <div className='profile-header'>
                            <a>
                                <div className='display-ant-profile'>
                                    <Avatar size='large'/>
                                        <div className='user-name'>
                                            <span>
                                                {user.firstName + ' ' + user.secondName}
                                            </span>
                                        </div>
                                    <div className='role-profile'>Менеджер</div>
                                </div>
                            </a>
                        </div>
                    </Dropdown>


                    <Dropdown overlay={notification()} trigger={['click']}>
                        <a className="notification" href="#">
                            <Badge count={3}>
                                <Icon type="bell"/>
                            </Badge>
                        </a>
                    </Dropdown>
                </div>
            </Header>
        )
    }
}

AuthHeader.propTypes = {
    user: PropTypes.object.isRequired,
    project: PropTypes.object
};


export default AuthHeader;