import * as React from "react";
import PropTypes from 'prop-types';
import {Table, Icon, Divider, Col, Card, Avatar, Input} from 'antd';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as projectAction from '../../../actions/ProjectAction';
import {getStorageItem} from "../../../utils/token/TokenManager";
import * as Status from "../../../utils/AuthStatus";
import {Link} from "react-router-dom";
import * as Path from '../../../utils/RoutePath'

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
        title: 'Роль',
        dataIndex: 'role',
        key: 'role',
    }, {
        title: 'Project lead',
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
            projectName: project.shortTitle,
            projectType: project.projectType,
            role: item.permission,
            projectLead: index
        })
    });

    return data;
};

class Projects extends React.Component {

    state={

    };

    componentWillMount() {
        const {projectData: {isFetched}, projectActions} = this.props;
        if (!isFetched && getStorageItem()) {
            projectActions.fetchProjectData();
        }
    }

    componentWillReceiveProps(props) {
        const {projectData: {isFetched, isLoading, user}, projectActions, isLoadingUserData} = props;
        if (!isFetched && !isLoading && user.tokenStatus === Status.VALID) {
            projectActions.fetchProjectData();
        }
    }

    //todo сделать фильтр
    handleChange = (e) => {

        console.log( e.target.value);
    }

    render() {
        const {projectData: {isLoading, projects}} = this.props;

        console.log(this.props);

        return (
            <div className="project-list">
                <Col span={18} offset={5}>
                    <Card title='Все проекты' style={{fontSize: "25px"}}>
                        <Search
                            placeholder="Поиск"
                            onSearch={value => console.log(value)}
                            onChange={this.handleChange}
                            style={{width: 200}}
                        />
                        {isLoading ? <div className='preloader'/>
                            : <Table columns={columns} dataSource={setData(projects)}/>}
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