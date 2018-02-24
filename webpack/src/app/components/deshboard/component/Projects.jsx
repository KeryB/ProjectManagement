import * as React from "react";
import PropTypes from 'prop-types';
import {Table, Icon, Divider, Col, Card, Avatar, Input, Spin} from 'antd';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as projectAction from '../../../actions/ProjectAction';
import {getStorageItem} from "../../../utils/token/TokenManager";
import * as Status from "../../../utils/AuthStatus";
import {Link} from "react-router-dom";
import * as Path from '../../../utils/RoutePath';
import {tokenHeader} from "../../../actions/api/Api";
import FetchSearch from "../commoncomponents/FetchSearch";

const Search = Input.Search;

const columns = [
    {
        dataIndex: 'avatar',
        key: 'avatar',
        render: () => <Link to={Path.DASHBOARD} href='#'><Avatar size='large'/></Link>
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
    }];

const setData = (projects) => {
    const data = [];
    projects.map((item, index) => {
        const {project} = item;
        data.push({
            key: index,
            creationDate: project.creationDate,
            projectName: project.title,
            projectType: project.projectType,
            role: item.permission,
            projectLead: index
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
        console.log(this.props);

        return (
            <div className="project-list">
                <Col span={18} offset={5}>
                    <Card title='Все проекты' style={{fontSize: "25px"}}>
                        <div className='filter-panel'>
                            <FetchSearch placeHolder="Поиск" onChange={this.handleSearchChange}/>
                        </div>
                        {isLoading ? <Spin tip="Loading...">
                                <Table columns={columns}
                                       dataSource={setData(projects)}
                                       onChange={this.handlePaginationChange}
                                       pagination={{pageSize: pageSize, total: totalPages, defaultCurrent: current}}/>
                            </Spin> :
                            <Table columns={columns}
                                   dataSource={setData(projects)}
                                   onChange={this.handlePaginationChange}
                                   pagination={{pageSize: pageSize, total: totalPages, defaultCurrent: current}}/>
                        }
                    </Card>
                </Col>
            </div>
        )
    }
}

Projects.propTypes = {
    projectData: PropTypes.object.isRequired,
    isLoadingUserData: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    console.log(state);
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