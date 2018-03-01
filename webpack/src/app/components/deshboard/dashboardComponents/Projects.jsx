import * as React from "react";
import PropTypes from 'prop-types';
import {Table, Icon, Divider, Col, Card, Avatar, Input, Spin, Button} from 'antd';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as projectAction from '../../../actions/project/ProjectAction';
import {getStorageItem, putStorageItem} from "../../../utils/token/LocalStorage";
import * as Status from "../../../utils/AuthStatus";
import {Link} from "react-router-dom";
import * as Path from '../../../utils/RoutePath';
import {chosenProject, tokenHeader} from "../../../actions/api/Api";
import FetchSearch from "../commoncomponents/FetchSearch";

const setData = (projects) => {
    const data = [];
    projects.map((item, index) => {
        const {project} = item;
        data.push({
            key: index,
            projectId: project.id,
            creationDate: project.creationDate,
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
        pageSize: 20
    };

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
                {/*<Col span={18} offset={5}>*/}
                    <Card title='Все проекты' style={{fontSize: "25px"}}>
                        <div className='filter-panel'>
                            <FetchSearch placeHolder="Поиск" onChange={this.handleSearchChange}/>
                            <Button type="primary" style={{float:"right"}} href={Path.CREATE_PROJECT}>Создать проект</Button>
                        </div>
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
                    </Card>
                {/*</Col>*/}
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