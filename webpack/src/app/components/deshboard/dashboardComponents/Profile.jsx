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
        const {userData: {user}, fetchUserProfile, toProfileUser, match: {params}} = this.props;
        const userId = parseInt(params.id);
        console.log(this.props)

        // if (this.checkOnEnemy(user, params)) {
        //     this.setState({
        //         userId: userId
        //     }, () => {
        //         fetchUserProfile(this.state);
        //     });
        // } else {
        //
        //     toProfileUser(user);
        // }
    }

    componentWillReceiveProps(props) {
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
        })
    };

    profileComponent = (user, projectDat, isEnemy) => {
        const {match: {params}} = this.props;

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
            <Tabs defaultActiveKey="1" onChange={this.handleTabChange}>
                <Tabs.TabPane tab="Доступные проекты" key="1">
                    <FetchList userObject={this.state}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Мои" key="2">
                    <div>
                        <FetchList userObject={this.state}/>
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Завершенные" key="3">Завершенные</Tabs.TabPane>
            </Tabs>
        </Row>)
    };

    render() {
        const {profileData:{user}} = this.props;
        // if (profileData.user == null) {
        //     user = userData.user;
        // } else {
        //     user = profileData.user;
        // }

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
                        <Card title={(isEnemy ? name : 'Моя') + ' активность'}
                              extra={<a href="#"><Icon type="setting"/></a>}>Card
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