import * as React from "react";
import PropTypes from "prop-types";
import {Avatar, Card, Col, Divider, Form, Icon, Row, Spin, Tabs} from "antd";
import {isEmpty} from "lodash";
import moment from "moment";
import {connect} from "react-redux";
import {getStorageItem} from "../../../utils/token/LocalStorage";
import {tokenHeader} from "../../../actions/api/Api";
import * as Status from "../../../utils/AuthStatus";
import * as projectAction from "../../../actions/project/ProjectAction";
import {bindActionCreators} from "redux";
import FetchList from "../commoncomponents/FetchList";

const formItemLayout = {
    labelCol: {span: 3},
    wrapperCol: {offset: 8},
};

const showProjects = (projects) => (
    projects.map((item, index) => (
        <Card
            cover={<Avatar shape="square"  />}
            hoverable
            style={{marginRight:'5px',height:'40px',width:'40px'}}
        >
        </Card>
))
);

class Profile extends React.Component {

    static propTypes = {
        userData: PropTypes.object.isRequired,
        projectData: PropTypes.object.isRequired,
    };

    state = {
        current: 0,
        pageSize: 8
    };

    componentWillMount() {
        const {projectData: {isFetched}, projectActions} = this.props;
        if (!isFetched && getStorageItem(tokenHeader)) {
            projectActions.fetchProjects(this.state);
        }
    }

    componentWillReceiveProps(props) {
        const {projectData: {isFetched, isLoading}, projectActions, userData: {tokenStatus}} = props;

        if (!isFetched && !isLoading && tokenStatus === Status.VALID) {
            projectActions.fetchProjects();
        }
    }

    profileComponent = (user, projectData) => (

        <Row>
            <Col span={9}>
                <Card
                    hoverable
                    style={{width: 209}}
                    cover={<img alt="example" src="../../../../resources/images/profile.jpeg"/>}
                >
                </Card>
            </Col>
            <Col span={14} className='contact-information'>
                <h3 style={{display:'inline-block'}}>Информация:</h3>
                <a><Icon type="edit" style={{float: 'right'}}/></a>
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

                <Divider type="horizontal"/>
                <p><h3>Доступные проекты:</h3></p>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Tab 1" key="1">
                        <div className='project-list'>
                            <FetchList/>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 2" key="2">Content of Tab Pane 2</Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 3" key="3">Content of Tab Pane 3</Tabs.TabPane>
                </Tabs>
            </Col>
        </Row>
    );

    render() {
        const {userData: {user}, projectData} = this.props;

        return (
            <div className='profile'>
                <div className='header-profile'>
                    <h2>
                        Профиль: {user.firstName + ' ' + user.secondName}
                    </h2>
                </div>

                    <Row gutter={16} style={{paddingTop: '20px'}}>
                        <Col span={16}>
                            <Card>
                                {this.profileComponent(user, projectData)}
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Моя активность" extra={<a href="#"><Icon type="setting"/></a>}>Card
                                content</Card>
                        </Col>
                    </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        projectData: state.project
    }
}

function mapDispatchToState(dispatch) {
    return {
        projectActions: bindActionCreators(projectAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToState)(Profile);