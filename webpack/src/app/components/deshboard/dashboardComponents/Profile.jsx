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
import {TableType} from "../../../utils/table/TableUtils";
import {fetchProjectsProfile} from "../../../actions/project/ProjectAction";

const formItemLayout = {
    labelCol: {span: 3},
    wrapperCol: {offset: 8},
};

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fetchTableType: 0,
            userId: 0
        };
    }


    static propTypes = {
        profileData: PropTypes.object.isRequired
    };

    componentDidMount() {
        const {userData: {user}, match: {params}, toProfileUser, fetchUserProfile, fetchProjectsProfile} = this.props;
        const userId = parseInt(params.id);

        this.setState({
            userId: userId
        }, () => {
            if (this.checkOnEnemy(user, params)) {
                fetchUserProfile(this.state);
            } else {
                toProfileUser(user);
            }
            fetchProjectsProfile();
        });

    }

    checkOnEnemy = (user, params) => {
        const userId = parseInt(params.id);
        return userId !== user.id;
    };

    handleTabChange = (key) => {
        let fetchTableType;
        if (parseInt(key) === 0) {
            fetchTableType = TableType.available;
        }
        if (parseInt(key) === 1) {
            fetchTableType = TableType.mine;
        }
        if (parseInt(key) === 2) {
            fetchTableType = TableType.finished;
        }

        this.setState({
            fetchTableType: fetchTableType
        }, () => {

        });

    };

    RenderList = () => {

        return <FetchList
            userObject={this.state}/>
    };


    profileComponent = (userdata) => {
        const {match: {params}, userData: {user}} = this.props;
        const isEnemy = this.checkOnEnemy(user, params);

        return (<Row>
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
                            className="ant-form-text">{isEmpty(userdata.nickName) ? 'Поле не заполнено' : userdata.nickName}</span>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Имя и Фамилия"
                    >
                        <span className="ant-form-text">{userdata.firstName + ' ' + userdata.secondName}</span>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Email"
                    >
                        <span className="ant-form-text">{userdata.email}</span>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Дата Регистрации"
                    >
                        <span className="ant-form-text">{moment(userdata.creationDate).format('LL')}</span>
                    </Form.Item>
                </Form>
            </Col>
            <Divider type="horizontal"/>
            <h3>Проекты:</h3>
            <Tabs defaultActiveKey="1" onChange={this.handleTabChange}>
                <Tabs.TabPane tab="Доступные проекты" key="1">
                    {this.RenderList()}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Мои" key="2">
                    {this.RenderList()}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Завершенные" key="3">Завершенные</Tabs.TabPane>
            </Tabs>
        </Row>)
    };

    render() {
        const {profileData: {user}, match: {params}} = this.props;
        let isEnemy = false;
        let name;
        if (user != null) {
            isEnemy = this.checkOnEnemy(user, params);
            name = user.firstName + ' ' + user.secondName;
        }

        return (
            <div className='profile'>
                {user == null ? <Spin/> :
                    <div>
                        <div className='p-block'>
                            <div className='header-profile'>
                                <h2>
                                    Профиль: {name}
                                </h2>
                            </div>
                        </div>

                        <Row gutter={16} style={{paddingTop: '10px'}}>
                            <Col span={16}>
                                <Card>
                                    {this.profileComponent(user, isEnemy)}
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title={(isEnemy ? name : 'Моя') + ' активность'}
                                      extra={<a href="#"><Icon type="setting"/></a>}>Card
                                    content</Card>
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        profileData: state.profile,
        userData: state.user
    }
}

function mapDispatchToState(dispatch) {
    return {
        fetchUserProfile: bindActionCreators(fetchUserProfile, dispatch),
        toProfileUser: bindActionCreators(toProfileUser, dispatch),
        fetchProjectsProfile: bindActionCreators(fetchProjectsProfile, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToState)(Profile);