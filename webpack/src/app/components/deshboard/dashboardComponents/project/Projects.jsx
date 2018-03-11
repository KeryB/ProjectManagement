import * as React from "react";
import PropTypes from 'prop-types';
import {
    Table, Icon, Card, Avatar, Button, Tabs, Dropdown, Menu,
    Badge, message
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
import {chooseProject} from '../../../../actions/UserAction';

const setData = (projects) => {
    const data = [];
    projects.map((item, index) => {
        const {primaryProject, primaryUser} = item;
        let projectLeadId;
        if (item.lead) {
            projectLeadId = primaryUser.id
        }
        data.push({
            key: index,
            projectId: primaryProject.id,
            creationDate: moment(primaryProject.creationDate).format('DD/MM/YYYY'),
            projectName: primaryProject.title,
            projectType: primaryProject.projectType,
            role: item.permission,
            projectLead: {
                name: primaryUser.firstName + ' ' + primaryUser.secondName,
                id: primaryUser.id
            }
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

    fetchTableType = {
        "available": 0,
        "mine": 1,
        "finished": 2
    };

    menu = (
        <Menu>
            <Menu.Item key="0">
                <a href="http://www.alipay.com/">Добавить в проект</a>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="1">
                <a href="http://www.taobao.com/">Назначить руководителем</a>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="3">Перейти в настройки</Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="4">Завершить проект</Menu.Item>
        </Menu>
    );

    columns = [
        {
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text, record) => <Link to={`/dashboard/project/id=${record.projectId}?title=${record.projectName}`} onClick={() => {
                const {chooseProject, projectData: {projects}} = this.props;
                const primaryProject = projects.find((element, index, array) => {
                    const {primaryProject} = element;
                    if (primaryProject.id === record.projectId) {
                        putStorageItem(chosenProject, primaryProject.id);
                        return primaryProject;
                    }
                });

                message.info('Вы выбрали проект ' + record.projectName);
                chooseProject(primaryProject);
            }}>
                <Avatar size='large' shape='square'/></Link>
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
            render: (text, record) => (
                <span>
                    <Link to={`/dashboard/profile/${record.projectLead.id}`}
                          onClick={this.handleProfileChange}><Avatar size='small'/> {record.projectLead.name}
                    </Link>
                </span>
            )
        }, {
            title: 'Статус проекта',
            dataIndex: 'projectStatus',
            render: () => (
                <span><Badge status="processing"/>В разработке </span>
            )
        }, {
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record) => (
                <Dropdown overlay={this.menu} trigger={['click']}>
                    <Button style={{marginLeft: 8}}>
                        <Icon type="down"/>
                    </Button>
                </Dropdown>
            )
        }
    ];

    componentWillMount() {
        const {projectData: {isFetched, isLoading}, projectActions} = this.props;
        if (!isFetched && !isLoading && getStorageItem(tokenHeader)) {
            this.state.fetchTableType = this.fetchTableType.available;
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

    handleTabChange = (key) => {

        console.log(key);
        const {projectActions} = this.props;
        if (parseInt(key) === 0) {
            this.state.fetchTableType = this.fetchTableType.available;
            projectActions.fetchProjectData(this.state);
        }
        if (parseInt(key) === 1) {
            this.state.fetchTableType = this.fetchTableType.mine;
            projectActions.fetchProjectData(this.state);
        }
        if (parseInt(key) === 2) {
            this.state.fetchTableType = this.fetchTableType.finished;
            projectActions.fetchProjectData(this.state);
        }
    };

    handleProfileChange = () => {

    }

    renderTable = (projects, totalPages, isLoading, {pageSize, current}) => (
        <Table columns={this.columns}
               dataSource={setData(projects)}
               onChange={this.handlePaginationChange}
               pagination={{pageSize: pageSize, total: totalPages, defaultCurrent: current}}
               loading={isLoading}
        />
    );


    render() {
        const {projectData: {isLoading, projects, totalPages}} = this.props;

        console.log(projects);
        return (
            <div className="project-list">

                <Card title='Проекты' style={{fontSize: "25px"}}>
                    <div className='filter-panel'>
                        <FetchSearch placeHolder="Поиск" onChange={this.handleSearchChange}/>
                    </div>
                    <Tabs tabPosition='right' onChange={this.handleTabChange}>
                        <Tabs.TabPane tab="Доступные проекты" key="0">
                            {this.renderTable(projects, totalPages, isLoading, this.state)}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Мои" key="1">
                            {this.renderTable(projects, totalPages, isLoading, this.state)}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Завершенные"
                                      key="2">{this.renderTable(projects, totalPages, isLoading, this.state)}</Tabs.TabPane>
                    </Tabs>
                </Card>
            </div>
        )
    }
}

Projects.propTypes = {
    projectData: PropTypes.object.isRequired,
    userActions: PropTypes.object
};

function mapStateToProps(state) {
    return {
        projectData: state.project
    }
}

function mapDispatchToProps(dispatch) {
    return {
        projectActions: bindActionCreators(projectAction, dispatch),
        chooseProject: bindActionCreators(chooseProject, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);