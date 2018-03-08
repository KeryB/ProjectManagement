import * as React from "react";
import PropTypes from 'prop-types';
import {
    Table, Icon, Divider, Col, Card, Avatar, Input, Spin, Button, Tabs, Dropdown, Menu, Progress,
    Badge
} from 'antd';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as projectAction from '../../../../actions/project/ProjectAction';
import {getStorageItem, putStorageItem} from "../../../../utils/token/LocalStorage";
import * as Status from "../../../../utils/AuthStatus";
import {Link} from "react-router-dom";
import * as Path from '../../../../utils/RoutePath';
import {chosenProject, tokenHeader} from "../../../../actions/api/Api";
import FetchSearch from "../../commoncomponents/FetchSearch";
import moment from "moment";

const setData = (projects) => {
    const data = [];
    projects.map((item, index) => {
        const {project} = item;

        console.log(projects);
        data.push({
            key: index,
            projectId: project.id,
            creationDate: moment(project.creationDate).format('DD/MM/YYYY'),
            projectName: project.title,
            projectType: project.projectType,
            role: item.permission,
            projectLead: 'ХЗ'
        })



    });

    return data;
};

class Projects extends React.Component {

    constructor(props) {
        super(props);
        this.changeableConunt = null;
    }

    state = {
        current: 1,
        pageSize: 20,
        idFetched: false
    };

    menu = (
        <Menu>
            <Menu.Item key="0">
                <a href="http://www.alipay.com/">Добавить в проект</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1">
                <a href="http://www.taobao.com/">Назначить руководителем</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">Перейти в настройки</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="4">Завершить проект</Menu.Item>
        </Menu>
    );

    columns = [
        {
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text, record) => <Link to={Path.DASHBOARD} onClick={() => {
                const {userActions, projectData: {projects}} = this.props;
                const project = projects.find((element, index, array) => {
                    const {project} = element;
                    if (project.id === record.projectId) {
                        putStorageItem(chosenProject, project.id);
                        return project;
                    }
                });

                userActions.chooseProject(project);
            }}>
                <Avatar size='large'/></Link>
        }, {
            title: 'Название',
            dataIndex: 'projectName',
            key: 'projectName',
            render: name => <a href="#">{name}</a>
        }, {
            title: 'Дата создания',
            dataIndex: 'creationDate',
            key: 'creationDate',
        }, {
            title: 'Тип проекта',
            dataIndex: 'projectType',
            key: 'projectType',
        }, {
            title: 'Ваша роль в проекте',
            dataIndex: 'role',
            key: 'role',
        }, {
            title: 'Руководитель проекта',
            dataIndex: 'projectLead',
            key: 'projectLead',
        },{
            title: 'Статус проекта',
            dataIndex: 'projectStatus',
            render:()=>(
                <span><Badge status="processing" />В разработке </span>
            )
        }, {
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record) => (

                <Dropdown overlay={this.menu}  trigger={['click']}>
                    <Button style={{ marginLeft: 8 }}>
                        <Icon type="down" />
                    </Button>
                </Dropdown>
            )
        }
    ];

    componentWillMount() {
        const {projectData: {isFetched}, projectActions} = this.props;
        if (!isFetched && getStorageItem(tokenHeader)) {
            projectActions.fetchProjectData(this.state);
        }
    }

    componentWillReceiveProps(props) {
        const {projectData: {isFetched, isLoading, user}, projectActions, isLoadingUserData} = props;
        if (!isFetched && !isLoading && user.tokenStatus === Status.VALID) {
            projectActions.fetchProjectData(this.state);
        }
    }

    handleSearchChange = (value) => {
        const {projectActions} = this.props;
        this.state.projectName = value;
        projectActions.fetchProjectData(this.state);
    };

    handlePaginationChange = (pageable) => {
        const {current, pageSize} = pageable;
        const {projectActions} = this.props;

        this.state.current = current;
        this.state.pageSize = pageSize;
        projectActions.fetchProjectData(this.state);
    };

    render() {
        const {projectData: {isLoading, projects, totalPages}} = this.props;
        const {pageSize, current} = this.state;

        return (
            <div className="project-list">

                <Card title='Проекты' style={{fontSize: "25px"}}>
                    <div className='filter-panel'>
                        <FetchSearch placeHolder="Поиск" onChange={this.handleSearchChange}/>
                    </div>
                    <Tabs tabPosition='right'>
                        <Tabs.TabPane tab="Доступные проекты" key="1">
                            {isLoading ? <Spin tip="Loading...">
                                    <Table columns={this.columns}
                                           dataSource={setData(projects)}
                                           onChange={this.handlePaginationChange}
                                           pagination={{pageSize: pageSize, total: totalPages, defaultCurrent: current}}
                                    />
                                </Spin> :
                                <Table columns={this.columns}
                                       dataSource={setData(projects)}
                                       onChange={this.handlePaginationChange}
                                       pagination={{pageSize: pageSize, total: totalPages, defaultCurrent: current}}

                                />
                            }
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Архивные" key="2">Content of Tab Pane 2</Tabs.TabPane>
                        <Tabs.TabPane tab="Мои" key="3">Content of Tab Pane 3</Tabs.TabPane>
                    </Tabs>
                </Card>
            </div>
        )
    }
}

Projects.propTypes = {
    projectData: PropTypes.object.isRequired,
    isLoadingUserData: PropTypes.bool.isRequired,
    userActions: PropTypes.object
};

function mapStateToProps(state) {
    return {
        projectData: state.project
    }
}

function mapDispatchToProps(dispatch) {
    return {
        projectActions: bindActionCreators(projectAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);