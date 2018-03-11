import * as React from "react";
import PropTypes from "prop-types";
import {Avatar, Card, Col, Divider, Form, Icon, Row, Spin, Tabs} from "antd";
import {isEmpty} from "lodash";
import moment from "moment";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import FetchList from "../commoncomponents/FetchList";
import * as Path from '../../../utils/RoutePath';
import {Link} from "react-router-dom";
import {fetchUserProfile, toProfileUser} from "../../../actions/UserAction";

const formItemLayout = {
    labelCol: {span: 3},
    wrapperCol: {offset: 8},
};

const showProjects = (projects) => (
    projects.map((item, index) => (
        <Card
            cover={<Avatar shape="square"/>}
            hoverable
            style={{marginRight: '5px', height: '40px', width: '40px'}}
        >
        </Card>
    ))
);

class Profile extends React.Component {

    static propTypes = {
        userData: PropTypes.object.isRequired,
    };

    state = {
        current: 0,
        pageSize: 8,
        userId: 0
    };

    componentDidMount() {
        const {userData: {user}, fetchUserProfile, toProfileUser, match: {params}} = this.props;
        const userId = parseInt(params.id);

        if (this.checkOnEnemy(user, params)) {
            this.state.userId = userId;
            fetchUserProfile(this.state);
        } else {
            toProfileUser(user);
        }
    }

    componentWillReceiveProps(props) {
    }

    checkOnEnemy = (user, params) => {
        const userId = parseInt(params.id);
        return userId !== user.id;
    };


    profileComponent = (user, projectDat, isEnemy) => (

        <Row>
            <Col span={9}>
                <Card
                    hoverable
                    style={{width: 200}}
                    cover={<Link to={Path.Settings}><img style={{width: 200}} alt="example"
                                                         src="../../../../resources/images/profile.jpeg"/></Link>}
                >
                </Card>
            </Col>
            <Col span={14} className='contact-information'>
                <h3 style={{display: 'inline-block'}}>Информация:</h3>
                {isEnemy ? undefined : <Link to={Path.Settings}><Icon type="edit" style={{float: 'right'}}/></Link>}
                <Divider type="horizontal"/>
                <Form>
                    <Form.Item
                        {...formItemLayout}
                        label="Nickname"
                    >
                        <span
                            className="ant-form-text">{isEmpty(user.nickName) ? 'Поле не заполнено' : user.nickName}</span>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Имя и Фамилия"
                    >
                        <span className="ant-form-text">{user.firstName + ' ' + user.secondName}</span>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Email"
                    >
                        <span className="ant-form-text">{user.email}</span>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Дата Регистрации"
                    >
                        <span className="ant-form-text">{moment(user.creationDate).format('LL')}</span>
                    </Form.Item>
                </Form>
            </Col>
            <Divider type="horizontal"/>
            <h3>Проекты:</h3>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Доступные проекты" key="1">
                    <div className='project-list'>
                        <FetchList pageable={this.state}/>
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Мои" key="2">Мои</Tabs.TabPane>
                <Tabs.TabPane tab="Завершенные" key="3">Завершенные</Tabs.TabPane>
            </Tabs>
        </Row>
    );

    render() {
        const {profileData, projectData, userData, match:{params}} = this.props;
        let user = null;
        if (profileData.user == null) {
            user = userData.user;
        } else {
            user = profileData.user;
        }

        const isEnemy = this.checkOnEnemy(userData.user, params);
        const name = user.firstName + ' ' + user.secondName;

        return (
            <div className='profile'>
                <div className='header-profile'>
                    <h2>
                        Профиль: {name}
                    </h2>
                </div>

                <Row gutter={16} style={{paddingTop: '20px'}}>
                    <Col span={16}>
                        <Card>
                            {this.profileComponent(user, projectData, isEnemy)}
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title={(isEnemy ? name : 'Моя') + ' активность'} extra={<a href="#"><Icon type="setting"/></a>}>Card
                            content</Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        profileData: state.profile,
    }
}

function mapDispatchToState(dispatch) {
    return {
        fetchUserProfile: bindActionCreators(fetchUserProfile, dispatch),
        toProfileUser: bindActionCreators(toProfileUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToState)(Profile);